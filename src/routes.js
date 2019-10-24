import React from 'react';

const DashboardAdmin = React.lazy(() => import('./views/Dashboard/DashBoardAdmin'));
const HostsListagem = React.lazy(() => import('./views/Hosts/Listagem/HostsListagem'));

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/admin/dashboard', name: 'Dashboard Admin', component: DashboardAdmin },
  { path: '/admin/hosts/listagem', name: 'Lista de Hosts', component: HostsListagem },
];

export default routes;
