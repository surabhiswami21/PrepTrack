import { roadmapData } from "../data/roadmapData";

function RoadmapHub() {

    return (

        <div className="dashboard">

            <h1>🗺 Company Roadmaps</h1>

            {roadmapData.map((company)=>(

                <div
                    key={company.id}
                    className="history-card"
                >

                    <h2>{company.company}</h2>

                    <ol>

                        {company.roadmap.map((step,index)=>(

                            <li key={index}>
                                {step}
                            </li>

                        ))}

                    </ol>

                </div>

            ))}

        </div>

    );

}

export default RoadmapHub;