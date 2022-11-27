import { useState, useEffect } from 'react'
import { supabase } from './supabaseClient'
import { getProfile, getUserCollections } from './api/api-index'
import SelectSet from './SelectSet'

const Collection = ({ session }) => {
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
    <div className='collections-container container-padding'>
      <div className="modal fade" id="selectSetsModal" tabIndex="-1" aria-labelledby="selectSetsModal" aria-hidden="true">
        <SelectSet userID={userID}/>
      </div>
      <h3>Collections</h3>
      <button type="button"
        className='add-new-btn'
        title="Add new collection"
        data-bs-toggle="modal"
        data-bs-target="#selectSetsModal">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#e3e7ea" className="bi bi-plus-square" viewBox="0 0 16 16">
          <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
          <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
          </svg>
      </button>
      {/* {userCollection.length === 0 ? "" : <p>You have {userCollection.length} collections!</p> } */}
      <button type="button" className="button block sign-out-btn" onClick={() => supabase.auth.signOut()}>
        Sign Out
      </button>
    </div>
  )
}

export default Collection