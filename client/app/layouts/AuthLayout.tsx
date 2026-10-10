import { Link, Outlet } from "react-router";

export default function AuthLayout() {
  return (
    <main
      className="
        relative flex min-h-screen
        items-center justify-center
        overflow-hidden bg-[#101820]
        bg-cover bg-center bg-no-repeat
        px-6 py-4 text-white
      "
      style={{
        backgroundImage: "url('/images/stadium-bg.png')",
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/35" />

      {/* Cinematic gradient */}
      <div
        className="
          absolute inset-0
          bg-gradient-to-b
          from-[#07111d]/35
          via-transparent
          to-black/40
        "
      />

      <div
        className="
          relative z-10 flex w-full
          max-w-[440px] flex-col
          items-center
        "
      >
        {/* Branding */}
        <Link to="/" className="mb-5 text-center">
          <div className="flex flex-col items-center gap-1">
            <img
              src="/images/squadhub-logo.png"
              alt="SquadHub Logo"
              className="h-16 w-16 object-contain"
            />

            <h1 className="font-brand text-3xl font-bold tracking-tight">
              <span className="text-white">Squad</span>
              <span className="text-emerald-400">Hub</span>
            </h1>
          </div>
        </Link>

        {/* Authentication card */}
        <div
          className="
            w-full rounded-2xl
            border border-white/20
            bg-[#111511]/80
            px-8 py-6
            shadow-2xl shadow-black/40
            backdrop-blur-xl
          "
        >
          <Outlet />
        </div>
      </div>
    </main>
  );
}
