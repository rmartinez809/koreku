import { useState, useEffect, Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { fetchSets, createNewCollection } from "./api/api-index";

const SelectSet = ({ userID }) => {
    const [sets, setSets] = useState([]);

    const navigate = useNavigate();

    useEffect( () => {
        async function fetchData() {
            setSets(await fetchSets());
        }
        fetchData()
    }, [])

    const handleNewCollection = async (set_id, set_name) => {
        const response = await createNewCollection(set_id, set_name, userID)
        //close modal after creating set
        const closeModalBtn = document.getElementById('close-modal');
        closeModalBtn.click();
        navigate(`/mycollections/${response.id}`)
    }


    return (
        <Fragment>
            <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                <div className="modal-content">
                <div className="modal-header">
                    <h1 className="modal-title fs-5" id="modalTitle">Select a set</h1>
                    <button type="button" className="btn-close" id="close-modal" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                    {sets.map( element => {
                        return (
                            <div className="card card-bg-color set-card"
                            key={element.id}
                            title={element.set_name}
                            onClick={ () => {
                                 handleNewCollection(element.set_id, element.set_name)}}>
                            <img alt="set symbol" src={element.logo}></img>
                            </div>
                        )
                    })}
                </div>
                <div className="modal-footer">
                </div>
                </div>
            </div>
        </Fragment>
    )
}

export default SelectSet;