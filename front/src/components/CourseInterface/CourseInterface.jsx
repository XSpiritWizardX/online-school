import { useState, useRef, useEffect } from "react";
import "./CourseInterface.css"; 

export default function CourseInterface({ courseData: propCourseData }) {
  const [currentLesson, setCurrentLesson] = useState(0);
  const [activeSection, setActiveSection] = useState('content');
  const [expandedModules, setExpandedModules] = useState(new Set([0]));
  const [bottomSectionHeight, setBottomSectionHeight] = useState(300);
  const [isResizing, setIsResizing] = useState(false);
  const [showNavigation, setShowNavigation] = useState(false);
  const courseMainRef = useRef(null);

  // Sample course data with actual content - use prop data if provided
  const courseData = propCourseData || {
    title: "Complete Web Development Course",
    modules: [
      {
        title: "Introduction to HTML",
        lessons: [
          {
            title: "HTML Basics",
            content: {
              type: "text",
              description: "HTML (HyperText Markup Language) is the standard markup language for creating web pages. It describes the structure of a web page using elements and tags.",
              sections: [
                {
                  title: "What is HTML?",
                  content: "HTML stands for HyperText Markup Language. It's not a programming language, but rather a markup language that tells the web browser how to structure and display content on a web page."
                },
                {
                  title: "HTML Document Structure",
                  content: "Every HTML document has a basic structure that includes the DOCTYPE declaration, html element, head section, and body section.",
                  code: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My First Web Page</title>
</head>
<body>
    <h1>Hello, World!</h1>
    <p>This is my first web page.</p>
</body>
</html>`
                },
                {
                  title: "HTML Elements and Tags",
                  content: "HTML elements are the building blocks of web pages. They are defined by tags, which are keywords enclosed in angle brackets.",
                  code: `<!-- This is a comment -->
<h1>This is a heading</h1>
<p>This is a paragraph</p>
<strong>This text is bold</strong>
<em>This text is italic</em>`
                },
                {
                  title: "Common HTML Elements",
                  content: "Here are some of the most commonly used HTML elements:",
                  code: `<!-- Headings (h1 is largest, h6 is smallest) -->
<h1>Main Heading</h1>
<h2>Subheading</h2>
<h3>Sub-subheading</h3>

<!-- Paragraphs -->
<p>This is a paragraph of text.</p>

<!-- Links -->
<a href="https://www.example.com">This is a link</a>

<!-- Images -->
<img src="image.jpg" alt="Description of image">

<!-- Lists -->
<ul>
    <li>Unordered list item 1</li>
    <li>Unordered list item 2</li>
</ul>

<ol>
    <li>Ordered list item 1</li>
    <li>Ordered list item 2</li>
</ol>`
                },
                {
                  title: "HTML Attributes",
                  content: "HTML attributes provide additional information about elements. They are always specified in the opening tag.",
                  code: `<!-- The 'href' attribute specifies the link destination -->
<a href="https://www.google.com" target="_blank">Open Google in new tab</a>

<!-- The 'src' and 'alt' attributes for images -->
<img src="photo.jpg" alt="A beautiful sunset" width="300" height="200">

<!-- The 'id' and 'class' attributes for styling -->
<div id="header" class="main-section">
    <p class="intro-text">Welcome to our website!</p>
</div>`
                },
                {
                  title: "Try It Yourself",
                  content: "Practice creating a simple HTML page with the structure shown above. Include headings, paragraphs, links, and an image."
                }
              ],
              notes: "HTML stands for HyperText Markup Language. It uses tags to structure content on web pages. Remember: most tags come in pairs - an opening tag and a closing tag.",
              resources: ["HTML Specification", "MDN HTML Guide", "W3Schools HTML Tutorial"]
            }
          },
          {
            title: "Tags and Elements",
            content: {
              video: "HTML Tags and Elements - Understanding the building blocks",
              description: "Dive deep into HTML tags and elements. Learn about opening and closing tags, attributes, and how to properly structure your HTML documents.",
              notes: "Remember: Every opening tag needs a closing tag (except for self-closing tags like <img> and <br>).",
              resources: ["HTML Tag Reference", "Semantic HTML Guide"]
            }
          },
          {
            title: "Forms and Inputs",
            content: {
              video: "HTML Forms - Creating interactive web forms",
              description: "Learn how to create forms that collect user input. We'll cover different input types, form validation, and best practices for accessibility.",
              notes: "Always use proper labels for form inputs to improve accessibility.",
              resources: ["Form Accessibility Guide", "Input Types Reference"]
            }
          }
        ]
      },
      {
        title: "CSS Fundamentals",
        lessons: [
          {
            title: "CSS Syntax",
            content: {
              video: "CSS Syntax - Writing your first styles",
              description: "Understanding CSS syntax is crucial for styling web pages. Learn about selectors, properties, values, and how CSS cascades.",
              notes: "CSS follows the pattern: selector { property: value; }",
              resources: ["CSS Syntax Guide", "CSS Specificity Calculator"]
            }
          },
          {
            title: "Selectors",
            content: {
              video: "CSS Selectors - Targeting HTML elements",
              description: "Master CSS selectors to target exactly the elements you want to style. Learn about class selectors, ID selectors, and more advanced selector patterns.",
              notes: "Use classes for styling multiple elements, and IDs for unique elements.",
              resources: ["CSS Selectors Reference", "Selector Performance Guide"]
            }
          },
          {
            title: "Layout with Flexbox",
            content: {
              video: "Flexbox Layout - Modern CSS layouts made easy",
              description: "Flexbox revolutionized CSS layouts. Learn how to create flexible, responsive layouts with ease using flexbox properties.",
              notes: "display: flex; turns an element into a flex container. Use justify-content and align-items for alignment.",
              resources: ["Flexbox Guide", "Flexbox Playground"]
            }
          }
        ]
      },
      {
        title: "JavaScript Essentials",
        lessons: [
          {
            title: "Variables and Functions",
            content: {
              video: "JavaScript Variables and Functions - Programming fundamentals",
              description: "Learn the building blocks of JavaScript programming. Understand how to declare variables, create functions, and work with different data types.",
              notes: "Use const for values that won't change, let for variables that will change, and avoid var in modern JavaScript.",
              resources: ["JavaScript Basics", "Function Declaration vs Expression"]
            }
          },
          {
            title: "DOM Manipulation",
            content: {
              video: "DOM Manipulation - Making web pages interactive",
              description: "The Document Object Model (DOM) allows JavaScript to interact with HTML elements. Learn how to select, modify, and create elements dynamically.",
              notes: "Use document.querySelector() to select elements and .textContent or .innerHTML to modify them.",
              resources: ["DOM API Reference", "DOM Manipulation Best Practices"]
            }
          },
          {
            title: "Event Handling",
            content: {
              video: "JavaScript Events - Responding to user interactions",
              description: "Events make web pages interactive. Learn how to handle clicks, form submissions, keyboard input, and other user interactions.",
              notes: "Always use addEventListener() instead of inline event handlers for better code organization.",
              resources: ["Event Reference", "Event Delegation Pattern"]
            }
          }
        ]
      }
    ]
  };

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

  const navigateLesson = (direction) => {
    const allLessons = [];
    courseData.modules.forEach((module, moduleIndex) => {
      module.lessons.forEach((lesson, lessonIndex) => {
        allLessons.push(moduleIndex * 10 + lessonIndex);
      });
    });
    
    const currentIndex = allLessons.indexOf(currentLesson);
    if (direction === 'next' && currentIndex < allLessons.length - 1) {
      const nextLessonId = allLessons[currentIndex + 1];
      const nextModuleIndex = Math.floor(nextLessonId / 10);
      
      // Auto-expand the module if it's not already expanded
      const newExpanded = new Set(expandedModules);
      newExpanded.add(nextModuleIndex);
      setExpandedModules(newExpanded);
      
      setCurrentLesson(nextLessonId);
      setShowNavigation(false); // Reset navigation visibility
    } else if (direction === 'prev' && currentIndex > 0) {
      const prevLessonId = allLessons[currentIndex - 1];
      const prevModuleIndex = Math.floor(prevLessonId / 10);
      
      // Auto-expand the module if it's not already expanded
      const newExpanded = new Set(expandedModules);
      newExpanded.add(prevModuleIndex);
      setExpandedModules(newExpanded);
      
      setCurrentLesson(prevLessonId);
      setShowNavigation(false); // Reset navigation visibility
    }
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
    setShowNavigation(false); // Reset navigation visibility when selecting a lesson
  };

  const handleMouseDown = (e) => {
    setIsResizing(true);
    e.preventDefault();
  };

  const handleMouseMove = (e) => {
    if (!isResizing) return;
    
    const courseInterface = document.querySelector('.course-interface');
    const rect = courseInterface.getBoundingClientRect();
    const newHeight = rect.bottom - e.clientY;
    
    // Set min and max heights
    const minHeight = 200;
    const maxHeight = window.innerHeight * 0.6;
    
    if (newHeight >= minHeight && newHeight <= maxHeight) {
      setBottomSectionHeight(newHeight);
    }
  };

  const handleMouseUp = () => {
    setIsResizing(false);
  };

  const handleScroll = (e) => {
    const element = e.target;
    const scrollTop = element.scrollTop;
    const scrollHeight = element.scrollHeight;
    const clientHeight = element.clientHeight;
    
    // Only show navigation if there's actually scrollable content
    const hasScrollableContent = scrollHeight > clientHeight;
    
    // Check if scrolled to bottom with a small threshold
    const isAtBottom = scrollTop + clientHeight >= scrollHeight - 5;
    
    // Only show navigation if there's scrollable content AND user is at bottom
    setShowNavigation(hasScrollableContent && isAtBottom);
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

  return (
    <div className="course-interface">
      {/* Course Header */}
      <header className="course-header">
        <h1>{courseData.title}</h1>
        <div className="progress-bar">
          <div className="progress-fill" style={{width: '35%'}}></div>
        </div>
      </header>

      {/* Main Layout */}
      <div className="course-layout" style={{height: `calc(100vh - 80px - ${bottomSectionHeight}px)`}}>
        {/* Left Sidebar - Course Content */}
        <aside className="course-sidebar">
          <h3>Course Content</h3>
          <div className="modules-list">
            {courseData.modules.map((module, moduleIndex) => (
              <div key={moduleIndex} className="module">
                <div 
                  className="module-header"
                  onClick={() => toggleModule(moduleIndex)}
                >
                  <span className={`expand-icon ${expandedModules.has(moduleIndex) ? 'expanded' : ''}`}>
                    ▶
                  </span>
                  <span>{module.title}</span>
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
                        {lesson.title}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </aside>

        {/* Main Content Area */}
        <main 
          className="course-main" 
          ref={courseMainRef}
          onScroll={handleScroll}
        >
          {currentLessonContent.content?.type === "text" ? (
            <div className="text-lesson">
              <div className="lesson-header">
                <h1>{currentLessonContent.title}</h1>
                <p className="lesson-description">{currentLessonContent.content.description}</p>
              </div>
              
              <div className="lesson-sections">
                {currentLessonContent.content.sections?.map((section, index) => (
                  <div key={index} className="lesson-section">
                    <h2>{section.title}</h2>
                    <p>{section.content}</p>
                    {section.code && (
                      <div className="code-block">
                        <pre><code>{section.code}</code></pre>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <>
              <div className="video-container">
                <div className="video-placeholder">
                  <div className="play-button">▶</div>
                  <p>{currentLessonContent.content?.video || "Video Player Placeholder"}</p>
                </div>
              </div>
              
              <div className="lesson-content">
                <h2>{currentLessonContent.title}</h2>
                <p>{currentLessonContent.content?.description || "This is where the lesson content would be displayed."}</p>
                
                {currentLessonContent.content?.resources && (
                  <div className="lesson-resources">
                    <h3>Resources:</h3>
                    <ul>
                      {currentLessonContent.content.resources.map((resource, index) => (
                        <li key={index}>{resource}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </>
          )}

          <div className={`content-navigation ${showNavigation ? 'visible' : ''}`}>
            <button className="nav-btn prev" onClick={() => navigateLesson('prev')}>← Previous</button>
            <button className="nav-btn next" onClick={() => navigateLesson('next')}>Next →</button>
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

      {/* Bottom Section - Questions & Assignments */}
      <section className="course-bottom" style={{height: `${bottomSectionHeight}px`}}>
        <div className="section-tabs">
          <button 
            className={`tab ${activeSection === 'content' ? 'active' : ''}`}
            onClick={() => setActiveSection('content')}
          >
            Notes
          </button>
          <button 
            className={`tab ${activeSection === 'questions' ? 'active' : ''}`}
            onClick={() => setActiveSection('questions')}
          >
            Q&A
          </button>
          <button 
            className={`tab ${activeSection === 'assignments' ? 'active' : ''}`}
            onClick={() => setActiveSection('assignments')}
          >
            Assignments
          </button>
        </div>

        <div className="section-content" style={{height: `${bottomSectionHeight - 60}px`}}>
          {activeSection === 'content' && (
            <div className="notes-section">
              <h3>Lesson Notes</h3>
              <div className="lesson-notes">
                <p><strong>Key Points:</strong></p>
                <p>{currentLessonContent.content?.notes || "Take notes here..."}</p>
              </div>
              <textarea placeholder="Add your personal notes..." className="notes-textarea"></textarea>
            </div>
          )}
          
          {activeSection === 'questions' && (
            <div className="questions-section">
              <h3>Questions & Answers</h3>
              <div className="question-item">
                <h4>How do I apply what I learned in {currentLessonContent.title}?</h4>
                <p>Practice is key! Try building small projects that incorporate the concepts from this lesson. Start with simple examples and gradually increase complexity.</p>
              </div>
              <div className="question-item">
                <h4>What are common mistakes in {currentLessonContent.moduleTitle}?</h4>
                <p>Review the lesson notes and make sure you understand the fundamentals before moving on to more advanced topics.</p>
              </div>
              <button className="ask-question-btn">Ask a Question</button>
            </div>
          )}
          
          {activeSection === 'assignments' && (
            <div className="assignments-section">
              <h3>Assignments</h3>
              <div className="assignment-item">
                <h4>Practice Exercise: {currentLessonContent.title}</h4>
                <p>Create a practical example using the concepts learned in this lesson.</p>
                <p>Due: Next lesson</p>
                <button className="submit-btn">Submit Assignment</button>
              </div>
              <div className="assignment-item">
                <h4>Quiz: {currentLessonContent.moduleTitle} Fundamentals</h4>
                <p>Test your understanding of the key concepts covered in this module.</p>
                <p>Due: End of module</p>
                <button className="submit-btn">Take Quiz</button>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
