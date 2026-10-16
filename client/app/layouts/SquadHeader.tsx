import { useEffect, useRef, useState } from 'react';
import { Form, Link, useLocation } from 'react-router';
import {
  CalendarDays,
  CircleUserRound,
  Film,
  House,
  LogOut,
  Menu,
  MessageSquare,
  Shield,
  Shuffle,
  X,
} from 'lucide-react';

const menuItems = [
  { label: 'Dashboard', href: '/', icon: House },
  { label: 'Generate Teams', href: '/generate', icon: Shuffle },
  { label: 'Video Highlights', href: null, icon: Film },
  { label: 'Account', href: null, icon: CircleUserRound },
  { label: 'Messages', href: null, icon: MessageSquare },
  { label: 'Logout', href: '/logout', icon: LogOut },
];

export default function SquadHeader() {
  const [open, setOpen] = useState(false);
  const [logoError, setLogoError] = useState(false);
  const [date, setDate] = useState('');
  const menuRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  useEffect(() => {
    setDate(
      new Date().toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      })
    );
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    function handlePointerDown(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setOpen(false);
      }
    }

    document.addEventListener('mousedown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <header className="relative z-50 h-20 border-b border-white/[0.08] bg-[#101A29]/95 backdrop-blur-xl">
      <div className="relative flex h-full items-center justify-between px-4 sm:px-6 lg:px-10">
        <div ref={menuRef} className="relative z-20">
          <button
            type="button"
            onClick={() => setOpen((previous) => !previous)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="squadhub-menu"
            className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-slate-200 transition hover:bg-white/10 hover:text-white"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>

          {open && (
            <nav
              id="squadhub-menu"
              aria-label="Main navigation"
              className="absolute left-0 top-14 w-64 rounded-2xl border border-white/10 bg-[#152236] p-2 shadow-2xl shadow-black/50"
            >
              {menuItems.map((item) => {
                const Icon = item.icon;
                const active = item.href !== null && location.pathname === item.href;

                const className = `
                  flex w-full items-center gap-3 rounded-xl
                  px-4 py-3 text-left text-sm font-semibold
                  transition-colors
                  ${
                    active
                      ? 'bg-sky-400/10 text-sky-200'
                      : 'text-slate-200 hover:bg-white/[0.07] hover:text-white'
                  }
                `;

                const content = (
                  <>
                    <Icon size={18} className="shrink-0" />
                    <span className="flex-1">{item.label}</span>
                    {!item.href && (
                      <span className="text-[10px] font-normal text-slate-500">Soon</span>
                    )}
                  </>
                );

                if (item.label === 'Logout') {
                  return (
                    <Form key={item.label} method="post" action="/logout">
                      <button type="submit" className={className}>
                        {content}
                      </button>
                    </Form>
                  );
                }

                return item.href ? (
                  <Link
                    key={item.label}
                    to={item.href}
                    aria-current={active ? 'page' : undefined}
                    className={className}
                    onClick={() => setOpen(false)}
                  >
                    {content}
                  </Link>
                ) : (
                  <div
                    key={item.label}
                    aria-disabled="true"
                    className={`${className} cursor-not-allowed opacity-60`}
                    title="Coming soon"
                  >
                    {content}
                  </div>
                );
              })}
            </nav>
          )}
        </div>

        <Link to="/" className="absolute left-1/2 flex -translate-x-1/2 items-center gap-3">
          {!logoError ? (
            <img
              src="images/squadhub-logo.png"
              alt="SquadHub logo"
              className="h-11 w-11 object-contain"
              onError={() => setLogoError(true)}
            />
          ) : (
            <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-sky-300/30 bg-sky-300/10">
              <Shield size={26} className="text-sky-200" />
            </div>
          )}

          <span className="hidden bg-gradient-to-r from-white via-slate-200 to-sky-300 bg-clip-text text-xl font-black tracking-[0.16em] text-transparent sm:block">
            SquadHUB
          </span>
        </Link>

        <div className="relative z-10 hidden items-center gap-2 text-xs font-medium text-slate-400 md:flex">
          <CalendarDays size={15} />
          <span>{date}</span>
        </div>

        <div className="w-11 md:hidden" />
      </div>
    </header>
  );
}
