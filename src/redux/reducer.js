import { GET_PRODUCTS, GET_SHOE_DETAIL, SEARCH_SNEAKES, FILTER_PRICE, FILTER_CATEGORY, GET_CATEGORIES, CREATE_REVIEW, GET_REVIEWS_PRODUCT } from "./actions";

const initialState = {
  allProducts: [],
  allProductsCopy: [],
  product_detail: [],
  products: [],
  categories:[],
  reviews:[],
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_PRODUCTS:
      return {
        ...state,
        products: action.payload,
        allProducts: action.payload,
        allProductsCopy: action.payload
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
          return -1
        }
        if (a.price < b.price) {
          return 1
        }
        return 0
      }) : state.allProducts.sort((a, b) => {
        if (a.price > b.price) {
          return 1
        }
        if (a.price < b.price) {
          return -1
        }
        return 0
      }
      )
      return {
        ...state,
        allProducts: container
      }
    }
    case "FILTER_BY_RANGE_PRICE": {
      const container = state.allProductsCopy.filter(s => s.price > action.payload.priceMin && s.price < action.payload.priceMax)
      !container.length && alert('No hay producto con ese rango de precio') 
      return {
        ...state,
        allProducts: container.length ? container : state.allProducts
      }
    }
    case FILTER_CATEGORY: {
      return {
        ...state,
        allProducts: action.payload
      }
    }

case GET_CATEGORIES:{
      return {
        ...state,
        categories: action.payload
      }}

    case CREATE_REVIEW: 
    return {
      ...state,
      reviews: action.payload
    }
    case GET_REVIEWS_PRODUCT:
      console.log(action.payload)
      return {
        ...state,
        reviews: action.payload
      }
    default:
      return { ...state };
  } 
}

export default rootReducer;
