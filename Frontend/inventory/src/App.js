import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
  withRouter
} from 'react-router-dom';
import {Auth} from "./constants/Authentication"
import Navbar from "react-bootstrap/Navbar";
import Button from 'react-bootstrap/Button';
import AccessPanel from "./pages/AccessPanel";
import NotFound from "./components/NotFound";
import Home from "./pages/Home"

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => (
        Auth.isAuthenticated === true
            ? <Component {...props} />
            : <Redirect to={{
              pathname: '/',
              state: { from: props.location }
            }} />
    )} />
);


const NavigationBar = withRouter(({ history }) => (
    Auth.isAuthenticated ? (
        <div>
          <Navbar bg="light" variant="light">
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Button variant="outline-danger" onClick={() => { Auth.logout( (error = null) => {
                  console.log(error)
                  history.push('/')
              }) } }>Log out</Button>
            </Navbar.Collapse>
          </Navbar>
          {/*<SideNavigation/>*/}

        </div>
    ) : (
        <div/>
    )
));


function App() {

    return (
      <Router>
          <div>
              <Route exact path="/" render={() => (
                  Auth.isAuthenticated ? (
                      <Redirect to='/home'/>
                  ) : (
                      <Redirect to="/login"/>
                  )
              )}/>
              <NavigationBar/>
              <Switch>
                  <Route path="/login" component={AccessPanel}/>
                  <PrivateRoute path='/home' component={Home}/>
                  <Route component={NotFound}/>
              </Switch>
          </div>
      </Router>
    );
}

export default App;
