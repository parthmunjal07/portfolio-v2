import Link from 'next/link';
import { notFound } from 'next/navigation';
import { caseStudies } from '../../../../.velite';
import { MDXContent } from '@/components/mdx-components';

export async function generateStaticParams() {
  return caseStudies.map((caseStudy) => ({
    slug: caseStudy.slug,
  }));
}

export default async function CaseStudy({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const caseStudy = caseStudies.find((c) => c.slug === slug);

  if (!caseStudy) {
    notFound();
  }

  return (
    <article className="flex flex-col flex-1 font-sans mt-10 max-w-3xl mx-auto w-full px-4 pb-20">
      <Link href="/projects" className="text-sm text-gray-400 hover:text-orange-100 transition-colors mb-8 inline-flex items-center group">
        <span className="mr-2 group-hover:-translate-x-1 transition-transform">←</span> Back to Projects
      </Link>
      
      <header className="mb-10 text-center">
        <h1 className="scroll-m-20 text-4xl font-bold text-orange-100 tracking-tight text-balance font-serif mb-4">
          {caseStudy.title}
        </h1>
        <div className="text-gray-400 text-sm flex items-center justify-center space-x-4">
          <time dateTime={caseStudy.date}>
            {new Date(caseStudy.date).toLocaleDateString("en-US", {
              month: "short",
              day: "2-digit",
              year: "numeric",
            })}
          </time>
          <span>•</span>
          <span>{caseStudy.readingTime} min read</span>
          <span>•</span>
          <span>Case Study</span>
        </div>
      </header>
      
      <hr className="w-full border-t border-white/10 mb-10" />

      <div className="prose prose-invert max-w-none text-gray-300">
        <MDXContent code={caseStudy.content} />
      </div>
    </article>
  );
}
