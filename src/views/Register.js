import axios from 'axios';
import React, { Component } from 'react';
import {NotificationManager} from 'react-notifications';

class Register extends Component {

    onSubmit(e){
        e.preventDefault();

        let data = {
            clave: e.target.elements.password.value,
            usuario: e.target.elements.User.value,
            nombres: e.target.elements.Nombres.value
        }

        if(data.clave !== '' && data.usuario !== '' && data.nombres !== ''){
            axios.post('http://127.0.0.1:8000/api/auth/registrar', data)
            .then(res => {
                console.log('ok ok: ', res);
                if(res.data.data){
                    NotificationManager.success(res.data.message);
                }else{
                    NotificationManager.warning(res.data.message);
                }
            })
            .catch(err => {
                NotificationManager.error('Intente de nuevo');
            });
        }else{
            NotificationManager.info('Rellene los datos');
        }

    }

    render() {
        return (
            <div className="row justify-content-center animate__animated animate__fadeIn" >
                <section className="col-md-6" >
                    <h1>
                        Registro
                    </h1>

                    <form noValidate name="FormRegister" id="FormRegister" onSubmit={this.onSubmit} className="text-left mt-3" >
                        <div className="mb-3">
                            <label htmlFor="Nombres" className="form-label">
                                Nombres
                            </label>
                            <input type="text" className="form-control" name="Nombres" id="Nombres" required  />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="User" className="form-label">
                                Usuario
                            </label>
                            <input type="text" className="form-control" name="User" id="User" required  />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">
                                Clave
                            </label>
                            <input type="password" minLength="8" autoComplete="off" className="form-control" required id="password" name="password" />
                        </div>
                        <button type="submit" className="btn btn-primary w-100">Registrar</button>
                    </form>
                </section>
            </div>
        );
    }
}

export default Register;