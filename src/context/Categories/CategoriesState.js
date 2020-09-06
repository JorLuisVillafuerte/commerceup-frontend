import React, { useReducer } from 'react';
import CategoriesReducer from './CategoriesReducer';
import CategoriesContext from './CategoriesContext';
import AxiosService from 'config/AxiosService';
import {GET_ALL_CATEGORIES, ADD_CATEGORY, DELETE_CATEGORY, EDIT_CATEGORY, ERROR_CATEGORY, OK_CATEGORY} from '../../types/index.js';

const CategoriesState = (props) => {

    //ESTADO INICIAL DE CATEGORIAS
    const initialState = {
        categorias: [],
        error: false,
        msg: null
    }
    //CONFIGURACION DEL DISPATCH 
    const [state, dispatch] = useReducer(CategoriesReducer,initialState);
 
    //FUNCIONES DE CATEGORIES
    const obtenerCategorias = async()=> {
        try {
            const result = await AxiosService.get('categorias/');
            console.log(result);
            dispatch({
                type: GET_ALL_CATEGORIES,
                payload: result.data
            })
        } catch (error) {
            console.log(error.response);
            const alert = {msg: 'Ops! ocurrio un error al cargar los registros, vuelva a intentar!.', type: 'warning', icon: 'nc-icon nc-bell-55'}
            dispatch({
                type: ERROR_CATEGORY,
                payload: alert
            });
        }
    }

    const guardarCategoria = async(categoria) =>{
        try {
            const result = await AxiosService.post('categorias/',categoria);
            console.log(result);
            const alert = { msg: 'El registro fue agregado correctamente', type: 'success', icon: 'nc-icon nc-bell-55'}
            dispatch({
                type: ADD_CATEGORY,
                payload: result.data
            });
            dispatch({
                type: OK_CATEGORY,
                payload: alert
            });
        } catch (error) {
            console.log(error);
            const alert = { msg: 'Ops! ocurrio un error al agregar un registro.', type: 'warning',icon: 'nc-icon nc-bell-55'}
            dispatch({
                type: ERROR_CATEGORY,
                payload: alert
            });
        }
    }
    const editarCategoria = async(categoria) =>{
        try {
            console.log(categoria);
            const result = await AxiosService.post('categorias/',categoria);
            const alert = { msg: 'El registro fue editado correctamente', type: 'success', icon: 'nc-icon nc-bell-55'}
            dispatch({
                type: EDIT_CATEGORY,
                payload: result.data
            });
            dispatch({
                type: OK_CATEGORY,
                payload: alert
            });

        } catch (error) {
            console.log(error.response);
            const alert = { msg: 'Ops! ocurrio un error al editar el registro.',indicacion: error.response.data.message, type: 'danger',icon: 'nc-icon nc-bell-55'}
            dispatch({
                type: ERROR_CATEGORY,
                payload: alert
            });
        }
    }

    const eliminarCategoria = async(categoria)=> {
        try {
            const result = await AxiosService.delete(`categorias/id/${categoria}`);
            const alert = { msg: 'El registro fue eliminado correctamente', type: 'success', icon: 'nc-icon nc-bell-55'}
            console.log(result);
            dispatch({
                type: DELETE_CATEGORY,
                payload: categoria
            });
            dispatch({
                type: OK_CATEGORY,
                payload: alert
            });
        } catch (error) {
            console.log(error);
            const alert = { msg: 'Ops! ocurrio un error al editar el registro.', type: 'warning',icon: 'nc-icon nc-bell-55'}
            dispatch({
                type: ERROR_CATEGORY,
                payload: alert
            });
        }
    }
    
    return ( 
        <CategoriesContext.Provider
            value={{
                categorias: state.categorias,
                msg: state.msg,
                obtenerCategorias,
                editarCategoria,
                guardarCategoria,
                eliminarCategoria
            }}
        >
            {props.children}
        </CategoriesContext.Provider>    
    );
}
 
export default CategoriesState;