import { GET_PRODUCTS, GET_SHOE_DETAIL, SEARCH_SNEAKES, FILTER_PRICE, FILTER_CATEGORY, GET_CATEGORIES, CREATE_REVIEW, GET_REVIEWS_PRODUCT, GET_WISHLIST_PRODUCT, CREATE_WISHLIST_PRODUCT, REMOVE_PRODUCT_WISHLIST, GET_WISHLIST_PRODUCT_ID, ALL_FILTERS } from "./actions";

const initialState = {
  allProducts: [],
  allProductsName: [],
  allProductsCopy: [],
  product_detail: [],
  products: [],
  categories: [],
  reviews: [],
  wishlist: [],
  counterwishlist : 0,
};
 
function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_PRODUCTS:
      const result = action.payload.map(e => ({ title: e.title, brand: e.brand }))
      return {
        ...state,
        allProductsName: result,
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
    case GET_CATEGORIES: {
      return {
        ...state,
        categories: action.payload
      }
    }
    case FILTER_CATEGORY: {
      return {
        ...state,
        allProducts: action.payload
      }
    }
    case CREATE_REVIEW:
      return {
        ...state,
        reviews: action.payload
      }
    case GET_REVIEWS_PRODUCT:
      return {
        ...state,
        reviews: action.payload
      }
    case GET_WISHLIST_PRODUCT:
      console.log(action.payload.length)
      return {
        ...state,
        wishlist: action.payload,
        counterwishlist: action.payload.length,
      }
    case GET_WISHLIST_PRODUCT_ID:
      let getwishlist = action.payload.filter((e) => e.Products && e.Products.map((p) => p.id).includes(action.producto))
      console.log(getwishlist)
      return {
        ...state,
        wishlist:getwishlist ,
        counterwishlist: getwishlist.length
      }
    case CREATE_WISHLIST_PRODUCT:
      console.log(action.payload)
      return {
        ...state,
        wishlist: state.wishlist.concat(action.payload) ,
        counterwishlist: state.counterwishlist + 1,
      }
    case REMOVE_PRODUCT_WISHLIST:
      console.log(action.id)
      let newWishList = state.wishlist.filter(
        (wish) => wish.id !== action.id
      );
      console.log(newWishList)
      if (state.counterwishlist >= 1) {
        return {
          ...state,
          wishlist: newWishList,
          counterwishlist: state.counterwishlist - 1,
        };
      } else {
        return {
          ...state,
          wishlist: newWishList,
          counterwishlist: state.counterwishlist,
        };
      }
    case ALL_FILTERS: {
      const { brand, category, precioMin, precioMax } = action.payload
      let container = brand && category ? state.allProductsCopy.filter(p => p.brand === brand && p.category === category) : !brand && category ? state.allProductsCopy.filter(p => p.category === category) : state.allProductsCopy.filter(p => p.brand === brand)
      if (precioMin && precioMax) {
        container = container.filter(p => p.price >= precioMin && p.price <= precioMax)
      }
      let searchResults = container.length ? container : alert("No search results found")
      return {
        ...state,
        allProducts: searchResults.length ? searchResults : state.allProducts
      }
    }
    default:
      return { ...state };
  }
}

export default rootReducer;

