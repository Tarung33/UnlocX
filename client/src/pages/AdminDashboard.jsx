import React, { useState } from 'react';

const AdminDashboard = () => {
  const [showDetails, setShowDetails] = useState({});

  const studentsData = [
    {
      name: 'Tarun G',
      email: 'tarung@gmail.com',
      studentId: 'STU-2025-0042',
      points: 0,
      level: 'Intermediate',
      coursesEnrolled: 2,
      coursesCompleted: 1,
    },
    {
      name: 'Sai Gokul P V',
      email: 'saigokul850@gmail.com',
      studentId: 'STU-2025-0043',
      points: 0,
      level: 'Beginner',
      coursesEnrolled: 1,
      coursesCompleted: 0,
    },
  ];

  const toggleDetails = (index) => {
    setShowDetails((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <div className="container mx-auto p-6 bg-white rounded shadow mt-6 max-w-3xl">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      {studentsData.map((student, index) => (
        <div key={index} className="mb-6 p-4 border rounded shadow-sm">
          <h2 className="text-xl font-semibold mb-2">Student Details #{index + 1}</h2>
          <div className="mb-4">
            <span className="font-semibold">Name: </span> {student.name}
          </div>
          <button
            onClick={() => toggleDetails(index)}
            className="mb-4 bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700"
          >
            {showDetails[index] ? 'View Less' : 'View More'}
          </button>
          {showDetails[index] && (
            <table className="min-w-full border border-gray-300">
              <tbody>
                <tr className="border-b border-gray-300">
                  <td className="py-2 px-4 font-semibold">Email</td>
                  <td className="py-2 px-4">{student.email}</td>
                </tr>
                <tr className="border-b border-gray-300">
                  <td className="py-2 px-4 font-semibold">Student ID</td>
                  <td className="py-2 px-4">{student.studentId}</td>
                </tr>
                <tr className="border-b border-gray-300">
                  <td className="py-2 px-4 font-semibold">Points</td>
                  <td className="py-2 px-4">{student.points}</td>
                </tr>
                <tr className="border-b border-gray-300">
                  <td className="py-2 px-4 font-semibold">Level</td>
                  <td className="py-2 px-4">{student.level}</td>
                </tr>
                <tr>
                  <td className="py-2 px-4 font-semibold">Courses Enrolled</td>
                  <td className="py-2 px-4">{student.coursesEnrolled}</td>
                </tr>
                <tr>
                  <td className="py-2 px-4 font-semibold">Courses Completed</td>
                  <td className="py-2 px-4">{student.coursesCompleted}</td>
                </tr>
              </tbody>
            </table>
          )}
        </div>
      ))}
    </div>
  );
};

export default AdminDashboard;
