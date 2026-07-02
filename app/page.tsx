import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 font-sans mt-10 max-w-3xl mx-auto w-full">
      <h1 className="scroll-m-20 text-center text-4xl font-bold text-orange-100 tracking-tight text-balance font-serif">
        Yo, I'm Parth Munjal
      </h1>


      <div className="text-center">
        <p className="text-lg my-3 text-gray-400 font-serif">
          18 • curious • building fullstack apps
        </p>
      </div>
      <hr className="w-100 mx-auto border-t border-white/20 mt-2 mb-4" />
        <div className="text-center">
          <p className="text-xl my-3 text-gray-400 font-serif">
            I ship softwares for the web, solving real world usecases at scale. You can find my work at the <a className="text-orange-100 hover:text-white hover:cursor-pointer" href="/projects">Projects</a> section of this site.
          </p>
        </div>




    </div>
  );
}
