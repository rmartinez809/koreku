import { useState, useEffect, Fragment } from "react";
import { fetchSets } from "./api/api-index";

const SelectSet = () => {
    const [sets, setSets] = useState([]);

    useEffect( () => {
        async function fetchData() {
            setSets(await fetchSets());
        }
        fetchData()
    }, [])

    const handleNewCollection = async (set_id) => {
        console.log(set_id)
    }


    return (
        <Fragment>
            <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                <div className="modal-content">
                <div className="modal-header">
                    <h1 className="modal-title fs-5" id="modalTitle">Select a set</h1>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                    {sets.map( element => {
                        return (
                            <div className="card card-bg-color set-card"
                            key={element.id}
                            title={element.set_name}
                            onClick={ () => {
                                handleNewCollection(element.set_name)}}>
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