
const CREATE_COURSE = 'course/createCourse';
const SET_ONE_COURSE = 'course/oneCourse';
const REMOVE_COURSE = 'course/removeCourse';
const GET_COURSES = 'course/getCourses';
const GET_ALL_COURSES = 'course/getAllCourses';
const UPDATE_COURSE = 'course/updateCourse';





// action creators
const addCourse = (course) => ({
  type: CREATE_COURSE,
  payload: course
});

const setOneCourse = (course) => ({
    type: SET_ONE_COURSE,
    payload: course,
  });

const removeCourseId = (courseId) => ({
  type: REMOVE_COURSE,
  courseId
});

const getCourses = (courses) => ({
  type: GET_COURSES,
  payload: courses
});

const getAllCourses = (courses) => ({
  type: GET_ALL_COURSES,
  payload: courses
});

const updateCourseAction = (course) => ({
  type: UPDATE_COURSE,
  payload: course
});

// Thunk action creators
export const fetchCourses = () => async (dispatch) => {
  try {
    const response = await fetch('/api/v0/courses/', {
      credentials: 'include'
    });

    if (response.ok) {
      const data = await response.json();
      dispatch(getCourses(data));
      return data;
    }
  } catch (error) {
    console.error('Error fetching courses:', error);
    throw error;
  }
};



export const fetchAllCourses = () => async (dispatch) => {
  try {
    const response = await fetch('/api/v0/courses/all', {

    });

    if (response.ok) {
      const data = await response.json();
      dispatch(getAllCourses(data));
      return data;
    }
  } catch (error) {
    console.error('Error fetching all courses:', error);
    throw error;
  }
};





export const fetchOneCourse = (courseId) => async (dispatch) => {
  try {
    const response = await fetch(`/api/v0/courses/${courseId}`, {

    });
    console.log('fetchOneCourse response:', response)
    console.log("course id:")

    if (response.ok) {
      const course = await response.json();
      console.log(course)
      dispatch(setOneCourse(course));
      return course;
    } else {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to fetch course');
    }
  } catch (error) {
    console.error('Error fetching course', {error});
    throw error;
  }
};


export const createCourse = (courseData) => async (dispatch) => {
  try {
    const response = await fetch('/api/v0/courses/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(courseData),
      credentials: 'include'   // send auth. cookies in request
    });

    if (response.ok) {
      const data = await response.json();

      dispatch(addCourse(data));
      // after creating a sword, fetch all courses to update the state
      dispatch(fetchCourses());
      return data;
    } else {
      // handle non-OK responses
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to create course');
    }
  } catch (error) {
    console.error('Error creating course:', error);
    throw error;
  }
};


export const deleteCourse = (courseId) => async (dispatch) => {
  try {
    const response = await fetch(`/api/v0/courses/${courseId}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Failed to delete course');  // Prevents misleading success alerts
    }

    dispatch(removeCourseId(courseId)); // Update Redux state
    return 'Course deleted successfully'; // Ensure frontend knows it worked
  } catch (error) {
    console.error('Delete Error:', error); // Log error to console
    throw error; // Ensures the frontend properly handles the failure
  }
};



export const updateCourse = (courseId, courseData) => async (dispatch) => {
  try {
    const response = await fetch(`/api/v0/courses/${courseId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(courseData),
    });

    if (response.ok) {
      const updatedCourse = await response.json();
      dispatch(updateCourseAction(updatedCourse));
      return updatedCourse;
    } else {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to update course');
    }
  } catch (error) {
    console.error('Error updating course:', error);
    throw error;
  }
};


const initialState = { courses: null, currentCourse: null };

function courseReducer(state = initialState, action) {
  switch (action.type) {
    case CREATE_COURSE:
      return { ...state, currentCourse: action.payload };

    case SET_ONE_COURSE:
      return { ...state, currentCourse: action.payload };

    case REMOVE_COURSE:
      return {
        ...state,
        courses: state.courses.filter(course => course.id !== action.courseId)
      };

    case GET_COURSES:
    case GET_ALL_COURSES:
      return { ...state, courses: action.payload.courses || [] };

    case UPDATE_COURSE:
      return { ...state, currentCourse: action.payload };

    default:
      return state;
  }
}




export default courseReducer;
