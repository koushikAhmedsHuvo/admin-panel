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
import { useNavigate } from "react-router-dom"; // Import useNavigate

const Skill = () => {
  const [professionalSkill, setProfessionalSkill] = useState("");
  const [error, setError] = useState("");
  const [profileData, setProfileData] = useState(null); // State to store profile data
  const navigate = useNavigate(); // Initialize useNavigate

  // Fetch profile data
  useEffect(() => {
    const fetchProfileData = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('You are not logged in');
        navigate('/auth/login'); // Redirect to login page
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
          alert('Unauthorized: Please login again');
          navigate('/auth/login'); // Redirect to login page if unauthorized
        }
      }
    };

    fetchProfileData();
  }, [navigate]);

  // Handle input change
  const handleInputChange = (e) => {
    setProfessionalSkill(e.target.value);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!professionalSkill) {
      setError("Professional skill is required.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8000/api/skills",
        { professional_skill: professionalSkill },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );

      if (response.status === 201) {
        // Handle success response, e.g., show a success message or reset the form
        alert("Skill successfully added!");
        setProfessionalSkill("");
      }
    } catch (err) {
      setError("There was an error adding the skill.");
    }
  };

  return (
    <>
      <UserHeader />
      {/* Page content */}
      <Container className="mt--7" fluid>
        <Row>
          {/* Profile Card */}
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
                        style={{ width: '120px', height: '120px' }}
                      />
                    </a>
                  </div>
                </Col>
              </Row>
              <CardBody className="pt-0 pt-md-4" style={{ marginTop: '70px' }}>
                <div className="text-center">
                  <h3>
                    {profileData ? `${profileData.user_profile.first_name} ${profileData.user_profile.last_name}` : 'Loading...'}
                  </h3>
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

          {/* Skill Form */}
          <Col className="order-xl-1" xl="8">
            <Card className="bg-secondary shadow">
              <CardHeader className="bg-white border-0">
                <Row className="align-items-center">
                  <Col xs="8">
                    <h3 className="mb-0">Skill Information</h3>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <Form>
                  <h6 className="heading-small text-muted mb-4">Skills</h6>
                  <div className="pl-lg-4">
                    <Row>
                      <Col lg="12">
                        <FormGroup>
                          <label className="form-control-label" htmlFor="input-professional-skill">
                            Professional Skill
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-professional-skill"
                            placeholder="Enter a professional skill"
                            type="text"
                            value={professionalSkill}
                            onChange={handleInputChange}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </div>
                  {error && <p className="text-danger">{error}</p>}
                  {/* Save Button placed here, below the form */}
                  <Button color="primary" onClick={handleSubmit} size="sm" block>
                    Save
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

export default Skill;
