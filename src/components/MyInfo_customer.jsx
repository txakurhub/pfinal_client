import React, { useState } from "react";


export const MyInfo_customer = async () => {

  const [user, setUser] = useState({
    name: "",
    lastName: "",
    password: "",
    email: "",
    img: "",
    phone: "",
  });

  const handleChange = async (e) => {
    e.preventDefault();

    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section>
      <div>
        <form>
          <label htmlFor="name" name="name">
            Name
          </label>
          <input type="text" />
          <label htmlFor="lastName" name="lastName">
            Last Name
          </label>
          <input type="text" />
          <label htmlFor="email" name="email">
            E-Mail
          </label>
          <input type="email" />
          <label htmlFor="img" name="img">
            Image
          </label>
          <input type="image" alt="profile_image" />
          <label htmlFor="phone" name="phone">
            Phone
          </label>
          <input type="number" />
          <button onSubmit={handleChange}>Change it!</button>
        </form>
      </div>
    </section>
  );
};
