import { codingData } from "../data/codingData";

function CodingHub() {

    return (

        <div className="container">

            <h1>Previous Year Coding Questions</h1>

            {codingData.map((company) => (

                <div
                    key={company.id}
                    className="card"
                >

                    <h2>{company.company}</h2>

                    <ul>

                        {company.questions.map(
                            (q,index) => (

                                <li key={index}>
                                    {q}
                                </li>

                            )
                        )}

                    </ul>

                </div>

            ))}

        </div>

    );
}

export default CodingHub;