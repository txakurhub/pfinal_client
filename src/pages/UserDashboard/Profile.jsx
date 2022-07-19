import React from "react";
import userimg from "../../assets/user.png";

export const Profile = ({ user }) => {
  return (
    <div className="flex flex-col justify-center w-100">
      <div className="rounded-full h-[450px] w-[450px] overflow-hidden m-auto my-2.5">
        <img alt="" src={user.image !== ""? user.image : user.photoURL ? user.photoURL : userimg}
          className="h-full" />
      </div>
      <h1 className="text-4xl">
        Hola {user.firstname !== "" ? user.firstname + " " + user.lastname
          : user.displayName !== "" ? user.displayName : "Usuario"}
      </h1>
      <h2>Tel: {user.phone}</h2>
      <h3>Email:{user.email}</h3>
    </div>
  );
};
