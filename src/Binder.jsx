import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCollectionInfo, fetchCardsInSet, fetchCardsCollection } from "./api/api-index";

const Binder = () => {
    const { collectionID } = useParams();

    const [collectionName, setCollectionName] = useState('')
    const [allCardsInSet, setAllCardsInSet] = useState([])
    const [cardsInCollection, setCardsInCollection] = useState([])

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

    useEffect( () => {
        async function fetchData() {
            setCardsInCollection(await fetchCardsCollection(collectionID));
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
                                <img src={element.img_sm}
                                    //if card doesn't exist in collection make it transparent
                                    className={
                                        cardsInCollection.map(item => item.card_id).includes(element.card_id) ? "test-class" : "transparent"
                                    }>
                                </img>
                                <div className="pkmn-card-footer">
                                    <label className="switch">
                                        <input type="checkbox"></input>
                                        <span className="slider round"></span>
                                    </label>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
            {console.log(allCardsInSet)}
            {console.log(cardsInCollection)}
        </div>
    )
}

export default Binder