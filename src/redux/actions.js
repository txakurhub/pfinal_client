import axios from "axios";
const local_url = "http://localhost:3001";

export const GET_PRODUCTS = "GET_PRODUCTS";
export const GET_SHOE_DETAIL = "GET_SHOE_DETAIL";
export const SEARCH_SNEAKES = "SEARCH_SNEAKES";
export const FILTER_PRICE = "FILTER_PRICE";
export const GET_CATEGORIES = 'GET_CATEGORIES';
export const FILTER_CATEGORY = 'FILTER_CATEGORY';
export const CREATE_REVIEW = 'CREATE_REVIEW';
export const GET_REVIEWS_PRODUCT = 'GET_REVIEWS_PRODUCT';

export function getProducts() {
  return function (dispatch) {
    axios(`${local_url}/shoes`).then((json) =>
      dispatch({
        type: GET_PRODUCTS,
        payload: json.data,
      })
    );
  };
}

export function getShoeDetail(id) {
  return async function (dispatch) {
    const { data } = await axios(`${local_url}/shoes/${id}`);
    dispatch({ type: GET_SHOE_DETAIL, payload: data });
  };
}

export const searchSneakes = (shoe) => {
  return (dispatch) => {
    axios.get(`${local_url}/shoes?name=${shoe}`)
      .then(res => dispatch({ type: SEARCH_SNEAKES, payload: res.data }), (error => alert("Sneakes not found")))
  }
}

export const create_new_review = (payload) =>{
  return(dispatch)=>{
    axios.post(`${local_url}/reviews`, payload)
    .then(res=> dispatch({type: CREATE_REVIEW, payload: res.data}),(error=> alert("Review not created")))
  }
}
export const get_reviews = (id)=>{
  console.log(id)
  return  (dispatch)=>{
    axios(`${local_url}/reviews/${id}`)
    .then(json=> dispatch({type: GET_REVIEWS_PRODUCT , payload: json.data}), (error=>alert(error)))
  }
}

export const filterByPrice = (payload) => {
  return {
    type: FILTER_PRICE,
    payload
  }
}

export const filterByRangePrice = (priceMin, priceMax) => {
  return {
    type: "FILTER_BY_RANGE_PRICE",
    payload: {
      priceMin,
      priceMax
    }
  }
}

export function getCategories() {
  return function (dispatch) {
    axios(`${local_url}/categories`).then((json) =>
      dispatch({
        type: GET_CATEGORIES,
        payload: json.data,
      })
    );
  };
}

export function filterByCategory(id) {
  return async function (dispatch) {
    const { data } = await axios(`${local_url}/categories/${id}`);
    console.log(data[0])
    dispatch({ type: FILTER_CATEGORY, payload: data });
  }}
