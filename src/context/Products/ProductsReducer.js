import {ADD_PRODUCT, EDIT_PRODUCT, DELETE_PRODUCT, GET_ALL_PRODUCTS} from '../../types/index.js';

export default (state,action) => {
    switch (action.type) {
        case GET_ALL_PRODUCTS:
            return {
                ...state,
                productos: action.payload
            }   
        case ADD_PRODUCT:
            return {
                ...state,
                productos: [...state.productos, action.payload],
                notificacion: {msg: 'El registro fue agregado correctamente', type: 'success', icon: 'nc-icon nc-bell-55'}
            }
        case EDIT_PRODUCT:
            return {
                ...state,
                productos: state.productos.map(producto => producto.internalid === action.payload.internalid ? action.payload : producto),
                notificacion: {msg: 'El registro fue editado correctamente', type: 'success', icon: 'nc-icon nc-bell-55'}
            }
        case DELETE_PRODUCT:
            return {
                ...state,
                productos: state.productos.filter(producto => producto.internalid !== action.payload),
                notificacion: {msg: 'El registro fue eliminado correctamente', type: 'danger', icon: 'nc-icon nc-bell-55'}
            }
    
        default:
            break;
    }
}