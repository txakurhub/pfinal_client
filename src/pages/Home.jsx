import React, { useEffect } from 'react'
import { useDispatch, useSelector} from 'react-redux';

export default function Home() {
  const dispath = useDispatch();
  const products = useSelector();

  useEffect(()=>{
    
  })
  return (
    <div>

    </div>
  )
}
