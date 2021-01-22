import './App.css';  
import { useState } from 'react';
import {NotificationContainer} from 'react-notifications';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
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


function App() {

  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);
  
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
                <NavItem>
                  <Link to="/login" className="nav-link" >
                    LogIn
                  </Link>
                </NavItem>
                <NavItem>
                  <Link to="/register" className="nav-link" >
                    Register
                  </Link>
                </NavItem>
              </Nav>
            </Collapse>
          </Navbar>


            <Switch >
              <Route path="/login">
                <LogIn />
              </Route>
              <Route path="/register">
                <Register />
              </Route>
            </Switch>
          </div>
        </Router>
      </main>
      <NotificationContainer/>
    </div>
  );
}

export default App;
