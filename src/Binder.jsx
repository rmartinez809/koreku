import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCollectionInfo, fetchCardsInSet, fetchCardsCollection, addCardToCollection, removeCardFromCollection } from "./api/api-index";

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


    const handleEditCollection = async (card_id) => {
        const cardImageElement = document.getElementById(card_id);

        //if the card exists in the collection
            //remove it from the collection
            //add the transparency class
        //else:
            //add it to the collection
            //remove the transparency class
        if (cardsInCollection.map(item => item.card_id).includes(card_id)) {
            await removeCardFromCollection(card_id, collectionID)
            setCardsInCollection(await fetchCardsCollection(collectionID));
            cardImageElement.classList.add('transparent')
        }
        else {
            const response = await addCardToCollection(card_id, collectionID)

            if (response) {
                cardImageElement.classList.remove('transparent')
                setCardsInCollection(await fetchCardsCollection(collectionID));
            }
        }

    }

    return (
        <div className="binder-container container-padding">
            <h3>{collectionName}</h3>
            <div className="cards-container">
                {
                    allCardsInSet.map( element => {
                        return (
                            <div className="card card-bg-color pkmn-card"
                            key={element.id}>
                                <img src={element.img_sm}
                                    id={element.card_id}
                                    //if card doesn't exist in collection make it transparent
                                    className={
                                        cardsInCollection.map(item => item.card_id).includes(element.card_id) ? "" : "transparent"
                                    }>
                                </img>
                                <div className="pkmn-card-footer">
                                    <label className="switch">
                                        <input type="checkbox"
                                            id={`btn-${element.card_id}`}
                                            defaultChecked={cardsInCollection.map(item => item.card_id).includes(element.card_id) ? true : false}
                                            onChange={() => {
                                                handleEditCollection(element.card_id);
                                            }}
                                        ></input>
                                        <span className="slider round"></span>
                                    </label>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
            {/* {console.log(allCardsInSet)}
            {console.log(cardsInCollection)} */}
        </div>
    )
}

export default Binder