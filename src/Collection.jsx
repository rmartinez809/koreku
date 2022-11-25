import { useState, useEffect } from 'react'
import { supabase } from './supabaseClient'
import { getProfile } from './api/api-index'

const Collection = ({ session }) => {
  useEffect(() => {
    getProfile(session)
  }, [session])


  return (
    <div>
      <h3>My Collections</h3>
      <p>There are currently no items in your collection...</p>
      <button type="button" className="button block" onClick={() => supabase.auth.signOut()}>
        Sign Out
      </button>
    </div>
  )
}

export default Collection