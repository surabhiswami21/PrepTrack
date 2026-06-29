import { notesData } from "../data/notesData";

function NotesHub(){

    return(

        <div className="dashboard">

            <h1>Quick Revision Notes 📚</h1>

            {notesData.map((item,index)=>(

                <div
                    key={index}
                    className="history-card"
                >

                    <h2>{item.subject}</h2>

                    <ul>

                        {item.notes.map((note,i)=>(

                            <li key={i}>
                                {note}
                            </li>

                        ))}

                    </ul>

                </div>

            ))}

        </div>

    );
}

export default NotesHub;