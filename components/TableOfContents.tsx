"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface TOCItem {
  title: string;
  url: string;
  items?: TOCItem[];
}

interface TableOfContentsProps {
  toc: TOCItem[];
}

export function TableOfContents({ toc }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "0% 0% -80% 0%" }
    );

    const elements = document.querySelectorAll("h1, h2, h3, h4, h5, h6");
    elements.forEach((elem) => observer.observe(elem));
    return () => observer.disconnect();
  }, []);

  if (!toc || toc.length === 0) return null;

  return (
    <div className="sticky top-32 space-y-4">
      <p className="font-semibold text-sm tracking-widest text-gray-400 uppercase">
        On This Page
      </p>
      <nav className="flex flex-col space-y-3 mt-4">
        {toc.map((item) => (
          <div key={item.url} className="flex flex-col space-y-3">
            <Link
              href={item.url}
              className={cn(
                "text-sm transition-colors hover:text-orange-100",
                activeId === item.url.slice(1)
                  ? "text-orange-100 font-medium"
                  : "text-gray-400"
              )}
            >
              {item.title}
            </Link>
            {item.items && item.items.length > 0 && (
              <div className="flex flex-col space-y-3 pl-4">
                {item.items.map((subItem) => (
                  <Link
                    key={subItem.url}
                    href={subItem.url}
                    className={cn(
                      "text-sm transition-colors hover:text-orange-100",
                      activeId === subItem.url.slice(1)
                        ? "text-orange-100 font-medium"
                        : "text-gray-400"
                    )}
                  >
                    {subItem.title}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>
    </div>
  );
}
