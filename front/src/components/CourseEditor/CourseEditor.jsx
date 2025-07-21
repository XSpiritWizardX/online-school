import { useState, useCallback } from 'react';
import './CourseEditor.css';
// Import your existing code editor component
// import CodeEditor from './CodeEditor';

const CourseEditor = ({
  courseId = null,
  initialCourse = null,
  onSave,
  onCancel,
  onSaveDraft
}) => {
  const [saving, setSaving] = useState(false);

  const defaultCourse = {
    title: '',
    description: '',
    category: '',
    difficulty: 'beginner',
    sections: []
  };

  const [course, setCourse] = useState(initialCourse || defaultCourse);
  const isEditing = !!courseId;

  // Utility functions
  const generateId = () => Date.now().toString(36) + Math.random().toString(36).substr(2);

  // Update course data
  const updateCourse = useCallback((updates) => {
    setCourse(prev => ({ ...prev, ...updates }));
  }, []);

  const updateSection = useCallback((sectionIndex, updates) => {
    setCourse(prev => ({
      ...prev,
      sections: prev.sections.map((section, index) =>
        index === sectionIndex ? { ...section, ...updates } : section
      )
    }));
  }, []);

  const updateLesson = useCallback((sectionIndex, lessonIndex, updates) => {
    setCourse(prev => ({
      ...prev,
      sections: prev.sections.map((section, sIndex) =>
        sIndex === sectionIndex
          ? {
              ...section,
              lessons: section.lessons.map((lesson, lIndex) =>
                lIndex === lessonIndex ? { ...lesson, ...updates } : lesson
              )
            }
          : section
      )
    }));
  }, []);

  // Section management
  const addSection = useCallback(() => {
    setCourse(prev => ({
      ...prev,
      sections: [...prev.sections, {
        id: generateId(),
        title: '',
        lessons: []
      }]
    }));
  }, []);

  const removeSection = useCallback((index) => {
    setCourse(prev => ({
      ...prev,
      sections: prev.sections.filter((_, i) => i !== index)
    }));
  }, []);

  // Lesson management
  const addLesson = useCallback((sectionIndex) => {
    setCourse(prev => ({
      ...prev,
      sections: prev.sections.map((section, index) =>
        index === sectionIndex
          ? {
              ...section,
              lessons: [...section.lessons, {
                id: generateId(),
                title: '',
                type: 'text',
                content: '',
                language: 'javascript',
                instructions: '',
                starterCode: '',
                solution: '',
                videoUrl: '',
                questions: []
              }]
            }
          : section
      )
    }));
  }, []);

  const removeLesson = useCallback((sectionIndex, lessonIndex) => {
    setCourse(prev => ({
      ...prev,
      sections: prev.sections.map((section, sIndex) =>
        sIndex === sectionIndex
          ? {
              ...section,
              lessons: section.lessons.filter((_, lIndex) => lIndex !== lessonIndex)
            }
          : section
      )
    }));
  }, []);

  // Quiz management
  const addQuestion = useCallback((sectionIndex, lessonIndex) => {
    updateLesson(sectionIndex, lessonIndex, {
      questions: [
        ...course.sections[sectionIndex].lessons[lessonIndex].questions,
        {
          id: generateId(),
          question: '',
          type: 'multiple-choice',
          options: [{ text: '' }, { text: '' }],
          correctAnswer: 0
        }
      ]
    });
  }, [course.sections, updateLesson]);

  const removeQuestion = useCallback((sectionIndex, lessonIndex, questionIndex) => {
    const currentQuestions = course.sections[sectionIndex].lessons[lessonIndex].questions;
    updateLesson(sectionIndex, lessonIndex, {
      questions: currentQuestions.filter((_, qIndex) => qIndex !== questionIndex)
    });
  }, [course.sections, updateLesson]);

  const updateQuestion = useCallback((sectionIndex, lessonIndex, questionIndex, updates) => {
    const currentQuestions = course.sections[sectionIndex].lessons[lessonIndex].questions;
    updateLesson(sectionIndex, lessonIndex, {
      questions: currentQuestions.map((question, qIndex) =>
        qIndex === questionIndex ? { ...question, ...updates } : question
      )
    });
  }, [course.sections, updateLesson]);

  const addOption = useCallback((sectionIndex, lessonIndex, questionIndex) => {
    const question = course.sections[sectionIndex].lessons[lessonIndex].questions[questionIndex];
    updateQuestion(sectionIndex, lessonIndex, questionIndex, {
      options: [...question.options, { text: '' }]
    });
  }, [course.sections, updateQuestion]);

  // Form handlers
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await onSave?.(course);
    } finally {
      setSaving(false);
    }
  };

  const handleSaveDraft = async () => {
    setSaving(true);
    try {
      await onSaveDraft?.(course);
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    onCancel?.();
  };

  return (
    <div className="course-editor">
      <form onSubmit={handleSubmit} className="course-form">
        {/* Basic Course Information */}
        <div className="form-section">
          <h3>Course Information</h3>

          <div className="form-group">
            <label htmlFor="title">Course Title *</label>
            <input
              id="title"
              type="text"
              required
              placeholder="Enter course title"
              className="form-input"
              value={course.title}
              onChange={(e) => updateCourse({ title: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              placeholder="Course description"
              rows="4"
              className="form-textarea"
              value={course.description}
              onChange={(e) => updateCourse({ description: e.target.value })}
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="category">Category</label>
              <select
                id="category"
                className="form-select"
                value={course.category}
                onChange={(e) => updateCourse({ category: e.target.value })}
              >
                <option value="">Select category</option>
                <option value="programming">Programming</option>
                <option value="web-development">Web Development</option>
                <option value="data-science">Data Science</option>
                <option value="mobile-development">Mobile Development</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="difficulty">Difficulty Level</label>
              <select
                id="difficulty"
                className="form-select"
                value={course.difficulty}
                onChange={(e) => updateCourse({ difficulty: e.target.value })}
              >
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>
          </div>
        </div>

        {/* Course Content Sections */}
        <div className="form-section">
          <div className="section-header">
            <h3>Course Content</h3>
            <button
              type="button"
              onClick={addSection}
              className="btn btn-secondary"
            >
              Add Section
            </button>
          </div>

          {course.sections.map((section, sectionIndex) => (
            <div key={section.id} className="content-section">
              <div className="section-controls">
                <input
                  placeholder="Section title"
                  className="section-title-input"
                  value={section.title}
                  onChange={(e) => updateSection(sectionIndex, { title: e.target.value })}
                />
                <button
                  type="button"
                  onClick={() => removeSection(sectionIndex)}
                  className="btn btn-danger btn-sm"
                >
                  Remove Section
                </button>
              </div>

              {/* Lessons within section */}
              <div className="lessons-container">
                {section.lessons.map((lesson, lessonIndex) => (
                  <div key={lesson.id} className="lesson-item">
                    <div className="lesson-header">
                      <input
                        placeholder="Lesson title"
                        className="lesson-title-input"
                        value={lesson.title}
                        onChange={(e) => updateLesson(sectionIndex, lessonIndex, { title: e.target.value })}
                      />
                      <select
                        className="lesson-type-select"
                        value={lesson.type}
                        onChange={(e) => updateLesson(sectionIndex, lessonIndex, { type: e.target.value })}
                      >
                        <option value="text">Text</option>
                        <option value="video">Video</option>
                        <option value="code">Code Exercise</option>
                        <option value="quiz">Quiz</option>
                      </select>
                      <button
                        type="button"
                        onClick={() => removeLesson(sectionIndex, lessonIndex)}
                        className="btn btn-danger btn-sm"
                      >
                        Remove
                      </button>
                    </div>

                    {/* Lesson Content based on type */}
                    <div className="lesson-content">
                      {/* Text Content */}
                      {lesson.type === 'text' && (
                        <div className="text-editor">
                          <textarea
                            placeholder="Lesson content (supports Markdown)"
                            rows="6"
                            className="form-textarea"
                            value={lesson.content}
                            onChange={(e) => updateLesson(sectionIndex, lessonIndex, { content: e.target.value })}
                          />
                        </div>
                      )}

                      {/* Video Content */}
                      {lesson.type === 'video' && (
                        <div className="video-editor">
                          <input
                            type="url"
                            placeholder="Video URL"
                            className="form-input"
                            value={lesson.videoUrl}
                            onChange={(e) => updateLesson(sectionIndex, lessonIndex, { videoUrl: e.target.value })}
                          />
                          <textarea
                            placeholder="Video description"
                            rows="3"
                            className="form-textarea"
                            value={lesson.content}
                            onChange={(e) => updateLesson(sectionIndex, lessonIndex, { content: e.target.value })}
                          />
                        </div>
                      )}

                      {/* Code Exercise - Using your existing code editor */}
                      {lesson.type === 'code' && (
                        <div className="code-exercise">
                          <div className="form-group">
                            <label>Programming Language</label>
                            <select
                              className="form-select"
                              value={lesson.language}
                              onChange={(e) => updateLesson(sectionIndex, lessonIndex, { language: e.target.value })}
                            >
                              <option value="javascript">JavaScript</option>
                              <option value="python">Python</option>
                              <option value="java">Java</option>
                              <option value="cpp">C++</option>
                              <option value="html">HTML</option>
                              <option value="css">CSS</option>
                              <option value="sql">SQL</option>
                            </select>
                          </div>

                          <div className="form-group">
                            <label>Instructions</label>
                            <textarea
                              placeholder="Exercise instructions"
                              rows="3"
                              className="form-textarea"
                              value={lesson.instructions}
                              onChange={(e) => updateLesson(sectionIndex, lessonIndex, { instructions: e.target.value })}
                            />
                          </div>

                          <div className="form-group">
                            <label>Starter Code</label>
                            {/* Replace 'CodeEditor' with your actual code editor component */}
                            {/* <CodeEditor
                              value={lesson.starterCode}
                              language={lesson.language}
                              placeholder={`Enter starter ${lesson.language} code`}
                              className="code-editor-instance"
                              onChange={(value) => updateLesson(sectionIndex, lessonIndex, { starterCode: value })}
                            /> */}
                            <textarea
                              placeholder={`Enter starter ${lesson.language} code`}
                              rows="8"
                              className="form-textarea code-textarea"
                              value={lesson.starterCode}
                              onChange={(e) => updateLesson(sectionIndex, lessonIndex, { starterCode: e.target.value })}
                            />
                          </div>

                          <div className="form-group">
                            <label>Solution (optional)</label>
                            {/* <CodeEditor
                              value={lesson.solution}
                              language={lesson.language}
                              placeholder={`Solution ${lesson.language} code`}
                              className="code-editor-instance"
                              onChange={(value) => updateLesson(sectionIndex, lessonIndex, { solution: value })}
                            /> */}
                            <textarea
                              placeholder={`Solution ${lesson.language} code`}
                              rows="6"
                              className="form-textarea code-textarea"
                              value={lesson.solution}
                              onChange={(e) => updateLesson(sectionIndex, lessonIndex, { solution: e.target.value })}
                            />
                          </div>
                        </div>
                      )}

                      {/* Quiz Content */}
                      {lesson.type === 'quiz' && (
                        <div className="quiz-editor">
                          {lesson.questions.map((question, qIndex) => (
                            <div key={question.id} className="question-item">
                              <div className="question-header">
                                <input
                                  placeholder="Question text"
                                  className="question-input"
                                  value={question.question}
                                  onChange={(e) => updateQuestion(sectionIndex, lessonIndex, qIndex, { question: e.target.value })}
                                />
                                <select
                                  className="question-type-select"
                                  value={question.type}
                                  onChange={(e) => updateQuestion(sectionIndex, lessonIndex, qIndex, { type: e.target.value })}
                                >
                                  <option value="multiple-choice">Multiple Choice</option>
                                  <option value="true-false">True/False</option>
                                  <option value="short-answer">Short Answer</option>
                                </select>
                                <button
                                  type="button"
                                  onClick={() => removeQuestion(sectionIndex, lessonIndex, qIndex)}
                                  className="btn btn-danger btn-sm"
                                >
                                  Remove
                                </button>
                              </div>

                                                          {/* Question options based on type */}
                              {question.type === 'multiple-choice' && (
                                <div className="question-options">
                                  {question.options.map((option, oIndex) => (
                                    <div key={oIndex} className="option-item">
                                      <input
                                        placeholder="Option text"
                                        className="option-input"
                                        value={option.text}
                                        onChange={(e) => {
                                          const newOptions = [...question.options];
                                          newOptions[oIndex] = { text: e.target.value };
                                          updateQuestion(sectionIndex, lessonIndex, qIndex, { options: newOptions });
                                        }}
                                      />
                                      <label className="correct-option">
                                        <input
                                          type="radio"
                                          name={`question-${sectionIndex}-${lessonIndex}-${qIndex}`}
                                          checked={question.correctAnswer === oIndex}
                                          onChange={() => updateQuestion(sectionIndex, lessonIndex, qIndex, { correctAnswer: oIndex })}
                                        />
                                        Correct
                                      </label>
                                    </div>
                                  ))}
                                  <button
                                    type="button"
                                    onClick={() => addOption(sectionIndex, lessonIndex, qIndex)}
                                    className="btn btn-secondary btn-sm"
                                  >
                                    Add Option
                                  </button>
                                </div>
                              )}

                              {question.type === 'true-false' && (
                                <div className="true-false-options">
                                  <label>
                                    <input
                                      type="radio"
                                      name={`question-${sectionIndex}-${lessonIndex}-${qIndex}`}
                                      checked={question.correctAnswer === 'true'}
                                      onChange={() => updateQuestion(sectionIndex, lessonIndex, qIndex, { correctAnswer: 'true' })}
                                    />
                                    True
                                  </label>
                                  <label>
                                    <input
                                      type="radio"
                                      name={`question-${sectionIndex}-${lessonIndex}-${qIndex}`}
                                      checked={question.correctAnswer === 'false'}
                                      onChange={() => updateQuestion(sectionIndex, lessonIndex, qIndex, { correctAnswer: 'false' })}
                                    />
                                    False
                                  </label>
                                </div>
                              )}

                              {question.type === 'short-answer' && (
                                <div className="short-answer">
                                  <input
                                    placeholder="Expected answer"
                                    className="form-input"
                                    value={question.correctAnswer}
                                    onChange={(e) => updateQuestion(sectionIndex, lessonIndex, qIndex, { correctAnswer: e.target.value })}
                                  />
                                </div>
                              )}
                            </div>
                          ))}

                          <button
                            type="button"
                            onClick={() => addQuestion(sectionIndex, lessonIndex)}
                            className="btn btn-secondary"
                          >
                            Add Question
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}

                <button
                  type="button"
                  onClick={() => addLesson(sectionIndex)}
                  className="btn btn-secondary btn-sm"
                >
                  Add Lesson
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Form Actions */}
        <div className="form-actions">
          <button
            type="button"
            onClick={handleCancel}
            className="btn btn-secondary"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSaveDraft}
            className="btn btn-outline"
            disabled={saving}
          >
            Save Draft
          </button>
          <button
            type="submit"
            className="btn btn-primary"
            disabled={saving}
          >
            {isEditing ? 'Update Course' : 'Create Course'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CourseEditor;
