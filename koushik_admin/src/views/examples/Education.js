import React, { useState, useEffect } from 'react';
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  Container,
  Row,
  Col,
  Alert,
} from 'reactstrap';
import UserHeader from 'components/Headers/UserHeader.js';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook

const Education = () => {
  const [educationData, setEducationData] = useState(null);
  const [formData, setFormData] = useState({
    degree: '',
    institution: '',
    description: '',
    date: '',
  });
  const [profileData, setProfileData] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const navigate = useNavigate(); // Initialize the navigate function

  // Handle form data change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission to create education data
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) {
      alert('You are not logged in');
      navigate('/auth/login'); // Redirect to login page if not logged in
      return;
    }

    try {
      const response = await axios.post('http://localhost:8000/api/educations', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.message === 'Education record successfully created!') {
        setSuccess('Education created successfully!');
        setError(null);
        setEducationData(response.data.data); // Update state with the newly created data
        setFormData({ // Optionally reset the form data
          degree: '',
          institution: '',
          description: '',
          date: '',
        });
      } else {
        setError('Failed to create education.');
        setSuccess(null);
      }
    } catch (err) {
      console.error(err);
      setError('Failed to create education.');
      setSuccess(null);
    }
  };

  // Fetch profile data and education data
  useEffect(() => {
    const fetchProfileData = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('You are not logged in');
        navigate('/auth/login'); // Redirect to login page if not logged in
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
            school: response.data.data.education.school,
            degree: response.data.data.education.degree,
            passing_year: response.data.data.education.passing_year,
            description: response.data.data.education.description,
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
  }, [navigate]);

  return (
    <>
      <UserHeader />
      <Container className="mt--7" fluid>
        <Row>
          {/* Right side card with profile details */}
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

          {/* Left side card with education editing form */}
          <Col className="order-xl-1" xl="8">
            <Card className="bg-secondary shadow">
              <CardHeader className="bg-white border-0">
                <Row className="align-items-center">
                  <Col xs="8">
                    <h3 className="mb-0">Edit Education</h3>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <Form onSubmit={handleSubmit}>
                  <h6 className="heading-small text-muted mb-4">Education Information</h6>
                  <div className="pl-lg-4">
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label className="form-control-label" htmlFor="input-degree">
                            Degree
                          </label>
                          <Input
                            value={formData.degree}
                            name="degree"
                            onChange={handleChange}
                            placeholder="Degree"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label className="form-control-label" htmlFor="input-institution">
                            Institution
                          </label>
                          <Input
                            value={formData.institution}
                            name="institution"
                            onChange={handleChange}
                            placeholder="Institution"
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
                            value={formData.description}
                            name="description"
                            onChange={handleChange}
                            placeholder="Description"
                            type="textarea"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="12">
                        <FormGroup>
                          <label className="form-control-label" htmlFor="input-date">
                            Date (e.g., 2020-2024)
                          </label>
                          <Input
                            value={formData.date}
                            name="date"
                            onChange={handleChange}
                            placeholder="Date"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </div>
                  {success && <Alert color="success">{success}</Alert>}
                  {error && <Alert color="danger">{error}</Alert>}
                  <Button color="primary" type="submit">
                    Save Education
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

export default Education;
