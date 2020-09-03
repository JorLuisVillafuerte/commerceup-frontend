import React, { useState, useContext, useEffect, useRef } from "react";
import CategoriasContext from '../context/Categories/CategoriesContext';
import TableAction from '../components/Tables/TableAction'; 
import { LinearProgress } from "@material-ui/core";
import NotificationAlert from "react-notification-alert";
import { Card,CardBody, CardFooter,CardTitle, Row, Col,} from "reactstrap";
const Categories = () => {
     
  //CONTEXTO DE CATEGORIAS //ESTADOS DE CATEGORIAS //ESTILOS
  const {obtenerCategorias, categorias,guardarCategoria, eliminarCategoria,editarCategoria,notificacion} = useContext(CategoriasContext);
  
  //USE EFECCT DE CATEGORIAS
  useEffect(()=>{
      obtenerCategorias();
      if(notificacion){
          showNotify(notificacion);
      }
  },[notificacion]);

  //NOTIFICACIONES
  const notify = useRef(null);
  const showNotify = (notificacion) => {
      notify.current.notificationAlert({place:'bc', message: notificacion.msg, type: notificacion.type,icon:notificacion.icon,closeButton: true});
  }

  //MANEJO DE UPDATE/DELETE/ADD
  const handleRowUpdate = async (newData, oldData, resolve) =>{
      editarCategoria(newData); 
  }
  const handleRowDelete = (oldData, resolve) => {
      console.log(oldData.internalid);
      eliminarCategoria(oldData.internalid);
  }
  const handleRowAdd = (newData, resolve) => {
      
      console.log(newData);
      guardarCategoria(newData);
  } 
  //COLUMNAS DE LA TABLA y VALIDACIONES
  
  const columns = [
    {title: 'id', field: 'internalid', hidden: true},
    {title: 'Codigo', field: 'categoryCode', validate: rowData => rowData.categoryCode.trim() === '' ? 
      { isValid: false, helperText: 'Codigo no puede estar vacio' } : true },
    {title: 'Nombre', field: 'name', validate: rowData => rowData.name.trim() === '' ? 
      { isValid: false, helperText: 'Nombre no puede estar vacio' } : true},
    {title: 'Descripcion', field: 'description',},
    {title: 'Fecha creacion', field: 'dateCreated', type: 'date', editable: 'never'},
    {title: 'Target', field: 'targetType', lookup: 
      { 'niños': 'niños', 'niñas': 'niñas', 'bebe': 'bebe', 'beba': 'beba','hombre': 'hombre','mujer': 'mujer' },},
    {title: 'Temporada', field: 'seasonType', lookup: 
      { 'verano': 'Verano', 'primavera': 'Primavera', 'invierno': 'Invierno', 'otoño': 'Otoño', 'otoño/invierno': 'Otoño/Invierno','primavera/verano': 'Primavera/Verano','todos': 'Todos'},},
    {title: 'Estado', field: 'statusId.internalid',lookup: 
      { 1: 'Disponible', 2: 'No Disponible' },
    },
  ]
  if(categorias.length === 0){
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
                    <i className="nc-icon nc-tile-56 text-info" />
                  </div>
                </Col>
                <Col md="8" xs="7">
                  <div className="numbers">
                    <p className="card-category">Cantidad de Categorias</p>
                        <CardTitle tag="p">{categorias.length}</CardTitle>
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
            title={'Listado de Categorias'}
            columns={columns}
            data={categorias}
            handleRowUpdate={handleRowUpdate}
            handleRowDelete={handleRowDelete}
            handleRowAdd={handleRowAdd}
        />
      </div>
    </>
  );
}
 
export default Categories;