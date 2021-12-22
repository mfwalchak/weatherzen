import React, { useState }from "react";
import { useHistory, useParams } from "react-router-dom";
import { editObservation } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";

function ObservationEdit(){
    const history = useHistory();
    const { obsId } = useParams();
    const [ error, setError ] = useState(null);
    //sets initial conditions for observation form fields
    const [observation, setObservation] = useState({
        observation_id: obsId,
        latitude: "",
        longitude: "",
        sky_condition: "",
    });

    function cancelHandler() {
        history.push("/");
    }

    function submitHandler(event){
        event.preventDefault();
        editObservation(observation).then(() => {
            history.push("/");
        })
        .catch(setError);
    }

    function changeHandler({ target: { name, value } }) {
        setObservation((previousObservation) => ({
            ...previousObservation,
            [name]: value,
        }));
    }


return (
    <main>
        <h1 className="mb-3">Edit Observation {`${obsId}`}</h1>
        <ErrorAlert error={error} />
        <form onSubmit={submitHandler} className="mb-4">
            <div className="row mb-3">
                <div className="col-6 form-group">
                    <label className="form-label" htmlFor="latitude">
                        Latitude
                    </label>
                    <input
                        className="form-control"
                        id="latitude"
                        name="latitude"
                        type={Number} //use braces to allow js Number type with decimals
                        max="90"
                        min="-90"
                        value={observation.latitude}
                        onChange={changeHandler}
                        require={true}
                    />
                    <small className="form-text text-muted">
                        Enter a value between -90 and 90.
                    </small>
                    </div>
                    <div className="col-6">
                        <label className="form-lable" htmlFor="longitude">
                            Longitude
                        </label>
                        <input
                        className="form-control"
                        id="longitude"
                        name="longitude"
                        type={Number}
                        max="180"
                        min="-180"
                        value={observation.longitude}
                        onChange={changeHandler}
                        require={true}
                    />
                    <small className="form-text text-muted">
                        Enter a value between -180 and 180.
                    </small>
                    </div>
                </div>
                <div className="mb-3">
                    <label className="form-label" htmlFor="cloudCover">
                        Sky Conditions
                    </label>
                    <select
                        className="form-control"
                        id="sky_condition"
                        name="sky_condition"
                        value={observation.sky_condition}
                        onChange={changeHandler}
                        required={true}
                    >
                        <option value="">Select a sky condition option</option>
                        <option value="100">Cloudless</option>
                        <option value="101">Some clouds</option>
                        <option value="102">Cloud covered</option>
                        <option value="103">Foggy</option>
                        <option value="104">Raining</option>
                        <option value="106">Snowing</option>
                        <option value="108">Hailing</option>
                        <option value="109">Thunderstorms</option>
                    </select>
                </div>
                <button
                    type="button"
                    className="btn btn-secondary mr-2"
                    onClick={cancelHandler}
                > Cancel 
                </button>
                <button type="submit" className="btn btn-primary" onClick={()=>console.log(obsId)}>
                    Submit
                </button>
        </form>
    </main>
);
}

export default ObservationEdit;