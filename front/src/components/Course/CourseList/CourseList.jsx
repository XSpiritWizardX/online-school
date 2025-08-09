
import "./CourseList.css";
import { useNavigate } from "react-router-dom";

function CourseList() {
  const navigate = useNavigate();

  // Filter buttons
  const filterButtons = [
    { label: "Categories", value: "categories" },
    { label: "Grade Level", value: "grade-level" },
    { label: "State", value: "state" },
    { label: "Price", value: "price" },
    { label: "Rating", value: "rating" },
  ];

  // Course data (replace with fetched data later)
  const courses = [
    {
      id: 1,
      title: "Intro To Calculus I",
      description:
        "Description for the course. It could even be more than a sentence...",
      image:
        "https://res.cloudinary.com/dl6ls3rgu/image/upload/v1753829297/4264a4ba598c17ef23685260a13bd849_hrz3sk.gif",
      price: "$100.00",
      rating: "3.5 stars",
    },
    {
      id: 2,
      title: "Advanced Javascript Part IV",
      description:
        "Description for the course. It could even be more than a sentence...",
      image:
        "https://res.cloudinary.com/dl6ls3rgu/image/upload/v1754453937/giphy_1_evdph0.gif",
      price: "$100.00",
      rating: "3.5 stars",
    },
    {
      id: 3,
      title: "Music Theory & Practice I",
      description:
        "Description for the course. It could even be more than a sentence...",
      image:
        "https://res.cloudinary.com/dl6ls3rgu/image/upload/v1753825880/source_mve9ni.gif",
      price: "$100.00",
      rating: "3.5 stars",
    },
    {
      id: 4,
      title: "Introduction to Chemistry",
      description:
        "Description for the course. It could even be more than a sentence...",
      image:
        "https://res.cloudinary.com/dl6ls3rgu/image/upload/v1753825880/source_mve9ni.gif",
      price: "$100.00",
      rating: "3.5 stars",
    },
    {
      id: 5,
      title: "U.S. History: Civil War",
      description:
        "Description for the course. It could even be more than a sentence...",
      image:
        "https://res.cloudinary.com/dl6ls3rgu/image/upload/v1753825880/source_mve9ni.gif",
      price: "$100.00",
      rating: "3.5 stars",
    },
  ];

  return (
    <div className="all-courses-page-container">
      {/* Page Header */}
      <div className="c-courses-header">
        <h1
        className="course-list-title"
        >ALL COURSES</h1>
      </div>

      {/* Filter Section */}
      <div className="course-list-header">
        <h3 className="course-list-header-title">Filter By:</h3>
        {filterButtons.map((btn) => (
          <button
            key={btn.value}
            className="filter-btn"
            onClick={() => console.log(`Filter by ${btn.value}`)}
          >
            {btn.label}
          </button>
        ))}
      </div>

      {/* Courses */}
      <div className="courses-container">
        {courses.map((course) => (
          <div key={course.id} className="course-card-outside">
            <div
              className="course-card"
              onClick={() => navigate(`/courses/course/${course.id}`)}
            >
              <img
                src={course.image}
                alt={course.title}
                className="course-card-img"
              />
              <h3 className="course-title">{course.title}</h3>
              <p className="course-desc">{course.description}</p>
              <button className="upon-complete-button">Upon Completion</button>
              <div className="price-rating-container">
                <p className="course-price">{course.price}</p>
                <p className="course-rating">Rating: {course.rating}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CourseList;
