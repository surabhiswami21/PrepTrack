import { useEffect, useState } from "react";
import api, { getApiErrorMessage } from "../services/api";

function StatsHub() {
    const [stats, setStats] = useState(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.get("/api/statistics")
            .then(({ data }) => setStats(data))
            .catch((error) => setError(getApiErrorMessage(error, "Unable to load statistics.")))
            .finally(() => setLoading(false));
    }, []);

    return (

        <div className="dashboard">

            <h1>Statistics 📈</h1>

            {loading && <p>Loading statistics...</p>}

            <div className="card-container">

                <div className="card">
                    <h2>DSA</h2>
                    <p>{stats?.dsaSolved ?? "-"}</p>
                </div>

                <div className="card">
                    <h2>SQL</h2>
                    <p>{stats?.sqlQueries ?? "-"}</p>
                </div>

                <div className="card">
                    <h2>Revision</h2>
                    <p>{stats?.revisions ?? "-"}</p>
                </div>

                <div className="card">
                    <h2>Planner</h2>
                    <p>{stats ? `${stats.plannerCompleted}/${stats.plannerTotal}` : "-"}</p>
                </div>

            </div>

            {error && <p role="alert">{error}</p>}
            {!loading && !error && !stats && <p>No statistics available yet.</p>}

        </div>

    );
}

export default StatsHub;