import { Link } from "react-router-dom";
import { companyData } from "../data/companyData";

function CompanyExplorer() {

    return (

        <div>

            <h1>Company Explorer</h1>

            {companyData.map((company) => (

                <div
                    key={company.id}
                    className="card"
                >
                    <h2>
                        {company.companyName}
                    </h2>

                    <Link
                        to={`/company/${company.id}`}
                    >
                        View Details
                    </Link>

                </div>

            ))}
        </div>
    );
}

export default CompanyExplorer;