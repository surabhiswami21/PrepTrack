import { useState, useEffect, useCallback } from "react";
import api from "../services/api";

function Jobs() {
  const [companyName, setCompanyName] = useState("");
  const [role, setRole] = useState("");
  const [status, setStatus] = useState("");
  const [jobList, setJobList] = useState([]);
const fetchJobs = useCallback(async () => {
    try {
        const res = await api.get("/api/jobs/all");
        setJobList(res.data);
    } catch (err) {
        console.log(err);
    }
}, []);

useEffect(() => {
  void Promise.resolve().then(fetchJobs);
}, [fetchJobs]);

 
  const addJob = async () => {
    if (
      companyName.trim() === "" ||
      role.trim() === "" ||
      status.trim() === ""
    ) {
      alert("Please fill all fields");
      return;
    }

    try {
      await api.post("/api/jobs/save", {
        companyName,
        role,
        status,
      });

      await fetchJobs();

      setCompanyName("");
      setRole("");
      setStatus("");
    } catch (err) {
      console.log(err);
    }
  };

  const deleteJob = async (id) => {
    try {
      await api.delete(`/api/jobs/delete/${id}`);
      await fetchJobs();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="dashboard">
      <h1>Job Tracker 💼</h1>

      <input
        type="text"
        placeholder="Company Name"
        value={companyName}
        onChange={(e) => setCompanyName(e.target.value)}
      />

      <input
        type="text"
        placeholder="Role"
        value={role}
        onChange={(e) => setRole(e.target.value)}
      />

      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
      >
        <option value="">Select Status</option>
        <option value="Applied">Applied</option>
        <option value="OA Cleared">OA Cleared</option>
        <option value="Interview Scheduled">Interview Scheduled</option>
        <option value="Selected">Selected</option>
        <option value="Rejected">Rejected</option>
      </select>

      <br /><br />

      <button onClick={addJob}>
        Add Application
      </button>

      <table>
        <thead>
          <tr>
            <th>Company</th>
            <th>Role</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {jobList.length === 0 ? (
            <tr>
              <td colSpan="4">No Applications Yet</td>
            </tr>
          ) : (
            jobList.map((job) => (
              <tr key={job.id}>
                <td>{job.companyName}</td>
                <td>{job.role}</td>
                <td>{job.status}</td>
                <td>
                  <button
                    className="delete-btn"
                    onClick={() => deleteJob(job.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Jobs;
