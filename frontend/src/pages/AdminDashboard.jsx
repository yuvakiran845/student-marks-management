import React, { useState, useMemo } from 'react';
import './AdminDashboard.css';
import { SAMPLE_STUDENTS } from '../data/sampleStudents';

const AdminDashboard = () => {
  const [students, setStudents] = useState(SAMPLE_STUDENTS);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingStudent, setEditingStudent] = useState(null);
  const [editMarks, setEditMarks] = useState({});
  const [showAddModal, setShowAddModal] = useState(false);
  const [newStudent, setNewStudent] = useState({
    name: '',
    rollNo: '',
    semester: 3,
    subjects: { DSA: '', DBMS: '', OS: '', CN: '', COA: '' }
  });

  // Filter students based on search
  const filteredStudents = useMemo(() => {
    return students.filter(student =>
      student.rollNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [students, searchTerm]);

  // Handle edit marks
  const handleEditClick = (student) => {
    setEditingStudent(student);
    setEditMarks({ ...student.subjects });
  };

  const handleSaveMarks = () => {
    if (!editingStudent) return;

    const updatedStudents = students.map(student => {
      if (student.id === editingStudent.id) {
        const total = Object.values(editMarks).reduce((a, b) => a + parseInt(b || 0), 0);
        return {
          ...student,
          subjects: editMarks,
          total
        };
      }
      return student;
    });

    setStudents(updatedStudents);
    setEditingStudent(null);
    setEditMarks({});
  };

  const handleAddStudent = () => {
    if (!newStudent.name || !newStudent.rollNo) {
      alert('Please fill in all required fields');
      return;
    }

    const subjectsObj = {};
    let total = 0;
    Object.keys(newStudent.subjects).forEach(subject => {
      const marks = parseInt(newStudent.subjects[subject] || 0);
      subjectsObj[subject] = marks;
      total += marks;
    });

    const addedStudent = {
      id: students.length + 1,
      ...newStudent,
      subjects: subjectsObj,
      total,
      createdAt: new Date().toISOString()
    };

    setStudents([...students, addedStudent]);
    setShowAddModal(false);
    setNewStudent({
      name: '',
      rollNo: '',
      semester: 3,
      subjects: { DSA: '', DBMS: '', OS: '', CN: '', COA: '' }
    });
  };

  const handleDeleteStudent = (id) => {
    if (window.confirm('Are you sure you want to delete this student record?')) {
      setStudents(students.filter(s => s.id !== id));
    }
  };

  return (
    <div className="admin-dashboard">
      {/* Header */}
      <div className="admin-header">
        <div className="admin-header-content">
          <div className="admin-header-title">
            <span className="admin-header-icon">📊</span>
            <div className="admin-header-text">
              <h1>Admin Dashboard</h1>
              <p>Manage student marks and records</p>
            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="admin-controls">
        <div className="search-box">
          <input
            type="text"
            placeholder="🔍 Search by Roll No. or Name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <span className="search-count">{filteredStudents.length} results</span>
        </div>
        <button className="btn-add-student" onClick={() => setShowAddModal(true)}>
          ➕ Add New Student
        </button>
      </div>

      {/* Stats */}
      <div className="admin-stats">
        <div className="stat-card">
          <div className="stat-icon">👥</div>
          <div className="stat-content">
            <p className="stat-label">Total Students</p>
            <p className="stat-value">{students.length}</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">📝</div>
          <div className="stat-content">
            <p className="stat-label">Average Total</p>
            <p className="stat-value">
              {(students.reduce((sum, s) => sum + s.total, 0) / students.length).toFixed(1)}
            </p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">🎓</div>
          <div className="stat-content">
            <p className="stat-label">Semester</p>
            <p className="stat-value">3</p>
          </div>
        </div>
      </div>

      {/* Table Container */}
      <div className="table-container">
        <div className="table-wrapper">
          <table className="marks-table">
            <thead>
              <tr>
                <th>Roll No</th>
                <th>Name</th>
                <th>DSA</th>
                <th>DBMS</th>
                <th>OS</th>
                <th>CN</th>
                <th>COA</th>
                <th>Total</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map((student) => (
                <tr key={student.id} className="table-row">
                  <td data-label="Roll No" className="roll-no">{student.rollNo}</td>
                  <td data-label="Name">{student.name}</td>
                  <td data-label="DSA" className="marks-cell">{student.subjects.DSA}</td>
                  <td data-label="DBMS" className="marks-cell">{student.subjects.DBMS}</td>
                  <td data-label="OS" className="marks-cell">{student.subjects.OS}</td>
                  <td data-label="CN" className="marks-cell">{student.subjects.CN}</td>
                  <td data-label="COA" className="marks-cell">{student.subjects.COA}</td>
                  <td data-label="Total" className="total-marks">
                    <span className="total-badge">{student.total}/150</span>
                  </td>
                  <td className="actions">
                    <button
                      className="btn-edit"
                      onClick={() => handleEditClick(student)}
                      title="Edit marks"
                    >
                      ✏️
                    </button>
                    <button
                      className="btn-delete"
                      onClick={() => handleDeleteStudent(student.id)}
                      title="Delete record"
                    >
                      🗑️
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredStudents.length === 0 && (
          <div className="empty-state">
            <p>No students found matching your search.</p>
          </div>
        )}
      </div>

      {/* Edit Modal */}
      {editingStudent && (
        <div className="modal-overlay" onClick={() => setEditingStudent(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Edit Marks - {editingStudent.name} ({editingStudent.rollNo})</h2>
              <button className="btn-close" onClick={() => setEditingStudent(null)}>✕</button>
            </div>

            <div className="modal-body">
              {['DSA', 'DBMS', 'OS', 'CN', 'COA'].map(subject => (
                <div key={subject} className="form-group">
                  <label>{subject} <span className="out-of">(out of 30)</span></label>
                  <input
                    type="number"
                    min="0"
                    max="30"
                    value={editMarks[subject] || ''}
                    onChange={(e) => setEditMarks({
                      ...editMarks,
                      [subject]: parseInt(e.target.value) || 0
                    })}
                    className="input-field"
                  />
                </div>
              ))}
              <div className="total-display">
                <p>Total: <span className="total-value">
                  {Object.values(editMarks).reduce((a, b) => a + (parseInt(b) || 0), 0)}/150
                </span></p>
              </div>
            </div>

            <div className="modal-footer">
              <button className="btn-cancel" onClick={() => setEditingStudent(null)}>Cancel</button>
              <button className="btn-save" onClick={handleSaveMarks}>Save Changes</button>
            </div>
          </div>
        </div>
      )}

      {/* Add Student Modal */}
      {showAddModal && (
        <div className="modal-overlay" onClick={() => setShowAddModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Add New Student</h2>
              <button className="btn-close" onClick={() => setShowAddModal(false)}>✕</button>
            </div>

            <div className="modal-body">
              <div className="form-group">
                <label>Student Name *</label>
                <input
                  type="text"
                  value={newStudent.name}
                  onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
                  className="input-field"
                  placeholder="e.g., Rahul Kumar"
                />
              </div>

              <div className="form-group">
                <label>Roll Number *</label>
                <input
                  type="text"
                  value={newStudent.rollNo}
                  onChange={(e) => setNewStudent({ ...newStudent, rollNo: e.target.value })}
                  className="input-field"
                  placeholder="e.g., CSE051"
                />
              </div>

              <div className="form-group">
                <label>Semester</label>
                <input
                  type="number"
                  value={newStudent.semester}
                  onChange={(e) => setNewStudent({ ...newStudent, semester: parseInt(e.target.value) })}
                  className="input-field"
                />
              </div>

              <div className="form-divider">Marks (out of 30)</div>

              {['DSA', 'DBMS', 'OS', 'CN', 'COA'].map(subject => (
                <div key={subject} className="form-group-inline">
                  <label>{subject}</label>
                  <input
                    type="number"
                    min="0"
                    max="30"
                    value={newStudent.subjects[subject]}
                    onChange={(e) => setNewStudent({
                      ...newStudent,
                      subjects: { ...newStudent.subjects, [subject]: e.target.value }
                    })}
                    className="input-field-small"
                  />
                </div>
              ))}

              <div className="total-display">
                <p>Total: <span className="total-value">
                  {Object.values(newStudent.subjects)
                    .reduce((a, b) => a + (parseInt(b) || 0), 0)}/150
                </span></p>
              </div>
            </div>

            <div className="modal-footer">
              <button className="btn-cancel" onClick={() => setShowAddModal(false)}>Cancel</button>
              <button className="btn-save" onClick={handleAddStudent}>Add Student</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;