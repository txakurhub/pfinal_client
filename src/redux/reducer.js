import { GET_PRODUCTS, GET_SHOE_DETAIL } from "./actions";

const initialState = {
  product_detail: [],
  products: [],
  allProducts: [],
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_PRODUCTS:
      return {
        ...state,
        products: action.payload,
        allProducts: action.payload,
      };
    case GET_SHOE_DETAIL:
      return {
        ...state,
        product_detail: action.payload,
      };
    default:
      return { ...state };
  }
}

export default rootReducer;
