import './index.css'
import { useState, useEffect } from 'react'
import { supabase } from './supabaseClient'
import Auth from './Auth'
import Collection from './Collection'
import { Route } from 'react-router';
import { BrowserRouter as Router, Routes } from 'react-router-dom'

export default function App() {
  const [session, setSession] = useState(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])

  return (
    <Router>
      <div>
        {!session ?
        <Routes>
          <Route exact path ="/" element={<Auth />}/>
          <Route exact path ="/register" element={<Auth />}/>
        </Routes>
        : <Collection session={session} />}
      </div>
    </Router>

  )
}