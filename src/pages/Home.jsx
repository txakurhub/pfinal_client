import React, { useEffect } from 'react'
import { useDispatch, useSelector} from 'react-redux';
import Card from '../components/Card';
import { getProducts } from '../redux/actions';

export default function Home() {
  const dispatch = useDispatch();
  const products = useSelector(state => state.allProducts);

  useEffect(()=>{
    dispatch(getProducts())
  },[dispatch])
  console.log(products);
  return (
    <div>
{products? products.map(p=> (
    <Card
    key={p.id}
    title= {p.title}
    image={p.image}
    brand={p.brand}
    model={p.model}
    price={p.price}
    />
))
: "No hay nada"}
    </div>
  )
}