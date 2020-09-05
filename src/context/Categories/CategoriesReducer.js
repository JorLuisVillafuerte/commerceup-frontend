import {GET_ALL_CATEGORIES, ADD_CATEGORY, DELETE_CATEGORY, EDIT_CATEGORY, ERROR_CATEGORY, OK_CATEGORY} from '../../types/index.js';

export default (state,action) => {
    switch (action.type) {
        case GET_ALL_CATEGORIES:
            return {
                ...state,
                categorias: action.payload,
                error: false
            }
        case ADD_CATEGORY:
            return {
                ...state,
                categorias: [...state.categorias, action.payload],
                error: false
            }
        case EDIT_CATEGORY:
            return {
                ...state,
                categorias: state.categorias.map(categoria => categoria.internalid === action.payload.internalid ? action.payload : categoria),
                error: false
            }
        case DELETE_CATEGORY:
            return {
                ...state,
                categorias: state.categorias.filter(categoria => categoria.internalid !== action.payload),
                error: false
            }
        case ERROR_CATEGORY:
            return {
                ...state,
                msg: action.payload,
                error: true
            }
        case OK_CATEGORY:
            return {
                ...state,
                msg: action.payload,
                error: false
            }
    
        default:
            break;
    }
}