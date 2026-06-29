import { useState } from "react";

function Bookmarks() {

    const [bookmarks] = useState(() => {

        return JSON.parse(
            localStorage.getItem("bookmarks")
        ) || [];

    });

    return (

        <div className="dashboard">

            <h1>Bookmarks ⭐</h1>

            {bookmarks.map((item, index) => (

                <div
                    key={index}
                    className="card"
                >
                    {item}
                </div>

            ))}

        </div>

    );
}

export default Bookmarks;