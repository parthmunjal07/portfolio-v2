import * as runtime from "react/jsx-runtime";
import { HTMLAttributes } from "react";
import Image from "next/image";
import Link from "next/link";

const useMDXComponent = (code: string) => {
  const fn = new Function(code);
  return fn({ ...runtime }).default;
};

const components = {
  h1: (props: HTMLAttributes<HTMLHeadingElement>) => (
    <h1
      className="mt-8 mb-4 font-serif text-3xl font-bold text-orange-100 tracking-tight"
      {...props}
    />
  ),
  h2: (props: HTMLAttributes<HTMLHeadingElement>) => (
    <h2
      className="mt-10 mb-4 font-serif text-2xl font-bold text-orange-50 tracking-tight"
      {...props}
    />
  ),
  h3: (props: HTMLAttributes<HTMLHeadingElement>) => (
    <h3
      className="mt-8 mb-4 font-serif text-xl font-bold text-orange-50 tracking-tight"
      {...props}
    />
  ),
  p: (props: HTMLAttributes<HTMLParagraphElement>) => (
    <p className="mb-6 text-gray-300 leading-relaxed font-serif" {...props} />
  ),
  ul: (props: HTMLAttributes<HTMLUListElement>) => (
    <ul
      className="list-disc list-outside space-y-3 mb-6 ml-8 text-gray-300 font-serif"
      {...props}
    />
  ),
  ol: (props: HTMLAttributes<HTMLOListElement>) => (
    <ol
      className="list-decimal list-outside space-y-3 mb-6 ml-8 text-gray-300 font-serif"
      {...props}
    />
  ),
  li: (props: HTMLAttributes<HTMLLIElement>) => (
    <li className="text-gray-300 [&>p]:m-0" {...props} />
  ),
  blockquote: (props: HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote
      className="border-l-4 border-orange-100/40 pl-4 italic text-gray-400 my-6 bg-white/5 p-4 rounded-r-lg font-serif"
      {...props}
    />
  ),
  pre: (props: HTMLAttributes<HTMLPreElement>) => (
    <pre
      className="bg-black/50 p-6 rounded-xl border border-white/10 font-mono text-sm text-gray-300 my-8 overflow-x-auto"
      {...props}
    />
  ),
  code: (props: HTMLAttributes<HTMLElement>) => (
    <code
      className="bg-black/30 rounded px-1.5 py-0.5 font-mono text-sm text-orange-200"
      {...props}
    />
  ),
  a: (props: any) => {
    const href = props.href;
    if (href?.startsWith("/")) {
      return (
        <Link
          href={href}
          {...props}
          className="text-orange-400 hover:text-orange-300 underline underline-offset-4"
        >
          {props.children}
        </Link>
      );
    }
    return (
      <a
        target="_blank"
        rel="noopener noreferrer"
        {...props}
        className="text-orange-400 hover:text-orange-300 underline underline-offset-4"
      />
    );
  },
  img: (props: any) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      className="rounded-xl border border-white/10 my-8 shadow-lg max-w-full h-auto mx-auto"
      {...props}
      alt={props.alt || ""}
    />
  ),
};

interface MDXProps {
  code: string;
  components?: Record<string, React.ComponentType>;
}

export function MDXContent({ code, components: customComponents }: MDXProps) {
  const Component = useMDXComponent(code);
  return <Component components={{ ...components, ...customComponents }} />;
}
