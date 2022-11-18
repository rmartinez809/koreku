import { Fragment, useState } from "react";
import { supabase } from "./supabaseClient";

export default function Auth() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPass, setConfirmPass] = useState('');

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
      const { data, error } = await supabase.auth.signUp({
        email,
        password
      })
      if (error) throw error;
      alert('Success! Please confirm your email address before signing in');
    }
    catch (error) {
      alert(error.error_description || error.message);
    } finally { clearFields() }
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
  }

  // onSubmit={(match.url === '/register') ? handleSignUp : handleLogin}

  return (
    <Fragment>
      <main>
      <div className="intro-text-container">
        <h1 className="">Koreku</h1>
        <p>A new way to organize your collection</p>
      </div>
      <div className="card login">
        <div className="card-body d-grid gap-2">
          <form id="login" className="d-grid gap-3" >
            <input type="email" className="form-control" id="email" placeholder="Email" value={email}
              onChange={(event) => {
                setEmail(event.target.value);
              }}
            ></input>
            <input type="password" className="form-control" id="password" placeholder="Password" minLength={minPassLen} value={password}
              onChange={(event) => {
                setPassword(event.target.value);
              }}
            ></input>
            <button type="submit" className="btn btn-primary">LOGIN</button>
          </form>
          <hr></hr>
          <p>Or login with</p>
          <div className="d-grid gap-2">
            <button className="btn btn-secondary"
            onClick={signInWithGoogle}
              >Sign in with Google</button>
          </div>
          <p>Not a member? <a href="/register">Sign up now</a></p>
        </div>
      </div>
      </main>
  </Fragment>
  )
}