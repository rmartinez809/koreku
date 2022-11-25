//
// This file contains functions used for API calls and helpers
//

import { supabase } from "../supabaseClient";

export const getProfile = async (session) => {
    if (session) {
        try {
            const { user } = session;

            let { data, error, status } = await supabase
                .from('profiles')
                .select('id')
                .eq('id', user.id)
                .single()

            if (error && status !== 406) {
                throw error
            }

            const { id } = data;
            return id;
        }
        catch (error) {
            alert(error.message)
        }
    }
}

export const getUserCollections = async (userID) => {
    if (userID) {
        try {
            let { data, error, status } = await supabase
                .from('collections')
                .select('collection_set')
                .eq('creatorId', userID)

            if (error && status !== 406) {
                throw error;
            }

            return data;

        }
        catch (error) {
            alert(error.message)
        }
    }
    else {
        return []
    }
}