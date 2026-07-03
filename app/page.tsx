import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 font-sans mt-10 max-w-3xl mx-auto w-full items-center px-4">
      <h1 className="scroll-m-20 text-center text-4xl font-bold text-orange-100 tracking-tight text-balance font-serif">
        Yo, I'm Parth Munjal
      </h1>


      <div className="text-center">
        <p className="text-lg my-3 text-gray-400 font-serif">
          18 • curious • building fullstack apps
        </p>
      </div>

      <div className="flex gap-5 my-2 items-center justify-center">
        {/* X (Twitter) */}
        <a href="https://x.com/parthmunjal07" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white hover:scale-110 transition-all">
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" /></svg>
        </a>
        {/* LinkedIn */}
        <a href="https://linkedin.com/in/parthmunjal07" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white hover:scale-110 transition-all">
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
        </a>
        {/* Instagram */}
        <a href="https://www.instagram.com/parth.codes.exe/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white hover:scale-110 transition-all">
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg>
        </a>
        {/* YouTube */}
        <a href="https://youtube.com/@parthmunjal07" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white hover:scale-110 transition-all">
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" /></svg>
        </a>
        {/* Email */}
        <a href="mailto:parth.munjal07@gmail.com" className="text-gray-400 hover:text-white hover:scale-110 transition-all">
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M0 3v18h24v-18h-24zm6.623 7.929l-4.623 5.712v-9.458l4.623 3.746zm-4.141-5.929h19.035l-9.517 7.713-9.518-7.713zm5.694 7.188l3.824 3.099 3.83-3.104 5.612 6.817h-18.779l5.513-6.812zm9.208-1.264l4.616-3.741v9.348l-4.616-5.607z" /></svg>
        </a>
      </div><hr className="w-100 mx-auto border-t border-white/20 mt-2 mb-4" />
      <div className="max-w-2xl mx-auto flex flex-col items-center">
        <div className="text-xl my-3 text-gray-400 font-serif leading-relaxed [word-spacing:3px]">
          I ship fullstack softwares for the web, solving real world usecases at scale. On the fun side, I like to pick up existing ideas and refining them my taste.

          <p className="text-xl my-3 text-gray-400 font-serif leading-relaxed [word-spacing:3px]">
            You can find these works at the <a className="text-orange-100 hover:text-white hover:cursor-pointer transition-colors" href="/projects">Projects</a> section of this website.
          </p>
          <p className="text-xl my-3 text-gray-400 font-serif leading-relaxed [word-spacing:3px]">
            I write on the topics which I find interesting and engaging, as well as case studies on the projects I have made. You can find them on the  <a className="text-orange-100 hover:text-white hover:cursor-pointer transition-colors" href="/blog">Blogs</a> section of this website.
          </p>
          <p className="text-xl my-3 text-gray-400 font-serif leading-relaxed [word-spacing:3px]">
            I also make videos sharing my journey and also explaining topics that I myself learn. You can find them on my <a className="text-orange-100 hover:text-white hover:cursor-pointer transition-colors" href="https://instagram.com/parth.codes.exe/">Instagram</a> and <a className="text-orange-100 hover:text-white hover:cursor-pointer transition-colors" href="https://youtube.com/@parthmunjal07">Youtube</a> channel.
          </p>
        </div>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-4 my-2">
        <span className="px-3 py-1.5 text-sm font-mono text-orange-200 bg-orange-950/40 border border-orange-900/50 rounded-md">
          ts
        </span>
        <span className="text-gray-600">•</span>
        <span className="px-3 py-1.5 text-sm font-mono text-orange-200 bg-orange-950/40 border border-orange-900/50 rounded-md">
          react.js
        </span>
        <span className="text-gray-600">•</span>
        <span className="px-3 py-1.5 text-sm font-mono text-orange-200 bg-orange-950/40 border border-orange-900/50 rounded-md">
          next.js
        </span>
        <span className="text-gray-600">•</span>
        <span className="px-3 py-1.5 text-sm font-mono text-orange-200 bg-orange-950/40 border border-orange-900/50 rounded-md">
          node.js
        </span>
        <span className="text-gray-600">•</span>
        <span className="px-3 py-1.5 text-sm font-mono text-orange-200 bg-orange-950/40 border border-orange-900/50 rounded-md">
          express
        </span>
      </div>

    </div>
  );
}
