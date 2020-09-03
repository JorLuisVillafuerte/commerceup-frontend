import React, { useReducer } from 'react';
import ProductsReducer from './ProductsReducer';
import ProductsContext from './ProductsContext';
import AxiosService from 'config/AxiosService';
import {GET_ALL_PRODUCTS, DELETE_PRODUCT, EDIT_PRODUCT, ADD_PRODUCT} from '../../types/index.js';

const ProductsState = (props) => {

    //ESTADO INICIAL DE PRODCUTOS
    const initialState = {
        productos: [],
        error: false,
        msg: null,
        notificacion: null

    }
    //CONFIGURACION DEL DISPATCH 
    const [state, dispatch] = useReducer(ProductsReducer,initialState);
    
    //FUNCIONES DE Products
    
    const obtenerProductos = async()=> {
        try {
            const result = await AxiosService.get('productos/');
            console.log(result);
            dispatch({
                type: GET_ALL_PRODUCTS,
                payload: result.data
            })
        } catch (error) {
            console.log(error);
        }
    }

    const guardarProducto = async(producto) =>{
        try {
            const result = await AxiosService.post('productos/',producto);
            console.log(result);
            dispatch({
                type: ADD_PRODUCT,
                payload: result.data
            });
        } catch (error) {
            console.log(error);
        }
    }
    const editarProducto = async(producto) =>{
        try {
            const result = await AxiosService.post('productos/',producto);
            console.log(result);
            dispatch({
                type: EDIT_PRODUCT,
                payload: result.data
            });
        } catch (error) {
            console.log(error);
        }
    }

    const eliminarProducto = async(producto)=> {
        try {
            const result = await AxiosService.delete(`productos/id/${producto}`);
            console.log(result);
            dispatch({
                type: DELETE_PRODUCT,
                payload: producto
            });
        } catch (error) {
            console.log(error);
        }
    }
    
    return ( 
        <ProductsContext.Provider
            value={{
                productos: state.productos,
                notificacion:state.notificacion,
                obtenerProductos,
                editarProducto,
                guardarProducto,
                eliminarProducto,
            }}
        >
            {props.children}
        </ProductsContext.Provider>    
    );
}
 
export default ProductsState;