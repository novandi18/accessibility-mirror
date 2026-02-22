import { NextRequest, NextResponse } from "next/server";
import puppeteer from "puppeteer-core";
import chromium from "@sparticuz/chromium";

// Vercel serverless function config
export const maxDuration = 30; // seconds

// Common ad/tracker domains to block for speed
const BLOCKED_DOMAINS = [
  "doubleclick.net",
  "google-analytics.com",
  "googletagmanager.com",
  "facebook.net",
  "facebook.com",
  "googlesyndication.com",
  "adservice.google.com",
  "analytics.google.com",
  "hotjar.com",
  "clarity.ms",
  "mixpanel.com",
  "segment.io",
  "amplitude.com",
];

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const targetUrl = searchParams.get("url");

  if (!targetUrl) {
    return NextResponse.json(
      { error: "Missing 'url' query parameter" },
      { status: 400 }
    );
  }

  // Validate URL
  let parsedUrl: URL;
  try {
    parsedUrl = new URL(targetUrl);
    if (!["http:", "https:"].includes(parsedUrl.protocol)) {
      throw new Error("Invalid protocol");
    }
  } catch {
    return NextResponse.json(
      { error: "Invalid URL. Must be a valid http(s) URL." },
      { status: 400 }
    );
  }

  let browser = null;
  try {
    // Determine executable path based on environment
    const isVercel = !!process.env.AWS_LAMBDA_FUNCTION_NAME;
    const executablePath = isVercel
      ? await chromium.executablePath()
      : process.env.CHROME_EXECUTABLE_PATH ||
        // Common local Chrome paths
        (process.platform === "darwin"
          ? "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
          : process.platform === "win32"
            ? "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe"
            : "/usr/bin/google-chrome");

    browser = await puppeteer.launch({
      args: isVercel
        ? chromium.args
        : [
            "--no-sandbox",
            "--disable-setuid-sandbox",
            "--disable-dev-shm-usage",
            "--disable-gpu",
          ],
      defaultViewport: {
        width: 1280,
        height: 800,
        deviceScaleFactor: 1,
      },
      executablePath,
      headless: true,
    });

    const page = await browser.newPage();

    // Block ads and trackers for faster loading
    await page.setRequestInterception(true);
    page.on("request", (req) => {
      const url = req.url();
      const resourceType = req.resourceType();

      // Block known ad/tracking domains
      if (BLOCKED_DOMAINS.some((domain) => url.includes(domain))) {
        req.abort();
        return;
      }

      // Block heavy resource types that aren't needed for screenshot
      if (["media", "font"].includes(resourceType)) {
        req.abort();
        return;
      }

      req.continue();
    });

    // Set a realistic user agent
    await page.setUserAgent(
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
    );

    // Navigate with timeout
    await page.goto(parsedUrl.toString(), {
      waitUntil: "networkidle2",
      timeout: 15000,
    });

    // Wait a bit for any lazy-loaded content
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Capture screenshot as PNG buffer
    const screenshotBuffer = await page.screenshot({
      type: "png",
      fullPage: false, // Viewport only for performance
    });

    await browser.close();
    browser = null;

    // Return image with appropriate headers
    return new NextResponse(Buffer.from(screenshotBuffer), {
      status: 200,
      headers: {
        "Content-Type": "image/png",
        "Cache-Control": "public, max-age=300, s-maxage=600",
        "X-Screenshot-Width": "1280",
        "X-Screenshot-Height": "800",
      },
    });
  } catch (error) {
    if (browser) {
      await browser.close();
    }

    const message =
      error instanceof Error ? error.message : "Unknown error occurred";

    console.error("[Screenshot API Error]:", message);

    return NextResponse.json(
      {
        error: "Failed to capture screenshot",
        details: message,
      },
      { status: 500 }
    );
  }
}
