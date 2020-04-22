declare interface RouteInfo {
  path: string;
  title: string;
}
export const ROUTES: RouteInfo[] = [
  {
    path: '/dashboard',
    title: 'Dashboard'
  },
  {
    path: '/tables',
    title: 'Employees'
  },
  {
    path: '/campaign',
    title: 'Campaigns'
  }
];
