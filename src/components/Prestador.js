import React, { Component } from 'react';
import axios from 'axios';
import {NotificationManager} from 'react-notifications';

class Prestador extends Component {

    
    constructor(props){
        super(props);
        this.state = {
            loadDisplay: false,
            citas: []
        };

        this.crearCita  = this.crearCita.bind(this);
        this.getCitas   = this.getCitas.bind(this);
        this.saveRol    = this.saveRol.bind(this);

        this.getCitas();
        this.saveRol();
    }

    crearCita(e){
        e.preventDefault();

        this.setState({
            loadDisplay: true
        });
        let me = this;

        let data = {
            descripcion: e.target.elements.descripcion.value,
            cupos_totales: e.target.elements.cupos_totales.value,
            fecha: e.target.elements.fecha.value,
        }

        if(data.clave !== '' && data.usuario !== ''){
            axios.post('prestador/crearCita ', data)
            .then(res => {
                if(res.data.data){
                    NotificationManager.success(res.data.message);
                    me.getCitas();
                    e.target.reset();
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

    getCitas(){
        axios.get('solicitante/listarCitas')
        .then(res => {
            let add = [];
            if(res.data.data){
                add = res.data.data;
            }else{
                add = [];
            }
            this.setState({
                citas: add
            });

        }, error => {
        })
        // .catch(err => {
        // });
    }

    saveRol(data){
        axios.post('auth/asignarPerfil', {
            rol: data
        })
        .then(res => {
            
        }, error => {
        });
    }

    render() {
        return (
            <div className="mt-3" >
                <aside className="w-50">
                    <form  name="FormLogIn" id="FormLogIn" onSubmit={this.crearCita} className="text-left mt-3" >
                            <div className="mb-3">
                                <label htmlFor="descripcion" className="form-label">
                                    Descripcion
                                </label>
                                <input type="text" className="form-control" minLength="3" maxLength="255" name="descripcion" id="descripcion" required  />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="cupos_totales" className="form-label">
                                    cupos totales
                                </label>
                                <input type="number" minLength="1" maxLength="100" autoComplete="off" className="form-control" required id="cupos_totales" name="cupos_totales"   />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="fecha" className="form-label">
                                    fecha
                                </label>
                                <input type="date"  autoComplete="off" className="form-control" required id="fecha" name="fecha"   />
                            </div>
                            <button type="submit" disabled={this.state.loadDisplay} className="btn btn-primary w-100">
                                Crear Cita
                            </button>
                    </form>
                </aside>

                <aside className="w-100 mt-3">
                    <table className="table mt-5" >
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Descripcion</th>
                                <th scope="col">cupos totales</th>
                                <th scope="col">cupos disponibles</th>
                                <th scope="col">fecha</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.citas.map((value, index) => {
                                    return (
                                        <tr key={index} >
                                            <th >
                                                {value.cod}    
                                            </th>
                                            <th >
                                                {value.descripcion}    
                                            </th>
                                            <th >
                                                {value.cupos_totales}    
                                            </th>
                                            <th >
                                                {value.cupos_disponibles}    
                                            </th>
                                            <th >
                                                {value.fecha}    
                                            </th>
                                        </tr>
                                    );
                                })
                            }
                            
                        </tbody>
                    </table>

                </aside>
                
            </div>
        );
    }


}

export default Prestador;