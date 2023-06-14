import React, {useContext} from 'react';
import { Link } from 'react-router-dom';
import {useForm} from "react-hook-form";
import axios from "axios";
import {AuthContext} from "../context/AuthContext";

function SignUp() {

    const {register, handleSubmit} = useForm()
    const { login } = useContext(AuthContext);


    async function registerUser(data) {
        try {
            const response = await axios.post('http://localhost:3000/register', {
                email: data.email,
                password: data.password,
                username: data.username,
            })
            login(data);
        } catch (e) {
            console.error(e)
        }
    }
  return (
    <>
      <h1>Registreren</h1>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur atque consectetur, dolore eaque eligendi
        harum, numquam, placeat quisquam repellat rerum suscipit ullam vitae. A ab ad assumenda, consequuntur deserunt
        doloremque ea eveniet facere fuga illum in numquam quia reiciendis rem sequi tenetur veniam?</p>
      <form onSubmit={handleSubmit(registerUser)}>
          <label htmlFor="email-field">email<input type="email" id="email-field" {...register("email")}/></label>
          <label htmlFor="password-field">password<input type="password" id="password" {...register("password")}/></label>
          <label htmlFor="username-field">username<input type="text" id="username-field" {...register("username")}/></label>
          <button type="submit">Submit</button>
      </form>
      <p>Heb je al een account? Je kunt je <Link to="/signin">hier</Link> inloggen.</p>
    </>
  );
}

export default SignUp;