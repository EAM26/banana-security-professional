import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import {useForm} from "react-hook-form";
import axios from "axios";


function SignIn() {
  const { login } = useContext(AuthContext);
  const { register, handleSubmit} = useForm();




    async function loginUser(data) {
        try {
            const response = await axios.post('http://localhost:3000/login', {
                email: data.email,
                password: data.password,
            }
        )
            // console.log(data)
            login(response.data.accessToken)
        } catch (e) {
            console.error(e)
        }
    }


  return (
    <>
      <h1>Inloggen</h1>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab alias cum debitis dolor dolore fuga id molestias qui quo unde?</p>

      <form onSubmit={handleSubmit(loginUser)}>
          <label htmlFor="email-field">email<input type="email" {...register("email")}/></label>
          <label htmlFor="password-field">password<input type="password" {...register("password")}/></label>
        <button type="submit">Inloggen</button>
      </form>

      <p>Heb je nog geen account? <Link to="/signup">Registreer</Link> je dan eerst.</p>
    </>
  );
}

export default SignIn;