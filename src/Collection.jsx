import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from './supabaseClient'
import SelectSet from './SelectSet'
import { getUserCollections } from './api/api-index'

const Collection = ({ userID, userCollection, setUserCollection }) => {
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      setUserCollection(await getUserCollections(userID));
    }
    fetchData()
  }, [userCollection])


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
      <div className='my-collections'>
        {
          userCollection.map( element => {
            return (
              <div className='card card-bg-color set-card'
                key={element.id}
                title={element.sets.set_name}
                  onClick={ () => {
                    navigate(`/mycollections/${element.id}`)
                  }
                  }>
                  <img src={element.sets.logo} alt="set logo"></img>
              </div>
            )
          })
        }
      </div>
      <button type="button" className="button block sign-out-btn" onClick={() => supabase.auth.signOut()}>
        Sign Out
      </button>
    </div>
  )
}

export default Collection