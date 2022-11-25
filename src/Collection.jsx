import { useState, useEffect } from 'react'
import { supabase } from './supabaseClient'
import { getProfile, getUserCollections } from './api/api-index'

const Collection = ({ session }) => {
  const [userID, setUserID] = useState('');
  const [userCollection, setUserCollection] = useState([]);

  useEffect(() => {
    async function fetchData() {
      setUserID(await getProfile(session));
    }
    fetchData()
  }, [])

  useEffect(() => {
    async function fetchData() {
      setUserCollection(await getUserCollections(userID));
    }
    fetchData()
  }, [userID])


  return (
    <div>
      <h3>Collections</h3>
      {userCollection.length === 0 ? <p>There are currently no items in your collection...</p> : <p>You have {userCollection.length} collections!</p> }
      <button type="button" className="button block" onClick={() => supabase.auth.signOut()}>
        Sign Out
      </button>
    </div>
  )
}

export default Collection