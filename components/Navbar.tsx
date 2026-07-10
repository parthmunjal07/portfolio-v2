"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  const links = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Projects", href: "/projects" },
    { name: "Blog", href: "/blog" },
  ];

  return (
    <nav className="fixed top-0 left-1/2 -translate-x-1/2 flex items-center justify-center py-4 sm:py-6 z-50 w-full max-w-3xl px-5 sm:px-10">
      <div className="flex w-full justify-between sm:justify-center gap-4 sm:gap-8 px-6 sm:px-8 py-2 sm:py-3 backdrop-blur-md bg-transparent rounded-full border border-white/5">
        {links.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.name}
              href={link.href}
              className={`transition-colors duration-200 text-sm sm:text-base font-medium font-serif ${
                isActive
                  ? "text-orange-100"
                  : "text-zinc-600 dark:text-zinc-400 hover:text-white"
              }`}
            >
              {link.name}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
