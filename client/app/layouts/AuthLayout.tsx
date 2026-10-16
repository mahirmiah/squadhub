import { Link, Outlet, redirect } from 'react-router';
import type { Route } from './+types/auth-layout';

export async function loader({ request }: Route.LoaderArgs) {
  const apiUrl = 'http://localhost:3000';

  const response = await fetch(`${apiUrl}/auth/me`, {
    headers: {
      Cookie: request.headers.get('Cookie') ?? '',
    },
  });

  // Already authenticated: leave the auth pages.
  if (response.ok) {
    return redirect('/');
  }

  // Not authenticated: allow login/register to render.
  if (response.status === 401) {
    return null;
  }

  // Don't silently treat API failures as logged-out users.
  throw new Response('Unable to verify your session.', {
    status: 503,
  });
}

export default function AuthLayout() {
  return (
    <main className="auth-layout">
      {/* Background overlays */}
      <div className="auth-background-overlay" aria-hidden="true" />
      <div className="auth-background-gradient" aria-hidden="true" />

      {/* Authentication container */}
      <div className="auth-container">
        {/* Branding */}
        <Link to="/" className="auth-brand" aria-label="SquadHub Home">
          <img src="/images/squadhub-logo.png" alt="" className="auth-logo" />

          <h1 className="auth-brand-title">
            Squad<span>Hub</span>
          </h1>
        </Link>

        {/* Authentication form */}
        <section className="auth-card">
          <Outlet />
        </section>

        {/* Footer */}
        <p className="auth-footer">BUILT FOR THE BEAUTIFUL GAME</p>
      </div>
    </main>
  );
}
