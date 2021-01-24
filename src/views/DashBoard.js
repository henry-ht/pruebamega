
import React, { Component } from 'react';
import Prestador from '../components/Prestador';
import Solicitante from '../components/Solicitante';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    NavLink,
    Redirect
  } from "react-router-dom";


class DashBoard extends Component {


    
    constructor(props){
        super(props)
        this.state = {
            AppStatus: window.['AppStatus'].getLogIn()
        };
    }
    
    render() {
        console.log('hola: ', this.state.AppStatus)
        return (
            <div className="row justify-content-center animate__animated animate__fadeIn" >
                <Router>
                    <div className="col-md-8 pb-3" >

                        <NavLink  to="/dashboard/solicitante" activeClassName="border-bottom border-info"  className="btn btn-link" >
                            Solicitante
                        </NavLink >
                        <NavLink  to="/dashboard/prestador" activeClassName="border-bottom border-info" className="btn btn-link" >
                            Prestador
                        </NavLink >

                    
                        {/* <select className="form-control w-25 float-right" value={this.selectedId} onChange={this.selectRol.bind(this)} defaultValue={1}  >
                            <option value="1">
                                Solicitante
                            </option>
                            <option value="2">
                                Prestador
                            </option>
                        </select> */}
                    </div>
                    <section className="col-md-12 text-left" >
                        <Switch >
                            <Route exact  path="/dashboard/solicitante"  >
                                <Solicitante />
                            </Route>
                            <Route exact  path="/dashboard/prestador" >
                                <Prestador />
                            </Route>

                        </Switch>

                    </section>
                </Router>
            </div>
        );
    }
}

export default DashBoard;