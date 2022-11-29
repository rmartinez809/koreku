import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getCollectionInfo, fetchCardsInSet, fetchCardsCollection, addCardToCollection, removeCardFromCollection, deleteCollection, getUserCollections } from "./api/api-index";

const Binder = ({ setUserCollection, userID, userCollection }) => {
    const navigate = useNavigate();

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

            if (response.length > 0) {
                cardImageElement.classList.remove('transparent')
                setCardsInCollection(await fetchCardsCollection(collectionID));
            }
        }
    }

    //delete all cards in collection
    //then delete entry in cards_collections table
    const handleDeleteCollection = async () => {

        async function deleteCardsInCollection() {
            cardsInCollection.forEach( async card => {
                await removeCardFromCollection(card.card_id, collectionID)
            })
        }

        async function removeCollection() {
            setTimeout(async () => {
                await deleteCollection(collectionID)
            }, 2000)
        }

        async function updateCollectionState() {
            setUserCollection(await getUserCollections(userID))
        }

        async function removeUserCollection() {
            await deleteCardsInCollection()
            await removeCollection()
            await updateCollectionState()
            setTimeout( () => {
                alert("Collection deleted")
                navigate('/')
            }, 1000)
        }

        removeUserCollection();
    }


    return (
        <div className="binder-container container-padding">
            <h3>{collectionName}
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16"
            onClick={ () => {
                handleDeleteCollection()
            }}>
            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
            <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
            </svg>
            </h3>

            <div className="cards-container">
                {
                    allCardsInSet.map( element => {
                        return (
                            <div className="card card-bg-color pkmn-card"
                            key={element.id}>
                                <img src={element.img_sm}
                                    alt="pokemon card"
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