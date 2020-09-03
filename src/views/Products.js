import React, { useContext, useState, useEffect, useRef } from 'react';
import ProductosContext from '../context/Products/ProductsContext';
import TableAction from '../components/Tables/TableAction'; 
import { LinearProgress } from "@material-ui/core";
import { Card,CardBody, CardFooter,CardTitle, Row, Col,} from "reactstrap";

import NotificationAlert from "react-notification-alert";

const Products = () => {


    //CONTEXTO DE PRODUCTOS //ESTADOS DE PRODUCTOS //ESTILOS
    const {obtenerProductos, productos,guardarProducto, eliminarProducto,editarProducto,notificacion} = useContext(ProductosContext);
   //USE EFECCT DE PRODUCTOS
    useEffect(()=>{
        obtenerProductos();
        if(notificacion){
            showNotify(notificacion);
        }
    },[notificacion]);
    //NOTIFICACIONES
    const notify = useRef(null);
    const showNotify = (notificacion) => {
        notify.current.notificationAlert({place:'bc', message: notificacion.msg, type: notificacion.type,icon:notificacion.icon,closeButton: true});
    }
    const columns = [
        {title: 'id', field: 'internalid', hidden: true},
        {title: 'Codigo', field: 'productCode'},
        {title: 'Articulo', field: 'articleCode'},
        {title: 'Nombre', field: 'name'},
        {title: 'Descripcion', field: 'description'},
        {title: 'Precio', field: 'unitPrice', type: 'currency'},
        {title: 'Estado', field: 'statusId.statusType'}
    
    ]

    const handleRowUpdate = async (newData, oldData, resolve) =>{
        editarProducto(newData); 
    }
    const handleRowDelete = (oldData, resolve) => {
        console.log(oldData.internalid);
        eliminarProducto(oldData.internalid);
    }
    const handleRowAdd = (newData, resolve) => {
        /*console.log(newData);
        newData.statusId.push({internalid: 1});
        console.log(newData);
        guardarProducto(newData);*/
    } 
    if (productos.length === 0){
        return (
            <>
             <div className="content">
                <LinearProgress />
             </div>
            </>
        );
    }
    return (
        <>
          <div className="content">
          <Col lg="3" md="6" sm="6">
            <Card className="card-stats">
                <CardBody>
                  <Row>
                    <Col md="4" xs="5">
                      <div className="icon-big text-center icon-warning">
                        <i className="nc-icon nc-app text-info" />
                      </div>
                    </Col>
                    <Col md="8" xs="7">
                      <div className="numbers">
                        <p className="card-category">Cantidad de Productos</p>
                            <CardTitle tag="p">{productos.length}</CardTitle>
                        <p />
                      </div>
                    </Col>
                  </Row>
                </CardBody>
                <CardFooter>
                  <hr />
                  <div className="stats">
                    <i className="fas fa-sync-alt" /> Actualizar ahora
                  </div>
                </CardFooter>
            </Card>
            </Col>
            <NotificationAlert ref={notify} /> 
            <TableAction 
                title={'Listado de Productos'}
                columns={columns}
                data={productos}
                handleRowUpdate={handleRowUpdate}
                handleRowDelete={handleRowDelete}
                handleRowAdd={handleRowAdd}
            />
          </div>
        </>
      );
}
 
export default Products;