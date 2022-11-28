import './index.css'
import { useState, useEffect, Fragment } from 'react'
import { supabase } from './supabaseClient'
import Auth from './Auth'
import Collection from './Collection'
import Binder from './Binder'
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
          <Route path ="/" element={<Auth />}/>
          <Route path ="/register" element={<Auth />}/>
        </Routes>
        :
        <Routes>
          <Route path="/" element={<Collection session={session}/>} />
          <Route path="/mycollections/:collectionID" element={<Binder />} />
        </Routes>
        }
      </div>
    </Router>

  )
}