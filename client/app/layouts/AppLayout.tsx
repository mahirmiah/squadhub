import { Outlet, redirect } from 'react-router';
import type { Route } from './+types/app-layout';
import SquadHeader from '~/layouts/SquadHeader';

export async function loader({ request }: Route.LoaderArgs) {
  const apiUrl = 'http://localhost:3000';

  const response = await fetch(`${apiUrl}/auth/me`, {
    headers: {
      Cookie: request.headers.get('Cookie') ?? '',
    },
  });

  // Authenticated: allow access to protected routes.
  if (response.ok) {
    return null;
  }

  // Unauthenticated: redirect to login.
  if (response.status === 401) {
    return redirect('/login');
  }

  // API failure: don't mistake it for an unauthenticated session.
  throw new Response('Unable to verify your session.', {
    status: 503,
  });
}

export default function AppLayout() {
  return (
    <div className="min-h-screen bg-[#090F19] text-white">
      <SquadHeader />

      <main className="min-h-[calc(100vh-80px)]">
        <Outlet />
      </main>
    </div>
  );
}
