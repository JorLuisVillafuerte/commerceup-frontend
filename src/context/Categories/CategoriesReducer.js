import {GET_ALL_CATEGORIES, ADD_CATEGORY, DELETE_CATEGORY, EDIT_CATEGORY} from '../../types/index.js';

export default (state,action) => {
    switch (action.type) {
        case GET_ALL_CATEGORIES:
            return {
                ...state,
                categorias: action.payload
            }
        case ADD_CATEGORY:
            return {
                ...state,
                categorias: [...state.categorias, action.payload],
                notificacion: {msg: 'El registro fue agregado correctamente', type: 'success', icon: 'nc-icon nc-bell-55'}
            }
        case EDIT_CATEGORY:
            return {
                ...state,
                categorias: state.categorias.map(categoria => categoria.internalid === action.payload.internalid ? action.payload : categoria),
                notificacion: {msg: 'El registro fue editado correctamente', type: 'success', icon: 'nc-icon nc-bell-55'}
            }
        case DELETE_CATEGORY:
            return {
                ...state,
                categorias: state.categorias.filter(categoria => categoria.internalid !== action.payload),
                notificacion: {msg: 'El registro fue eliminado correctamente', type: 'danger', icon: 'nc-icon nc-bell-55'}
            }
    
        default:
            break;
    }
}