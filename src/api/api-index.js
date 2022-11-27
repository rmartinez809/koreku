//
// This file contains functions used for API calls and helpers
//

import { supabase } from "../supabaseClient";

//USER PROFILE
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

//COLLECTIONS
export const getUserCollections = async (userID) => {
    if (userID) {
        try {
            let { data, error, status } = await supabase
                .from('collections')
                .select('collection_set_id')
                .eq('creator_id', userID)

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

export const createNewCollection = async (collection_set_id, custom_name, creator_id) => {
    try {
        let { data, error, status } = await supabase
            .from('collections')
            .insert ({
                collection_set_id,
                custom_name,
                creator_id
            })
            .select()
            .single()

        if (error && status !== 406) {
            throw error
        }

        alert("Successfully created collection!")

        return data;
    }
    catch (error) {
        alert(error.message)
    }
}

export const getCollectionInfo = async (collection_id) => {
    try {
        let { data, error, status } = await supabase
            .from('collections')
            .select()
            .eq('id',collection_id)
            .single()

        if (error && status !== 406) {
            throw error
        }

        console.log(data)
        return data
    }
    catch (error) {
        alert(error.message)
        return []
    }
}

//SETS
//Get all sets
export const fetchSets = async() => {
    try {
        let { data, error, status } = await supabase
            .from('sets')
            .select()

        if (error && status !== 406) {
            throw error
        }

        return data
    }
    catch (error) {
        alert(error.message)
    }
}

//CARDS
// //Get cards from a collection's set
// export const fetchCardsCollectionSet = async (collection_id) => {
//         try {
//             //grab the set id for the collection
//             let { data, error, status } = await supabase
//                 .from('collections')
//                 .select(`
//                     collection_set_id,
//                     sets (
//                         set_id
//                     )
//                 `)
//                 .eq('id', collection_id)
//                 .single()

//             if (error && status !== 406) {
//                 throw error
//             }

//             //get cards in collection
//             if (data) {
//                return await fetchCardsInSet(data.collection_set_id)
//             }
//         }
//         catch (error) {
//             alert(error.message)
//             return []
//         }
//     }

export const fetchCardsInSet = async (set_id) => {
    try {
        let { data, error, status } = await supabase
            .from('cards')
            .select()
            .eq('card_set', set_id)

        if (error && status !== 406) {
            throw error
        }

        return data;
    }
    catch (error) {
        alert(error.message)
        return []
    }
}


