import { Modal, Button, Form, Image } from "react-bootstrap";
import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { errorSound, sounds, successSound } from "../helpers/sound";
import selectSfx from "../sounds/mixkit-player-jumping-in-a-video-game-2043.wav"

// eslint-disable-next-line react/prop-types
export function ProfileEditModal({ show, handleClose, fetchData, name, profiles }) {
  const [selectedImage, setSelectedImage] = useState([]);
  const [userName, setUserName] = useState("");

  const selectSound = sounds(selectSfx)
  // Handle image selection

  // Handle form submission
  useEffect(() => {
    setUserName(name);
  }, [name]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(
        "https://ip-p2.brandon-hash268.online/users",
        { userName, ProfileId: selectedImage },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      successSound.start()
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Profile updated successfully!",
      });
      fetchData();
      handleClose(); 
    } catch (error) {
      console.log(error);
      errorSound.start();
      Swal.fire({
        icon: "error",
        title: "Error",
        text:
          error.response.data.message ==
          "ProfileId cannot be an array or an object"
            ? "You must select an Image first"
            : error.response.data.message,
      });
    }
  };

  const handleChangeImg=(id)=>{
    setSelectedImage(id);
    selectSound.start()
  }

  return (
    <Modal show={show} onHide={handleClose} centered>
      {/* {console.log(userName)} */}

      <Modal.Header closeButton>
        <Modal.Title>Edit Profile Picture</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <div className="d-flex flex-wrap justify-content-center mb-3" style={{overflowY:"scroll",maxHeight:"350px"}}>
            {profiles.map((e) => (
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
                onClick={() => handleChangeImg(e.id)}
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
