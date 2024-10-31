import { Modal, Button, Form } from "react-bootstrap";
import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { errorSound, successSound } from "../helpers/sound";

// eslint-disable-next-line react/prop-types
export function ImageUploadModal({ show, handleClose, fetchData }) {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleFileChange = (e) => {
    setSelectedImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("imgUrl", selectedImage);

    try {
      if (selectedImage) {
        await axios.post("http://localhost:3000/profiles", formData, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        });
        successSound.start()
        fetchData();
      } else {
        errorSound.start();

        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Please Select an Image to Upload",
        });
      }
      handleClose();
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.response.data.error,
      });
    }
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Upload Image</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="productImage" className="mb-3">
              <Form.Label>Select Image</Form.Label>
              <Form.Control
                type="file"
                accept="image/*"
                onChange={handleFileChange}
              />
            </Form.Group>
            <Button
              className="w-100 text-align-center"
              variant="primary"
              type="submit"
            >
              Upload
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}
