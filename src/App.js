import './App.css';  
import { useState } from 'react';
import {NotificationContainer} from 'react-notifications';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";

import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
} from 'reactstrap';

import LogIn from './views/LogIn';
import Register from './views/Register';
import DashBoard from './views/DashBoard';

function App() {

  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);


  // status.setLogIn(false);
  let AppStatus = window.['AppStatus'].getLogIn();
  
  return (
    <div className="App">
      <main className="container-fluid" >
        <Router>
          <div>
          <Navbar color="light" light expand="md" className="shadow-sm mb-3" >
            <NavbarBrand href="/">
              Prueba react
            </NavbarBrand>

            <NavbarToggler onClick={toggle} />
            
            <Collapse isOpen={isOpen} navbar>
              <Nav className="mr-auto" navbar>
                
                {
                  !AppStatus ? (<NavItem>
                    <Link to="/login" className="nav-link" >
                      LogIn
                    </Link>
                  </NavItem>):''
                }

                {
                  !AppStatus ? (<NavItem>
                    <Link to="/register" className="nav-link" >
                      Register
                    </Link>
                  </NavItem>):''
                }
                
                {
                  AppStatus ? (<NavItem>
                    <Link to="/dashboard" className="nav-link" >
                      DashBoard
                    </Link>
                  </NavItem>):''
                }
                
              </Nav>
            </Collapse>
          </Navbar>


            <Switch >
              <Redirect exact from='/' to={'/'+(!AppStatus ? 'login':'dashboard')} />
              <Route path="/login" component={LogIn} >
                {AppStatus ? <Redirect to='/dashboard' />:''}
              </Route>
              <Route path="/register" component={Register} >
                {AppStatus ? <Redirect to='/dashboard' />:''}

              </Route>
              <Route path="/dashboard" component={DashBoard} >
                {!AppStatus ? <Redirect to='/login' />:''}

              </Route>
              <Redirect to={{
                  state: { error: true }
              }} />
            </Switch>
          </div>
        </Router>
      </main>
      <NotificationContainer/>
    </div>
  );
}

export default App;
