import Link from "next/link";

const LINKS = [
  { href: "/features", label: "Features" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
  { href: "/login", label: "Sign in" },
  { href: "/signup", label: "Sign up" },
];

export default function Footer({ className = "" }: { className?: string }) {
  return (
    <footer className={`border-t px-6 py-8 text-sm text-gray-400 ${className}`}>
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3 text-center">
        <Link href="/" className="font-bold text-blue-600 hover:text-blue-700">
          Zebboy
        </Link>
        <p>© {new Date().getFullYear()} Zebboy. All rights reserved.</p>
        <div className="flex flex-wrap justify-center gap-4">
          {LINKS.map(({ href, label }) => (
            <Link key={href} href={href} className="hover:text-gray-600">
              {label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
