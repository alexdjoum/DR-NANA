import { Route, Routes} from "react-router";
import {BrowserRouter} from "react-router-dom";
import routesss, {clientRoutes} from "./routes/routes";
//import adminRoutes from "./routes/adminRoutes";
//import clientRoutes from "./routes/routes";
import {routes} from "./routes/routes";
import {PrivateRoute} from "./routes/PrivateRoutes";
import Detail from "./pages/Detail";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import Home from "./pages/Home";
import Shop from "./pages/Shop";

function App() {

    const renderedRoutes = routes.map((route, index) => (
        <Route key={index} path={route.path} element={route.element} />
    ));
  return (

        <BrowserRouter>
              <Routes>
                  <>
                      {renderedRoutes}
                      {clientRoutes.map((route, index) => (
                          <Route
                              key={index}
                              path={route.path}
                              exact={route.exact}
                              Component={route.component}
                          />
                      ))}
                      {/*<Route element={<Register />} path="/register" />
                      <Route element={<Login />} path="/login" />
                      <Route element={<Cart />} path="/cart" />
                      <Route element={<Home />} path="/" />
                      <Route element={<Shop />} path="/shop" />*/}
                      {/*<Route
                          path="/admin"
                          element={<PrivateRoute Component={Admin} />}
                      /> */}

                  </>

                  {/*{routeComponents}*/}

              </Routes>
          </BrowserRouter>
  );
}

export default App;
