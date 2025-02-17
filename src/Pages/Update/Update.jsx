import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getStudentProfile, updateStudentProfile } from "../../features/studentSlice";
import { fetchExamResults } from "../../features/examSlice";
import { FaLinkedin, FaGithub, FaGlobe, FaEdit, FaSave, FaTimes } from "react-icons/fa";
import "./Update.css";

const Update = () => {
  const dispatch = useDispatch();
  const { student, loading } = useSelector((state) => state.student);
  const { results } = useSelector((state) => state.exam);

  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    dispatch(getStudentProfile());
    if (student?._id) {
      dispatch(fetchExamResults(student._id));
    }
  }, [dispatch, student?._id]);

  useEffect(() => {
    if (student) {
      setFormData({
        name: student.name || "",
        email: student.email || "",
        bio: student.bio || "",
        phone: student.phone || "",
        linkedin: student.socialLinks?.linkedin || "",
        github: student.socialLinks?.github || "",
        website: student.socialLinks?.website || "",
        profilePicture: null,
      });
    }
  }, [student]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, profilePicture: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedData = new FormData();
    Object.keys(formData).forEach((key) => {
      updatedData.append(key, formData[key]);
    });
    dispatch(updateStudentProfile(updatedData));
    setEditMode(false);
  };

  return (
    <div className="update-container">
      <div className="glass-card">
        <div className="update-profile-section">
          <label className="update-profile-label">
            <img src={student?.profilePicture || "/default-avatar.png"} alt="Profile" className="update-profile-avatar" />
            {editMode && <input type="file" accept="image/*" onChange={handleFileChange} />}
          </label>
          <div className="update-profile-info">
            <h3 style={{color:'white'}}>{formData.name}</h3>
            <p style={{color:'white'}}>{formData.bio}</p>
            <p style={{color:'white'}}>{formData.phone}</p>
            <div className="update-social-links">
              {formData.linkedin && (
                <a href={formData.linkedin} target="_blank" rel="noopener noreferrer" className="social-link linkedin">
                  <FaLinkedin />
                </a>
              )}
              {formData.github && (
                <a href={formData.github} target="_blank" rel="noopener noreferrer" className="social-link github">
                  <FaGithub />
                </a>
              )}
              {formData.website && (
                <a href={formData.website} target="_blank" rel="noopener noreferrer" className="social-link website">
                  <FaGlobe />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      <button className="update-edit-btn" onClick={() => setEditMode(!editMode)}>
        {editMode ? <FaTimes /> : <FaEdit />} {editMode ? "Cancel" : "Edit Profile"}
      </button>

      {editMode && (
        <form className="update-form" onSubmit={handleSubmit}>
          <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name" />
          <input type="email" name="email" value={formData.email} disabled />
          <textarea name="bio" value={formData.bio} onChange={handleChange} placeholder="Bio"></textarea>
          <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone" />
          <input type="url" name="linkedin" value={formData.linkedin} onChange={handleChange} placeholder="LinkedIn" />
          <input type="url" name="github" value={formData.github} onChange={handleChange} placeholder="GitHub" />
          <input type="url" name="website" value={formData.website} onChange={handleChange} placeholder="Website" />
          <button type="submit" className="update-save-btn" disabled={loading}>
            {loading ? "Saving..." : <FaSave />}
          </button>
        </form>
      )}

      <h2 className="update-title">Exam Results</h2>
      <table className="exam-table">
        <thead>
          <tr>
            <th>Test Name</th>
            <th>MCQ Marks</th>
            <th>Total Marks</th>
          </tr>
        </thead>
        <tbody>
          {results && results.length > 0 ? (
            results.map((exam) => (
              <tr key={exam._id}>
                <td>{exam.examId?.examName || "Test"}</td>
                <td>{exam.mcqScore}</td>
                <td>{exam.totalScore}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3">No exam results available.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Update;
