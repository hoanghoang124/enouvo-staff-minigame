declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}
export const ROUTES: RouteInfo[] = [
  {
    path: '/dashboard',
    title: 'Dashboard',
    icon: 'ni-tv-2 text-primary',
    class: ''
  },
  {
    path: '/tables',
    title: 'Admin',
    icon: 'ni ni-collection text-primary',
    class: ''
  }
];
