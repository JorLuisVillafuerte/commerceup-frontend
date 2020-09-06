import React, { useState } from 'react';
import MaterialTable from 'material-table';

export default function MaterialTableDemo(props) {
    
  console.log(props.data);
  return (
    <MaterialTable
      title={props.title}
      columns={props.columns}
      data={props.data}
      editable={{
        onRowAdd: null,
        onRowUpdate: (newData, oldData) =>
        new Promise((resolve) => {
          props.handleRowUpdate(newData, oldData, resolve);
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
      actions={[
        {
          icon: 'search',
          tooltip: 'Ver categoria',
          onClick: (event, rowData) => {
            console.log('aaaa')
          }
        }
      ]}
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
        pageSize: 10,
        actionsColumnIndex: -1
      }}
    />
  );
}