import "./CourseShow.css";

function CourseShow() {
  const course = {
    title: "Advanced Javascript Part IV",
    description:
      "Dive deep into advanced JavaScript concepts, from closures and prototypes to async programming and design patterns. This course blends theory with interactive coding challenges.",
    image:
      "https://res.cloudinary.com/dl6ls3rgu/image/upload/v1754453937/giphy_1_evdph0.gif",
    price: "$100.00",
    rating: "4.7 stars",
    instructor: "Jane Doe",
    enrolled: 4321,
    lessons: 24,
    duration: "12h 30m",
  };

  return (
    <div className="course-show-container">
      <h1
      className="course-show-title"
      >COURSE DETAILS</h1>
      <div className="grid-square">
        {/* TL */}
        <div className="grid-item tl">
          <img src={course.image} alt={course.title} />
        </div>

        {/* BL */}
        <div className="grid-item tr">
          <h2>About this course</h2>
          <p>{course.description}</p>
        </div>
        {/* TR */}
        <div className="grid-item bl">
          <h1>{course.title}</h1>
          <p>Instructor: {course.instructor}</p>
          <p>Rating: {course.rating}</p>
          <p>Enrolled: {course.enrolled.toLocaleString()}</p>
        </div>


        {/* BR */}
        <div className="grid-item br">
          <div className="stats">
            <div>
              <h3>{course.lessons}</h3>
              <p>Lessons</p>
            </div>
            <div>
              <h3>{course.duration}</h3>
              <p>Duration</p>
            </div>
            <div>
              <h3>{course.price}</h3>
              <p>Price</p>
            </div>
          </div>
          <div
          className="btn-cont">

          <button className="enroll-btn">Enroll Now</button>
          <button className="enroll-btn">Add to Cart</button>
          </div>



        </div>
      </div>
    </div>
  );
}

export default CourseShow;
