function StatsHub() {

    const totalSolved =
        Number(localStorage.getItem("totalSolved")) || 0;

    const totalSql =
        Number(localStorage.getItem("totalSql")) || 0;

    const totalRevision =
        Number(localStorage.getItem("totalRevision")) || 0;

    return (

        <div className="dashboard">

            <h1>Statistics 📈</h1>

            <div className="card-container">

                <div className="card">
                    <h2>DSA</h2>
                    <p>{totalSolved}</p>
                </div>

                <div className="card">
                    <h2>SQL</h2>
                    <p>{totalSql}</p>
                </div>

                <div className="card">
                    <h2>Revision</h2>
                    <p>{totalRevision}</p>
                </div>

            </div>

        </div>

    );
}

export default StatsHub;