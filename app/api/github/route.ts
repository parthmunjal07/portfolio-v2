import { NextRequest, NextResponse } from "next/server";

interface ContributionDay {
  date: string;
  count: number;
  level: number;
}

interface ContributionWeek {
  days: ContributionDay[];
}

function parseLevel(levelStr: string): number {
  // GitHub uses data-level="0" through data-level="4"
  const num = parseInt(levelStr, 10);
  return isNaN(num) ? 0 : Math.min(Math.max(num, 0), 4);
}

export async function GET(request: NextRequest) {
  const username = request.nextUrl.searchParams.get("username") || "parthmunjal07";

  try {
    // Fetch the GitHub contributions page
    // GitHub provides contribution data as an HTML fragment
    const response = await fetch(
      `https://github.com/users/${username}/contributions`,
      {
        headers: {
          "User-Agent": "Mozilla/5.0 (compatible; Portfolio/1.0)",
          Accept: "text/html",
        },
        next: { revalidate: 3600 }, // Cache for 1 hour
      }
    );

    if (!response.ok) {
      throw new Error(`GitHub returned ${response.status}`);
    }

    const html = await response.text();

    // Parse the contribution data from the HTML
    // GitHub's contribution calendar uses <td> elements with data-date and data-level attributes
    const weeks: ContributionWeek[] = [];
    
    // Match each table row (week) - the contribution calendar is structured in columns (weeks)
    // Each <td> has data-date="YYYY-MM-DD" and data-level="0-4"
    const dayRegex =
      /data-date="([^"]+)"[^>]*data-level="([^"]+)"[^>]*>[\s\S]*?<tool-tip[^>]*>([\s\S]*?)<\/tool-tip>/g;

    const days: ContributionDay[] = [];
    let match;

    while ((match = dayRegex.exec(html)) !== null) {
      const date = match[1];
      const level = parseLevel(match[2]);
      const tooltipText = match[3].trim();

      // Parse count from tooltip text like "5 contributions on January 1"
      let count = 0;
      const countMatch = tooltipText.match(/^(\d+)\s+contribution/);
      if (countMatch) {
        count = parseInt(countMatch[1], 10);
      }

      days.push({ date, count, level });
    }

    // If we didn't get data from the regex, try an alternative pattern
    if (days.length === 0) {
      const altRegex = /data-date="([^"]+)"[^>]*data-level="([^"]+)"/g;
      while ((match = altRegex.exec(html)) !== null) {
        const date = match[1];
        const level = parseLevel(match[2]);
        // Estimate count from level
        const count =
          level === 0 ? 0 : level === 1 ? 1 : level === 2 ? 4 : level === 3 ? 7 : 12;
        days.push({ date, count, level });
      }
    }

    // Group days into weeks (7 days per week, starting from Sunday)
    if (days.length > 0) {
      // Sort by date
      days.sort((a, b) => a.date.localeCompare(b.date));

      for (let i = 0; i < days.length; i += 7) {
        const weekDays = days.slice(i, i + 7);
        // Pad if last week is incomplete
        while (weekDays.length < 7) {
          weekDays.push({ date: "", count: 0, level: 0 });
        }
        weeks.push({ days: weekDays });
      }
    }

    // Calculate total
    const totalContributions = days.reduce((sum, d) => sum + d.count, 0);

    return NextResponse.json(
      { weeks, totalContributions },
      {
        headers: {
          "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=7200",
        },
      }
    );
  } catch (error) {
    console.error("Failed to fetch GitHub contributions:", error);
    return NextResponse.json(
      { error: "Failed to fetch contributions", weeks: [], totalContributions: 0 },
      { status: 500 }
    );
  }
}
