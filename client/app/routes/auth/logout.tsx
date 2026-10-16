import type { Route } from './+types/logout';
import { redirect } from 'react-router';

export async function action({ request }: Route.ActionArgs) {
  //   const apiUrl = import.meta.env.VITE_API_URL;
  const apiUrl = 'http://localhost:3000';

  const response = await fetch(`${apiUrl}/auth/logout`, {
    method: 'POST',
    headers: {
      cookie: request.headers.get('Cookie') ?? '',
    },
  });

  if (!response.ok) {
    throw new Response('Logout failed', {
      status: response.status,
    });
  }

  const headers = new Headers();
  const setCookie = response.headers.get('set-cookie');

  if (setCookie) {
    headers.append('Set-Cookie', setCookie);
  }

  return redirect('/login', { headers });
}

export default function Logout() {
  return null;
}
