import { useEffect, useState } from "react";
import api from "../services/api";

function Revision() {

    const [subject, setSubject] = useState("");
    const [topic, setTopic] = useState("");
    const [revisionList, setRevisionList] = useState([]);

    const saveRevision = async () => {

        try {

            await api.post(
                "/api/revision/save",
                {
                    subject,
                    topic
                }
            );

            fetchRevisions();

            setSubject("");
            setTopic("");

            alert("Revision Saved");

        } catch (error) {

            console.log(error);

        }
    };

    const fetchRevisions = async () => {

        try {

            const response = await api.get("/api/revision/all");

            setRevisionList(response.data);

        } catch (error) {

            console.log(error);

        }
    };

    useEffect(() => {

        fetchRevisions();

    }, []);

    return (

        <div className="dashboard">

            <h1>Revision Tracker 📚</h1>

            <h2>Add Revision</h2>

            <input
                type="text"
                placeholder="Subject"
                value={subject}
                onChange={(e) =>
                    setSubject(e.target.value)
                }
            />

            <br /><br />

            <input
                type="text"
                placeholder="Topic"
                value={topic}
                onChange={(e) =>
                    setTopic(e.target.value)
                }
            />

            <br /><br />

            <button onClick={saveRevision}>
                Save Revision
            </button>

            <br /><br />

            <h2>Revision History</h2>

            <table border="1">

                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Subject</th>
                        <th>Topic</th>
                    </tr>
                </thead>

                <tbody>

                    {revisionList.map((item) => (

                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.subject}</td>
                            <td>{item.topic}</td>
                        </tr>

                    ))}

                </tbody>

            </table>

        </div>
    );
}

export default Revision;