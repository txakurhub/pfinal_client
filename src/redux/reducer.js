import { GET_PRODUCTS, GET_SHOE_DETAIL, SEARCH_SNEAKES, FILTER_PRICE } from "./actions";

const initialState = {
  allProducts: [],
  product_detail: [],
  products: []
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_PRODUCTS:
      return {
        ...state,
        products: action.payload,
        allProducts: action.payload
      };
    case GET_SHOE_DETAIL:
      return {
        ...state,
        product_detail: action.payload,
      };
    case SEARCH_SNEAKES: {
      return {
        ...state,
        allProducts: action.payload
      }
    }
    case FILTER_PRICE: {
      const container = action.payload === 'lowest' ? state.allProducts.sort((a, b) => {
        if (a.price > b.price) {
          return 1
        }
        if (a.price < b.price) {
          return -1
        }
        return 0
      }) : state.allProducts.sort((a, b) => {
        if (a.price > b.price) {
          return -1
        }
        if (a.price < b.price) {
          return 1
        }
        return 0
      }
      )
      return {
        ...state,
        allProducts: container
      }
    }
    default:
      return { ...state };
  }
}

export default rootReducer;
