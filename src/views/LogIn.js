import axios from 'axios';
import {NotificationManager} from 'react-notifications';
import React, { Component } from 'react';


class LogIn extends Component {


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
            usuario: e.target.elements.User.value
        }

        if(data.clave !== '' && data.usuario !== ''){
            axios.post('auth/login', data)
            .then(res => {
                if(res.data.data){
                    res.data.rol = res.roles;
                    NotificationManager.success(res.data.message);
                    sessionStorage.setItem('user_token', res.data.access_token);
                    sessionStorage.setItem('user_data', JSON.stringify(res.data));
                    setTimeout(() => {
                        window.location.reload();
                    }, 1000);
                }else{
                    NotificationManager.error(res.data.message);
                }

                me.setState({
                    loadDisplay: false
                });
            }, error => {
                NotificationManager.warning('Intente de nuevo');
            })
            // .catch(err => {
            // });
        }else{
            NotificationManager.warning('Rellene los datos');
            this.setState({
                loadDisplay: false
            });
        }

    }

    render() {
        return (
            <div className="row justify-content-center animate__animated animate__fadeIn" >
                <section className="col-md-6" >
                    <h1>
                        Iniciar Sesion
                    </h1>

                    <form  name="FormLogIn" id="FormLogIn" onSubmit={this.onSubmit} className="text-left mt-3" >
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
                            <input type="password" minLength="8" maxLength="15" autoComplete="off" className="form-control" required id="password" name="password"   />
                        </div>
                        <button type="submit" disabled={this.state.loadDisplay} className="btn btn-primary w-100">
                            Enviar
                        </button>
                    </form>
                </section>
            </div>
        );
    }
}

export default LogIn;