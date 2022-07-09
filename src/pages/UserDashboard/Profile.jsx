import React from "react"
import userimg from '../../assets/user.png'

export const Profile = ({user})=>{
    return(
        <div className="flex flex-col justify-center w-100">
<img src={user.image!==''?user.image:user.photoURL?user.photoURL:userimg}   className='self-center rounded-full 'width={120} height={120} />
<h1 className="text-4xl">hola {user.firstname!==''?user.firstname+' '+user.lastname:user.displayName!==''?user.displayName:"usuario"}</h1>
<h2 >telefono: {user.phone}</h2>
<h3>email:{user.email}</h3>
</div>
    )
}