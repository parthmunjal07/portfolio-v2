import BlogCard from "@/components/BlogCard";

const page = () => {
  return (
    <div className="flex flex-col flex-1 font-sans mt-10 max-w-3xl mx-auto w-full px-4 pb-20">
      <h1 className="scroll-m-20 text-center text-4xl font-bold text-orange-100 tracking-tight text-balance font-serif">
        Blog
      </h1>

      <div className="text-center">
        <p className="text-lg mt-3 text-gray-400 font-serif">
          Thoughts, learnings, and technical deep dives
        </p>
      </div>

      <hr className="w-24 mx-auto border-t border-white/20 mt-6 mb-10" />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
        <BlogCard 
          title="The Future of Web Development"
          excerpt="Exploring how AI, edge computing, and new frameworks are shaping the next generation of web applications."
          date="Oct 24, 2026"
          readMoreLink="#"
        />
        <BlogCard 
          title="Mastering React Server Components"
          excerpt="A deep dive into how Server Components work under the hood and when to use them over Client Components."
          date="Sep 12, 2026"
          readMoreLink="#"
        />
        <BlogCard 
          title="Why Glassmorphism is Back"
          excerpt="An analysis of the design trends that are bringing translucent, frosted UI elements back into mainstream web design."
          date="Aug 05, 2026"
          readMoreLink="#"
        />
      </div>
    </div>
  )
}

export default page
