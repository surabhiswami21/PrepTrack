import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Revision from "./components/Revision";
import CompanyExplorer from "./components/CompanyExplorer";
import CompanyDetails from "./components/CompanyDetails";
import InterviewHub from "./components/InterviewHub";
import CodingHub from "./components/CodingHub";
import Bookmarks from "./components/Bookmarks";
import ResumePrep from "./components/ResumePrep";
import HrHub from "./components/HrHub";
import AptitudeHub from "./components/AptitudeHub";
import MockInterview from "./components/MockInterview";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import NotesHub from "./components/NotesHub";
import RoadmapHub from "./components/RoadmapHub";
import StatsHub from "./components/StatsHub";
import DailyPlanner from "./components/DailyPlanner";
import EligibilityChecker from "./components/EligibilityChecker";
import ContestTracker from "./components/ContestTracker";
import "./App.css";




function App() {
  return (
    <BrowserRouter>
    <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />

<Route path="/revision" element={<Revision />} />

<Route
    path="/companies"
    element={<CompanyExplorer />}
/>

<Route
    path="/company/:id"
    element={<CompanyDetails />}
/>
<Route
    path="/interviews"
    element={<InterviewHub />}
/>
<Route
path="/coding"
element={<CodingHub />}
/>

<Route
    path="/bookmarks"
    element={<Bookmarks />}
/>

<Route
    path="/resume-prep"
    element={<ResumePrep />}
/>

<Route
    path="/hr"
    element={<HrHub />}
/>
<Route
    path="/aptitude"
    element={<AptitudeHub />}
/>


<Route
    path="/mock-interview"
    element={<MockInterview />}
/>

<Route
    path="/notes"
    element={<NotesHub />}
/>

<Route
    path="/roadmap"
    element={<RoadmapHub />}
/>

<Route
    path="/stats"
    element={<StatsHub />}
/>
<Route
    path="/resume"
    element={<ResumePrep />}
/>
<Route
    path="/roadmap"
    element={<RoadmapHub />}
/>
<Route
    path="/planner"
    element={<DailyPlanner />}
/>
<Route
    path="/eligibility"
    element={<EligibilityChecker />}
/>
<Route
    path="/contest"
    element={<ContestTracker />}
/>

      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;