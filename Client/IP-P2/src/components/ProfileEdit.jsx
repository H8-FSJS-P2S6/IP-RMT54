import { Modal, Button, Form, Image } from "react-bootstrap";
import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

export function ProfileEditModal({ show, handleClose, fetchData, name }) {
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState([]);
  const [userName, setUserName] = useState("");

  // Handle image selection
  const fetchProfile = async () => {
    try {
      const { data } = await axios.get("http://localhost:3000/profiles", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      console.log(data, "<<<<<");
      
      setImages(data);
    } catch (error) {
      console.log(error);
    }
  };

  // Handle form submission
  useEffect(() => {
    fetchProfile();
    setUserName(name)
  }, [name]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedImage) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Please select an image",
      });
      return;
    }
    try {
      await axios.patch("http://localhost:3000/users",{userName,ProfileId:selectedImage}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      fetchData(); // Refresh profile data
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Profile image updated successfully!",
      });
      handleClose(); // Close modal after successful upload
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.response?.data?.error || "An error occurred",
      });
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      {console.log(userName)}

      <Modal.Header closeButton>
        <Modal.Title>Edit Profile Picture</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <div className="d-flex flex-wrap justify-content-center mb-3">
            {images.map((e) => (
              <Image
                src={e.imgUrl}
                roundedCircle
                style={{
                  width: "100px",
                  height: "100px",
                  objectFit: "cover",
                  cursor: "pointer",
                  backgroundColor:
                    selectedImage === e.id ? "#cce5ff" : "transparent",
                }}
                onClick={() => setSelectedImage(e.id)}
                key={e.id}
              />
            ))}
          </div>
          <Form.Group>
            <Form.Control
              onChange={(e) => setUserName(e.target.value)}
              value={userName}
              type="text"
              placeholder="User Name"
              className="mb-2"
            />
          </Form.Group>
          <Button variant="primary" type="submit" className="w-100">
            Save Changes
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
