import { type RouteConfig, index, layout, route } from '@react-router/dev/routes';

export default [
  layout('layouts/app-layout.tsx', [
    index('routes/app/home.tsx'),
    route('generate', 'routes/app/generate.tsx'),
  ]),

  layout('layouts/auth-layout.tsx', [
    route('login', 'routes/auth/login.tsx'),
    route('register', 'routes/auth/register.tsx'),
  ]),
] satisfies RouteConfig;
