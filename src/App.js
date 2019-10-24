import React from 'react';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';
import './App.scss';

import { usuarioAutenticado } from "./services/auth";

const loading = () => <div className="animated fadeIn pt-3 text-center">Loading...</div>;

// Containers
const DefaultLayout = React.lazy(() => import('./containers/DefaultLayout/DefaultLayout'));

// Pages
const Login = React.lazy(() => import('./views/Conta/Login'));
const Page404 = React.lazy(() => import('./views/Conta/Page404'));
const Page500 = React.lazy(() => import('./views/Conta/Page500'));
const EsqueciSenha = React.lazy(() => import('./views/Conta/EsqueciSenha'));


//Verifica se o usuário esta logado e se o role é do tipo Admin
const PermissaoAdmin = ({ component: Component }) => (
  <Route
    render={props =>
      usuarioAutenticado() ? (
        <Component {...props} />
      ) : (
          <Redirect to={{ pathname: "/login" }} />
        )
    }
  />

);

function App() {
  return (
    <HashRouter>
      <React.Suspense fallback={loading()}>
        <Switch>
          <Route exact path="/" name="Login Page" render={props => <Login {...props} />} />
          <Route exact path="/esquecisenha" name="Esqueci senha" render={props => <EsqueciSenha {...props} />} />
          <Route exact path="/404" name="Page 404" render={props => <Page404 {...props} />} />
          <Route exact path="/500" name="Page 500" render={props => <Page500 {...props} />} />
          <PermissaoAdmin path="/admin" name="Home" component={DefaultLayout} render={props => <DefaultLayout {...props} />} />
        </Switch>
      </React.Suspense>
    </HashRouter>
  );
}

export default App;
