import React from 'react';
import CourseEditor from '../CourseEditor/CourseEditor';

const TestCourseEditor = () => {
  const handleSave = async (courseData) => {
    console.log('Saving course:', courseData);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    alert('Course saved successfully!');
  };

  const handleSaveDraft = async (courseData) => {
    console.log('Saving draft:', courseData);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    alert('Draft saved!');
  };

  const handleCancel = () => {
    console.log('Cancelled');
    if (window.confirm('Are you sure you want to cancel? Any unsaved changes will be lost.')) {
      // In a real app, you'd navigate back
      alert('Cancelled - would navigate back');
    }
  };

  // Example of editing an existing course
  const sampleCourse = {
    title: 'Introduction to JavaScript',
    description: 'Learn the fundamentals of JavaScript programming',
    category: 'programming',
    difficulty: 'beginner',
    sections: [
      {
        id: 'section1',
        title: 'Getting Started',
        lessons: [
          {
            id: 'lesson1',
            title: 'What is JavaScript?',
            type: 'text',
            content: 'JavaScript is a programming language...',
            language: 'javascript',
            instructions: '',
            starterCode: '',
            solution: '',
            videoUrl: '',
            questions: []
          },
          {
            id: 'lesson2',
            title: 'Your First Program',
            type: 'code',
            content: '',
            language: 'javascript',
            instructions: 'Write a function that returns "Hello, World!"',
            starterCode: 'function sayHello() {\n  // Your code here\n}',
            solution: 'function sayHello() {\n  return "Hello, World!";\n}',
            videoUrl: '',
            questions: []
          }
        ]
      }
    ]
  };

  return (
    <div
        className='course-editor-top-layer'
    >
      <h1>Course Editor Test Page</h1>

      <div style={{ marginBottom: '40px' }}>
        <h2>Create New Course</h2>
        <CourseEditor
          onSave={handleSave}
          onSaveDraft={handleSaveDraft}
          onCancel={handleCancel}
        />
      </div>

      <hr style={{ margin: '40px 0' }} />

      <div>
        <h2>Edit Existing Course</h2>
        <CourseEditor
          courseId="123"
          initialCourse={sampleCourse}
          onSave={handleSave}
          onSaveDraft={handleSaveDraft}
          onCancel={handleCancel}
        />
      </div>
    </div>
  );
};

export default TestCourseEditor;
