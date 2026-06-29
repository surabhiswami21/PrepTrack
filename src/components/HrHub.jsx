import { hrData } from "../data/hrData";

function HrHub() {

    return (

        <div className="dashboard">

            <h1>HR Interview Hub 🎤</h1>

            {hrData.map((item,index)=>(

                <div
                    key={index}
                    className="history-card"
                >

                    <h2>{item.question}</h2>

                    <p>{item.answer}</p>

                </div>

            ))}

        </div>

    );
}

export default HrHub;