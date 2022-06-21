import {
  FILTER_BY_BRAND,
  GET_PRODUCTS,
  GET_SHOE_DETAIL,
  SEARCH_SNEAKES,
} from "./actions";

const initialState = {
  product_detail: [],
  products: [],
  allProducts: [],
  brands: [],
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
    case SEARCH_SNEAKES: {
      return {
        ...state,
        allProducts: action.payload,
      };
    }
    case FILTER_BY_BRAND:
      const brandFilter = state.allProducts.filter((p) =>
        action.payload !== "All"
          ? p.brand.includes(action.payload)
          : state.allProducts
      );
      return {
        ...state,
        brands: brandFilter,
      };
    default:
      return { ...state };
  }
}

export default rootReducer;
