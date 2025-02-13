import IncidentReportTemplate from "./components/IncidentReportTemplate";
import NewHireLaptopSetup from "./components/NewHireLaptopSetup";
import "./App.css";

function App() {
  return (
    <div className="app">
      <h1 className="main-heading">
        AI-Powered DeskSide Management – Transforming IT Support - Prototype
      </h1>
      <div className="content">
        <div className="sub-component">
          <IncidentReportTemplate />
        </div>
        <div className="sub-component">
          <NewHireLaptopSetup />
        </div>
      </div>
    </div>
  );
}

export default App;
