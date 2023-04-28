import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import SpotList from "./components/SpotsList";
import SpotForm from "./components/SpotForm";
import SingleSpot from "./components/SingleSpot";
import Trips from "./components/Trips";
import HostDashboard from "./components/HostDashboard";
import About from "./components/About";
import GoogleExistingLogin from "./components/GoogleOAuth/GoogleExistingLogin";
import GoogleOAuthLogin from "./components/GoogleOAuth/GoogleOAuthLogin";
import GoogleOAuthSignup from "./components/GoogleOAuth/GoogleOAuthSignup";
import OAuthError from "./components/GoogleOAuth/OAuthError";
import PageNotFound from "./components/PageNotFound";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  function RouteWrapper({ component: Component, hideNavBar, ...rest }) {
    return (
      <Route {...rest} render={(props) => (
        <>
          {!hideNavBar && <Navigation isLoaded={isLoaded} />}
          <Component {...props} />
        </>
      )} />
    );
  }

  return (
    <>
      {isLoaded && (
        <Switch>
          <RouteWrapper exact path='/' component={SpotList} hideNavBar={false} />
          <RouteWrapper path="/spots/new" component={SpotForm} hideNavBar={false} />
          <RouteWrapper path="/spots/:id" component={SingleSpot} hideNavBar={false} />
          <RouteWrapper path="/trips/v1" component={Trips} hideNavBar={false} />
          <RouteWrapper path="/hosting" component={HostDashboard} hideNavBar={false} />
          <RouteWrapper path="/about" component={About} hideNavBar={false} />
          <RouteWrapper path='/oauth/google/existing/:ivString/:token*' component={GoogleExistingLogin} hideNavBar={true} />
          <RouteWrapper path='/oauth/google/login/:ivString/:token*' component={GoogleOAuthLogin} hideNavBar={true} />
          <RouteWrapper path='/oauth/google/signup/:ivString/:token*' component={GoogleOAuthSignup} hideNavBar={true} />
          <RouteWrapper path='/oauth/error' component={OAuthError} hideNavBar={true} />
          <RouteWrapper path='*' component={PageNotFound} hideNavBar={false} />
        </Switch>
      )}
    </>
  );
}

export default App;
