import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { companyData } from "../data/companyData";
import api from "../services/api";

function CompanyDetails() {

    const { id } = useParams();

    const fallbackCompany = companyData.find((item) => item.id === Number(id));
    const [company, setCompany] = useState(fallbackCompany);

    useEffect(() => {
        api.get(`/api/company-preparation/companies/${id}`)
            .then(({ data }) => {
                const recruitment = data.recruitment || {};
                setCompany({
                    ...data.company,
                    roles: (data.roles || []).map((role) => role.name),
                    interviewTopics: (data.topics || []).map((item) => item.topic.name),
                    focusAreas: (data.subjects || []).map((item) => item.subject.name),
                    hiringProcess: (data.hiringProcess || []).map((stage) => stage.name),
                    expectations: recruitment.notes ? [recruitment.notes] : [],
                    about: recruitment.notes || "",
                    headquarters: recruitment.location || data.company.location || "",
                    preparationSubjects: (data.subjects || []).map((item) => item.subject),
                    importantQuestions: (data.questions || []).map((item) => item.question.questionText),
                    recruitment
                });
            })
            .catch(() => setCompany(fallbackCompany));
    }, [id, fallbackCompany]);

    if (!company) {
        return <div className="company-details"><h1>Company not found</h1></div>;
    }

    return (

        <div className="company-details">

            <h1>{company.companyName}</h1>
            <p className="company-kicker">{company.industry} · {company.headquarters}</p>

            <h2>About</h2>
            <p>{company.about}</p>

            {company.recruitment && (
                <>
                    <h2>Recruitment Information</h2>
                    <ul>
                        {company.batch && <li>Batch: {company.batch}</li>}
                        {company.recruitment.eligibility && <li>Eligibility: {company.recruitment.eligibility}</li>}
                        {company.recruitment.internship && <li>Internship: {company.recruitment.internship}</li>}
                        {company.recruitment.stipend && <li>Stipend: {company.recruitment.stipend}</li>}
                        {company.recruitment.ctc && <li>CTC: {company.recruitment.ctc}</li>}
                        {company.recruitment.fixedCompensation && <li>Fixed compensation: {company.recruitment.fixedCompensation}</li>}
                        {company.recruitment.notes && <li>{company.recruitment.notes}</li>}
                    </ul>
                </>
            )}

            <div className="company-facts">
                <div><strong>Founded</strong><span>{company.founded}</span></div>
                <div><strong>CEO</strong><span>{company.ceo}</span></div>
                <div><strong>Team size</strong><span>{company.employees}</span></div>
            </div>

            <h2>Roles Offered</h2>

            <ul>
                {company.roles.map((role) => (
                    <li key={role}>{role}</li>
                ))}
            </ul>

            <h2>Interview Topics</h2>

            <ul>
                {company.interviewTopics.map((topic) => (
                    <li key={topic}>{topic}</li>
                ))}
            </ul>

            <h2>Priority Focus Areas</h2>
            <ul>
                {company.focusAreas.map((area) => (
                    <li key={area}>{area}</li>
                ))}
            </ul>

            <h2>Hiring Process</h2>

            <ul>
                {company.hiringProcess.map((step) => (
                    <li key={step}>{step}</li>
                ))}
            </ul>

            <h2>What {company.companyName} Expects</h2>

            <ul>
                {company.expectations.map((item) => (
                    <li key={item}>{item}</li>
                ))}
            </ul>

            {company.preparationSubjects?.length > 0 && (
                <>
                    <h2>Technical Preparation</h2>
                    <ul>
                        {company.preparationSubjects.map((subject) => (
                            <li key={subject.id}>{subject.name} ({subject.category})</li>
                        ))}
                    </ul>
                </>
            )}

            {company.importantQuestions?.length > 0 && (
                <>
                    <h2>Interview Preparation</h2>
                    <ul>
                        {company.importantQuestions.map((question) => (
                            <li key={question}>{question}</li>
                        ))}
                    </ul>
                </>
            )}

            {company.registrationLink && (
                <p><a href={company.registrationLink} target="_blank" rel="noreferrer">Registration link</a></p>
            )}

            <div className="preparation-tip">
                <strong>Preparation tip</strong>
                <p>{company.preparationTip}</p>
            </div>

        </div>
    );
}

export default CompanyDetails;