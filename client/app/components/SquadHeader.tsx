import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router';

export default function SquadHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const location = useLocation();
  const isGeneratePage = location.pathname === '/generate';

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header className="relative z-50 border-b border-white/[0.08] bg-[#070b12]">
      <div className="relative mx-auto flex max-w-[1600px] items-center justify-between px-6 py-5 lg:px-10">
        {/* LEFT - MENU */}
        <div ref={menuRef} className="relative z-20">
          <button
            type="button"
            onClick={() => setMenuOpen((current) => !current)}
            aria-label="Open menu"
            aria-expanded={menuOpen}
            className="
              flex h-11 w-11 items-center justify-center
              rounded-xl border border-white/[0.08]
              bg-white/[0.03] text-slate-300
              transition-all duration-200
              hover:border-white/[0.15]
              hover:bg-white/[0.07]
              hover:text-white
            "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-5 w-5"
            >
              <path d="M4 6h16" />
              <path d="M4 12h16" />
              <path d="M4 18h16" />
            </svg>
          </button>

          {/* DROPDOWN */}
          {menuOpen && (
            <div
              className="
                absolute left-0 top-14
                w-56 overflow-hidden rounded-2xl
                border border-white/[0.08]
                bg-[#10151d]
                p-2
                shadow-2xl
              "
            >
              <Link
                to="/account"
                onClick={() => setMenuOpen(false)}
                className="
                  flex items-center gap-3 rounded-xl
                  px-3 py-3
                  text-sm font-bold text-slate-300
                  transition
                  hover:bg-white/[0.06]
                  hover:text-white
                "
              >
                <div
                  className="
                    flex h-9 w-9 items-center justify-center
                    rounded-lg bg-white/[0.05]
                  "
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4"
                  >
                    <circle cx="12" cy="8" r="4" />
                    <path d="M4 21a8 8 0 0 1 16 0" />
                  </svg>
                </div>
                Account
              </Link>

              <Link
                to="/requests"
                onClick={() => setMenuOpen(false)}
                className="
                  flex items-center gap-3 rounded-xl
                  px-3 py-3
                  text-sm font-bold text-slate-300
                  transition
                  hover:bg-white/[0.06]
                  hover:text-white
                "
              >
                <div
                  className="
                    flex h-9 w-9 items-center justify-center
                    rounded-lg bg-white/[0.05]
                  "
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4"
                  >
                    <path d="M8 2v4" />
                    <path d="M16 2v4" />
                    <rect width="18" height="18" x="3" y="4" rx="2" />
                    <path d="M3 10h18" />
                    <path d="m9 16 2 2 4-4" />
                  </svg>
                </div>
                Requests
              </Link>
            </div>
          )}
        </div>

        {/* CENTER - BRAND */}
        <Link
          to="/"
          className="
            absolute left-1/2 top-1/2
            flex -translate-x-1/2 -translate-y-1/2
            items-center gap-3
          "
        >
          <div
            className="
              flex h-11 w-11 items-center justify-center
              rounded-xl bg-emerald-400
              text-lg font-black text-emerald-950
              shadow-[0_0_25px_rgba(52,211,153,0.20)]
              transition-transform
              hover:scale-105
            "
          >
            S
          </div>

          <h1 className="hidden text-xl font-black tracking-tight sm:block">SquadHub</h1>
        </Link>

        {/* RIGHT - PAGE NAVIGATION */}
        <Link
          to={isGeneratePage ? '/' : '/generate'}
          className="
            group relative z-20
            ml-auto flex items-center gap-2.5
            overflow-hidden rounded-xl
            bg-emerald-400 px-5 py-3
            text-sm font-black text-emerald-950
            shadow-[0_0_20px_rgba(52,211,153,0.18)]
            transition-all duration-300
            hover:-translate-y-0.5
            hover:bg-emerald-300
            hover:shadow-[0_0_30px_rgba(52,211,153,0.35)]
          "
        >
          {/* LIGHT SWEEP */}
          <span
            className="
              pointer-events-none
              absolute -left-full top-0
              h-full w-1/2
              skew-x-[-20deg]
              bg-gradient-to-r
              from-transparent via-white/40 to-transparent
              transition-all duration-700
              group-hover:left-[140%]
            "
          />

          {isGeneratePage ? (
            <>
              {/* BACK / ROSTER ICON */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="
                  relative z-10 h-4 w-4
                  transition-transform duration-300
                  group-hover:-translate-x-0.5
                "
              >
                <path d="M19 12H5" />
                <path d="m12 19-7-7 7-7" />
              </svg>

              <span className="relative z-10 hidden sm:inline">Back</span>

              <span className="relative z-10 sm:hidden">Roster</span>
            </>
          ) : (
            <>
              {/* SHUFFLE ICON */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="
                  relative z-10 h-4 w-4
                  transition-transform duration-300
                  group-hover:rotate-12
                "
              >
                <path d="m18 14 4 4-4 4" />
                <path d="m18 2 4 4-4 4" />
                <path d="M2 18h1.5a6 6 0 0 0 5-2.7L15.5 4.7A6 6 0 0 1 20.5 2H22" />
                <path d="M2 6h1.5a6 6 0 0 1 5 2.7l1.2 1.8" />
                <path d="M14.5 15.3l1 1.5a6 6 0 0 0 5 2.7H22" />
              </svg>

              <span className="relative z-10 hidden sm:inline">Generate Teams</span>

              <span className="relative z-10 sm:hidden">Generate</span>
            </>
          )}
        </Link>
      </div>
    </header>
  );
}
