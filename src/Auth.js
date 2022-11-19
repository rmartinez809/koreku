import { Fragment, useState } from "react";
import { supabase } from "./supabaseClient";
import React from "react";
import { useLocation, Link } from "react-router-dom";
import googleIcon from './icons/google.png';

export default function Auth() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPass, setConfirmPass] = useState('');

  const location = useLocation();

  const minPassLen = 6;

  const handleLogin = async(event) => {
    event.preventDefault();

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      })
      if (error) throw error
    }
    catch (error) {
      alert(error.error_description || error.message)
    }
    finally { clearFields() }
  }

  const handleSignUp = async(event) => {
    event.preventDefault();

    try {
      if (password !== confirmPass) {
        throw new Error("Passwords must match! Please try again");
      }

      const { data, error } = await supabase.auth.signUp({
        email,
        password
      })
      if (error) throw error;
    }
    catch (error) {
      alert(error.error_description || error.message);
    }
  }

  const signInWithGoogle = async() => {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google'
      })
    }
    catch (error) {
      alert(error.error_description || error.message);
    }
  }

  const clearFields = () => {
    setEmail('');
    setPassword('');
    setConfirmPass('');
  }

  return (
    <Fragment>
      <main>
      <div className="intro-text-container">
        <h1 className="">Koreku</h1>
        <p>A new way to organize your collection</p>
      </div>
      <div className="card login-card card-bg-color">
        <div className="card-body d-grid gap-2 center-text">
          <form
            id="login"
            className="d-grid gap-3"
            onSubmit={(location.pathname === '/register') ? handleSignUp : handleLogin}>
            <input type="email"
            className="form-control input-bg"
            id="email"
            placeholder="Email"
            value={email} required
              onChange={(event) => {
                setEmail(event.target.value);
              }}
            ></input>
            <input type="password"
            className="form-control input-bg"
            id="password"
            placeholder="Password"
            minLength={minPassLen}
            value={password} required
              onChange={(event) => {
                setPassword(event.target.value);
              }}
            ></input>
            {/**
             Change available fields if user is at /register url
            */}
            {location.pathname === "/register" ?
              <Fragment>
                <input type="password"
                className="form-control input-bg"
                id="confirmPass"
                placeholder="Confirm Password"
                value={confirmPass}
                required
                onChange={(event) => {
                  setConfirmPass(event.target.value);
                }}></input>
                <button type="submit"
                className="btn btn-primary"
                id="register-btn">Sign Up</button>
              </Fragment>
              : <button type="submit"
                className="btn btn-primary"
                id="login-btn">Log In</button>}
          </form>
          <hr></hr>
          <p className="secondary">Or login with</p>
          <div className="d-grid gap-2">
            <button className="btn btn-secondary"
            id="btn-Google"
            onClick={signInWithGoogle}><img src={googleIcon} id="google-icon"></img>Google</button>
          </div>
            {location.pathname === "/" ?
            <p className="secondary">Not a member? <Link to="/register">Sign up</Link></p> : <p className="secondary">Already have an account? <Link to="/">Log In</Link></p>}
        </div>
      </div>
      </main>
  </Fragment>
  )
}