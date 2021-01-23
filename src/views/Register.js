import axios from 'axios';
import React, { Component } from 'react';
import {NotificationManager} from 'react-notifications';

class Register extends Component {

    
    constructor(props){
        super(props);
        this.state = {
            loadDisplay: false
        };

        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit(e){
        e.preventDefault();
        this.setState({
            loadDisplay: true
        });
        let me = this;
        
        let data = {
            clave: e.target.elements.password.value,
            usuario: e.target.elements.User.value,
            nombres: e.target.elements.Nombres.value
        }

        if(data.clave !== '' && data.usuario !== '' && data.nombres !== ''){
            axios.post('auth/registrar', data)
            .then(res => {
                if(res.data.data){
                    NotificationManager.success(res.data.message);
                    e.target.reset();
                }else{
                    NotificationManager.warning(res.data.message);
                }
                me.setState({
                    loadDisplay: false
                });
                
            }, error => {
                NotificationManager.warning('Intente de nuevo');

            })
            .catch(err => {
                // NotificationManager.error('Intente de nuevo');
            });
        }else{
            NotificationManager.info('Rellene los datos');
            this.setState({
                loadDisplay: false
            });
        }

    }

    render() {
        this.loadDisplay = false;
        return (
            <div className="row justify-content-center animate__animated animate__fadeIn" >
                <section className="col-md-6" >
                    <h1>
                        Registro
                    </h1>

                    <form  name="FormRegister" id="FormRegister" onSubmit={this.onSubmit} className="text-left mt-3" >
                        <div className="mb-3">
                            <label htmlFor="Nombres" className="form-label">
                                Nombres
                            </label>
                            <input type="text" className="form-control" minLength="3" maxLength="255" name="Nombres" id="Nombres" required  />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="User" className="form-label">
                                Usuario
                            </label>
                            <input type="text" className="form-control" minLength="3" maxLength="255" name="User" id="User" required  />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">
                                Clave
                            </label>
                            <input type="password" minLength="8"  maxLength="15" autoComplete="off" className="form-control" required id="password" name="password" />
                        </div>
                        <button type="submit" disabled={this.state.loadDisplay} className="btn btn-primary w-100">Registrar</button>
                    </form>
                </section>
            </div>
        );
    }
}

export default Register;