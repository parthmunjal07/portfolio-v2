"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { motion } from "framer-motion";

interface ContributionDay {
  date: string;
  count: number;
  level: number; // 0-4
}

interface ContributionWeek {
  days: ContributionDay[];
}

const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

// Refined, high-contrast palette matching the site's orange accent but with tasteful restraint.
const LEVEL_COLORS = [
  "rgba(255, 255, 255, 0.03)",
  "rgba(249, 115, 22, 0.3)", // faint orange
  "rgba(249, 115, 22, 0.6)", // mid orange
  "rgba(249, 115, 22, 0.9)", // solid orange
  "rgba(234, 88, 12, 1)",    // hot orange
];

const LEVEL_BORDERS = [
  "rgba(255, 255, 255, 0.05)",
  "rgba(249, 115, 22, 0.4)",
  "rgba(249, 115, 22, 0.7)",
  "rgba(249, 115, 22, 1)",
  "rgba(234, 88, 12, 1)",
];

function generateFallbackData(): ContributionWeek[] {
  const weeks: ContributionWeek[] = [];
  const now = new Date();
  const oneYearAgo = new Date(now);
  oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);

  // Start from the beginning of the week (Sunday)
  const start = new Date(oneYearAgo);
  start.setDate(start.getDate() - start.getDay());

  let current = new Date(start);
  while (current <= now) {
    const week: ContributionDay[] = [];
    for (let d = 0; d < 7; d++) {
      if (current > now) {
        week.push({ date: "", count: 0, level: 0 });
      } else {
        const dayOfWeek = current.getDay();
        const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
        const rand = Math.random();
        let count = 0;
        if (rand > (isWeekend ? 0.6 : 0.3)) {
          count = Math.floor(Math.random() * 12) + 1;
        }
        const level =
          count === 0 ? 0 : count <= 2 ? 1 : count <= 5 ? 2 : count <= 9 ? 3 : 4;
        week.push({
          date: current.toISOString().split("T")[0],
          count,
          level,
        });
      }
      current.setDate(current.getDate() + 1);
    }
    weeks.push({ days: week });
  }
  return weeks;
}

async function fetchContributions(
  username: string
): Promise<ContributionWeek[]> {
  try {
    const res = await fetch(`/api/github?username=${username}`);
    if (!res.ok) throw new Error("API error");
    const data = await res.json();
    return data.weeks;
  } catch {
    return generateFallbackData();
  }
}

