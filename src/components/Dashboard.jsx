
import { useEffect, useState } from "react";
import axios from "axios";
import DsaChart from "../components/DsaChart";
import { Link } from "react-router-dom";


function Dashboard() {

    

    const [easy, setEasy] = useState(0);
    const [medium, setMedium] = useState(0);
    const [hard, setHard] = useState(0);
    const [progressList, setProgressList] = useState([]);
    const [editId, setEditId] = useState(null);
    const [sqlCount, setSqlCount] = useState(0);
const [topic, setTopic] = useState("");
const [streak, setStreak] = useState(0);
const [revisionList, setRevisionList] = useState([]);
const [search,setSearch] = useState("");
const [darkMode, setDarkMode] = useState(false);



const companyProgress = [
    {
        company: "TCS",
        companyRead: true,
        interviewDone: false,
        codingDone: false
    },
    {
        company: "Infosys",
        companyRead: false,
        interviewDone: false,
        codingDone: false
    },
    {
        company: "Wipro",
        companyRead: false,
        interviewDone: false,
        codingDone: false
    }
];



const [sqlList, setSqlList] = useState([]);

    const saveProgress = async () => {

    try {

        if (editId) {

            await axios.put(
                `http://localhost:8081/api/dsa/update/${editId}`,
                {
                    easy: Number(easy),
                    medium: Number(medium),
                    hard: Number(hard)
                }
            );

        } else {

            await axios.post(
                "http://localhost:8081/api/dsa/save",
                {
                    easy: Number(easy),
                    medium: Number(medium),
                    hard: Number(hard)
                }
            );
        }

        const response = await axios.get(
            "http://localhost:8081/api/dsa/progress"
        );

        setProgressList(response.data);

        setEasy(0);
        setMedium(0);
        setHard(0);
        setEditId(null);

        alert("Saved Successfully");

    } catch (error) {

        console.log(error);

    }
};

const deleteProgress = async (id) => {

    try {

        await axios.delete(
            `http://localhost:8081/api/dsa/delete/${id}`
        );

        const response = await axios.get(
            "http://localhost:8081/api/dsa/progress"
        );

        setProgressList(response.data);

    } catch (error) {

        console.log(error);

    }
};

const saveSqlProgress = async () => {

    try {

       await axios.post(
    "http://localhost:8081/api/sql/save",
    {
        topic,
        queryCount: Number(sqlCount)
    }
);

        const response = await axios.get(
            "http://localhost:8081/api/sql/all"
        );

        

        setSqlList(response.data);
        setSqlCount(0);

    } catch (error) {

        console.log(error);
        console.log(sqlList);
console.log(totalSqlQueries);

    }
};

const deleteSqlProgress = async (id) => {

    try {

        await axios.delete(
            `http://localhost:8081/api/sql/delete/${id}`
        );

        const response = await axios.get(
            "http://localhost:8081/api/sql/all"
        );

        setSqlList(response.data);

    } catch (error) {

        console.log(error);

    }
};

useEffect(() => {
    axios.get("http://localhost:8081/api/dsa/progress")
        .then((res) => {
            setProgressList(res.data);
        })
        .catch((err) => {
            console.log(err);
        });
}, []);

useEffect(() => {
    axios.get("http://localhost:8081/api/sql/all")
        .then((res) => {
            setSqlList(res.data);
        })
        .catch((err) => {
            console.log(err);
        });
}, []);

useEffect(() => {

    axios.get("http://localhost:8081/api/dsa/streak")
.then((res) => {
    setStreak(res.data);
})
    
    .catch((err) => {

        console.log(err);

    });

}, []);

useEffect(() => {

    axios.get(
        "http://localhost:8081/api/revision/all"
    )
    .then((res) => {

        setRevisionList(res.data);

    });

}, []);

const totalEasy = progressList.reduce(
    (sum, item) => sum + item.easy,
    0
);

const totalMedium = progressList.reduce(
    (sum, item) => sum + item.medium,
    0
);

const totalHard = progressList.reduce(
    (sum, item) => sum + item.hard,
    0
);

const totalSqlQueries = sqlList.reduce(
    (sum, item) => sum + item.queryCount,
    0
);


const totalSolved =
    totalEasy + totalMedium + totalHard;

    const totalRevisions = revisionList.length;


    const readinessScore = Math.min(
    100,
    Math.floor(
        totalSolved * 0.3 +
        totalSqlQueries * 0.5 +
        totalRevisions * 2
    )
);
   
const achievements = [];

if (totalSolved >= 50) {
    achievements.push("🥉 Solved 50 DSA Questions");
}

if (totalSolved >= 100) {
    achievements.push("🥈 Solved 100 DSA Questions");
}

if (totalSqlQueries >= 50) {
    achievements.push("🏅 Completed 50 SQL Queries");
}

if (streak >= 7) {
    achievements.push("🔥 7 Day Streak");
}

    return (

    
       <div className={darkMode ? "dashboard dark" : "dashboard"}>

            <h1>PrepTrack Dashboard 🚀</h1>
            <div className="hero-section">

    <div>

        <h1>🚀 Welcome to PrepTrack</h1>

        <p>
            Track your Placement Preparation,
            DSA, SQL, Jobs and Revision
            at one place.
        </p>

    </div>

</div>
            <button
    onClick={() => {
        setDarkMode(!darkMode);
        console.log(darkMode);
    }}
>
    {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
</button>
            <input
    type="text"
    placeholder="🔍 Search Questions..."
    value={search}
    onChange={(e) =>
        setSearch(e.target.value)
    }
/>

            <h2 className="section-title">
        📊 Overview
    </h2>

            <div className="card-container">

                <div className="card">
                    <h2>DSA Tracker</h2>
                   <p>Solved Questions: {totalSolved}</p>
                </div>

                <div className="card">
                    <h2>SQL Practice</h2>
                   <p>Completed Queries: {totalSqlQueries}</p>
                </div>

              <Link to="/revision">

    <div className="card">
        <h2>Revision Tracker</h2>
        <p>Topics Revised: {totalRevisions}</p>
    </div>

</Link>
<Link to="/jobs">

    <div className="card">

        <h2>Job Tracker 💼</h2>

        <p>Applications Status</p>

    </div>

</Link>

<div className="card">
                    <h2>Streak 🔥</h2>
                    <p>{streak} Days</p>
                </div>

                

                <div className="card placement-card">
    <h2>Placement Ready 🎯</h2>

    <h1>{readinessScore}%</h1>


    <p>

{
    readinessScore >= 80
    ? "Ready for Placements 🚀"
    : readinessScore >= 50
    ? "Almost Ready 📈"
    : "Keep Practicing 💪"
}

</p>

    <progress
        value={readinessScore}
        max="100"
    />
</div>

            </div>

 <h2 className="section-title">
        🎯 Placement Tools
    </h2>

    <h2 className="section-title">
    ⚡ Quick Stats
</h2>

<div className="card-container">

    <div className="card">
        <h2>Total DSA</h2>
        <p>{totalSolved}</p>
    </div>

    <div className="card">
        <h2>Total SQL</h2>
        <p>{totalSqlQueries}</p>
    </div>

    <div className="card">
        <h2>Total Revision</h2>
        <p>{totalRevisions}</p>
    </div>

    <div className="card">
        <h2>Bookmarks</h2>
        <p>
            {
                JSON.parse(localStorage.getItem("bookmarks") || "[]").length
            }
        </p>
    </div>

</div>

      <div className="card-container">
<Link to="/companies">
  <div className="card">
    <h2>🏢 Company Explorer</h2>
    <p>Last Minute Interview Guide</p>
  </div>
</Link>
<Link to="/interviews">

<div className="card">
    <h2>Interview Hub 🎯</h2>
    <p>Company-wise Questions</p>
</div>

</Link>
<Link to="/coding">

<div className="card">
    <h2>Coding Questions 💻</h2>
    <p>Company-wise PYQs</p>
</div>

</Link>
<Link to="/bookmarks">
  <div className="card">
    <h2>Bookmarks ⭐</h2>
    <p>Saved Questions</p>
  </div>
</Link>

<Link to="/resume-prep">
        <div className="card">
            <h2>Resume Prep 📄</h2>
            <p>Project Questions</p>
        </div>
    </Link>

<Link to="/hr">
    <div className="card">
        <h2>HR Hub 🎤</h2>
        <p>HR Interview Questions</p>
    </div>
</Link>
<Link to="/aptitude">

    <div className="card">

        <h2>Aptitude Hub 🧠</h2>

        <p>Quant + Reasoning + Verbal</p>

    </div>

</Link>
<Link to="/mock-interview">

    <div className="card">

        <h2>Mock Interview 🎙️</h2>

        <p>Random Interview Questions</p>

    </div>

</Link>

<Link to="/notes">

    <div className="card">

        <h2>Notes Hub 📚</h2>

        <p>Quick Revision Notes</p>

    </div>

</Link>

<Link to="/roadmap">

    <div className="card">

        <h2>Roadmap 🗺️</h2>

        <p>Placement Preparation Path</p>

    </div>

</Link>

<Link to="/stats">

    <div className="card">

        <h2>Statistics 📈</h2>

        <p>Overall Progress</p>

    </div>

</Link>
<Link to="/roadmap">

    <div className="card">

        <h2>🗺 Company Roadmaps</h2>

        <p>Step-by-Step Placement Plan</p>

    </div>

</Link>
<Link to="/planner">

    <div className="card">

        <h2>🗓 Daily Planner</h2>

        <p>Plan Today's Study</p>

    </div>

</Link>
<Link to="/eligibility">

    <div className="card">

        <h2>🎯 Eligibility Checker</h2>

        <p>Check Company Eligibility</p>

    </div>

</Link>

<Link to="/contest">

    <div className="card">

        <h2>🏆 Contest Tracker</h2>

        <p>Track Coding Contests</p>

    </div>

</Link>

</div>

<div className="chart-card">
    <h2>DSA Analytics</h2>

    <DsaChart
        easy={totalEasy}
        medium={totalMedium}
        hard={totalHard}
    />
</div>

<div className="history-card">

    <h2>📈 Weekly Progress</h2>

    <table>

        <thead>
            <tr>
                <th>Week</th>
                <th>DSA</th>
                <th>SQL</th>
                <th>Revision</th>
            </tr>
        </thead>

        <tbody>

            <tr>
                <td>Week 1</td>
                <td>35</td>
                <td>18</td>
                <td>12</td>
            </tr>

            <tr>
                <td>Week 2</td>
                <td>52</td>
                <td>31</td>
                <td>20</td>
            </tr>

        </tbody>

    </table>

</div>



<div className="card-container">

    <div className="card">
        <h2>Easy 🟢</h2>
        <p>{totalEasy}</p>
    </div>

    <div className="card">
        <h2>Medium 🟡</h2>
        <p>{totalMedium}</p>
    </div>

    <div className="card">
        <h2>Hard 🔴</h2>
        <p>{totalHard}</p>
    </div>

</div>
        <div className="history-card">        
            


            <h2>Add DSA Progress</h2>

            <input
                type="number"
                placeholder="Easy"
                value={easy}
                onChange={(e) => setEasy(e.target.value)}
            />

            <br /><br />

            <input
                type="number"
                placeholder="Medium"
                value={medium}
                onChange={(e) => setMedium(e.target.value)}
            />

            <br /><br />

            <input
                type="number"
                placeholder="Hard"
                value={hard}
                onChange={(e) => setHard(e.target.value)}
            />

            <br /><br />

            <button onClick={saveProgress}>
                Save Progress
            </button>
             </div>

<div className="history-card">

    <h2>🏆 Achievements</h2>

    {achievements.length === 0 ? (

        <p>
            No achievements unlocked yet.
        </p>

    ) : (

        <ul>

            {achievements.map((item, index) => (

                <li key={index}>
                    {item}
                </li>

            ))}

        </ul>

    )}

</div>

 <div className="history-card">
<h2>Add SQL Progress</h2>


<input
    type="text"
    placeholder="Topic (Joins, Subqueries...)"
    value={topic}
    onChange={(e) => setTopic(e.target.value)}
/>

<input
    type="number"
    placeholder="Queries Solved"
    value={sqlCount}
    onChange={(e) => setSqlCount(e.target.value)}
/>


<br /><br />

<button onClick={saveSqlProgress}>
    Save SQL Progress
</button>
</div>

 <div className="history-card">

<h2>SQL History</h2>

<table border="1">

    <thead>
<tr>
    <th>ID</th>
    <th>Topic</th>
    <th>Queries</th>
    <th>Action</th>
</tr>
</thead>

<tbody>

{sqlList.map((item) => (

<tr key={item.id}>
    <td>{item.id}</td>
    <td>{item.topic}</td>
    <td>{item.queryCount}</td>

    <td>
        <button
            onClick={() =>
                deleteSqlProgress(item.id)
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
<div className="history-card">
<h2>DSA History</h2>

<table border="1">

    <thead>
        <tr>
            <th>ID</th>
            <th>Easy</th>
            <th>Medium</th>
            <th>Hard</th>
            <th>Action</th>
        </tr>
    </thead>

    <tbody>

        {progressList.map((item) => (

            <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.easy}</td>
                <td>{item.medium}</td>
                <td>{item.hard}</td>
                <td>
    <div className="action-buttons">
        <button
            className="delete-btn"
            onClick={() => deleteProgress(item.id)}
        >
            Delete
        </button>

        <button
    className="edit-btn"
    onClick={() => {
        setEasy(item.easy);
        setMedium(item.medium);
        setHard(item.hard);
        setEditId(item.id);
    }}
>
    Edit
</button>
    </div>
</td>
            </tr>

        ))}

    </tbody>

</table>

</div>

<div className="history-card">

    <h2>🏢 Company Progress Tracker</h2>

    <table>

        <thead>
            <tr>
                <th>Company</th>
                <th>Profile</th>
                <th>Interview</th>
                <th>Coding</th>
            </tr>
        </thead>

        <tbody>

            {companyProgress.map((item, index) => (

                <tr key={index}>

                    <td>{item.company}</td>

                    <td>
                        {item.companyRead ? "✅" : "❌"}
                    </td>

                    <td>
                        {item.interviewDone ? "✅" : "❌"}
                    </td>

                    <td>
                        {item.codingDone ? "✅" : "❌"}
                    </td>

                </tr>

            ))}

        </tbody>

    </table>

</div>
        </div>
        

    );
}

export default Dashboard;