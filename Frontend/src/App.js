import React from 'react';

import './App.css';
import Root from "./pages/Root";
import SearchPage from "./pages/SearchPage";
import Test from "./pages/Test";
import {BrowserRouter as Router, Route} from "react-router-dom";

function App() {
  return (
      <>
          <Router>
              <Route path="/" exact component={RenderRoot}/>
              <Route path="/search" component={RenderSearchPage}/>
              <Route path="/test" component={Test}/>
          </Router>
      </>
    );
}

function RenderRoot() {
    return (
        <>
            <Root/>
        </>
    )
}

function RenderSearchPage() {
    return(
        <>
            <SearchPage/>
        </>
    )
}

export default App;
