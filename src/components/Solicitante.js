import React, { Component } from 'react';
import axios from 'axios';
import {NotificationManager} from 'react-notifications';


class Solicitante extends Component {

    constructor(props){
        super(props);

        this.state = {
            selectedId: 1,
            prestadores: [],
            citas: [],
        };

        this.getPrestadores = this.getPrestadores.bind(this);
        this.getCitas       = this.getCitas.bind(this);
        this.suscribir      = this.suscribir.bind(this);
        this.saveRol        = this.saveRol.bind(this);
        this.apartarCita    = this.apartarCita.bind(this);

        
        this.getPrestadores();
        this.getCitas();
        this.saveRol();
    }

    componentWillUnmount() {
        // fix Warning: Can't perform a React state update on an unmounted component
        this.setState = (state,callback)=>{
            return;
        };
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

    getPrestadores(){
        axios.get('solicitante/listarPrestadores')
        .then(res => {
            let add = [];
            if(res.data.data){
                add = res.data.data;
            }else{
                add = [];
            }
            this.setState({
                prestadores: add
            });

        }, error => {
        })
        // .catch(err => {
        // });
    }

    suscribir(e){
        e.preventDefault();

        this.setState({
            loadDisplay: true
        });
        let me = this;

        let data = {
            IdUserPrestador : e.target.elements.selectPrestadores.value,
        }

        if(data.clave !== ''){
            axios.post('solicitante/subscribirse', data)
            .then(res => {
                if(res.data.data){
                    NotificationManager.success(res.data.message);
                    this.getCitas();

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

    apartarCita(cod){
        let me = this;
        axios.post('solicitante/apartarCupo', {
            codCita: cod
        })
        .then(res => {
            if(res.data.data){
                NotificationManager.success(res.data.message);

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
            <div className="mt-3 animate__animated animate__fadeIn" >
                <aside className="w-50 p-2" >
                    <form name="FormSuscriberse" id="FormSuscriberse" onSubmit={this.suscribir} className="text-left mt-3" >
                        <label htmlFor="selectPrestadores">
                            Prestadores
                        </label>
                        <select id="selectPrestadores" name="selectPrestadores" className="form-control w-75 mr-1" >
                            {
                                this.state.prestadores.map((value, index) => {
                                    return (<option key={index} value={value.cod} >
                                        {value.razon_social}    
                                    </option>);
                                })
                            }
                        </select>
                        <button type="submit" className="btn btn-info mt-2" disabled={this.state.loadDisplay}  >
                            Suscribirse
                        </button>
                    </form>
                </aside>
                
                <h3 className="mt-5" >
                    Citas
                </h3>
                <table className="table" >
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Descripcion</th>
                            <th scope="col">cupos disponibles</th>
                            <th scope="col">fecha</th>
                            <th scope="col">Opciones</th>
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
                                            {value.cupos_disponibles}    
                                        </th>
                                        <th >
                                            {value.fecha}    
                                        </th>
                                        <th >
                                            <button type="button" onClick={() => { this.apartarCita(value.cod) }} className="btn btn-sm btn-success" >
                                                Apartar
                                            </button>    
                                        </th>
                                    </tr>
                                );
                            })
                        }
                        
                    </tbody>
                </table>
            </div>
        );
    }

}

export default Solicitante;