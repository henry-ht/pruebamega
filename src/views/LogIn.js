import axios from 'axios';
import React, { Component } from 'react';
import {NotificationManager} from 'react-notifications';


class LogIn extends Component {

    onSubmit(e){
        e.preventDefault();

        let data = {
            clave: e.target.elements.password.value,
            usuario: e.target.elements.User.value
        }

        if(data.clave !== '' && data.usuario !== ''){
            axios.post('http://127.0.0.1:8000/api/auth/login', data)
            .then(res => {
                console.log('ok ok: ', res);
                if(res.data.data){
                    NotificationManager.success(res.data.message);
                    localStorage.setItem('user_token', );
                }else{
                    NotificationManager.error(res.data.message);
                }
            })
            .catch(err => {
                NotificationManager.warning('Intente de nuevo');
            });
        }else{
            NotificationManager.warning('Rellene los datos');
        }

    }

    render() {
        return (
            <div className="row justify-content-center animate__animated animate__fadeIn" >
                <section className="col-md-6" >
                    <h1>
                        Iniciar Sesion
                    </h1>

                    <form noValidate name="FormLogIn" id="FormLogIn" onSubmit={this.onSubmit} className="text-left mt-3" >
                        <div className="mb-3">
                            <label htmlFor ="User" className="form-label">
                                Usuario
                            </label>
                            <input type="text" className="form-control" name="User" id="User" required  />
                        </div>
                        <div className="mb-3">
                            <label htmlFor ="password" className="form-label">
                                Clave
                            </label>
                            <input type="password" autoComplete="off" className="form-control" required id="password" name="password" />
                        </div>
                        <button type="submit" className="btn btn-primary w-100">
                            Enviar
                        </button>
                    </form>
                </section>
            </div>
        );
    }
}

export default LogIn;