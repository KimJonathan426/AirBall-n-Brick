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
import GoogleOAuth from "./components/GoogleOAuth";
import PageNotFound from "./components/PageNotFound";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path="/">
            <SpotList />
          </Route>
          <Route path="/spots/new">
            <SpotForm />
          </Route>
          <Route path="/spots/:id">
            <SingleSpot />
          </Route>
          <Route path="/trips/v1">
            <Trips />
          </Route>
          <Route path="/hosting">
            <HostDashboard />
          </Route>
          <Route path="/about">
            <About />
          </Route>
          <Route path='/oauth/google'>
            <GoogleOAuth />
          </Route>
          <Route>
            <PageNotFound />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
