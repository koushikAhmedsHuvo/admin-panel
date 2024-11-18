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
} from "reactstrap";
// core components
import UserHeader from "components/Headers/UserHeader.js";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";  // Import useNavigate from react-router-dom

const Project = () => {
  const [profileData, setProfileData] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  
  const navigate = useNavigate();  // Initialize navigate function

  // Fetch profile data
  useEffect(() => {
    const fetchProfileData = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/auth/login');  // Redirect to login page if no token is found
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
        } else {
          alert('Failed to fetch profile data');
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
        if (error.response?.status === 401) {
          navigate('/auth/login');  // Redirect to login if unauthorized
        }
      }
    };

    fetchProfileData();
  }, [navigate]);  // Add navigate to dependencies to prevent stale closures

  const handleSubmit = async (e) => {
    e.preventDefault();

    const projectData = {
      title,
      description,
    };

    try {
      const response = await axios.post(
        'http://localhost:8000/api/projects',
        projectData,
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      setSuccessMessage('Project successfully created!');
      setTitle('');
      setDescription('');
      setError(null);  // Reset error message if submission is successful
    } catch (err) {
      console.error(err);
      setError('Failed to create project. Please try again.');
      setSuccessMessage(''); // Clear success message if there is an error
    }
  };

  return (
    <>
      <UserHeader />
      {/* Page content */}
      <Container className="mt--7" fluid>
        <Row>
          <Col className="order-xl-2 mb-5 mb-xl-0" xl="4">
            <Card className="card-profile shadow">
              <Row className="justify-content-center">
                <Col className="order-lg-2" lg="3">
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
                    <h3 className="mb-0">Project Information</h3>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <Form onSubmit={handleSubmit}>
                  <h6 className="heading-small text-muted mb-4">Project Details</h6>
                  <div className="pl-lg-4">
                    <Row>
                      <Col lg="12">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-project-title"
                          >
                            Title
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-project-title"
                            placeholder="Enter project title"
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="12">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-project-description"
                          >
                            Description
                          </label>
                          <Input
                            className="form-control-alternative"
                            placeholder="Describe the project"
                            rows="4"
                            type="textarea"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </div>
                  {error && <p className="text-danger">{error}</p>}
                  {successMessage && <p className="text-success">{successMessage}</p>}
                  <div className="text-center">
                    <Button
                      color="primary"
                      type="submit"
                    >
                      Save
                    </Button>
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

export default Project;
