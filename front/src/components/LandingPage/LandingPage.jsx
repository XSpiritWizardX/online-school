import "./LandingPage.css";
import { NavLink } from "react-router-dom";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import SignupFormModal from "../../components/SignupFormModal/SignupFormModal";
export default function LandingPage() {
  return (
    <div className="landing-page">
      <div className="landing-page-container">
        <h1 className="landing-page-title">
          WELCOME TO ONLINE SCHOOL — Learn. Teach. Create. Evolve.
        </h1>

        <p className="arc-para">
          Online School is not just another educational platform.
          It&apos;s a powerful, flexible space built for creators,
          educators, and lifelong learners. <br />
          Whether you&apos;re here to build your own course empire,
          teach what you love, or master a new skill—Online School
          gives you the tools to make it happen.
        </p>

        <h2 className="land-head">
          A Full Suite for Teaching & Learning
        </h2>
        <p className="arc-para">Online School empowers users to:</p>
        <ul>
          <li>Create and sell their own interactive courses</li>
          <li>
            Join or host live virtual classrooms and tutoring sessions
          </li>
          <li>
            Subscribe to creators, leave reviews, and build
            communities
          </li>
          <li>
            Enroll in thousands of courses across a variety of
            subjects
          </li>
          <li>
            Support homeschooling families with compliance-ready tools
            and documentation
          </li>
        </ul>

        <h2 className="land-head">Next-Gen AI Integration</h2>
        <p className="arc-para">
          Featuring our AI-powered teaching assistant:
        </p>
        <ul>
          <li>
            Helps students understand concepts, study for exams, and
            practice quizzes
          </li>
          <li>
            Assists instructors in designing better lessons,
            generating questions, grading, and personalizing content
          </li>
          <li>
            Supports voice, chat, and document-based interactions for
            fluid learning experiences
          </li>
        </ul>

        <h2 className="land-head">
          Interactive Course Creation Tools
        </h2>
        <p className="arc-para">
          Courses on Online School aren&apos;t just
          videos—they&apos;re experiences. Use custom-built tools
          like:
        </p>
        <ul>
          <li>
            Drag-and-drop lesson builders with forms, quizzes,
            slideshows, and docs
          </li>
          <li>
            Integrated spreadsheet tools for real-time collaboration
          </li>
          <li>
            In-house IDE for coding bootcamps and computer science
            instruction
          </li>
          <li>
            Media uploads: images, PDFs, videos, and audio
            walkthroughs
          </li>
          <li>
            Gamified progress tracking, achievements, and certificates
          </li>
        </ul>

        <h2 className="land-head">A Platform That Pays You</h2>
        <p className="arc-para">
          Teaching should be rewarding—in every way. That&apos;s why
          we built Online School with creators in mind:
        </p>
        <ul>
          <li>
            Charge per course, offer monthly subscriptions, or host
            donation-based lessons
          </li>
          <li>
            Access detailed analytics and student engagement data
          </li>
          <li>
            Grow your brand, your audience, and your income on one
            platform
          </li>
        </ul>

        <h2 className="land-head">
          Built for Homeschooling, Built for Compliance
        </h2>
        <p className="arc-para">
          For parents and guardians, Online School helps manage and
          document homeschool curriculum, ensuring that lessons meet
          educational standards. <br />
          Track progress, generate reports, and provide a structured
          learning environment at home.
        </p>

        <h2 className="land-head">
          Live Instruction & Collaboration
        </h2>
        <p className="arc-para">
          Education thrives in connection. Host or attend live virtual
          classes with:
        </p>
        <ul>
          <li>Built-in video conferencing tools</li>
          <li>Real-time whiteboards and screen sharing</li>
          <li>Private tutoring, class replays, and session notes</li>
        </ul>

        <h2 className="land-head">
          Coming Soon: Even More Power for Creators
        </h2>
        <p className="arc-para">
          We&apos;re constantly evolving. Features on the roadmap
          include:
        </p>
        <ul>
          <li>
            Multiplayer classroom simulations & collaborative lesson
            games
          </li>
          <li>AI quiz and test generation based on lesson content</li>
          <li>
            Marketplace for templates, graphics, and custom course
            assets
          </li>
          <li>Student portfolios and public profiles</li>
        </ul>

        <h2 className="land-head">A New Era of Education</h2>
        <p className="arc-para">
          Whether you&apos;re a seasoned teacher, a homeschool parent,
          a curious student, or an edupreneur with big ideas, <br />
          Online School gives you the space and tools to build your
          legacy.
          <br />
          <br />
          This is not just a school. It&apos;s a movement for modern
          education.
          <br />
          <br />
          Learn. Teach. Grow. Earn. Online School is where future
          educators and creators come to thrive.
        </p>

        <OpenModalButton
          className="landing-page-signup-button"
          buttonText="Join Online School Now"
          modalComponent={<SignupFormModal />}
        />
      </div>
      <div to="/test-ide" className="test-ides">
        <NavLink to="/test-ide" className="test-ide">
          Test The IDE
        </NavLink>
      </div>
    </div>
  );
}
