import { useState, useEffect } from "react";
import axios from "axios";
function ContestTracker() {

    const [platform, setPlatform] = useState("");
    const [contestName, setContestName] = useState("");
    const [rating, setRating] = useState("");
    const [rank, setRank] = useState("");
    const [contestList, setContestList] = useState([]);
    useEffect(() => {

    fetchContests();

}, []);
const fetchContests = async () => {

    try {

        const response =
            await axios.get(
                "http://localhost:8081/api/contest/all"
            );

        setContestList(response.data);

    } catch (error) {

        console.log(error);

    }

};

   const addContest = async () => {

    if (
        platform.trim() === "" ||
        contestName.trim() === "" ||
        rating === "" ||
        rank === ""
    ) {
        alert("Fill all fields");
        return;
    }

    try {

        await axios.post(
            "http://localhost:8081/api/contest/save",
            {
                platform,
                contestName,
                rating: Number(rating),
                rank: Number(rank),
                date: new Date().toLocaleDateString()
            }
        );

        fetchContests();

        setPlatform("");
        setContestName("");
        setRating("");
        setRank("");

    } catch (error) {

        console.log(error);

    }

};


    const deleteContest = async (id) => {

    try {

        await axios.delete(
            `http://localhost:8081/api/contest/delete/${id}`
        );

        fetchContests();

    } catch (error) {

        console.log(error);

    }

};

    return (

        <div className="dashboard">

            <h1>🏆 Contest Tracker</h1>

            <input
                type="text"
                placeholder="Platform (LeetCode)"
                value={platform}
                onChange={(e) =>
                    setPlatform(e.target.value)
                }
            />

            <input
                type="text"
                placeholder="Contest Name"
                value={contestName}
                onChange={(e) =>
                    setContestName(e.target.value)
                }
            />

            <input
                type="number"
                placeholder="Rating"
                value={rating}
                onChange={(e) =>
                    setRating(e.target.value)
                }
            />

            <input
                type="number"
                placeholder="Rank"
                value={rank}
                onChange={(e) =>
                    setRank(e.target.value)
                }
            />

            <br /><br />

            <button onClick={addContest}>
                Add Contest
            </button>

            <br /><br />

            <table>

                <thead>

                    <tr>

                        <th>Platform</th>
                        <th>Contest</th>
                        <th>Rating</th>
                        <th>Rank</th>
                        <th>Date</th>
                        <th>Action</th>

                    </tr>

                </thead>

                <tbody>

                  {contestList.map((contest) => (

                        <tr key={contest.id}>

                            <td>{contest.platform}</td>
                            <td>{contest.contestName}</td>
                            <td>{contest.rating}</td>
                            <td>{contest.rank}</td>
                            <td>{contest.date}</td>

                            <td>

                                <button
                                    className="delete-btn"
                                    onClick={() =>
    deleteContest(contest.id)
}
                                >
                                    Delete
                                </button>

                            </td>

                        </tr>

                    ))}

                </tbody>

            </table>

                </div>

    );

}

export default ContestTracker;