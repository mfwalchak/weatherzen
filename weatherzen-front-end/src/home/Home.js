import { useEffect, useState } from "react";
import { listObservations } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import { Link } from "react-router-dom";

function Home() {
  const [observations, setObservations] = useState([]);
  const [error, setError] = useState(null);

useEffect(() => {
  const abortController = new AbortController();
  listObservations(abortController.signal)
    .then(setObservations)
    .catch(setError);
  return () => abortController.abort();
}, []);

const tableRows = observations.map((observation)=> (
  <tr key={observation.observation_id}>
    <th scope="row">{observation.observation_id}</th>
    <td>{observation.latitude}</td>
    <td>{observation.longitude}</td>
    <td>{observation.sky_condition}</td>
    <td>{observation.created_at}</td>
    <td>{observation.updated_at}</td>
    <Link className="nav-link active" to={`/observations/edit/${observation.observation_id}`}>edit</Link>
  </tr>
));

  return (
    <main>
      <h1>Home</h1>
      <ErrorAlert error={error} />
      <table className="table">
        <thead>
          <tr>
            <th scope="col">id#</th>
            <th scope="col">Latitude</th>
            <th scope="col">Longitude</th>
            <th scope="col">Sky Condition</th>
            <th scope="col">Created</th>
            <th scope="col">Updated</th>
          </tr>
        </thead>
        <tbody>
          {tableRows}
        </tbody>
      </table>
    </main>
  );
}

export default Home;
