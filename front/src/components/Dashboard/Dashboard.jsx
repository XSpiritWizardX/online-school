import { SubjectChart } from "./SubjectChart/SubjectChart";
import Garden from "../ProfilePage/Garden/Garden";
import "./Dashboard.css";
import { useSelector } from "react-redux";
const Dashboard = () => {
    const user = useSelector((state) => state.session.user)
  const suggestedActions = [
    "Practice 5 new math problems",
    "Watch a video on the water cycle",
    "Complete your weekly writing prompt",
    "Take a short quiz on reading comprehension"
  ];
  const grades = [
    "Current Class :: 80%",
    "Current Class :: 100%",
    "Current Class :: 70%",
    "Current Class :: 94%",
    "Current Class :: 88%",
    "Current Class :: 78%",

  ];

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Welcome back, {user?.email}!</h1>
        <p>Your magical learning journey awaits</p>
      </header>
      <main className="dashboard-main">

        <section className="chart-section">
          <h2>Your Subject Mastery</h2>
          <SubjectChart />
        </section>


       {/* map through course progressions */}
               <div
               className="progress-pro-box">
                   <Garden/>
                   <h1
                   className="progress-item-main"
                   >Student Progress:</h1>
                   <br/>
                   <h2
                   className="progress-item"
                   > Courses Completed : 22</h2>
                   <h2
                   className="progress-item"
                   > Projects Completed : 2</h2>
                   <h2
                   className="progress-item"
                   > Tests Completed : 5</h2>
                   <h2
                   className="progress-item"
                   > Quizzes Completed : 10</h2>
                   <h2
                   className="progress-item"
                   >Assignments Submitted: 35</h2>
                   <h2
                   className="progress-item"
                   >Total Time Online: 29hours, 49 minutes, 04 seconds</h2>
                   <h2
                   className="progress-item"
                   >Login Streak: 9 days</h2>
                   <h2
                   className="progress-item"
                   >Longest Streak: 14 days</h2>
                   <h2
                   className="progress-item"
                   >Weekly Activity Level: High</h2>
                   <h2
                   className="progress-item"
                   >Current Grade Level: 11th Grade</h2>
                   <h2
                   className="progress-item"
                   >Current GPA: 4.00</h2>
                   <h2
                   className="progress-item"
                   >Most Active Subject: Mathematics</h2>
                   <h2
                   className="progress-item"
                   >Forum Reputation Points: 1,200</h2>
               </div>


        <section className="suggestions-section">
          <h2>Suggested Next Steps</h2>
          <ul>
            {suggestedActions.map((action, index) => (
                <li key={index}>{action}</li>
            ))}
          </ul>
        </section>
            <section className="current-grades-section">
          <h2>Current Grades</h2>
          <ul>
            {grades.map((action, index) => (
                <li key={index}>{action}</li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
