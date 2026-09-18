import { useEffect, useState } from "react";
import api, { getApiErrorMessage } from "../services/api";

function EligibilityChecker() {
    const [companies, setCompanies] = useState([]);
    const [search, setSearch] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.get("/api/company-preparation/companies")
            .then(({ data }) => Promise.all(data.map((company) =>
                api.get(`/api/company-preparation/companies/${company.id}`)
                    .then(({ data: detail }) => ({
                        ...detail.company,
                        recruitment: detail.recruitment
                    }))
            )))
            .then(setCompanies)
            .catch((error) => setError(getApiErrorMessage(error, "Unable to load eligibility data.")))
            .finally(() => setLoading(false));
    }, []);

    const filteredCompanies = companies.filter((company) =>
        `${company.companyName} ${company.batch} ${company.category}`.toLowerCase().includes(search.toLowerCase())
    );

    return (

        <div className="dashboard">

            <h1>🎯 Eligibility Checker</h1>
            <input placeholder="Search company or batch" value={search} onChange={(event) => setSearch(event.target.value)} />
            {loading && <p>Loading eligibility data...</p>}
            {error && <p role="alert">{error}</p>}
            {!loading && !error && filteredCompanies.length === 0 && <p>No eligibility data available yet.</p>}

            {filteredCompanies.map((company) => {
                const recruitment = company.recruitment || {};
                return (

                    <div
                        key={company.id}
                        className="card"
                    >

                        <h2>{company.companyName}</h2>
                        <p>Batch: {company.batch || "Not specified"}</p>
                        <p>Eligibility: {recruitment.eligibility || "Not specified in available source material."}</p>
                        <p>Roles: {recruitment.roles || "Not specified"}</p>
                        <p>Location: {recruitment.location || company.location || "Not specified"}</p>
                        <p>Joining: {recruitment.joining || "Not specified"}</p>
                        {recruitment.educationGap && <p>Education gap: {recruitment.educationGap}</p>}
                        {recruitment.notes && <p>{recruitment.notes}</p>}

                    </div>
                );
            })}

        </div>

    );

}

export default EligibilityChecker;