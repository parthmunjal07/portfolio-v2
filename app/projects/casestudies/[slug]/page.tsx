import Link from 'next/link';

export default async function CaseStudy({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const title = slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

  return (
    <article className="flex flex-col flex-1 font-sans mt-10 max-w-3xl mx-auto w-full px-4 pb-20">
      <Link href="/projects" className="text-sm text-gray-400 hover:text-orange-100 transition-colors mb-8 inline-flex items-center group">
        <span className="mr-2 group-hover:-translate-x-1 transition-transform">←</span> Back to Projects
      </Link>
      
      <header className="mb-10 text-center">
        <h1 className="scroll-m-20 text-4xl font-bold text-orange-100 tracking-tight text-balance font-serif mb-4">
          {title}
        </h1>
        <div className="text-gray-400 text-sm flex items-center justify-center space-x-4">
          <time dateTime="2026-10-24">October 24, 2026</time>
          <span>•</span>
          <span>Case Study</span>
        </div>
      </header>
      
      <hr className="w-full border-t border-white/10 mb-10" />

      <div className="prose prose-invert prose-orange max-w-none font-serif text-gray-300 leading-relaxed">
        <p className="text-lg mb-6 text-gray-200">
          This is a placeholder for the actual content of the project case study. The content will be written here with proper HTML tags or a Markdown renderer.
        </p>

        <h2 className="text-2xl font-bold text-orange-50 mt-10 mb-4 font-serif">The Problem</h2>
        <p className="mb-6">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </p>

        <h3 className="text-xl font-bold text-orange-50 mt-8 mb-4 font-serif">The Solution</h3>
        <p className="mb-6">
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </p>

        <blockquote className="border-l-4 border-orange-500/50 pl-4 italic text-gray-400 my-6 bg-white/5 p-4 rounded-r-lg">
          "This is a blockquote that emphasizes a key takeaway from building the project."
        </blockquote>

        <p className="mb-6">
          Technologies used:
        </p>
        <ul className="list-disc list-inside space-y-2 mb-6 ml-4">
          <li>Next.js & React</li>
          <li>Tailwind CSS</li>
          <li>Framer Motion</li>
        </ul>

        <div className="bg-black/50 p-6 rounded-xl border border-white/10 font-mono text-sm text-gray-300 my-8 overflow-x-auto">
          <pre>
            <code>
{`function solveProblem() {
  console.log("This is how we solved the core technical challenge.");
  return true;
}`}
            </code>
          </pre>
        </div>

        <p className="mb-6">
          Conclusion goes here. The styling ensures it looks beautiful and matches the glassmorphism and dark mode theme of the portfolio.
        </p>
      </div>
    </article>
  );
}
