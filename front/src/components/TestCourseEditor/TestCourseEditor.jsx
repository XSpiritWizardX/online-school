import { useState, useRef, useEffect } from "react";
import "./TestCourseEditor.css";
import CourseInterface from "../CourseInterface/CourseInterface";

export default function TestCourseEditor() {
  const [currentLesson, setCurrentLesson] = useState(0);
  const [activeSection, setActiveSection] = useState('content');
  const [expandedModules, setExpandedModules] = useState(new Set([0]));
  const [bottomSectionHeight, setBottomSectionHeight] = useState(300);
  const [isResizing, setIsResizing] = useState(false);
  const [showSaveIndicator, setShowSaveIndicator] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const courseMainRef = useRef(null);

  // Editable course data
  const [courseData, setCourseData] = useState({
    title: "Complete Web Development Course",
    modules: [
      {
        title: "Introduction to HTML",
        lessons: [
          {
            title: "HTML Basics",
            content: {
              type: "text",
              description: "HTML (HyperText Markup Language) is the standard markup language for creating web pages.",
              sections: [
                {
                  title: "What is HTML?",
                  content: "HTML stands for HyperText Markup Language. It's not a programming language, but rather a markup language that tells the web browser how to structure and display content on a web page."
                }
              ],
              notes: "HTML stands for HyperText Markup Language. It uses tags to structure content on web pages.",
              resources: ["HTML Specification", "MDN HTML Guide"]
            }
          }
        ]
      }
    ]
  });

  const getCurrentLessonContent = () => {
    for (let moduleIndex = 0; moduleIndex < courseData.modules.length; moduleIndex++) {
      const module = courseData.modules[moduleIndex];
      for (let lessonIndex = 0; lessonIndex < module.lessons.length; lessonIndex++) {
        if (currentLesson === moduleIndex * 10 + lessonIndex) {
          return {
            ...module.lessons[lessonIndex],
            moduleTitle: module.title,
            lessonIndex: lessonIndex,
            moduleIndex: moduleIndex
          };
        }
      }
    }
    return courseData.modules[0].lessons[0];
  };

  const currentLessonContent = getCurrentLessonContent();

  const updateCourseTitle = (newTitle) => {
    setCourseData(prev => ({ ...prev, title: newTitle }));
    showSaveNotification();
  };

  const updateModuleTitle = (moduleIndex, newTitle) => {
    setCourseData(prev => ({
      ...prev,
      modules: prev.modules.map((module, index) => 
        index === moduleIndex ? { ...module, title: newTitle } : module
      )
    }));
    showSaveNotification();
  };

  const updateLessonTitle = (moduleIndex, lessonIndex, newTitle) => {
    setCourseData(prev => ({
      ...prev,
      modules: prev.modules.map((module, mIndex) => 
        mIndex === moduleIndex ? {
          ...module,
          lessons: module.lessons.map((lesson, lIndex) =>
            lIndex === lessonIndex ? { ...lesson, title: newTitle } : lesson
          )
        } : module
      )
    }));
    showSaveNotification();
  };

  const updateLessonContent = (moduleIndex, lessonIndex, contentPath, newValue) => {
    setCourseData(prev => ({
      ...prev,
      modules: prev.modules.map((module, mIndex) => 
        mIndex === moduleIndex ? {
          ...module,
          lessons: module.lessons.map((lesson, lIndex) =>
            lIndex === lessonIndex ? {
              ...lesson,
              content: {
                ...lesson.content,
                [contentPath]: newValue
              }
            } : lesson
          )
        } : module
      )
    }));
    showSaveNotification();
  };

  const addModule = () => {
    const newModule = {
      title: "New Module",
      lessons: [{
        title: "New Lesson",
        content: {
          type: "text",
          description: "New lesson description",
          sections: [],
          notes: "",
          resources: []
        }
      }]
    };
    setCourseData(prev => ({
      ...prev,
      modules: [...prev.modules, newModule]
    }));
    const newModuleIndex = courseData.modules.length;
    setExpandedModules(prev => new Set([...prev, newModuleIndex]));
    showSaveNotification();
  };

  const addLesson = (moduleIndex) => {
    const newLesson = {
      title: "New Lesson",
      content: {
        type: "text",
        description: "New lesson description",
        sections: [],
        notes: "",
        resources: []
      }
    };
    setCourseData(prev => ({
      ...prev,
      modules: prev.modules.map((module, index) => 
        index === moduleIndex ? {
          ...module,
          lessons: [...module.lessons, newLesson]
        } : module
      )
    }));
    showSaveNotification();
  };

  const addSection = () => {
    const { moduleIndex, lessonIndex } = getCurrentLessonContent();
    const newSection = {
      title: "New Section",
      content: "Enter section content here...",
      code: ""
    };
    
    setCourseData(prev => ({
      ...prev,
      modules: prev.modules.map((module, mIndex) => 
        mIndex === moduleIndex ? {
          ...module,
          lessons: module.lessons.map((lesson, lIndex) =>
            lIndex === lessonIndex ? {
              ...lesson,
              content: {
                ...lesson.content,
                sections: [...(lesson.content.sections || []), newSection]
              }
            } : lesson
          )
        } : module
      )
    }));
    showSaveNotification();
  };

  const updateSection = (sectionIndex, field, value) => {
    const { moduleIndex, lessonIndex } = getCurrentLessonContent();
    
    setCourseData(prev => ({
      ...prev,
      modules: prev.modules.map((module, mIndex) => 
        mIndex === moduleIndex ? {
          ...module,
          lessons: module.lessons.map((lesson, lIndex) =>
            lIndex === lessonIndex ? {
              ...lesson,
              content: {
                ...lesson.content,
                sections: lesson.content.sections.map((section, sIndex) =>
                  sIndex === sectionIndex ? { ...section, [field]: value } : section
                )
              }
            } : lesson
          )
        } : module
      )
    }));
    showSaveNotification();
  };

  const deleteSection = (sectionIndex) => {
    const { moduleIndex, lessonIndex } = getCurrentLessonContent();
    
    setCourseData(prev => ({
      ...prev,
      modules: prev.modules.map((module, mIndex) => 
        mIndex === moduleIndex ? {
          ...module,
          lessons: module.lessons.map((lesson, lIndex) =>
            lIndex === lessonIndex ? {
              ...lesson,
              content: {
                ...lesson.content,
                sections: lesson.content.sections.filter((_, sIndex) => sIndex !== sectionIndex)
              }
            } : lesson
          )
        } : module
      )
    }));
    showSaveNotification();
  };

  const showSaveNotification = () => {
    setShowSaveIndicator(true);
    setTimeout(() => setShowSaveIndicator(false), 2000);
  };

  const toggleModule = (moduleIndex) => {
    const newExpanded = new Set(expandedModules);
    if (newExpanded.has(moduleIndex)) {
      newExpanded.delete(moduleIndex);
    } else {
      newExpanded.add(moduleIndex);
    }
    setExpandedModules(newExpanded);
  };

  const selectLesson = (moduleIndex, lessonIndex) => {
    setCurrentLesson(moduleIndex * 10 + lessonIndex);
  };

  const handleMouseDown = (e) => {
    setIsResizing(true);
    e.preventDefault();
  };

  const handleMouseMove = (e) => {
    if (!isResizing) return;
    
    const courseInterface = document.querySelector('.course-editor');
    const rect = courseInterface.getBoundingClientRect();
    const newHeight = rect.bottom - e.clientY;
    
    const minHeight = 200;
    const maxHeight = window.innerHeight * 0.6;
    
    if (newHeight >= minHeight && newHeight <= maxHeight) {
      setBottomSectionHeight(newHeight);
    }
  };

  const handleMouseUp = () => {
    setIsResizing(false);
  };

  useEffect(() => {
    if (isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = 'ns-resize';
      document.body.style.userSelect = 'none';
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    };
  }, [isResizing]);

  const togglePreview = () => {
    setIsPreviewMode(!isPreviewMode);
  };

  const PreviewCourseInterface = ({ courseData, onClose }) => {
    return (
      <div className="preview-overlay">
        <div className="preview-header">
          <span>Preview Mode - Student View</span>
          <button className="close-preview-btn" onClick={onClose}>
            ✕ Exit Preview
          </button>
        </div>
        <div className="preview-content-wrapper">
          <CourseInterface courseData={courseData} />
          {/* Action buttons overlay for preview mode */}
          <div className="preview-action-buttons">
            <button className="preview-btn" onClick={onClose}>
              ✕ Exit Preview
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="course-editor">
      {isPreviewMode && (
        <PreviewCourseInterface 
          courseData={courseData} 
          onClose={() => setIsPreviewMode(false)} 
        />
      )}

      {/* Course Header */}
      <header className="course-header">
        <div className="header-content">
          <input
            type="text"
            className="course-title-input"
            value={courseData.title}
            onChange={(e) => updateCourseTitle(e.target.value)}
            placeholder="Course Title"
          />
        </div>
        <div className="progress-bar">
          <div className="progress-fill" style={{width: '35%'}}></div>
        </div>
      </header>

      {/* Save Indicator */}
      {showSaveIndicator && (
        <div className="save-indicator">
          <span>✓ Changes saved</span>
        </div>
      )}

      {/* Main Layout */}
      <div className="course-layout" style={{height: `calc(100vh - 80px - ${bottomSectionHeight}px)`}}>
        {/* Left Sidebar - Course Content */}
        <aside className="course-sidebar">
          <div className="sidebar-header">
            <h3>Course Content</h3>
            <button className="add-module-btn" onClick={addModule}>+ Module</button>
          </div>
          <div className="modules-list">
            {courseData.modules.map((module, moduleIndex) => (
              <div key={moduleIndex} className="module">
                <div className="module-header">
                  <div className="module-header-content" onClick={() => toggleModule(moduleIndex)}>
                    <span className={`expand-icon ${expandedModules.has(moduleIndex) ? 'expanded' : ''}`}>
                      ▶
                    </span>
                    {editingItem === `module-${moduleIndex}` ? (
                      <input
                        type="text"
                        className="inline-edit"
                        value={module.title}
                        onChange={(e) => updateModuleTitle(moduleIndex, e.target.value)}
                        onBlur={() => setEditingItem(null)}
                        onKeyPress={(e) => e.key === 'Enter' && setEditingItem(null)}
                        autoFocus
                      />
                    ) : (
                      <span 
                        className="module-title"
                        onDoubleClick={() => setEditingItem(`module-${moduleIndex}`)}
                      >
                        {module.title}
                      </span>
                    )}
                  </div>
                  <button 
                    className="add-lesson-btn"
                    onClick={() => addLesson(moduleIndex)}
                    title="Add Lesson"
                  >
                    +
                  </button>
                </div>
                {expandedModules.has(moduleIndex) && (
                  <div className="lessons-list">
                    {module.lessons.map((lesson, lessonIndex) => (
                      <div 
                        key={lessonIndex}
                        className={`lesson ${currentLesson === moduleIndex * 10 + lessonIndex ? 'active' : ''}`}
                        onClick={() => selectLesson(moduleIndex, lessonIndex)}
                      >
                        <span className="lesson-icon">▶</span>
                        {editingItem === `lesson-${moduleIndex}-${lessonIndex}` ? (
                          <input
                            type="text"
                            className="inline-edit"
                            value={lesson.title}
                            onChange={(e) => updateLessonTitle(moduleIndex, lessonIndex, e.target.value)}
                            onBlur={() => setEditingItem(null)}
                            onKeyPress={(e) => e.key === 'Enter' && setEditingItem(null)}
                            autoFocus
                          />
                        ) : (
                          <span 
                            className="lesson-title"
                            onDoubleClick={() => setEditingItem(`lesson-${moduleIndex}-${lessonIndex}`)}
                          >
                            {lesson.title}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="course-main" ref={courseMainRef}>
          <div className="lesson-editor">
            <div className="lesson-header">
              <input
                type="text"
                className="lesson-title-input"
                value={currentLessonContent.title}
                onChange={(e) => updateLessonTitle(
                  currentLessonContent.moduleIndex,
                  currentLessonContent.lessonIndex,
                  e.target.value
                )}
                placeholder="Lesson Title"
              />
              <textarea
                className="lesson-description-textarea"
                value={currentLessonContent.content?.description || ''}
                onChange={(e) => updateLessonContent(
                  currentLessonContent.moduleIndex,
                  currentLessonContent.lessonIndex,
                  'description',
                  e.target.value
                )}
                placeholder="Lesson description..."
              />
            </div>
            
            <div className="content-editor">
              <div className="editor-toolbar">
                <button onClick={addSection} className="add-section-btn">+ Add Section</button>
                <select 
                  value={currentLessonContent.content?.type || 'text'}
                  onChange={(e) => updateLessonContent(
                    currentLessonContent.moduleIndex,
                    currentLessonContent.lessonIndex,
                    'type',
                    e.target.value
                  )}
                  className="content-type-select"
                >
                  <option value="text">Text Lesson</option>
                  <option value="video">Video Lesson</option>
                </select>
              </div>

              <div className="sections-editor">
                {currentLessonContent.content?.sections?.map((section, index) => (
                  <div key={index} className="section-editor">
                    <div className="section-header">
                      <input
                        type="text"
                        className="section-title-input"
                        value={section.title}
                        onChange={(e) => updateSection(index, 'title', e.target.value)}
                        placeholder="Section title"
                      />
                      <button 
                        className="delete-section-btn"
                        onClick={() => deleteSection(index)}
                      >
                        ×
                      </button>
                    </div>
                    <textarea
                      className="section-content-textarea"
                      value={section.content}
                      onChange={(e) => updateSection(index, 'content', e.target.value)}
                      placeholder="Section content..."
                    />
                    <div className="code-section">
                      <label>Code Example (optional):</label>
                      <textarea
                        className="code-textarea"
                        value={section.code || ''}
                        onChange={(e) => updateSection(index, 'code', e.target.value)}
                        placeholder="Enter code example..."
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Resizer */}
      <div 
        className="resize-handle"
        onMouseDown={handleMouseDown}
      >
        <div className="resize-line"></div>
      </div>

      {/* Bottom Section - Lesson Settings */}
      <section className="course-bottom" style={{height: `${bottomSectionHeight}px`}}>
        <div className="section-tabs">
          <button 
            className={`tab ${activeSection === 'content' ? 'active' : ''}`}
            onClick={() => setActiveSection('content')}
          >
            Lesson Settings
          </button>
          <button 
            className={`tab ${activeSection === 'questions' ? 'active' : ''}`}
            onClick={() => setActiveSection('questions')}
          >
            Quiz Settings
          </button>
          <button 
            className={`tab ${activeSection === 'assignments' ? 'active' : ''}`}
            onClick={() => setActiveSection('assignments')}
          >
            Assignments
          </button>
          
          {/* Action Buttons */}
          <div className="action-buttons">
            {!isPreviewMode && <button className="save-btn">Save Course</button>}
            <button className="preview-btn" onClick={togglePreview}>
              {isPreviewMode ? '✕ Exit Preview' : 'Preview'}
            </button>
            {!isPreviewMode && <button className="publish-btn">Publish</button>}
          </div>
        </div>

        <div className="section-content" style={{height: `${bottomSectionHeight - 60}px`}}>
          {activeSection === 'content' && (
            <div className="lesson-settings">
              <h3>Lesson Configuration</h3>
              <div className="setting-group">
                <label>Lesson Notes:</label>
                <textarea 
                  className="notes-textarea"
                  value={currentLessonContent.content?.notes || ''}
                  onChange={(e) => updateLessonContent(
                    currentLessonContent.moduleIndex,
                    currentLessonContent.lessonIndex,
                    'notes',
                    e.target.value
                  )}
                  placeholder="Add lesson notes..."
                />
              </div>
              <div className="setting-group">
                <label>Resources:</label>
                <textarea 
                  className="resources-textarea"
                  value={currentLessonContent.content?.resources?.join('\n') || ''}
                  onChange={(e) => updateLessonContent(
                    currentLessonContent.moduleIndex,
                    currentLessonContent.lessonIndex,
                    'resources',
                    e.target.value.split('\n').filter(r => r.trim())
                  )}
                  placeholder="Add resources (one per line)..."
                />
              </div>
            </div>
          )}
          
          {activeSection === 'questions' && (
            <div className="quiz-settings">
              <h3>Quiz Configuration</h3>
              <div className="setting-group">
                <label>Enable Quiz for this lesson:</label>
                <input type="checkbox" />
              </div>
              <button className="add-question-btn">Add Question</button>
            </div>
          )}
          
          {activeSection === 'assignments' && (
            <div className="assignment-settings">
              <h3>Assignment Configuration</h3>
              <div className="setting-group">
                <label>Assignment Title:</label>
                <input type="text" placeholder="Assignment title..." />
              </div>
              <div className="setting-group">
                <label>Assignment Description:</label>
                <textarea placeholder="Assignment description..."></textarea>
              </div>
              <button className="create-assignment-btn">Create Assignment</button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
