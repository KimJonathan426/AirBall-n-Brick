import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import SpotList from "./components/SpotsList";
import SingleSpot from "./components/SingleSpot";
import SpotForm from './components/SpotForm';
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
          <Route exact path='/'>
            <SpotList />
          </Route>
          <Route path="/spots/new">
            <SpotForm />
          </Route>
          <Route path="/spots/:id">
            <SingleSpot />
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
