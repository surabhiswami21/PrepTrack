import { useState } from "react";

function EligibilityChecker() {

    const [cgpa, setCgpa] = useState("");
    const [backlog, setBacklog] = useState("");

    const companies = [

        {
            name: "TCS",
            cgpa: 6.5,
            backlog: 1
        },

        {
            name: "Infosys",
            cgpa: 6,
            backlog: 0
        },

        {
            name: "Wipro",
            cgpa: 6,
            backlog: 1
        },

        {
            name: "Accenture",
            cgpa: 7,
            backlog: 0
        }

    ];

    return (

        <div className="dashboard">

            <h1>🎯 Eligibility Checker</h1>

            <input
                type="number"
                placeholder="CGPA"
                value={cgpa}
                onChange={(e)=>setCgpa(e.target.value)}
            />

            <input
                type="number"
                placeholder="Backlogs"
                value={backlog}
                onChange={(e)=>setBacklog(e.target.value)}
            />

            <br/><br/>

            {

                companies.map((company)=>(

                    <div
                        key={company.name}
                        className="card"
                    >

                        <h2>{company.name}</h2>

                        {

                            Number(cgpa)>=company.cgpa &&
                            Number(backlog)<=company.backlog

                            ?

                            <p>✅ Eligible</p>

                            :

                            <p>❌ Not Eligible</p>

                        }

                    </div>

                ))

            }

        </div>

    );

}

export default EligibilityChecker;