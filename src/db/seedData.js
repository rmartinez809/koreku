const { supabase } = require('../supabaseClient');
const fetch = require('node-fetch')
const BASEURL = 'https://api.pokemontcg.io/v2/';

const insertSets = async () => {
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

            console.log("  finished adding data to sets table...")
        }
    }
    catch (error) {

    }

}
const fetchSet = async () => {
    try {
        console.log("  fetching set data...")
        //fetch all Base series sets
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

const insertCards = async () => {
    console.log("* inserting data into cards table...")

    try {
        const { data } = await fetchCards();

        if (data) {
            data.forEach(async element => {
                const { data, error } = await supabase
                .from('cards')
                .insert(
                   { card_id: element.id ,
                    name: element.name ,
                    card_set: element.set.id ,
                    img_sm: element.images.small ,
                    img_lg: element.images.large,
                     number: Number(element.number)}
                )
            });

            console.log("  finished adding data to cards table...")
        }
    }
    catch (error) {

    }
}

const fetchCards = async () => {
    try {
        console.log("  fetching card data...");
        //fetch all cards in Base set series
        const response = await fetch(`${BASEURL}/cards?q=set.id:basep`, {
            method: 'GET',
            headers: {
                'Content-Type' : 'application/json'
            }
        })
        const data = await response.json();

        return data
    }
    catch (error) {
        throw error;
    }
}

const buildDB = async () => {
    console.log("Building DB...");
    // await insertSets();
    await insertCards();
}

module.exports = {
 buildDB
}