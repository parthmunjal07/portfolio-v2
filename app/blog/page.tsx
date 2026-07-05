import BlogCard from "@/components/BlogCard";
import { posts } from "../../.velite";

export default function BlogPage() {
  const displayPosts = posts
    .filter((post) => !post.draft)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className="flex flex-col flex-1 font-sans mt-10 max-w-3xl mx-auto w-full pb-20">
      <h1 className="scroll-m-20 text-center text-4xl font-bold text-orange-100 tracking-tight text-balance font-serif">
        Blog
      </h1>

      <div className="text-center">
        <p className="text-lg mt-3 text-gray-400 font-serif">
          Thoughts, learnings, and technical deep dives
        </p>
      </div>

      <hr className="w-full max-w-md mx-auto border-t border-white/20 mt-6 mb-10" />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
        {displayPosts.map((post) => (
          <BlogCard 
            key={post.slug}
            title={post.title}
            excerpt={post.excerpt}
            date={new Date(post.date).toLocaleDateString("en-US", {
              month: "short",
              day: "2-digit",
              year: "numeric",
            })}
            readingTime={post.readingTime}
            readMoreLink={post.permalink}
          />
        ))}
      </div>
    </div>
  )
}
