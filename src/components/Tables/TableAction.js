import React, { useState } from 'react';
import MaterialTable from 'material-table';

export default function MaterialTableDemo(props) {
    
  console.log(props.data);
  return (
    <MaterialTable
      title={props.title}
      columns={props.columns}
      data={props.data}
      isLoading={props.isLoading}
      editable={{
        onRowUpdate: (newData, oldData) =>
        new Promise((resolve) => {
          props.handleRowUpdate(newData, oldData, resolve);
          setTimeout(() => {
            resolve();
          }, 2000)
        }),
        onRowAdd : (newData) => 
        new Promise ((resolve) => { 
          props.handleRowAdd (newData, resolve)
          setTimeout(() => {
            resolve();
          }, 2000) 
        }), 
        onRowDelete : (oldData) => 
        new Promise ((resolve) => { 
          props.handleRowDelete (oldData, resolve) 
          setTimeout(() => {
            resolve();
          }, 2000)
        }) 
      }}
      localization={{          
        body: {
            emptyDataSourceMessage: 'No hay registros para mostrar',
            editRow:{
              deleteText: '¿Estas seguro de eliminar el registro?'
            },
            deleteTooltip: 'Borrar',
            editTooltip: 'Editar',
            addTooltip: 'Agregar'
        },
        header: {
          actions: 'Acciones'
        },
      }}
      options={{
        pageSize: 10
      }}
    />
  );
}