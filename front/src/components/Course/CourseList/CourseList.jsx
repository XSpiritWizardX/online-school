import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllCourses } from "../../../redux/course";
import { NavLink } from "react-router-dom";
import "./CourseList.css";

function CourseList() {
  const dispatch = useDispatch();
  const courses = useSelector((state) => state.course.courses || []);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    dispatch(fetchAllCourses())
      .then(() => setIsLoading(false))
      .catch(() => setIsLoading(false));
  }, [dispatch]);

  if (isLoading) {
    return <div className="courses-container">Loading courses...</div>;
  }

  return (
    <div className="course-list-container">
      <h1 className="course-list-title">Courses</h1>
      <div className="course-grid">
        {courses.map((course) => (
          <div key={course.id} className="course-card">
            <NavLink to={`/courses/course/${course.id}`} className="course-nav-link">
              <h2 className="course-name">{course.title}</h2>
              {course.image_url && (
                <img
                  className="course-image"
                  src={course.image_url}
                  alt={course.title}
                />
              )}
              <p className="course-description">
                {course.description || "No description available"}
              </p>
            </NavLink>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CourseList;
