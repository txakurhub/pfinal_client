import {
    GET_PRODUCTS
} from "./actions";

const initialState = {
    products: [],
    allProducts: []
}

export default function rootReducer(state = initialState, { type, payload }) {
    switch (type) {
        case GET_PRODUCTS:
            return {
                ...state,
                products: payload.results,
                allProducts: payload.results
            }
        default: return state
    }
}

