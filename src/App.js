import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="">
        <h2>Welcome to Oluwatoyin's Personal Website</h2>
        <h3>Contact me: toyeentop@yahoo.com</h3>
        <h3><a href='https://www.linkedin.com' target='_blank'>LinkedIn</a></h3>
        <h3><a href='https://github.com/toyeentop/Library-Project' target='_blank'>Github</a></h3>
      
      <p>
          <a href='oluwatoyin_project_report.pdf' download={true} rel="noreferrer">Project Report</a>
        </p>
        <p>
          <a href='#/book-data' target='_blank' rel="noreferrer">View book data</a>
        </p>
        <p>
          <a href='#/student-data' target='_blank' rel="noreferrer">View student data</a>
        </p>
        <p>
        <a href='#/book-status-analysis' target='_blank' rel="noreferrer">View book analysis</a>
      </p>

      </header>
    </div>
  );
}

export default App;
