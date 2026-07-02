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
    <nav className="fixed top-0 w-full flex items-center justify-center py-6 z-50">
      <div className="flex gap-8 px-8 py-3 bg-white/5 dark:bg-black/20 backdrop-blur-md rounded-full border border-white/10 shadow-lg">
        {links.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.name}
              href={link.href}
              className={`transition-colors duration-200 text-md   font-medium font-serif ${
                isActive
                  ? "text-orange-100"
                  : "text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white"
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
