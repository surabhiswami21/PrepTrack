import { useEffect, useState } from "react";
import api, { getApiErrorMessage } from "../services/api";

function CodingHub() {
    const [companies, setCompanies] = useState([]);
    const [companyId, setCompanyId] = useState("");
    const [questions, setQuestions] = useState([]);
    const [search, setSearch] = useState("");
    const [difficulty, setDifficulty] = useState("");
    const [loading, setLoading] = useState(true);
    const [companiesLoading, setCompaniesLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        api.get("/api/company-preparation/companies")
            .then(({ data }) => {
                setCompanies(data);
                if (data.length > 0) setCompanyId(String(data[0].id));
            })
            .catch((error) => setError(getApiErrorMessage(error, "Unable to load companies.")))
            .finally(() => setCompaniesLoading(false));
    }, []);

    useEffect(() => {
        if (!companyId) {
            void Promise.resolve().then(() => setLoading(false));
            return;
        }
        void Promise.resolve().then(() => setLoading(true));
        const params = new URLSearchParams({ companyId, section: "CODING" });
        if (search.trim()) params.set("search", search.trim());
        if (difficulty) params.set("difficulty", difficulty);
        api.get(`/api/company-preparation/questions?${params}`)
            .then(({ data }) => setQuestions(data))
            .catch((error) => setError(getApiErrorMessage(error, "Unable to load coding preparation.")))
            .finally(() => setLoading(false));
    }, [companyId, search, difficulty]);

    return (

        <div className="container">

            <h1>Previous Year Coding Questions</h1>

            <select value={companyId} onChange={(event) => setCompanyId(event.target.value)}>
                <option value="">Select company</option>
                {companies.map((company) => <option key={company.id} value={company.id}>{company.companyName}</option>)}
            </select>
            <input placeholder="Search subject, topic, or question" value={search} onChange={(event) => setSearch(event.target.value)} />
            <select value={difficulty} onChange={(event) => setDifficulty(event.target.value)}>
                <option value="">All difficulties</option>
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
            </select>

            {error && <p role="alert">{error}</p>}
            {companiesLoading && <p>Loading companies...</p>}
            {!companiesLoading && !error && companies.length === 0 && <p>No companies available yet.</p>}
            {loading && companyId && <p>Loading coding preparation...</p>}
            {!loading && !error && companyId && questions.length === 0 && <p>No coding preparation found.</p>}

            {questions.map((item) => (

                <div
                    key={item.id}
                    className="card"
                >

                    <h2>{item.question.topic.subject.name} → {item.question.topic.name}</h2>
                    <p>{item.question.questionText}</p>
                    <small>{item.question.difficulty} · {item.sourceType}</small>

                </div>

            ))}

        </div>

    );
}

export default CodingHub;