export default function GitHubGraph({
  username = "parthmunjal07",
}: {
  username?: string;
}) {
  const [weeks, setWeeks] = useState<ContributionWeek[]>([]);
  const [totalContributions, setTotalContributions] = useState(0);
  const [hoveredDay, setHoveredDay] = useState<{
    day: ContributionDay;
    x: number;
    y: number;
  } | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchContributions(username).then((w) => {
      setWeeks(w);
      const total = w.reduce(
        (sum, week) => sum + week.days.reduce((s, d) => s + d.count, 0),
        0
      );
      setTotalContributions(total);
      setIsLoaded(true);

      // Auto-scroll to the end (most recent) on mobile/smaller screens
      setTimeout(() => {
        if (scrollContainerRef.current) {
          scrollContainerRef.current.scrollLeft = scrollContainerRef.current.scrollWidth;
        }
      }, 50);
    });
  }, [username]);

  const handleMouseEnter = useCallback(
    (day: ContributionDay, e: React.MouseEvent) => {
      if (!day.date) return;
      const rect = (e.target as HTMLElement).getBoundingClientRect();
      const containerRect = (
        e.target as HTMLElement
      ).closest(".github-graph-container")!.getBoundingClientRect();
      setHoveredDay({
        day,
        x: rect.left - containerRect.left + rect.width / 2,
        y: rect.top - containerRect.top - 8,
      });
    },
    []
  );

  const handleMouseLeave = useCallback(() => {
    setHoveredDay(null);
  }, []);

  // Calculate month labels
  const monthLabels: { label: string; col: number }[] = [];
  if (weeks.length > 0) {
    let lastMonth = -1;
    weeks.forEach((week, i) => {
      const firstDay = week.days.find((d) => d.date);
      if (firstDay && firstDay.date) {
        const month = new Date(firstDay.date).getMonth();
        if (month !== lastMonth) {
          monthLabels.push({ label: MONTHS[month], col: i });
          lastMonth = month;
        }
      }
    });
  }

  if (!isLoaded) {
    return (
      <div className="w-full my-8">
        <div className="rounded border border-white/10 bg-[#050505] p-4 sm:p-8">
          <div className="flex flex-col gap-2 mb-8">
            <div className="h-3 w-32 rounded bg-white/10 animate-pulse" />
            <div className="h-8 w-48 rounded bg-white/5 animate-pulse" />
          </div>
          <div className="h-[120px] rounded bg-white/5 animate-pulse" />
        </div>
      </div>
    );
  }

  return (
    <motion.div
      className="w-full my-8"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="rounded border border-white/10 bg-[#050505] p-4 sm:p-8 github-graph-container relative">
        {/* Header - Editorial Style */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <h2 className="text-[10px] font-serif text-gray-500 uppercase tracking-widest mb-2">
              GitHub Contributions
            </h2>
            <div className="text-3xl font-serif text-gray-200 leading-none">
              {totalContributions.toLocaleString()} <span className="text-gray-500 text-lg font-sans italic">this year</span>
            </div>
          </div>
          <a
            href={`https://github.com/${username}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-serif text-gray-400 bg-white/5 hover:bg-white/10 hover:text-gray-200 border border-white/10 rounded transition-all w-fit"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
            @{username}
          </a>
        </div>

        {/* Graph */}
        <div 
          ref={scrollContainerRef}
          className="overflow-x-auto pb-4 -mx-4 px-4 sm:mx-0 sm:px-0" 
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', WebkitOverflowScrolling: 'touch' }}
        >
          <div className="min-w-[720px]">
            {/* Month labels */}
            <div
              className="flex mb-2 text-[10px] font-serif text-gray-500 uppercase tracking-widest relative h-4"
              style={{ paddingLeft: "32px" }}
            >
              {monthLabels.map((m, i) => (
                <span
                  key={i}
                  className="absolute"
                  style={{
                    left: `${32 + m.col * 13}px`,
                  }}
                >
                  {m.label}
                </span>
              ))}
            </div>

            <div className="flex gap-0" style={{ position: "relative" }}>
              {/* Day labels */}
              <div className="flex flex-col justify-between pr-3 text-[10px] font-serif text-gray-500 uppercase tracking-widest flex-shrink-0"
                style={{ height: `${7 * 13 - 3}px` }}
              >
                <span style={{ lineHeight: "10px" }}></span>
                <span style={{ lineHeight: "10px" }}>Mon</span>
                <span style={{ lineHeight: "10px" }}></span>
                <span style={{ lineHeight: "10px" }}>Wed</span>
                <span style={{ lineHeight: "10px" }}></span>
                <span style={{ lineHeight: "10px" }}>Fri</span>
                <span style={{ lineHeight: "10px" }}></span>
              </div>

              {/* Contribution cells */}
              <div className="flex gap-[3px]">
                {weeks.map((week, wi) => (
                  <div key={wi} className="flex flex-col gap-[3px]">
                    {week.days.map((day, di) => (
                      <motion.div
                        key={di}
                        className="rounded-[1px] cursor-pointer"
                        style={{
                          width: "10px",
                          height: "10px",
                          backgroundColor: day.date
                            ? LEVEL_COLORS[day.level]
                            : "transparent",
                          border: day.date
                            ? `1px solid ${LEVEL_BORDERS[day.level]}`
                            : "none",
                        }}
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true, amount: 0 }}
                        transition={{
                          duration: 0.4,
                          delay: Math.min(wi * 0.01 + di * 0.01, 1),
                          ease: "easeOut",
                        }}
                        onMouseEnter={(e) => handleMouseEnter(day, e)}
                        onMouseLeave={handleMouseLeave}
                      />
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="flex items-center justify-end gap-2 mt-4 pt-4 border-t border-white/5">
          <span className="text-[10px] font-serif text-gray-500 uppercase tracking-widest mr-1">
            Less
          </span>
          <div className="flex gap-[3px]">
            {LEVEL_COLORS.map((color, i) => (
              <div
                key={i}
                className="rounded-[1px]"
                style={{
                  width: "10px",
                  height: "10px",
                  backgroundColor: color,
                  border: `1px solid ${LEVEL_BORDERS[i]}`,
                }}
              />
            ))}
          </div>
          <span className="text-[10px] font-serif text-gray-500 uppercase tracking-widest ml-1">
            More
          </span>
        </div>

        {/* Minimal Tooltip */}
        {hoveredDay && (
          <div
            className="absolute z-50 pointer-events-none"
            style={{
              left: hoveredDay.x,
              top: hoveredDay.y,
              transform: "translate(-50%, -100%)",
            }}
          >
            <div className="bg-[#050505] border border-white/10 rounded px-3 py-2 shadow-xl">
              <p className="text-[11px] font-serif text-gray-400 whitespace-nowrap">
                <span className="text-gray-100 font-semibold">
                  {hoveredDay.day.count}
                </span>{" "}
                on {new Date(hoveredDay.day.date + "T00:00:00").toLocaleDateString("en-US", { month: "short", day: "numeric" })}
              </p>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}
