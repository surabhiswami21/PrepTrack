import { useEffect, useState } from "react";
import api, { getApiErrorMessage } from "../services/api";

function QuestionList({ title, questions }) {
    return (
        <section className="history-card interview-section">
            <h2>{title}</h2>
            <ul>
                {questions.map((question) => (
                    <li key={question}>{question}</li>
                ))}
            </ul>
        </section>
    );
}

function InterviewHub() {
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
        const params = new URLSearchParams({ companyId, section: "TECHNICAL_INTERVIEW" });
        if (search.trim()) params.set("search", search.trim());
        if (difficulty) params.set("difficulty", difficulty);
        api.get(`/api/company-preparation/questions?${params}`)
            .then(({ data }) => setQuestions(data))
            .catch((error) => setError(getApiErrorMessage(error, "Unable to load technical interview questions.")))
            .finally(() => setLoading(false));
    }, [companyId, search, difficulty]);

    return (
        <div className="dashboard interview-hub">
            <h1>Interview Hub</h1>
            <p className="page-intro">
                Prepare company-wise technical, HR, and coding questions in one focused space.
            </p>

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
            {loading && companyId && <p>Loading technical interview questions...</p>}
            {!loading && !error && companyId && questions.length === 0 && <p>No technical interview questions found.</p>}

            {questions.map((item) => (
                <div className="interview-company" key={item.id}>
                    <div className="interview-company-heading">
                        <h2>{item.question.topic.subject.name} → {item.question.topic.name}</h2>
                        <p>Review the fundamentals, then practice explaining your reasoning clearly.</p>
                    </div>

                    <div className="interview-grid">
                        <QuestionList title={`${item.question.difficulty} · ${item.sourceType}`} questions={[item.question.questionText]} />
                    </div>
                </div>
            ))}
        </div>
    );
}

export default InterviewHub;
