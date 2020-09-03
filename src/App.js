import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { createBrowserHistory } from "history";
import AdminLayout from "layouts/Admin.js";
import LogIn from "views/Auth/LogIn.js";
import CategoriesState from './context/Categories/CategoriesState';
import ProductsState from './context/Products/ProductsState';
/*<Router>
<Switch>
<Route exact path="/" component={Login} />
<Route exact path="/registrarse" component={Registrarse} />
<PrivateRoute exact path="/dashboard" component={Dashboard} />
<PrivateRoute exact path="/gestionpedidos" component={GestionPedidos} />
<PrivateRoute exact path="/gestionobservaciones" component={GestionObservaciones} />
<PrivateRoute exact path="/gestionreportes" component={GestionReportes} />
</Switch>
</Router>
*/
function App() {
  const hist = createBrowserHistory();
  return (
    <ProductsState>
      <CategoriesState>
        <Router history={hist}>
          <Switch>
            <Route exact path="/" component={LogIn} />
            <Route path="/admin" render={(props) => <AdminLayout {...props} />} />
      
          </Switch>
        </Router>
      </CategoriesState>
    </ProductsState>
  );
}

export default App;
