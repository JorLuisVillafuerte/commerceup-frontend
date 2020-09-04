import React, { useReducer } from 'react';
import AlertsReducer from './AlertsReducer';
import AlertsContext from './AlertsContext';
import { MOSTRAR_ALERTA, OCULTAR_ALERTA } from '../../types';

const AlertsState = (props) => {
    const initialState = {
        alerta: null
    }
    const [state, dispatch] = useReducer(AlertsReducer, initialState);

    //FUNCIONES
    const mostrarAlerta = (msg, categoria) => {
        dispatch({
            type: MOSTRAR_ALERTA,
            payload: {
                msg,
                categoria
            }
        });

        /*setTimeout(() => {
            dispatch({
                type: OCULTAR_ALERTA
            })
        }, 5000);*/
    }


    return ( 
        <AlertsContext.Provider 
            value={{
                alerta: state.alerta,
                mostrarAlerta
            }}
        >
        { props.children } 
        </AlertsContext.Provider>
    )
}

export default AlertsState;