import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const COURSE_BASE = "/api/v0/courses";

// Async thunks for CRUD operations
export const fetchCourses = createAsyncThunk(
  "courses/fetchAll",
  async () => {
    const response = await fetch(COURSE_BASE);
    if (!response.ok) throw new Error("Failed to fetch courses");
    return response.json();
  },
);

export const fetchCourseById = createAsyncThunk(
  "courses/fetchById",
  async (id) => {
    const response = await fetch(`${COURSE_BASE}/${id}/`);
    if (!response.ok) throw new Error("Failed to fetch course");
    return response.json();
  },
);

export const createCourse = createAsyncThunk(
  "courses/create",
  async (courseData) => {
    const response = await fetch(COURSE_BASE, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify(courseData),
    });
    if (!response.ok) throw new Error("Failed to create course");
    return response.json();
  },
);

export const updateCourse = createAsyncThunk(
  "courses/update",
  async ({ id, ...courseData }) => {
    const response = await fetch(`${COURSE_BASE}/${id}/`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify(courseData),
    });
    if (!response.ok) throw new Error("Failed to update course");
    return response.json();
  },
);

export const deleteCourse = createAsyncThunk(
  "courses/delete",
  async (id) => {
    const response = await fetch(`${COURSE_BASE}/${id}/`, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
    if (!response.ok) throw new Error("Failed to delete course");
    return id;
  },
);

// Slice
const coursesSlice = createSlice({
  name: "courses",
  initialState: {
    items: {},
    status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all courses
      .addCase(fetchCourses.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCourses.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchCourses.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      // Fetch single course
      .addCase(fetchCourseById.fulfilled, (state, action) => {
        const course = action.payload;
        state.items[course.id] = course;
      })
      // Create course
      .addCase(createCourse.fulfilled, (state, action) => {
        //state.items.push(action.payload);
        const course = action.payload;
        state.items[course.id] = course;
      })
      // Update course
      .addCase(updateCourse.fulfilled, (state, action) => {
        const course = action.payload;
        state.items[course.id] = course;
      })
      // Delete course
      .addCase(deleteCourse.fulfilled, (state, action) => {
        const courseId = action.payload;
        delete state.items[courseId];
      });
  },
});

export const { clearError } = coursesSlice.actions;
export default coursesSlice.reducer;

// Selectors
export const selectCoursesMap = (state) => state.courses.items;
export const selectCoursesOrdered = (state) =>
  Object.keys(state.courses.items)
    .toSorted()
    .map((courseId) => state.courses.items[courseId]);
export const selectCourseById = (state, courseId) =>
  state.courses.items[courseId];
export const selectCoursesStatus = (state) => state.courses.status;
export const selectCoursesError = (state) => state.courses.error;
