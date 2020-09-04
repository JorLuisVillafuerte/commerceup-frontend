import React, { useReducer } from 'react';
import CategoriesReducer from './CategoriesReducer';
import CategoriesContext from './CategoriesContext';
import AxiosService from 'config/AxiosService';
import {GET_ALL_CATEGORIES, ADD_CATEGORY, DELETE_CATEGORY, EDIT_CATEGORY} from '../../types/index.js';

const CategoriesState = (props) => {

    //ESTADO INICIAL DE CATEGORIAS
    const initialState = {
        categorias: [],
        error: false,
        msg: null,
        notificacion: null
    }
    //CONFIGURACION DEL DISPATCH 

    const [state, dispatch] = useReducer(CategoriesReducer,initialState);
    
    //FUNCIONES DE CATEGORIES
    
    const obtenerCategorias = async()=> {
        try {
            const result = await AxiosService.get('categorias/id/6');
            console.log(result);
            dispatch({
                type: GET_ALL_CATEGORIES,
                payload: result.data
            })
        } catch (error) {
            console.log(error);
            console.log(error.response);
            const alert = {
                msg: 'Ops! ocurrio un error al cargar los registros, vuelva a intentar!.',
                type: 'warning',
                icon: 'nc-icon nc-bell-55'
            }
        }
    }

    const guardarCategoria = async(categoria) =>{
        try {
            const result = await AxiosService.post('categorias/',categoria);
            console.log(result);
            dispatch({
                type: ADD_CATEGORY,
                payload: result.data
            });
        } catch (error) {
            console.log(error);
        }
    }
    const editarCategoria = async(categoria) =>{
        try {
            const result = await AxiosService.post('categorias/',categoria);
            console.log(result);
            dispatch({
                type: EDIT_CATEGORY,
                payload: result.data
            });
        } catch (error) {
            console.log(error);
        }
    }

    const eliminarCategoria = async(categoria)=> {
        try {
            const result = await AxiosService.delete(`categorias/id/${categoria}`);
            console.log(result);
            dispatch({
                type: DELETE_CATEGORY,
                payload: categoria
            });
        } catch (error) {
            console.log(error);
        }
    }
    
    return ( 
        <CategoriesContext.Provider
            value={{
                categorias: state.categorias,
                notificacion: state.notificacion,
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