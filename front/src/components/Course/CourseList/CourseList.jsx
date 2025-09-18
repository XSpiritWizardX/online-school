import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import {
  fetchCourses,
  selectCoursesOrdered,
  selectCoursesStatus,
  selectCoursesError,
} from "../../../store/slices/coursesSlice";
import "./CourseList.css";

const CourseList = () => {
  const dispatch = useDispatch();
  const courses = useSelector(selectCoursesOrdered);
  const status = useSelector(selectCoursesStatus);
  const error = useSelector(selectCoursesError);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchCourses());
    }
  }, [status, dispatch]);

  if (status === "loading") return <div>loading...</div>;
  if (status === "failed") return <div>error: {error}</div>;

  return (
    <div className="course-list-container">
      <h1 className="course-list-title">Courses</h1>
      {Object.keys(courses).length === 0 ? (
        <p>no courses</p>
      ) : (
        <div className="course-grid">
          {courses.map((course) => (
            <div key={course.id} className="course-card">
              <NavLink
                to={`/courses/course/${course.id}`}
                className="course-nav-link"
              >
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
      )}
    </div>
  );
};

export default CourseList;
