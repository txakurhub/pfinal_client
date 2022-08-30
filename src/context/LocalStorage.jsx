import React , {useState}from 'react'


export function LocalStorage(key,initialValue){
    const [storedValue,setStoredValue]=useState(()=>{
        try {
            const item =window.localStorage.getItem(key)
            return item?JSON.parse(item):initialValue
        } catch (error) {
            return initialValue
        }
    } )
    const setValue=Value=>{
        try {
            setStoredValue(Value)
            window.localStorage.setItem(key,JSON.stringify(Value))
        } catch (error) {
            console.log(error);
        }
    }
    return [storedValue,setValue]
} 