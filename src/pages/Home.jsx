import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../redux/actions'
import Card from '../components/Card'

export default function Home() {
  const dispatch = useDispatch();
  const allProducts = useSelector(state => state.allProducts);

  useEffect(() => { dispatch(getProducts()) }, [dispatch])

  return (
    <div>
      {
        allProducts ? allProducts.map(p => {
          return (
            <Card
            title={p.title}
            image={p.image}
            brand={p.brand}
            model={p.model}
            price={p.price} />
          )
        }
        ) : <h1>Products not found</h1>
      }
    </div>
  )
}
