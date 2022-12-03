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

            if (data) {
                const { id } = data;
                return id;
            }
            else return []
        }
        catch (error) {
            console.error(error.message)
        }
    }
}

//COLLECTIONS
export const getUserCollections = async (userID) => {
    if (userID) {
        try {
            let { data, error, status } = await supabase
                .from('collections')
                .select(`
                    collection_set_id, id,
                    sets (*)
                `)
                .eq('creator_id', userID)

            if (error && status !== 406) {
                throw error;
            }

            if (data){
                return data;
            }
            else return []
        }
        catch (error) {
            console.error(error.message)
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
        console.error(error.message)
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

        return data
    }
    catch (error) {
        console.error(error.message)
        return []
    }
}

export const deleteCollection = async (collection_id) => {
    try {
        let { data, error, status } = await supabase
            .from('collections')
            .delete()
            .eq('id',collection_id)

        if (error && status !== 406) {
            throw error
        }

    }
    catch (error) {
        console.error(error.message)
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
        console.error(error.message)
    }
}

export const fetchCardsInSet = async (set_id) => {
    try {
        let { data, error, status } = await supabase
            .from('cards')
            .select()
            .eq('card_set', set_id)

        if (error && status !== 406) {
            throw error
        }

        return sortCards(data);
    }
    catch (error) {
        console.error(error.message)
        return []
    }
}

export const sortCards = (cards) => {
    if (cards) {
        for (let i = 0; i < cards.length; i++) {
            cards.sort(function(a,b) {return a.number - b.number})
        }

        return cards
    }
    else {
        return []
    }
}

//CARDS_COLLECTIONS
export const fetchCardsCollection = async (collection_id) => {
    try {
        let { data, error, status } = await supabase
            .from('cards_collections')
            .select('card_id')
            .eq('collection_id', collection_id)

        if (error && status !== 406) {
            throw error
        }

        return data;
    }
    catch (error) {
        console.error(error.message)
        return []
    }
}

export const addCardToCollection = async (card_id, collection_id) => {
    try {
        let { data, error, status } = await supabase
            .from('cards_collections')
            .insert({
                card_id,
                collection_id
            })
            .select()

        if (error && status !== 406) {
            throw error
        }

        return data;
    }
    catch (error) {
        console.error(error.message)
        return []
    }

}

export const removeCardFromCollection = async (card_id, collection_id) => {
    try {
        let { data, error, status } = await supabase
            .from('cards_collections')
            .delete()
            .match({
                'card_id': card_id,
                'collection_id': collection_id
            })
            .select()

        if (error && status !== 406) {
            throw error
        }

        return data

    }
    catch (error) {
        console.error(error.message)
        return []
    }

}
