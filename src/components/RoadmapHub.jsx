import { useEffect, useState } from "react";
import api, { getApiErrorMessage } from "../services/api";

function RoadmapHub() {
    const [companies, setCompanies] = useState([]);
    const [companyId, setCompanyId] = useState("");
    const [roadmap, setRoadmap] = useState(null);
    const [steps, setSteps] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.get("/api/company-preparation/companies")
            .then(({ data }) => {
                setCompanies(data);
                if (data.length > 0) setCompanyId(String(data[0].id));
            })
            .catch((error) => setError(getApiErrorMessage(error, "Unable to load companies.")))
            .finally(() => setLoading(false));
    }, []);

    useEffect(() => {
        if (!companyId) return;
        api.get(`/api/company-preparation/companies/${companyId}`)
            .then(({ data }) => {
                setRoadmap(data.roadmap);
                setSteps(data.roadmapSteps || []);
            })
            .catch((error) => setError(getApiErrorMessage(error, "Unable to load this roadmap.")))
            .finally(() => setLoading(false));
    }, [companyId]);

    return (

        <div className="dashboard">

            <h1>🗺 Company Roadmaps</h1>
            {loading && <p>Loading roadmap...</p>}

            <select value={companyId} onChange={(event) => setCompanyId(event.target.value)}>
                <option value="">Select company</option>
                {companies.map((company) => <option key={company.id} value={company.id}>{company.companyName}</option>)}
            </select>
            {error && <p role="alert">{error}</p>}
            {!loading && !error && companies.length === 0 && <p>No companies available yet.</p>}
            {!loading && !error && companyId && !roadmap && <p>No roadmap available yet.</p>}

            {roadmap && (

                <div
                    key={roadmap.id}
                    className="history-card"
                >

                    <h2>{roadmap.title}</h2>
                    <p>{roadmap.description}</p>

                    <ol>

                        {steps.map((step) => (

                            <li key={step.id}>
                                <strong>{step.phase}</strong> · {step.subject} · {step.topic} · {step.activity}
                            </li>

                        ))}

                    </ol>

                </div>

            )}

        </div>

    );

}

export default RoadmapHub;