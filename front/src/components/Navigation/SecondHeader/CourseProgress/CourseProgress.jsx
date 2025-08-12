import { useEffect, useState } from 'react';
import './CourseProgress.css';

export default function CourseProgress({ courseName, lessonName, lessonNumber, progress }) {
  const [animatedProgress, setAnimatedProgress] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(() => setAnimatedProgress(progress), 200);
    return () => clearTimeout(timeout);
  }, [progress]);

  return (
    <div className="course-progress-wrapper">
      {/* Left column: course info */}
      <div className="course-info">
        <div className="course-title">{courseName}</div>
        <div className="lesson-title">
         Example lesson 1.3
        </div>
        {/* <div className="lesson-title">
          {lessonName} {lessonNumber && `Lesson ${lessonNumber}`}
        </div> */}
      </div>

      {/* Right column: progress */}
      <div className="course-progress">
        <span className="progress-percentage">{animatedProgress}%</span>

        <div className="progress-container">
          <div
            className="progress-fill"
            style={{ width: `${animatedProgress}%` }}
          >
            {[...Array(8)].map((_, i) => (
              <span
                key={i}
                className="magic-particle"
                style={{
                  left: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 2}s`
                }}
              ></span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
