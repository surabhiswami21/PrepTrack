import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { companyData } from "../data/companyData";
import api from "../services/api";

function CompanyExplorer() {
    const [companies, setCompanies] = useState(companyData);

    useEffect(() => {
        api.get("/api/company-preparation/companies")
            .then((response) => setCompanies(response.data))
            .catch(() => setCompanies(companyData));
    }, []);

    return (

        <div className="company-explorer dashboard">

            <h1>Company Explorer</h1>
            <p className="page-intro">Compare hiring patterns, focus areas, and preparation paths for companies on your shortlist.</p>

            <div className="company-grid">
            {companies.map((company) => (

                <div
                    key={company.id}
                    className="card"
                >
                    <span className="company-index">0{company.id}</span>
                    <h2>
                        {company.companyName}
                    </h2>
                    <p>{company.industry || company.category}</p>
                    <small>{company.batch || "Company preparation"} {company.employees ? `· ${company.employees} employees` : ""}</small>

                    <Link
                        className="company-link"
                        to={`/company/${company.id}`}
                    >
                        View Details
                    </Link>

                </div>

            ))}
            </div>
        </div>
    );
}

export default CompanyExplorer;