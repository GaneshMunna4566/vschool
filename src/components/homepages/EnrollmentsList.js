import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../homepages/Navbar'

const EnrollmentsList = () => {
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editEnrollmentId, setEditEnrollmentId] = useState(null);
  const [editEnrollAs, setEditEnrollAs] = useState('');
  const [editStatus, setEditStatus] = useState('');

  const fetchEnrollments = async () => {
    try {
      const token = localStorage.getItem('authToken');

      const response = await axios.get('http://localhost:5000/enrollments', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setEnrollments(response.data.enrollments);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching enrollments:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEnrollments();
  }, []);

  const handleDeleteConfirmation = (enrollmentId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this enrollment?');

    if (confirmDelete) {
      deleteEnrollment(enrollmentId);
    }
  };

  const deleteEnrollment = async (enrollmentId) => {
    try {
      const token = localStorage.getItem('authToken');
      await axios.delete(`http://localhost:5000/enrollments/${enrollmentId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Update the state after successful deletion
      setEnrollments((prevEnrollments) =>
        prevEnrollments.filter((enrollment) => enrollment.enrollment_id !== enrollmentId)
      );

      console.log('Enrollment deleted successfully');
    } catch (error) {
      console.error('Error deleting enrollment:', error);
    }
  };

  const handleEdit = (enrollment) => {
    setEditEnrollmentId(enrollment.enrollment_id);
    setEditEnrollAs(enrollment.enroll_as);
    setEditStatus(enrollment.status);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('authToken');
      await axios.put(
        `http://localhost:5000/enrollments/${editEnrollmentId}`,
        {
          enroll_as: editEnrollAs,
          status: editStatus,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Close the modal and update the state
      setEditEnrollmentId(null);
      setEditEnrollAs('');
      setEditStatus('');
      // Fetch updated enrollments
      fetchEnrollments();

      console.log('Enrollment updated successfully');
    } catch (error) {
      console.error('Error updating enrollment:', error);
    }
  };

  return (
    <div className="main_box">
      <Navbar/>
      <div className="container-xl" style={{ boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px' }}>
        <div className="table-responsive">
          <div className="table-wrapper">
            <div className="table-title">
              <div className="row">
                <div className="col-sm-6">
                  <h2>
                    Add <b>Member</b>
                  </h2>
                </div>
                <div className="col-sm-6"></div>
              </div>
            </div>
            <table className="table table-striped table-hover">
              <thead>
                <tr>
                  <th></th>
                  <th>Name:</th>
                  <th>Class:</th>
                  <th>Enroll As:</th>
                  <th>Enroll Date:</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {enrollments.map((enrollment) => (
                  <tr key={enrollment.enrollment_id}>
                    <td></td>
                    <td> {enrollment.firstname} {enrollment.lastname}</td>
                    <td>{enrollment.class_name}</td>
                    <td>{enrollment.enroll_as}</td>
                    <td>{enrollment.enroll_date}</td>
                    <td>
                      <a href="#editEmployeeModal" className="edit" data-toggle="modal" onClick={() => handleEdit(enrollment)}>
                        <i className="material-icons" data-toggle="tooltip" title="Edit">
                          &#xE254;
                        </i>
                      </a>
                     <a href="#deleteEmployeeModal" className="delete" data-toggle="modal" onClick={() => handleDeleteConfirmation(enrollment.enrollment_id)}>
                        <i className="material-icons" data-toggle="tooltip" title="Delete">
                           &#xE872;
                        </i>
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div></div>
          </div>
        </div>
      </div>
      <div id="editEmployeeModal" className="modal fade">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Edit Member</h4>
              <button type="button" className="close" data-dismiss="modal" aria-hidden="true">
                &times;
              </button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleEditSubmit}>
                <div className="form-group">
                  <label>Enroll As:</label>
                  <input
                    type="text"
                    className="form-control"
                    value={editEnrollAs}
                    onChange={(e) => setEditEnrollAs(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>Status:</label>
                  <input
                    type="text"
                    className="form-control"
                    value={editStatus}
                    onChange={(e) => setEditStatus(e.target.value)}
                  />
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-default" data-dismiss="modal">
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-info">
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnrollmentsList;
