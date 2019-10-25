import React from 'react';

const Login = React.lazy(() => import('./views/Conta/Login'));
const DashboardAdmin = React.lazy(() => import('./views/Dashboard/DashBoardAdmin'));
const HostsListagem = React.lazy(() => import('./views/Hosts/Listagem/HostsListagem'));
const ValueMapListagem = React.lazy(() => import('./views/ValueMap/Listagem/ValueMapListagem'));
const HostGroupListagem = React.lazy(() => import('./views/HostGroup/Listagem/HostGroupListagem'));
const ServicesListagem = React.lazy(() => import('./views/Service/Listagem/ServicesListagem'));


const routes = [
  { path: '/', exact: true, name: 'Login' },
  { path: '/admin/dashboard', name: 'Dashboard Admin', component: DashboardAdmin },
  { path: '/admin/hosts/listagem', name: 'Lista de Hosts', component: HostsListagem },
  { path: '/admin/valuemap/listagem', name: 'Lista de ValueMap', component: ValueMapListagem },
  { path: '/admin/hostgroup/listagem', name: 'Lista de HostGroup', component: HostGroupListagem },
  { path: '/admin/services/listagem', name: 'Lista de Services', component: ServicesListagem },
  { path: '/login', name: 'Login', component: Login },
];

export default routes;
