import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ClassList = () => {
    const [classes, setClasses] = useState([]);
    const [loadingClasses, setLoadingClasses] = useState(true);
    const [userProfile, setUserProfile] = useState(null);
    const [loadingProfile, setLoadingProfile] = useState(true);

    const [enrollDetails, setEnrollDetails] = useState({
        id: '',
        className: '',
        description: '',
        classStart: '',
        userId: '',
        enrollAs: '',
        enrollDate: new Date().toISOString(),
    });

    useEffect(() => {
        const fetchClasses = async () => {
            try {
                const response = await axios.get('http://localhost:5000/get-classes');
                setClasses(response.data.classes);
                setLoadingClasses(false);
            } catch (error) {
                console.error('Error fetching classes:', error);
                setLoadingClasses(false);
            }
        };

        const fetchUserProfile = async () => {
            try {
                const authToken = localStorage.getItem('authToken');
                const response = await axios.get('http://localhost:5000/get-user-profile', {
                    headers: {
                        Authorization: `Bearer ${authToken}`,
                        'Content-Type': 'application/json',
                    },
                });

                if (response && response.data) {
                    setUserProfile(response.data);
                } else {
                    console.error('Invalid response format:', response);
                }

                setLoadingProfile(false);
            } catch (error) {
                console.error(error.response ? error.response.data : error.message);
                setLoadingProfile(false);
            }
        };

        fetchClasses();
        fetchUserProfile();
    }, []);

    const handleEnrollClick = (cls) => {
        setEnrollDetails({
            id: cls.class_id,
            userId: userProfile ? userProfile.user_id : '',
            enrollAs: '',
            enrollDate: new Date().toISOString(),
        });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEnrollDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
    };

    const handleEnrollSubmit = async (e) => {
        e.preventDefault();
        try {
            const authToken = localStorage.getItem('authToken');
            const { id, userId, enrollAs, enrollDate } = enrollDetails;
            const enrollData = {
                class_id: id,
                user_id: userId,
                enroll_as: enrollAs,
                enroll_date: enrollDate,
            };

            const response = await axios.post('http://localhost:5000/enroll', enrollData, {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                    'Content-Type': 'application/json',
                },
            });

            console.log(response.data);

            setEnrollDetails({
                id: '',
                userId: '',
                enrollAs: '',
                enrollDate: '',
            });

        } catch (error) {
            console.error('Error enrolling:', error);
        }
    };

    return (
        <div className="main_box">
            <input type="checkbox" id="check" />
      <label for="check">
        <i class="fas fa-bars" id="btn"></i>
        <i class="fas fa-times" id="cancel"></i>
      </label>
      <div class="sidebar">
        <header>Volunteer School</header>
        <a href="/homepage" class="active">
          <i class="fas fa-home"></i>
          <span>Home</span>
        </a>
        <a href="/add-member">
          <i class="fas fa-plus"></i>
          <span>Add member</span>
        </a>
        <a href="/classes">
          <i class="fas fa-book"></i>
          <span>Classes</span>
        </a>
        <a href="/enroll">
          <i class="fa-solid fa-book-open"></i>
          <span>Enroll</span>
        </a>
        <a href="/profile">
          <i class="far fa-user"></i>
          <span>Profile</span>
        </a>
        <a href="/fileupload">
          <i class="far fa-folder"></i>
          <span>Files</span>
        </a>
        <a href="#">
          <i class="fa fa-cog" aria-hidden="true"></i>
          <span>Setting</span>
        </a>
        <a href="#">
          <i class="fas fa-sign-out-alt"></i>
          <span>Logout</span>
        </a>
        </div>
            <div className="container-xl" style={{ boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px' }}>
                <div className='table-title' style={{ marginTop: '25px' }}>
                    <div className="col-sm-6">
                        <h2>Enroll <b>Class</b></h2>
                    </div>
                </div>
                <div className="table-responsive" style={{ maxHeight: '500px', overflowY: 'auto' }}>
                    <div className="table-wrapper">
                        <table className="table table-striped table-hover">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {classes.map((cls) => (
                                    <tr key={cls.class_id}>
                                        <td>{cls.class_name}</td>
                                        <td>{cls.description}</td>
                                        <td>{cls.cls_start}</td>
                                        <td>
                                            <a
                                                href="#editEmployeeModal"
                                                className="edit"
                                                data-toggle="modal"
                                                onClick={() => handleEnrollClick(cls)}
                                            >
                                                <i className="material-icons" data-toggle="tooltip" title="Enroll">
                                                    <i
                                                        className='fas fa-arrow-right'
                                                        style={{ color: 'black', fontWeight: 'bold', fontSize: 'larger' }}
                                                    />
                                                </i>
                                            </a>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div id="editEmployeeModal" className="modal fade">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <form onSubmit={handleEnrollSubmit}>
                                    <div className="modal-header">
                                        <h4 className="modal-title">Enroll Class</h4>
                                        <button
                                            type="button"
                                            className="close"
                                            data-dismiss="modal"
                                            aria-hidden="true"
                                        >
                                            &times;
                                        </button>
                                    </div>
                                    <div className="modal-body">
                                        <div className="form-group">
                                            <label>ID:</label>
                                            <input
                                                type="text"
                                                name="id"
                                                className="form-control"
                                                value={enrollDetails.id}
                                                readOnly
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>User ID:</label>
                                            <input
                                                type="text"
                                                name="userId"
                                                className="form-control"
                                                value={userProfile ? userProfile.user_id : ''}
                                                readOnly
                                            />
                                        </div>

                                        <div className="form-group">
                                            <label>Enrollment Type:</label>
                                            <input
                                                type="text"
                                                name="enrollAs"
                                                className="form-control"
                                                value={enrollDetails.enrollAs}
                                                onChange={handleInputChange}
                                            />
                                        </div>

                                        <div className="form-group">
                                            <label>Enrollment Date:</label>
                                            <input
                                                type="text"
                                                name="enrollDate"
                                                className="form-control"
                                                value={enrollDetails.enrollDate}
                                                readOnly
                                            />
                                        </div>
                                    </div>
                                    <div className="modal-footer">
                                        <input
                                            type="button"
                                            className="btn btn-default"
                                            data-dismiss="modal"
                                            value="Cancel"
                                        />
                                        <input type="submit" className="btn btn-info" value="Enroll" />
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ClassList;
