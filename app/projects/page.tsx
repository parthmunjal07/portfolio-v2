import ProjectCard from "@/components/ProjectCard";

const page = () => {
  return (
    <div className="flex flex-col flex-1 font-sans mt-10 max-w-3xl mx-auto w-full px-4 pb-20">
      <h1 className="scroll-m-20 text-center text-4xl font-bold text-orange-100 tracking-tight text-balance font-serif">
        Projects
      </h1>

      <div className="text-center">
        <p className="text-lg mt-3 text-gray-400 font-serif">
          Stuff I've built and been working on
        </p>
      </div>

      <hr className="w-24 mx-auto border-t border-white/20 mt-6 mb-10" />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
        <ProjectCard 
          title="Portfolio v2"
          subheading="A personal portfolio website built with Next.js, Tailwind CSS, and a glassmorphism design."
          readMoreLink="#"
          githubLink="#"
          liveLink="#"
        />
        <ProjectCard 
          title="Swift Polls"
          subheading="A fully featured fullstack web application to solve real world problems."
          readMoreLink="#"
          githubLink="#"
          liveLink="#"
        />
      </div>
    </div>
  )
}

export default page
