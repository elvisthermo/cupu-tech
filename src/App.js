/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react';
import CustomHeader from './componets/Header';
import api from './services/api';
import './css/admin.css';
import './css/bulma.css';
import './css/styles.css';


function App() {
    const [fifoRequest,setFifoRequest] = useState([]);
    
    useEffect(()=>{
        api.get('/').then(response=>{
            console.log("responde json:",response.data);

            let fifo = response.data.sort((a,b) => new Date(a.date).getHours() - new Date(b.date).getHours());
            
            fifo = fifo.sort((a,b) => new Date(a.date).getMinutes() - new Date(b.date).getMinutes());

            fifo.map((d,i)=>{
                if(d.date > fifo[2].date){
                    console.log('emaior',d.date);
                }
                else{
                    console.log('não e',fifo[2].date)
                }
            })
        
            
            setFifoRequest(fifo);
        })
    },[]);

    async function handleAddRequest(){
        const addRequest = {
            id: `id ${Date.now()}`,
            name: `pedido ${Date.now()}`,
            date: Date(),
            desc: `pedido realizado ${Date.now()}`,
            status: false
        }

        setFifoRequest([...fifoRequest,addRequest]);
    }

    function handleFinishRequest(id){
        const finishRequest = fifoRequest.map(d=>{
            if(d.id===id){
                d.status = true
            }
      
            return d;
    })

    const arrayfinish = finishRequest.filter(d=> !d.status)
    setFifoRequest(arrayfinish);
    alert("Pedido finalizado");
}

    function handleDeleteRequest(id){
        const filerRequest = fifoRequest.filter(d=>d.id!==id);

        console.log(filerRequest)
        setFifoRequest(filerRequest);
        alert("Pedido cancelado");
        
    }

    return (
    <div className="App">

    <nav classNameName="navbar is-white">
        <div className="container">
            <div className="navbar-brand">
                <a className="navbar-item brand-text" href="../index.html">
                    Pedidos Admin
                </a>
                <div className="navbar-burger burger" data-target="navMenu">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
            <div id="navMenu" className="navbar-menu">
                <div className="navbar-start">
                    <a className="navbar-item" href="admin.html">
                        Home
                    </a>
                    <a className="navbar-item" href="admin.html">
                        About
                    </a>
                </div>

            </div>
        </div>
    </nav>

    <div className="container">
        <div className="columns">
            <div className="column is-16">

                <CustomHeader title="Olá" message="Bem vindo ao seu painel de administração de pedidos!"/>
                
                <div className="columns">
                    <div className="column is-16">
                        <div className="card events-card">
                            <header className="card-header">
                                <p className="card-header-title">
                                    Entradas
                                </p>
                                <a href="#" className="card-header-icon" aria-label="more options">
                                    <span className="icon">
                                        <i className="fa fa-angle-down" aria-hidden="true"></i>
                                    </span>
                                </a>
                            </header>

                            
                            {/* foooter----------------- */}
                            
                            <div className="card-table">
                                <div className="content">
                                    <table className="table is-fullwidth is-striped">
                                        <tbody>
                                            {fifoRequest.map((data,i) =>{
                                                return(
                                                <tr key={data.id} className={i==0?"alert-request":""} 
                                                title={i==0?"pedido emergencial":""}
                                                >
                                                    <td width="5%"><i className="fa fa-bell-o"></i></td>
                                                    <td>{data.name}</td>
                                                    <td>{data.desc}</td>
                                                    <td>{
                                                    data.date}
                                                </td>
                                                    
                                                    <td id="crud-buttons" className="level-right">
                                                        <a className="button is-small is-primary"
                                                            onClick={()=>handleFinishRequest(data.id)}>Finalizar
                                                        </a>
                                                    <a className="button is-small is-danger"
                                                            onClick={()=>handleDeleteRequest(data.id)}>Cancelar</a>
                                                    </td>
                                                </tr>
                                                )
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
      
                            <footer className="card-footer">
                                <div className="card-footer-item">
                                     <a className="button is-small is-info"
                                                        onClick={handleAddRequest}>
                                                            Adicionar Pedido</a> 
                                </div>
                            </footer>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </div>
  );
}

export default App;
