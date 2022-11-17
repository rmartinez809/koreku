import { Fragment, useState } from "react";
import { supabase } from "./supabaseClient";

export default function Auth() {
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

  return (
    <Fragment>
      <main>
      <div className="intro-text-container">
        <h1 className="">Koreku</h1>
        <p>A new way to organize your collection</p>
      </div>
      <div className="card login">
        <div className="card-body d-grid gap-2">
          <h5 className="card-title">LOGIN</h5>
          <input type="email" className="form-control" id="email" placeholder="Email"></input>
          <input type="password" className="form-control" id="password" placeholder="Password"></input>
          <button type="button" className="btn btn-primary">LOGIN</button>
          <hr></hr>
          <p>Or login with</p>
          <div className="d-grid gap-2 d-md-block">
            <button className="btn btn-secondary"
            onClick={signInWithGoogle}
              >Sign in with Google</button>
              <button className="btn btn-secondary">Sign in with Facebook</button>
          </div>
          <p>Not a member? <a href="">Sign up now</a></p>
        </div>
      </div>
      </main>
  </Fragment>
  )
}