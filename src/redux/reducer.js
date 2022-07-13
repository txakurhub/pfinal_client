import {
  GET_PICTURES,
  GET_USER,
  GET_USERS,
  GET_PRODUCTS,
  GET_SHOE_DETAIL,
  SEARCH_SNEAKES,
  FILTER_PRICE,
  FILTER_CATEGORY,
  GET_PRODUCTOS_DESTACADOS,
  GET_CATEGORIES,
  CREATE_REVIEW,
  GET_REVIEWS_PRODUCT,
  GET_WISHLIST_PRODUCT,
  CREATE_WISHLIST_PRODUCT,
  REMOVE_PRODUCT_WISHLIST,
  GET_WISHLIST_PRODUCT_ID,
  ALL_FILTERS,
  ALL_WISHLIST,
  ALL_CATEGORY_ADMIN,
  MODIFY_CATEGORY,
  ORDER_STATUS,
  GET_ORDER,
  FILTER_ORDER,
  ADD_CATEGORY,
  EDIT_CATEGORY,
  SEARCH_USER,
  DELETE_CATEGORY,
  DELETE_ORDER,
  UPDATE_ORDER,
  RELOAD_USER,
  // CLEAR_STATE
} from "./actions";
import swal from "sweetalert";

const initialState = {
  allProducts: [],
  allProductsName: [],
  allProductsCopy: [],
  product_detail: {},
  products: [],
  categories: [],
  reviews: [],
  wishlist: [],
  counterwishlist: 0,
  allcategoriesAdmin: [],
  stockShoes: [],
  productosDestacados: [],
  orderProduct: [],
  users: [],
  usersCopy: [],
  user: [],
  pictures: [],
  orderstatus: [],
  orderstatusCopy: [],
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    // case CLEAR_STATE: {
    //   return {
    //     ...state,
    //     pictures: [],
    //     product_detail: {},
    //   }
    // }
    case GET_PRODUCTS:
      const result = action.payload.map((e) => ({
        title: e.title,
        brand: e.brand,
      }));
      return {
        ...state,
        allProductsName: result,
        products: action.payload,
        allProducts: action.payload,
        allProductsCopy: action.payload,
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

    case FILTER_PRICE: {
      const container =
        action.payload === "lowest"
          ? state.allProducts.sort((a, b) => {
            if (a.price > b.price) {
              return -1;
            }
            if (a.price < b.price) {
              return 1;
            }
            return 0;
          })
          : state.allProducts.sort((a, b) => {
            if (a.price > b.price) {
              return 1;
            }
            if (a.price < b.price) {
              return -1;
            }
            return 0;
          });
      return {
        ...state,
        allProducts: container,
      };
    }

    case GET_CATEGORIES: {
      return {
        ...state,
        categories: action.payload,
      };
    }

    case FILTER_CATEGORY: {
      return {
        ...state,
        allProducts: action.payload,
      };
    }

    case CREATE_REVIEW:
      return {
        ...state,
        reviews: action.payload,
      };

    case GET_REVIEWS_PRODUCT:
      return {
        ...state,
        reviews: action.payload,
      };

    case GET_WISHLIST_PRODUCT:
      return {
        ...state,
        wishlist: action.payload,
        counterwishlist: action.payload.length,
      };

    case GET_WISHLIST_PRODUCT_ID:
      let getwishlist = action.payload.filter(
        (e) =>
          e.Products && e.Products.map((p) => p.id).includes(action.producto)
      );
      return {
        ...state,
        wishlist: getwishlist,
        counterwishlist: getwishlist.length,
      };

    case CREATE_WISHLIST_PRODUCT:
      return {
        ...state,
        wishlist: state.wishlist.concat(action.payload),
        counterwishlist: state.counterwishlist + 1,
      };

    case REMOVE_PRODUCT_WISHLIST:
      let newWishList = action.payload.filter((wish) => wish.id !== action.id);
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
      const { brand, category, precioMin, precioMax } = action.payload;
      let container =
        brand && category
          ? state.allProductsCopy.filter(
            (p) => p.brand === brand && p.category === category
          )
          : !brand && category
            ? state.allProductsCopy.filter((p) => p.category === category)
            : state.allProductsCopy.filter((p) => p.brand === brand);
      if (precioMin && precioMax) {
        container = container.filter(
          (p) => p.price >= precioMin && p.price <= precioMax
        );
      }
      let searchResults = container.length
        ? container
        : swal("No se encontraron resultados");
      return {
        ...state,
        allProducts: searchResults.length ? searchResults : state.allProducts,
      };
    }

    case ALL_WISHLIST: {
      return {
        ...state,
        wishlist: state.wishlist,
      };
    }

    case ALL_CATEGORY_ADMIN: {
      return {
        ...state,
        allcategoriesAdmin: action.payload,
      };
    }

    case MODIFY_CATEGORY: {
      return state;
    }

    case GET_PRODUCTOS_DESTACADOS: {
      const destacados = state.allProductsCopy
        .filter((z) => z.sold >= 500)
        .sort((a, b) => b.sold - a.sold);
      return {
        ...state,
        productosDestacados: destacados,
      };
    }

    case GET_ORDER: {
      const order = Object.values(action.payload).filter((e) => e.order_email === action.correo)

      return {

        orderProduct: order,
      };
    }

    case GET_USERS: {
      return {
        ...state,
        users: action.payload,
        usersCopy: action.payload
      };
    }

    case GET_USER: {
      return {
        ...state,
        user: action.payload,
      };
    }

    case GET_PICTURES: {
      return {
        ...state,
        pictures: action.payload,
      };
    }

    case ORDER_STATUS: {
      return {
        ...state,
        orderstatus: action.payload,
        orderstatusCopy: action.payload,
      };
    }

    case FILTER_ORDER: {
      let resultado = action.payload === "todas" ? state.orderstatusCopy : state.orderstatusCopy.filter(
        (e) => e.order_status === action.payload
      );
      return {
        ...state,
        orderstatus: resultado,
      };
    }

    case ADD_CATEGORY: {
      return {
        ...state
      }
    }
    case EDIT_CATEGORY: {
      return {
        ...state
      }
    }
    case DELETE_CATEGORY: {
      const result = state.allcategoriesAdmin.filter(e => e.id !== action.payload)
      return {
        ...state,
        allcategoriesAdmin: result
      }
    }
    case SEARCH_USER: {
      let filtrado = state.usersCopy.filter(u => u.firstname && u.firstname.toLowerCase().includes(action.payload))
      let resultado = filtrado.length ? filtrado : swal("Usuario inexistente")
      return {
        ...state,
        users: resultado.length ? resultado : state.users
      }
    }
    case DELETE_ORDER: {
      const result = state.orderstatusCopy.filter(e => e.id !== action.payload)
      return {
        ...state,
        orderstatusCopy: result,
        orderstatus: result
      }
    }
    case UPDATE_ORDER: {
      return state
    }
    case RELOAD_USER: {
      return {
        ...state,
        users: state.usersCopy
      }
    }
    default:
      return { ...state };
  }
}

export default rootReducer;
