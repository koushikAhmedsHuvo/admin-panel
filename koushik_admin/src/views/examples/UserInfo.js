import React, { useState, useEffect } from 'react';
import { Button, Card, CardHeader, CardBody, FormGroup, Form, Input, Container, Row, Col } from 'reactstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
import UserHeader from 'components/Headers/UserHeader.js';

const UserInfo = () => {
  const [profileData, setProfileData] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    intro: '',
    maintext: '',
    abouttitle: '',
    description: '',
  });
  const [error, setError] = useState('');

  const navigate = useNavigate(); // Initialize the navigate function

  // Fetch profile data on component mount
  useEffect(() => {
    const fetchProfileData = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('You are not logged in');
        navigate('/auth/login'); // Redirect to login page if no token
        return;
      }

      try {
        const response = await axios.get('http://localhost:8000/api/user-profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.data.status) {
          setProfileData(response.data.data);
          setFormData({
            title: response.data.data.user_profile.title,
            intro: response.data.data.user_profile.intro,
            maintext: response.data.data.user_profile.maintext,
            abouttitle: response.data.data.user_profile.abouttitle,
            description: response.data.data.user_profile.description,
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
  }, [navigate]); // Add navigate to dependencies

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title || !formData.intro || !formData.maintext || !formData.abouttitle || !formData.description) {
      setError('Please fill in all the required fields');
      return;
    }

    setError('');

    try {
      const token = localStorage.getItem('token'); // Use 'token' key for consistency
      if (!token) {
        setError('User not authenticated');
        return;
      }

      const response = await fetch('http://localhost:8000/api/store', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const textResponse = await response.text();
      if (!response.ok) {
        setError(`Request failed: ${textResponse}`);
        return;
      }

      const data = JSON.parse(textResponse);
      alert('User information successfully saved');
    } catch (error) {
      setError('Something went wrong');
      console.error(error);
    }
  };

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
                    <h3 className="mb-0">User Information</h3>
                  </Col>
                  <Col className="text-right" xs="4">
                    <Button color="primary" href="#pablo" onClick={(e) => e.preventDefault()} size="sm">
                      Settings
                    </Button>
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
                          <label className="form-control-label" htmlFor="input-title">
                            Title
                          </label>
                          <Input
                            className="form-control-alternative"
                            value={formData.title}
                            name="title"
                            onChange={handleChange}
                            placeholder="Title"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label className="form-control-label" htmlFor="input-intro">
                            Intro
                          </label>
                          <Input
                            className="form-control-alternative"
                            value={formData.intro}
                            name="intro"
                            onChange={handleChange}
                            placeholder="Intro"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label className="form-control-label" htmlFor="input-maintext">
                            Main Text
                          </label>
                          <Input
                            className="form-control-alternative"
                            value={formData.maintext}
                            name="maintext"
                            onChange={handleChange}
                            placeholder="Main text"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label className="form-control-label" htmlFor="input-abouttitle">
                            About Title
                          </label>
                          <Input
                            className="form-control-alternative"
                            value={formData.abouttitle}
                            name="abouttitle"
                            onChange={handleChange}
                            placeholder="About title"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="12">
                        <FormGroup>
                          <label className="form-control-label" htmlFor="input-description">
                            Description
                          </label>
                          <Input
                            className="form-control-alternative"
                            type="textarea"
                            value={formData.description}
                            name="description"
                            onChange={handleChange}
                            placeholder="Description"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    {error && <div className="text-danger">{error}</div>}
                    <div className="text-center">
                      <Button color="primary" type="submit">
                        Save Information
                      </Button>
                    </div>
                  </div>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default UserInfo;
