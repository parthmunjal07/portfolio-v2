import Link from "next/link";

interface ProjectCardProps {
  title: string;
  subheading: string;
  readMoreLink: string;
  githubLink: string;
  liveLink: string;
}

export default function ProjectCard({
  title,
  subheading,
  readMoreLink,
  githubLink,
  liveLink,
}: ProjectCardProps) {
  return (
    <div className="flex flex-col p-6 bg-white/10 dark:bg-black/40 backdrop-blur-xl rounded-2xl border border-white/20 hover:border-orange-100/40 transition-all duration-300 group shadow-xl">
      <h3 className="text-2xl font-bold text-white group-hover:text-orange-100 transition-colors font-serif">
        {title}
      </h3>
      <p className="text-gray-400 mt-3 mb-6 flex-1 text-sm leading-relaxed">
        {subheading}
      </p>

      <div className="flex items-center justify-between mt-auto pt-5 border-t border-white/10">
        <Link
          href={readMoreLink}
          className="text-sm font-semibold text-orange-100 hover:text-orange-200 transition-colors flex items-center gap-1"
        >
          Read more <span className="group-hover:translate-x-1 transition-transform">→</span>
        </Link>
        <div className="flex gap-4 text-sm font-medium">
          <a
            href={githubLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-400 hover:text-white transition-colors"
          >
            GitHub
          </a>
          <a
            href={liveLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-400 hover:text-white transition-colors"
          >
            Live
          </a>
        </div>
      </div>
    </div>
  );
}
