import './index.css'
import { useState, useEffect } from 'react'
import { supabase } from './supabaseClient'
import Auth from './Auth'
import Collection from './Collection'
import Binder from './Binder'
import { Route } from 'react-router';
import { BrowserRouter as Router, Routes } from 'react-router-dom'
import { getProfile, getUserCollections } from './api/api-index'


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

  const [userID, setUserID] = useState('');
  const [userCollection, setUserCollection] = useState([]);

  useEffect(() => {
    async function fetchData() {
      setUserID(await getProfile(session));
    }
    fetchData()
  }, [session])

  useEffect(() => {
    async function fetchData() {
      setUserCollection(await getUserCollections(userID));
    }
    fetchData()
  }, [userID])


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
          <Route path="/"
            element={<Collection userID={userID}  userCollection={userCollection} setUserCollection={setUserCollection}/>} />
          <Route path="/mycollections/:collectionID"
            element={<Binder
            setUserCollection={setUserCollection} userCollection={userCollection} userID={userID}/>} />
        </Routes>
        }
      </div>
    </Router>

  )
}