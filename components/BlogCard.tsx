import Link from "next/link";

interface BlogCardProps {
  title: string;
  excerpt: string;
  date: string;
  readingTime?: number;
  readMoreLink: string;
}

export default function BlogCard({
  title,
  excerpt,
  date,
  readingTime,
  readMoreLink,
}: BlogCardProps) {
  return (
    <div
      className="relative flex flex-col p-6 rounded-2xl 
                 bg-white/5 backdrop-blur-2xl backdrop-saturate-150
                 border border-white/10 
                 shadow-[0_8px_32px_rgba(0,0,0,0.25)]
                 hover:bg-white/[0.08] hover:border-orange-100/30
                 hover:shadow-[0_8px_40px_rgba(255,200,150,0.12)]
                 transition-all duration-500 group overflow-hidden"
    >
      {/* top inner highlight — sells the "glass" edge */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />

      {/* soft glow blob behind content, only visible on hover */}
      <div className="pointer-events-none absolute -top-16 -right-16 w-40 h-40 rounded-full bg-orange-200/10 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="text-xs text-orange-100/70 mb-3 font-serif uppercase tracking-wider flex items-center space-x-2">
        <span>{date}</span>
        {readingTime && (
          <>
            <span>•</span>
            <span>{readingTime} MIN READ</span>
          </>
        )}
      </div>

      <h3 className="text-2xl font-bold text-white group-hover:text-orange-100 transition-colors duration-300 font-serif">
        {title}
      </h3>

      <p className="text-gray-400 mt-3 mb-6 flex-1 text-sm leading-relaxed">
        {excerpt}
      </p>

      <div className="flex items-center mt-auto pt-5 border-t border-white/10">
        <Link
          href={readMoreLink}
          className="text-sm font-semibold text-orange-100 hover:text-orange-200 transition-colors flex items-center gap-1"
        >
          Read Post{" "}
          <span className="group-hover:translate-x-1 transition-transform">
            →
          </span>
        </Link>
      </div>
    </div>
  );
}