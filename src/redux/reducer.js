import {
    GET_PRODUCTS
} from "./actions";

const initialState ={
    products:[],
    allProducts:[]
}

function rootReducer(state=initialState,action){
    switch(action.type){
        case GET_PRODUCTS:
            return{
                ...state,
                products:action.payload,
                allProducts:action.payload
            }
    }
}