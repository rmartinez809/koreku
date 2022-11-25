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

            if (data) {
                console.log(await getSets(user.id));
            }
        }
        catch (error) {
            alert(error.message)
        }
    }
}

export const getSets = async (userId) => {
    if (userId) {
        try {
            let { data, error, status } = await supabase
                .from('collections')
                .select('collectionName')
                .eq('creatorId', userId)

            if (error && status !== 406) {
                throw error;
            }

            return data;

        }
        catch (error) {
            alert(error.message)
        }
    }
}