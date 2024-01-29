import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../homepages/Navbar'

function Add_member() {
  const [members, setMembers] = useState([]);
  const [selectedMember, setSelectedMember] = useState(null);
  const [formMode, setFormMode] = useState('add');
  const [formData, setFormData] = useState({
    firstname: '',
    middlename: '',
    lastname: '',
    email: '',
    phonenumber: '',
    gender: '',
    relationship: '',
    dateofbirth: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const authToken = localStorage.getItem('authToken');
        const response = await axios.get('http://localhost:5000/get-members', {
          headers: {
            Authorization: `Bearer ${authToken}`,
            'Content-Type': 'application/json',
          },
        });

        setMembers(response.data.members);
      } catch (error) {
        console.error(error.response.data);
      }
    };

    fetchMembers();
  }, []);

  const handleEdit = (member) => {
    setSelectedMember(member);
    setFormData({
      firstname: member.firstname,
      middlename: member.middlename,
      lastname: member.lastname,
      email: member.email,
      phonenumber: member.phonenumber,
      gender: member.gender,
      relationship: member.relationship,
      dateofbirth: member.dateofbirth,
    });
    setFormMode('edit');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const authToken = localStorage.getItem('authToken');
      let response;

      if (formMode === 'add') {
        response = await axios.post(
          'http://localhost:5000/add-member',
          formData,
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
              'Content-Type': 'application/json',
            },
          }
        );
      } else if (formMode === 'edit') {
        response = await axios.put(
          `http://localhost:5000/update-member/${selectedMember.user_id}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
              'Content-Type': 'application/json',
            },
          }
        );
      }

      if (response && response.data) {
        console.log(response.data);
      } else {
        console.error('Response or response.data is undefined.');
      }
    } catch (error) {
      console.error(error.response.data);
    }
  };
  const handleDelete = (member) => {
    setSelectedMember(member);
  };
  const handleDeleteConfirmation = async () => {
    try {
      const authToken = localStorage.getItem('authToken');
      const response = await axios.delete(
        `http://localhost:5000/delete-member/${selectedMember.user_id}`,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
            'Content-Type': 'application/json',
          },
        }
      );
      if (response && response.data) {
        console.log(response.data);
      } else {
        console.error('Response or response.data is undefined.');
      }
    } catch (error) {
      console.error(error.response.data);
    }
  };

  return (
    <div class="main_box">
      <Navbar/>
      <div class="container-xl" style={{ boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px' }}>
        <div class="table-responsive">
          <div class="table-wrapper">
            <div class="table-title">
              <div class="row">
                <div class="col-sm-6">
                  <h2>
                    Add <b>Member</b>
                  </h2>
                </div>
                <div class="col-sm-6">
                  <a href="#addEmployeeModal" class="btn btn-success" data-toggle="modal">
                    <i class="material-icons">&#xE147;</i> <span>Add New Employee</span>
                  </a>
                </div>
              </div>
            </div>
            <table class="table table-striped table-hover">
              <thead>
                <tr>
                  <th></th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {members.map((member) => (
                  <tr key={member.user_id}>
                    <td>
                      <span class="custom-checkbox">
                        <input type="checkbox" id={`checkbox${member.user_id}`} name="options[]" value={member.user_id} />
                        <label for={`checkbox${member.user_id}`}></label>
                      </span>
                    </td>
                    <td>{`${member.firstname} ${member.lastname}`}</td>
                    <td>{member.email}</td>
                    <td>
                      <a href="#editEmployeeModal" class="edit" data-toggle="modal" onClick={() => handleEdit(member)}>
                        <i class="material-icons" data-toggle="tooltip" title="Edit">
                          &#xE254;
                        </i>
                      </a>
                      <a href="#deleteEmployeeModal" class="delete" data-toggle="modal" onClick={() => handleDelete(member)}>
                        <i class="material-icons" data-toggle="tooltip" title="Delete">
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

      <div id="addEmployeeModal" class="modal fade">
        <div class="modal-dialog">
          <div class="modal-content">
            <form onSubmit={handleSubmit}>
              <div class="modal-header">
                <h4 class="modal-title">Add Member</h4>
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                  &times;
                </button>
              </div>
              <div class="modal-body">
                <div class="form-group">
                  <label>First Name:</label>
                  <input type="text" name="firstname" class="form-control" value={formData.firstname} onChange={handleChange} required />
                </div>
                <div class="form-group">
                  <label>Middle Name:</label>
                  <input type="text" name="middlename" class="form-control" value={formData.middlename} onChange={handleChange} required />
                </div>
                <div class="form-group">
                  <label>Last Name:</label>
                  <input type="text" name="lastname" class="form-control" value={formData.lastname} onChange={handleChange} />
                </div>
                <div class="form-group">
                  <label>Email:</label>
                  <input type="email" name="email" class="form-control" value={formData.email} onChange={handleChange} required />
                </div>
                <div class="form-group">
                  <label>Phone Number:</label>
                  <input type="tel" name="phonenumber" class="form-control" value={formData.phonenumber} onChange={handleChange} required />
                </div>
                <div class="form-group">
                  <label>Gender:</label>
                  <input type="text" name="gender" class="form-control" value={formData.gender} onChange={handleChange} required />
                </div>
                <div class="form-group">
                  <label>Relationship:</label>
                  <input type="text" name="relationship" class="form-control" value={formData.relationship} onChange={handleChange} />
                </div>
                <div class="form-group">
                  <label>Date of Birth:</label>
                  <input type="date" name="dateofbirth" class="form-control" value={formData.dateofbirth} onChange={handleChange} required />
                </div>
              </div>
              <div class="modal-footer">
                <input type="button" class="btn btn-default" data-dismiss="modal" value="Cancel" />
                <input type="submit" class="btn btn-success" value="Add" />
              </div>
            </form>
          </div>
        </div>
      </div>

      <div id="editEmployeeModal" class="modal fade">
        <div class="modal-dialog">
          <div class="modal-content">
            <form onSubmit={handleSubmit}>
              <div class="modal-header">
                <h4 class="modal-title">Edit Member</h4>
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                  &times;
                </button>
              </div>
              <div class="modal-body">
                <div class="form-group">
                  <label>First Name:</label>
                  <input type="text" name="firstname" class="form-control" value={formData.firstname} onChange={handleChange} required />
                </div>
                <div class="form-group">
                  <label>Middle Name:</label>
                  <input type="text" name="middlename" class="form-control" value={formData.middlename} onChange={handleChange} required />
                </div>
                <div class="form-group">
                  <label>Last Name:</label>
                  <input type="text" name="lastname" class="form-control" value={formData.lastname} onChange={handleChange} required />
                </div>
                <div class="form-group">
                  <label>Email:</label>
                  <input type="email" name="email" class="form-control" value={formData.email} onChange={handleChange} required />
                </div>
                <div class="form-group">
                  <label>Phone Number:</label>
                  <input type="text" name="phonenumber" class="form-control" value={formData.phonenumber} onChange={handleChange} required />
                </div>
                <div class="form-group">
                  <label>Gender:</label>
                  <input type="text" name="gender" class="form-control" value={formData.gender} onChange={handleChange} required />
                </div>
                <div class="form-group">
                  <label>Relationship:</label>
                  <input type="text" name="relationship" class="form-control" value={formData.relationship} onChange={handleChange} />
                </div>
                <div class="form-group">
                  <label>Date of Birth:</label>
                  <input type="date" name="dateofbirth" class="form-control" value={formData.dateofbirth} onChange={handleChange} required />
                </div>
              </div>
              <div class="modal-footer">
                <input type="button" class="btn btn-default" data-dismiss="modal" value="Cancel" />
                <input type="submit" class="btn btn-info" value="Save" />
              </div>
            </form>
          </div>
        </div>
      </div>

      <div id="deleteEmployeeModal" class="modal fade">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h4 class="modal-title">Delete Member</h4>
              <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                &times;
              </button>
            </div>
            <div class="modal-body">
              <p>Are you sure you want to delete these records?</p>
              <p class="text-warning">
                <small>This action cannot be undone.</small>
              </p>
            </div>
            <div class="modal-footer">
              <input type="button" class="btn btn-default" data-dismiss="modal" value="Cancel" />
              <input type="button" class="btn btn-danger" value="Delete" onClick={handleDeleteConfirmation} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Add_member;
