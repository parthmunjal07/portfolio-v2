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

      <h3 className="text-2xl font-bold text-white group-hover:text-orange-100 transition-colors duration-300 font-serif relative z-10">
        {title}
      </h3>

      <p className="text-gray-400 mt-3 mb-6 flex-1 text-sm leading-relaxed relative z-10">
        {subheading}
      </p>

      <div className="flex items-center justify-between mt-auto pt-5 border-t border-white/10 relative z-10">
        <Link
          href={readMoreLink}
          className="text-sm font-semibold text-orange-100 hover:text-orange-200 transition-colors flex items-center gap-1"
        >
          Read more{" "}
          <span className="group-hover:translate-x-1 transition-transform">
            →
          </span>
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