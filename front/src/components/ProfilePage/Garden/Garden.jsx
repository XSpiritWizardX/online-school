import React, { useState } from 'react';
import './Garden.css';

const getDateKey = (date) => date.toISOString().split('T')[0];

const generateGridData = (attendanceDates, year) => {
  const endDate = new Date(`${year}-12-31`);
  const startDate = new Date(endDate);
  startDate.setDate(startDate.getDate() - 364);

  const grid = [];
  const attendanceMap = {};

  attendanceDates.forEach(dateStr => {
    attendanceMap[dateStr] = true;
  });

  for (let i = 0; i < 365; i++) {
    const current = new Date(startDate);
    current.setDate(current.getDate() + i);
    const key = getDateKey(current);
    grid.push({
      date: key,
      attended: !!attendanceMap[key]
    });
  }

  return grid;
};

const getColorClass = (attended) => attended ? 'attended' : 'not-attended';

const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

// --- test attendance dates ---
const TEST_ATTENDANCE = [
  getDateKey(new Date()), // today
  getDateKey(new Date(Date.now() - 86400000)), // yesterday
  getDateKey(new Date(Date.now() - 2 * 86400000)), // 2 days ago
  getDateKey(new Date(Date.now() - 7 * 86400000)), // 1 week ago
  getDateKey(new Date(Date.now() - 30 * 86400000)), // 1 month ago
  `${new Date().getFullYear()}-01-01`, // first day of year
  `${new Date().getFullYear()}-06-15`, // mid year
  `${new Date().getFullYear()}-12-31`, // end of theeee year
];

export default function Garden({ attendanceDates = TEST_ATTENDANCE, onMarkAttendance }) {
  const currentYear = new Date().getFullYear();
  const years = [currentYear - 2, currentYear - 1, currentYear];
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [attendance, setAttendance] = useState(new Set(attendanceDates));

  const markTodayAttendance = () => {
    const todayKey = getDateKey(new Date());
    setAttendance(new Set([...attendance, todayKey]));
    if (onMarkAttendance) onMarkAttendance(todayKey);
  };

  const gridData = generateGridData([...attendance], selectedYear);

  const columns = [];
  for (let i = 0; i < 53; i++) {
    const week = gridData.slice(i * 7, i * 7 + 7);
    columns.push(week);
  }

  return (
    <div className="garden-wrapper">
      <h2
      className='attend-title'
      >Attendance Record:</h2>
      <div className="garden-header">
        <label className='year-input' htmlFor="year">Select Year:</label>
        <select
          id="year"
          className="year-select"
          value={selectedYear}
          onChange={(e) => setSelectedYear(parseInt(e.target.value))}
        >
          {years.map((year) => (
            <option key={year} value={year}>{year}</option>
          ))}
        </select>
        <button onClick={markTodayAttendance} className="mark-button">
          Mark Today Attendance
        </button>
      </div>
      <div className="garden-body">
        <div className="garden-days">
          {daysOfWeek.map((day) => (
            <div key={day} className="day-label">
              {day }
            </div>
          ))}
        </div>
        <div className="garden-grid">
          {columns.map((week, weekIdx) => (
            <div key={weekIdx} className="week-column">
              {week.map((day, dayIdx) => (
                <div
                  key={dayIdx}
                  className={`day-cell ${getColorClass(day.attended)}`}
                  title={`${day.date} — ${day.attended ? 'present' : 'absent'}`}
                ></div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
