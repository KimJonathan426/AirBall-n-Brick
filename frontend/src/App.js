import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Routes, Route } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import SpotList from "./components/SpotsList";
import HostSpot from "./components/HostSpot";
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


  return (
    <>
      {isLoaded && (
        <Routes>
          <Route path='/' element={
                                  <>
                                    <Navigation isLoaded={isLoaded} fixed={true} type='nav-wide' />
                                    <SpotList />
                                  </>
                                } />
          <Route path="/spots/new" element={ <HostSpot /> } />
          <Route path="/spots/:id" element={
                                  <>
                                    <Navigation isLoaded={isLoaded} fixed={false} type='nav-contained' />
                                    <SingleSpot />
                                  </>
                                } />
          <Route path="/trips/v1" element={
                                  <>
                                    <Navigation isLoaded={isLoaded} fixed={true} type='nav-trip' />
                                    <Trips />
                                  </>
                                } />
          <Route path="/hosting" element={
                                  <>
                                    <Navigation isLoaded={isLoaded} fixed={false} />
                                    <HostDashboard />
                                  </>
                                } />
          <Route path="/about" element={
                                  <>
                                    <Navigation isLoaded={isLoaded} fixed={true}/>
                                    <About />
                                  </>
                                } />
          <Route path='/oauth/google/existing/:ivString/*' element={<GoogleExistingLogin />} />
          <Route path='/oauth/google/login/:ivString/*' element={<GoogleOAuthLogin />} />
          <Route path='/oauth/google/signup/:ivString/*' element={<GoogleOAuthSignup />} />
          <Route path='/oauth/error' element={<OAuthError />} />
          <Route path='*' element={
                                  <>
                                    <Navigation isLoaded={isLoaded} fixed={false}/>
                                    <PageNotFound />
                                  </>
                                } />
        </Routes>
      )}
    </>
  );
}

export default App;
