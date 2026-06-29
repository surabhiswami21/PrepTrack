import { aptitudeData } from "../data/aptitudeData";

function AptitudeHub() {

    return (

        <div className="dashboard">

            <h1>Aptitude Hub 🧠</h1>

            {aptitudeData.map((item,index)=>(

                <div
                    key={index}
                    className="history-card"
                >

                    <h2>{item.category}</h2>

                    <ul>

                        {item.topics.map((topic,i)=>(

                            <li key={i}>
                                {topic}
                            </li>

                        ))}

                    </ul>

                </div>

            ))}

        </div>

    );
}

export default AptitudeHub;