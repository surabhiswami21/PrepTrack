import { useState, useEffect } from "react";
import axios from "axios";

function Bookmarks() {

    const [bookmarks, setBookmarks] = useState([]);

    const fetchBookmarks = async () => {

        try {

            const response =
                await axios.get(
                    "http://localhost:8081/api/bookmarks/all"
                );

            setBookmarks(response.data);

        } catch (error) {

            console.log(error);

        }

    };

    useEffect(() => {

        fetchBookmarks();

    }, []);

    const deleteBookmark = async (id) => {

        try {

            await axios.delete(
                `http://localhost:8081/api/bookmarks/delete/${id}`
            );

            fetchBookmarks();

        } catch (error) {

            console.log(error);

        }

    };

    return (

        <div className="dashboard">

            <h1>Bookmarks ⭐</h1>

            {

                bookmarks.length === 0 ?

                    (

                        <h3>No Bookmarks Yet</h3>

                    )

                    :

                    (

                        bookmarks.map((item) => (

                            <div
                                key={item.id}
                                className="card"
                            >

                                <p>

                                    {item.question}

                                </p>

                                <button
                                    className="delete-btn"
                                    onClick={() =>
                                        deleteBookmark(item.id)
                                    }
                                >
                                    Delete
                                </button>

                            </div>

                        ))

                    )

            }

        </div>

    );

}

export default Bookmarks;