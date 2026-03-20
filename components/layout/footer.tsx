"use client";

import Link from "next/link";
import { FOOTER_LINKS, BIBLE_VERSE } from "@/lib/constants";
import { ArrowRight } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative bg-slate-900 text-white">
      {/* Wave separator */}
      <div className="absolute -top-[48px] lg:-top-[56px] left-0 right-0 overflow-hidden leading-[0] pointer-events-none" aria-hidden="true">
        <svg viewBox="0 0 1440 54" fill="none" preserveAspectRatio="none" className="w-full h-12 lg:h-14">
          <path d="M0 22C240 44 480 0 720 22C960 44 1200 0 1440 22V54H0V22Z" fill="#0f172a" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12 lg:pt-20 lg:pb-16">
        {/* Top section: Logo + Newsletter */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 mb-16 lg:mb-20">
          {/* Logo & tagline */}
          <div>
            <Link href="/" className="inline-flex items-center gap-2.5 mb-5">
              <svg viewBox="0 0 32 32" fill="none" className="w-8 h-8">
                <rect width="32" height="32" rx="8" fill="#6366F1" />
                <path
                  d="M13 3h6v6h7v6h-7v14h-6V15H6V9h7V3z"
                  fill="white"
                  opacity="0.95"
                />
              </svg>
              <span className="text-lg font-semibold tracking-tight">
                <span className="text-white">Ecclesia</span>
                <span className="text-indigo-400">Flow</span>
              </span>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed max-w-sm mb-6">
              La plateforme moderne de gestion d&apos;église qui simplifie
              votre administration et connecte votre communauté.
            </p>

            {/* Bible verse */}
            <blockquote className="border-l-2 border-amber-500/40 pl-4 py-1">
              <p className="text-slate-300 text-sm italic leading-relaxed">
                &laquo;&nbsp;{BIBLE_VERSE.text}&nbsp;&raquo;
              </p>
              <cite className="text-amber-500/80 text-xs font-medium not-italic mt-1 block">
                {BIBLE_VERSE.reference}
              </cite>
            </blockquote>
          </div>

          {/* Newsletter */}
          <div className="lg:pt-2">
            <h3 className="text-sm font-semibold text-white mb-2">
              Restez informé
            </h3>
            <p className="text-slate-400 text-sm mb-4">
              Recevez nos actualités, guides et conseils pour votre église.
            </p>
            <form
              className="flex flex-col sm:flex-row gap-2"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="email"
                placeholder="votre@email.com"
                className="flex-1 bg-slate-800 border border-slate-700 rounded px-4 py-2.5 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500/40 transition-colors"
              />
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-1.5 bg-indigo-500 hover:bg-indigo-600 text-white px-5 py-2.5 rounded text-sm font-medium transition-colors cursor-pointer"
              >
                S&apos;abonner
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </form>
            <p className="text-slate-500 text-xs mt-2">
              Pas de spam. Désabonnement en un clic.
            </p>
          </div>
        </div>

        {/* Links grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16 lg:mb-20">
          {Object.entries(FOOTER_LINKS).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-sm font-semibold text-white mb-4">
                {category}
              </h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-slate-400 hover:text-white transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Separator */}
        <div className="border-t border-slate-800 pt-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Copyright */}
            <p className="text-slate-500 text-xs">
              &copy; {new Date().getFullYear()} EcclesiaFlow. Tous droits
              réservés.
            </p>

            {/* Social icons */}
            <div className="flex items-center gap-4">
              {[
                {
                  label: "Twitter",
                  path: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z",
                },
                {
                  label: "GitHub",
                  path: "M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z",
                },
                {
                  label: "LinkedIn",
                  path: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
                },
              ].map((social) => (
                <a
                  key={social.label}
                  href="#"
                  className="text-slate-500 hover:text-white transition-colors"
                  aria-label={social.label}
                >
                  <svg
                    className="h-4.5 w-4.5"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d={social.path} />
                  </svg>
                </a>
              ))}
            </div>

            {/* Language */}
            <div className="flex items-center gap-2 text-slate-500 text-xs">
              <svg
                className="h-3.5 w-3.5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="2" y1="12" x2="22" y2="12" />
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
              </svg>
              Français
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
