import  axios  from 'axios'

export const GET_PRODUCTS = 'GET_PRODUCTS';

export  function getProducts(){
    return function (dispatch) {
         axios('http://localhost:3001/shoes')
         .then((json)=> dispatch({
            type: GET_PRODUCTS,
            payload: json.data
        }))
        .catch(err => console.log(err))
    }
};