import { useParams } from "react-router-dom";
import { companyData } from "../data/companyData";

function CompanyDetails() {

    const { id } = useParams();

    const company =
        companyData.find(
            (c) => c.id === Number(id)
        );

    return (

        <div className="company-details">

            <h1>{company.companyName}</h1>

            <h2>About</h2>
            <p>{company.about}</p>

            <h2>CEO</h2>
            <p>{company.ceo}</p>

            <h2>Founded</h2>
            <p>{company.founded}</p>

            <h2>Headquarters</h2>
            <p>{company.headquarters}</p>

            <h2>Roles Offered</h2>

            <ul>
                {company.roles.map((role) => (
                    <li>{role}</li>
                ))}
            </ul>

            <h2>Interview Topics</h2>

            <ul>
                {company.interviewTopics.map((topic) => (
                    <li>{topic}</li>
                ))}
            </ul>

            <h2>Hiring Process</h2>

            <ul>
                {company.hiringProcess.map((step) => (
                    <li>{step}</li>
                ))}
            </ul>

            <h2>What TCS Expects</h2>

            <ul>
                {company.expectations.map((item) => (
                    <li>{item}</li>
                ))}
            </ul>

        </div>
    );
}

export default CompanyDetails;