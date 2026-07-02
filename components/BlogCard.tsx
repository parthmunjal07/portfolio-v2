import Link from "next/link";

interface BlogCardProps {
  title: string;
  excerpt: string;
  date: string;
  readMoreLink: string;
}

export default function BlogCard({
  title,
  excerpt,
  date,
  readMoreLink,
}: BlogCardProps) {
  return (
    <div className="flex flex-col p-6 bg-white/10 dark:bg-black/40 backdrop-blur-xl rounded-2xl border border-white/20 hover:border-orange-100/40 transition-all duration-300 group shadow-xl">
      <div className="text-xs text-orange-100/70 mb-3 font-mono uppercase tracking-wider">
        {date}
      </div>
      <h3 className="text-2xl font-bold text-white group-hover:text-orange-100 transition-colors font-serif">
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
          Read Post <span className="group-hover:translate-x-1 transition-transform">→</span>
        </Link>
      </div>
    </div>
  );
}
