"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="border-b bg-white max-w-6xl mx-auto px-6 py-4">
      <div className="flex items-center justify-between">
        <span className="text-xl font-bold text-blue-600">Zebboy</span>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-4">
          <a href="#features" className="text-sm text-gray-600 hover:text-gray-900">Features</a>
          <a href="#how-it-works" className="text-sm text-gray-600 hover:text-gray-900">How it works</a>
          <a href="#pricing" className="text-sm text-gray-600 hover:text-gray-900">Pricing</a>
          <Link href="/login" className="text-sm text-gray-600 hover:text-gray-900">Sign in</Link>
          <Link
            href="/signup"
            className="bg-blue-600 text-white text-sm px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition"
          >
            Get started free
          </Link>
        </div>

        {/* Mobile: CTA + hamburger */}
        <div className="flex md:hidden items-center gap-3">
          <Link
            href="/signup"
            className="bg-blue-600 text-white text-sm px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition"
          >
            Get started free
          </Link>
          <button
            onClick={() => setOpen(!open)}
            className="p-2 text-gray-600 hover:text-gray-900"
            aria-label="Toggle menu"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {open && (
        <div className="md:hidden mt-3 pb-2 flex flex-col gap-1 border-t pt-3">
          <a
            href="#features"
            onClick={() => setOpen(false)}
            className="text-sm text-gray-600 hover:text-gray-900 py-2"
          >
            Features
          </a>
          <a
            href="#how-it-works"
            onClick={() => setOpen(false)}
            className="text-sm text-gray-600 hover:text-gray-900 py-2"
          >
            How it works
          </a>
          <a
            href="#pricing"
            onClick={() => setOpen(false)}
            className="text-sm text-gray-600 hover:text-gray-900 py-2"
          >
            Pricing
          </a>
          <Link
            href="/login"
            onClick={() => setOpen(false)}
            className="text-sm text-gray-600 hover:text-gray-900 py-2"
          >
            Sign in
          </Link>
        </div>
      )}
    </nav>
  );
}
