import { useEffect, useState } from "react";
import api, { getApiErrorMessage } from "../services/api";

function HrHub() {
    const [questions, setQuestions] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const params = new URLSearchParams({ section: "HR" });
        if (search.trim()) params.set("search", search.trim());
        api.get(`/api/company-preparation/questions?${params}`)
            .then(({ data }) => {
                const unique = Array.from(new Map(data.map((item) => [item.question.id, item])).values());
                setQuestions(unique);
            })
            .catch((error) => setError(getApiErrorMessage(error, "Unable to load HR questions.")))
            .finally(() => setLoading(false));
    }, [search]);

    return (

        <div className="dashboard">

            <h1>HR Interview Hub 🎤</h1>

            <input placeholder="Search HR questions or category" value={search} onChange={(event) => setSearch(event.target.value)} />
            {error && <p role="alert">{error}</p>}
            {loading && <p>Loading HR questions...</p>}
            {!loading && !error && questions.length === 0 && <p>No HR questions found.</p>}

            {questions.map((item) => (

                <div
                    key={item.question.id}
                    className="history-card"
                >

                    <h2>{item.question.questionText}</h2>

                    <p>{item.question.topic.name} · {item.sourceType}</p>

                </div>

            ))}

        </div>

    );
}

export default HrHub;