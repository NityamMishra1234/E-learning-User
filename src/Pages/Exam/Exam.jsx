import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchExamsByPlaylist, submitExam } from "../../features/examSlice";
import { fetchPlaylistById } from "../../features/playlistSlice";

const Exam = () => {
  const dispatch = useDispatch();
  const { currentPlaylist } = useSelector((state) => state.playlist);
  const { exams, isLoading } = useSelector((state) => state.exam);
  const { student } = useSelector((state) => state.student);

  const [selectedExam, setSelectedExam] = useState(null);
  const [answers, setAnswers] = useState({});

  console.log("Student ID:", student?._id);
  console.log("Exams:", exams);
  console.log("First Exam ID:", exams.length > 0 ? exams[0]._id : "No Exam");

  
  useEffect(() => {
    if (!currentPlaylist?._id) {
      dispatch(fetchPlaylistById());
    }
  }, [dispatch, currentPlaylist]);

  
  useEffect(() => {
    if (currentPlaylist?._id) {
      dispatch(fetchExamsByPlaylist(currentPlaylist._id));
    }
  }, [dispatch, currentPlaylist]);


  const handleExamSelection = (exam) => {
    setSelectedExam(exam);
    setAnswers({});
  };

  
  const handleInputChange = (questionId, value) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  };

 
  const handleSubmitExam = async () => {
    if (!selectedExam) return;
  
    const mcqAnswers = [];
    const longAnswers = [];
  
    selectedExam.mcqs.forEach((mcq) => {
      if (answers[mcq._id]) {
        mcqAnswers.push(answers[mcq._id]);
      } else {
        mcqAnswers.push(null); 
      }
    });
  
    selectedExam.longAnswers.forEach((question) => {
      if (answers[question._id]) {
        longAnswers.push({ questionId: question._id, answer: answers[question._id] });
      }
    });
  
    const examData = {
      examId: selectedExam._id,
      studentId: student?._id,
      mcqAnswers,
      longAnswers,
    };
  
    
  
    try {
      const response = await dispatch(submitExam(examData)).unwrap();
      console.log("Response from server:", response);
    } catch (error) {
      console.error("Submission error:", error);
    }
  };
  

  if (isLoading) return <div>Loading exams...</div>;

  return (
    <div className="exam-container">
      <h2>{currentPlaylist?.title} - Exams</h2>

      {/* Show list of exams */}
      <div className="exam-list">
        {exams.length > 0 ? (
          exams.map((exam) => (
            <button key={exam._id} onClick={() => handleExamSelection(exam)}>
              {exam.examName}
            </button>
          ))
        ) : (
          <p>No exams available for this playlist.</p>
        )}
      </div>

      
      {selectedExam && (
        <div className="exam-content">
          <h3>{selectedExam.examName}</h3>

          
          <div className="mcq-section">
            <h4>Multiple Choice Questions</h4>
            {selectedExam.mcqs?.map((mcq) => (
              <div key={mcq._id} className="mcq-question">
                <p>{mcq.question}</p>
                {mcq.options.map((option, index) => (
                  <label key={index}>
                    <input
                      type="radio"
                      name={mcq._id}
                      value={option}
                      onChange={(e) => handleInputChange(mcq._id, e.target.value)}
                    />
                    {option}
                  </label>
                ))}
              </div>
            ))}
          </div>

          
          <div className="long-answer-section">
            <h4>Long Answer Questions</h4>
            {selectedExam.longAnswers?.map((question) => (
              <div key={question._id} className="long-question">
                <p>{question.question}</p>
                <textarea
                  rows="3"
                  onChange={(e) => handleInputChange(question._id, e.target.value)}
                ></textarea>
              </div>
            ))}
          </div>

          
          <button onClick={handleSubmitExam} className="submit-btn">
            Submit Exam
          </button>
        </div>
      )}
    </div>
  );
};

export default Exam;
