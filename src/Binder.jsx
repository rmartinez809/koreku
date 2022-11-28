import { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCollectionInfo, fetchCardsInSet } from "./api/api-index";

const Binder = () => {
    const { collectionID } = useParams();

    const [collectionName, setCollectionName] = useState('')
    const [allCardsInSet, setAllCardsInSet] = useState([])

    useEffect( () => {
        async function fetchData() {
            const data = await getCollectionInfo(collectionID)
            setCollectionName(data.custom_name)
        }
        fetchData()
    }, [])

    useEffect( () => {
        async function fetchData() {
            const data = await getCollectionInfo(collectionID)
            setAllCardsInSet(await fetchCardsInSet(data.collection_set_id))
        }
        fetchData()
    }, [])

    return (
        <div className="binder-container container-padding">
                    {console.log(allCardsInSet)}

            <h3>{collectionName}</h3>
            <div className="cards-container">
                {
                    allCardsInSet.map( element => {
                        return (
                            <div className="card card-bg-color pkmn-card"
                            key={element.id}>
                                <img src={element.img_sm}></img>
                            </div>
                        )
                    })
                }
            </div>
            {console.log(allCardsInSet)}
        </div>
    )
}

export default Binder