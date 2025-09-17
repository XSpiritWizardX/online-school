import "./LandingPage.css";
import { NavLink } from "react-router-dom";
import { useEffect, useRef } from "react";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import SignupFormModal from "../../components/SignupFormModal/SignupFormModal";
export default function LandingPage() {
  const observerRef = useRef(null);

  useEffect(() => {
    // Set up intersection observer for scroll animations
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    // Observe all animatable elements
    const elements = document.querySelectorAll('.animate-on-scroll');
    elements.forEach((el) => {
      observerRef.current.observe(el);
    });

    // Add initial animation class to hero elements
    const heroElements = document.querySelectorAll('.animate-on-load');
    heroElements.forEach((el, index) => {
      setTimeout(() => {
        el.classList.add('animate-in');
      }, index * 200);
    });

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  return (
    <div className="landing-page">
      <div className="landing-page-container">
        <h1 className="landing-page-title animate-on-load">
          ONLINE SCHOOL
          <div className="action-words animate-on-load">
            <span className="action-word">Learn</span>
            <span className="action-word">Teach</span>
            <span className="action-word">Create</span>
            <span className="action-word">Evolve</span>
          </div>
        </h1>

        <p className="arc-para animate-on-load">
          Online School is not just another educational platform.
          It&apos;s a powerful, flexible space built for creators,
          educators, and lifelong learners. <br />
          Whether you&apos;re here to build your own course empire,
          teach what you love, or master a new skill—Online School
          gives you the tools to make it happen.
        </p>

        <h2 className="land-head animate-on-scroll">
          A Full Suite for Teaching & Learning
        </h2>
        <p className="arc-para animate-on-scroll">Online School empowers users to:</p>
        <ul className="animate-on-scroll">
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

        <h2 className="land-head animate-on-scroll">Next-Gen AI Integration</h2>
        <p className="arc-para animate-on-scroll">
          Featuring our AI-powered teaching assistant:
        </p>
        <ul className="animate-on-scroll">
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

        <h2 className="land-head animate-on-scroll">
          Interactive Course Creation Tools
        </h2>
        <p className="arc-para animate-on-scroll">
          Courses on Online School aren&apos;t just
          videos—they&apos;re experiences. Use custom-built tools
          like:
        </p>
        <ul className="animate-on-scroll">
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

        <h2 className="land-head animate-on-scroll">A Platform That Pays You</h2>
        <p className="arc-para animate-on-scroll">
          Teaching should be rewarding—in every way. That&apos;s why
          we built Online School with creators in mind:
        </p>
        <ul className="animate-on-scroll">
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

        <h2 className="land-head animate-on-scroll">
          Built for Homeschooling, Built for Compliance
        </h2>
        <p className="arc-para animate-on-scroll">
          For parents and guardians, Online School helps manage and
          document homeschool curriculum, ensuring that lessons meet
          educational standards. <br />
          Track progress, generate reports, and provide a structured
          learning environment at home.
        </p>

        <h2 className="land-head animate-on-scroll">
          Live Instruction & Collaboration
        </h2>
        <p className="arc-para animate-on-scroll">
          Education thrives in connection. Host or attend live virtual
          classes with:
        </p>
        <ul className="animate-on-scroll">
          <li>Built-in video conferencing tools</li>
          <li>Real-time whiteboards and screen sharing</li>
          <li>Private tutoring, class replays, and session notes</li>
        </ul>

        <h2 className="land-head animate-on-scroll">
          Coming Soon: Even More Power for Creators
        </h2>
        <p className="arc-para animate-on-scroll">
          We&apos;re constantly evolving. Features on the roadmap
          include:
        </p>
        <ul className="animate-on-scroll">
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

        <h2 className="land-head animate-on-scroll">A New Era of Education</h2>
        <p className="arc-para animate-on-scroll">
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
          className="landing-page-signup-button animate-on-scroll"
          buttonText="Join Online School Now"
          modalComponent={<SignupFormModal />}
        />

        <div className="test-ides animate-on-scroll">
          <NavLink to="/test-ide" className="test-ide">
            Test Our IDE!
          </NavLink>
             <NavLink to="/test-video" className="test-ide">
            Test Our Videos!
          </NavLink>
        </div>
      </div>
    </div>
  );
}
