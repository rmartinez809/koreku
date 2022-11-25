const { supabase } = require('../supabaseClient');
const fetch = require('node-fetch')
const BASEURL = 'https://api.pokemontcg.io/v2/';

const insertSet = async () => {
    console.log("* inserting data into sets table...")

    try {
        const { data } = await fetchSet();

        if (data) {
            data.forEach(async element => {
                const { data, error } = await supabase
                .from('sets')
                .insert(
                   { set_id: element.id ,
                    set_name: element.name ,
                    set_series: element.series ,
                    release_date: element.releaseDate ,
                    symbol: element.images.symbol ,
                    logo: element.images.logo }
                )
            });

            console.log("  finished adding row to sets table...")
        }
    }
    catch (error) {

    }

}
const fetchSet = async () => {
    try {
        console.log("  fetching set data...")
        const response = await fetch(`${BASEURL}/sets?q=series:base`, {
            method: 'GET',
            headers: {
                'Content-Type' : 'application/json'
            }
        })
        const data = await response.json();

        return data;
    }
    catch (error) {
        throw error;
    }
}

const buildDB = async () => {
    console.log("Building DB...");
    await insertSet();
}

module.exports = {
 buildDB
}