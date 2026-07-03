import Link from 'next/link';
import { notFound } from 'next/navigation';
import { posts } from '../../../.velite';
import { MDXContent } from '@/components/mdx-components';

export async function generateStaticParams() {
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="flex flex-col flex-1 font-sans mt-10 max-w-3xl mx-auto w-full px-4 pb-20">
      <Link href="/blog" className="text-sm text-gray-400 hover:text-orange-100 transition-colors mb-8 inline-flex items-center group">
        <span className="mr-2 group-hover:-translate-x-1 transition-transform">←</span> Back to Blog
      </Link>
      
      <header className="mb-10 text-center">
        <h1 className="scroll-m-20 text-4xl font-bold text-orange-100 tracking-tight text-balance font-serif mb-4">
          {post.title}
        </h1>
        <div className="text-gray-400 text-sm flex items-center justify-center space-x-4">
          <time dateTime={post.date}>
            {new Date(post.date).toLocaleDateString("en-US", {
              month: "short",
              day: "2-digit",
              year: "numeric",
            })}
          </time>
          <span>•</span>
          <span>{post.tags.join(', ')}</span>
        </div>
      </header>
      
      <hr className="w-full border-t border-white/10 mb-10" />

      <div className="prose prose-invert max-w-none text-gray-300">
        <MDXContent code={post.content} />
      </div>
    </article>
  );
}
