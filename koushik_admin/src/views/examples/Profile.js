import React, { useState, useEffect } from 'react';
import { Button, Card, CardHeader, CardBody, FormGroup, Form, Input, Container, Row, Col, Alert } from 'reactstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
import UserHeader from 'components/Headers/UserHeader.js';

const Profile = () => {
  const navigate = useNavigate(); // Initialize useNavigate
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    phone: '',
    image: null,
  });

  const [profileData, setProfileData] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      image: e.target.files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) {
      alert('You are not logged in');
      navigate('/login'); // Redirect to login if not logged in
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append('first_name', formData.first_name);
    formDataToSend.append('last_name', formData.last_name);
    formDataToSend.append('phone', formData.phone);
    if (formData.image) {
      formDataToSend.append('image', formData.image);
    }

    try {
      const response = await axios.post('http://localhost:8000/api/user-profile', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.status) {
        setProfileData(response.data.data);
        setSuccess('Profile updated successfully!');
        setError(null);
      } else {
        setError('Failed to update profile.');
        setSuccess(null);
      }
    } catch (err) {
      console.error(err);
      setError('Failed to update profile.');
      setSuccess(null);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('You are not logged in');
      navigate('/auth/login'); // Redirect to login if not logged in
      return;
    }

    const fetchProfileData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/user-profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.data.status) {
          setProfileData(response.data.data);
          setFormData({
            first_name: response.data.data.user_profile.first_name,
            last_name: response.data.data.user_profile.last_name,
            phone: response.data.data.user_profile.phone,
            image: null,
          });
        } else {
          alert('Failed to fetch profile data');
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
        if (error.response?.status === 401) {
          alert('Unauthorized: Please login again');
          navigate('/auth/login'); // Redirect to login if unauthorized
        }
      }
    };

    fetchProfileData();
  }, [navigate]); // Include navigate as dependency to trigger redirect if needed

  return (
    <>
      <UserHeader />
      <Container className="mt--7" fluid>
        <Row>
          <Col className="order-xl-2 mb-5 mb-xl-0" xl="4">
            <Card className="card-profile shadow">
              <Row className="justify-content-center">
                <Col className="order-lg-2" lg="4">
                  <div className="card-profile-image">
                    <a href="#pablo" onClick={(e) => e.preventDefault()}>
                      <img
                        alt="Profile Image"
                        className="rounded-circle"
                        src={profileData?.user_profile?.image || '/default-avatar.jpg'}
                        style={{
                          width: '120px',
                          height: '120px',
                        }}
                      />
                    </a>
                  </div>
                </Col>
              </Row>
              <CardBody className="pt-0 pt-md-4" style={{ marginTop: '70px' }}>
                <div className="text-center">
                  <h3>{profileData ? `${profileData.user_profile.first_name} ${profileData.user_profile.last_name}` : 'Loading...'}</h3>
                  <p>{profileData ? profileData.user_profile.about_me : 'Loading...'}</p>
                  <div className="h5 mt-2">
                    <strong>Email: </strong>{profileData ? profileData.user.email : 'Loading...'}
                  </div>
                  <div className="h5 mt-2">
                    <strong>Phone: </strong>{profileData ? profileData.user_profile.phone : 'Loading...'}
                  </div>
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col className="order-xl-1" xl="8">
            <Card className="bg-secondary shadow">
              <CardHeader className="bg-white border-0">
                <Row className="align-items-center">
                  <Col xs="8">
                    <h3 className="mb-0">Edit Profile</h3>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <Form onSubmit={handleSubmit}>
                  <h6 className="heading-small text-muted mb-4">User information</h6>
                  <div className="pl-lg-4">
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label className="form-control-label" htmlFor="input-first-name">
                            First Name
                          </label>
                          <Input
                            value={formData.first_name}
                            name="first_name"
                            onChange={handleChange}
                            placeholder="First name"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label className="form-control-label" htmlFor="input-last-name">
                            Last Name
                          </label>
                          <Input
                            value={formData.last_name}
                            name="last_name"
                            onChange={handleChange}
                            placeholder="Last name"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label className="form-control-label" htmlFor="input-phone">
                            Phone
                          </label>
                          <Input
                            value={formData.phone}
                            name="phone"
                            onChange={handleChange}
                            placeholder="Phone number"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label className="form-control-label" htmlFor="input-image">
                            Profile Image
                          </label>
                          <Input
                            name="image"
                            onChange={handleFileChange}
                            type="file"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </div>
                  {success && <Alert color="success">{success}</Alert>}
                  {error && <Alert color="danger">{error}</Alert>}
                  <Button color="primary" type="submit">
                    Save Profile
                  </Button>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Profile;
