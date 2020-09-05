import React, { useState, useContext, useEffect, useRef } from "react";
import CategoriasContext from '../context/Categories/CategoriesContext';
import TableAction from '../components/Tables/TableAction'; 
import { LinearProgress } from "@material-ui/core";
import NotificationAlert from "react-notification-alert";
import { Card,CardBody, CardFooter,CardTitle, Row, Col,} from "reactstrap";
const Categories = () => {
     
  //CONTEXTO DE CATEGORIAS //ESTADOS DE CATEGORIAS //ESTILOS
  const {obtenerCategorias, categorias, guardarCategoria, eliminarCategoria, editarCategoria, msg} = useContext(CategoriasContext);
  //NOTIFICACIONES
  const notify = useRef(null);
  //USE EFECCT DE CATEGORIAS
  useEffect(()=>{
    obtenerCategorias();
    if(msg){
      notify.current.notificationAlert({
        place:'br', 
        message: (
          <div>
            {msg.msg}<br></br>
            <b>Indicacion: {msg.indicacion}</b>
          </div>
        ),
        type: msg.type, 
        icon:msg.icon , 
        closeButton: true, 
        autoDismiss: 10});
    }
  },[msg]);
  //MANEJO DE UPDATE/DELETE/ADD
  const handleRowUpdate = async (newData, oldData, resolve) =>{
    console.log(newData);
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

  //RENDER DEL COMPONENTE
  if(categorias.length === 0 ){
    return (
      <div className="content">
        <LinearProgress />
      </div>
    );
  }
  return (
    <>
      <div className="content">
        <NotificationAlert ref={notify} />
        <TableAction 
          title={'Listado de Categorias'}
          columns={columns}
          data={categorias}
          handleRowUpdate={handleRowUpdate}
          handleRowDelete={handleRowDelete}
        />
      </div>
    </>
  );
}
 
export default Categories;