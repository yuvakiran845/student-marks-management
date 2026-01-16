import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/useAuth';
import './StudentDashboard.css';
import { SAMPLE_STUDENTS } from '../data/sampleStudents';

const StudentDashboard = () => {
  const [rollNo, setRollNo] = useState('');
  const [student, setStudent] = useState(null);
  const [error, setError] = useState('');
  const [searched, setSearched] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setError('');
    setStudent(null);
    setSearched(true);

    if (!rollNo.trim()) {
      setError('Please enter a roll number');
      return;
    }

    const foundStudent = SAMPLE_STUDENTS.find(
      s => s.rollNo.toLowerCase() === rollNo.toLowerCase()
    );

    if (foundStudent) {
      setStudent(foundStudent);
    } else {
      setError(`No student found with roll number: ${rollNo.toUpperCase()}`);
    }
  };

  const handleReset = () => {
    setRollNo('');
    setStudent(null);
    setError('');
    setSearched(false);
  };

  const getSubjectGrade = (marks) => {
    if (marks >= 27) return 'A+';
    if (marks >= 24) return 'A';
    if (marks >= 21) return 'B+';
    if (marks >= 18) return 'B';
    if (marks >= 15) return 'C';
    return 'D';
  };

  const getPercentage = (total) => {
    return ((total / 150) * 100).toFixed(1);
  };

  return (
    <div className="student-dashboard">
      {/* Background Elements */}
      <div className="bg-decoration bg-1"></div>
      <div className="bg-decoration bg-2"></div>

      {/* Top Navigation Header */}
      <header className="student-header-nav">
        <div className="student-nav-container">
          <div className="student-nav-left">
            <div className="student-nav-icon">📚</div>
            <div className="student-nav-text">
              <h2>Student Portal</h2>
              <p>View your mid-term marks</p>
            </div>
          </div>

          <div className="student-nav-right">
            <div className="student-nav-user">
              <div className="student-nav-avatar">
                {user?.email?.charAt(0).toUpperCase()}
              </div>
              <div className="student-nav-info">
                <p className="student-nav-email">{user?.email}</p>
                <p className="student-nav-role">Student</p>
              </div>
            </div>

            <button onClick={handleLogout} className="student-logout-btn">
              🚪 Logout
            </button>
          </div>
        </div>
      </header>

      <div className="student-container">
        {/* Header */}
        <div className="student-header">
          <h1>📚 My Marks Portal</h1>
          <p>View your mid-term examination results</p>
        </div>

        {/* Search Section */}
        <div className="search-section">
          <form onSubmit={handleSearch} className="search-form">
            <div className="form-group">
              <label htmlFor="rollno">Enter Your Roll Number</label>
              <div className="input-wrapper">
                <input
                  type="text"
                  id="rollno"
                  value={rollNo}
                  onChange={(e) => setRollNo(e.target.value.toUpperCase())}
                  placeholder="e.g., CSE001"
                  className="search-input"
                  autoComplete="off"
                />
                <span className="input-hint">e.g. CSE001, CSE050</span>
              </div>
            </div>

            <button type="submit" className="btn-search">
              🔍 View My Marks
            </button>
          </form>

          {searched && error && (
            <div className="error-message">
              <span className="error-icon">⚠️</span>
              <span>{error}</span>
            </div>
          )}
        </div>

        {/* Results Section */}
        {student && (
          <div className="results-section">
            {/* Student Info Card */}
            <div className="student-info-card">
              <div className="info-header">
                <div className="student-avatar">🎓</div>
                <div className="student-details">
                  <h2 className="student-name">{student.name}</h2>
                  <p className="student-meta">
                    <span className="meta-item">
                      <strong>Roll No:</strong> {student.rollNo}
                    </span>
                    <span className="meta-divider">•</span>
                    <span className="meta-item">
                      <strong>Branch:</strong> {student.branch}
                    </span>
                    <span className="meta-divider">•</span>
                    <span className="meta-item">
                      <strong>Semester:</strong> {student.semester}
                    </span>
                  </p>
                </div>
              </div>
            </div>

            {/* Marks Grid */}
            <div className="marks-grid">
              {Object.entries(student.subjects).map(([subject, marks]) => (
                <div key={subject} className="marks-card">
                  <div className="subject-icon">
                    {subject === 'DSA' && '⚙️'}
                    {subject === 'DBMS' && '🗄️'}
                    {subject === 'OS' && '🖥️'}
                    {subject === 'CN' && '🌐'}
                    {subject === 'COA' && '🔧'}
                  </div>
                  <h3 className="subject-name">{subject}</h3>
                  <div className="marks-display">
                    <p className="marks-number">{marks}</p>
                    <p className="marks-max">out of 30</p>
                  </div>
                  <div className="marks-grade">
                    <span className={`grade-badge grade-${getSubjectGrade(marks)}`}>
                      {getSubjectGrade(marks)}
                    </span>
                  </div>
                  <div className="marks-progress">
                    <div
                      className="progress-bar"
                      style={{
                        width: `${(marks / 30) * 100}%`,
                        backgroundColor: marks >= 24 ? '#10b981' : marks >= 18 ? '#f59e0b' : '#ef4444'
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary Section */}
            <div className="summary-section">
              <div className="summary-card">
                <div className="summary-item">
                  <p className="summary-label">Total Marks (Mid-Term)</p>
                  <p className="summary-value">{student.total}</p>
                  <p className="summary-max">out of 150</p>
                </div>
                <div className="summary-divider"></div>
                <div className="summary-item">
                  <p className="summary-label">Percentage</p>
                  <p className="summary-value">{getPercentage(student.total)}%</p>
                  <p className="summary-max">of total marks</p>
                </div>
                <div className="summary-divider"></div>
                <div className="summary-item">
                  <p className="summary-label">Overall Grade</p>
                  <p className={`summary-grade grade-${getSubjectGrade(student.total / 5)}`}>
                    {getSubjectGrade(student.total / 5)}
                  </p>
                </div>
              </div>

              {/* Performance Chart */}
              <div className="performance-chart">
                <h3>Subject-wise Performance</h3>
                <div className="chart-bars">
                  {Object.entries(student.subjects).map(([subject, marks]) => (
                    <div key={subject} className="chart-item">
                      <div className="chart-label">{subject}</div>
                      <div className="chart-bar-container">
                        <div
                          className="chart-bar"
                          style={{
                            width: `${(marks / 30) * 100}%`,
                            backgroundColor: marks >= 24 ? '#10b981' : marks >= 18 ? '#f59e0b' : '#ef4444'
                          }}
                        >
                          <span className="chart-value">{marks}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Action Button */}
            <button className="btn-reset" onClick={handleReset}>
              🔄 Search Another Roll Number
            </button>
          </div>
        )}

        {/* Empty State */}
        {!student && !searched && (
          <div className="empty-state">
            <div className="empty-icon">📊</div>
            <p>Enter your roll number to view your mid-term marks</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentDashboard;
