import axios from "axios";
import { useEffect, useState } from "react";
import openBall from "../images/clipart1298306.png";
import { ImageUploadModal } from "../components/ModalUploadImg";

export function Profile() {
  const [user, setUser] = useState({});
  const [show,setShow] = useState(false)

  const handleClose = ()=>{
    setShow(false)
  }

  const handleOpen = () => {
    setShow(true);
  };

  const fetchUser = async () => {
    const { data } = await axios.get("http://localhost:3000/users", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    });
    console.log(data);

    setUser(data);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <>
      {console.log(user)}
      <section
        className="w-100 px-4 py-5"
        style={{
          backgroundColor: "#9de2ff",
          borderRadius: ".5rem .5rem 0 0",
        }}
      >
        <div className="row d-flex justify-content-center">
          <div className="col col-md-6 col-lg-5 col-xl-4">
            <div className="card" style={{ borderRadius: 15 }}>
              <div className="card-body p-4">
                <div className="d-flex">
                  <div className="flex-shrink-0">
                    <img
                      src={
                        user.Profile
                          ? user.Profile.imgUrl
                          : "https://www.shutterstock.com/image-vector/blank-avatar-photo-place-holder-600nw-1114445501.jpg"
                      }
                      alt="Generic placeholder image"
                      className="img-fluid"
                      style={{ width: 100, borderRadius: 10 }}
                    />
                  </div>
                  <div className="flex-grow-1 ms-3">
                    <h5 className="mb-1">{user.userName}</h5>
                    <p className="mb-2 pb-1">{user.email}</p>

                    <div className="d-flex pt-1">
                      <button
                        type="button"
                        className="btn btn-outline-primary me-1 flex-grow-1"
                        style={{ width: "10px" }}
                      >
                        <i className="fas fa-pen"></i>
                      </button>
                      {user.role == "admin" && (
                        <button
                          type="button"
                          className="btn btn-outline-primary me-1 flex-grow-1"
                          style={{ width: "10px" }}
                          onClick={handleOpen}
                        >
                          <i className="fa-solid fa-plus"></i>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <ImageUploadModal
          fetchData={fetchUser}
          show={show}
          handleClose={handleClose}
          centered
        />
      <div className="mt-3 gap-3">
        <div className="card" style={{ width: "10rem" }}>
          <img
            src="https://www.shutterstock.com/image-vector/blank-avatar-photo-place-holder-600nw-1114445501.jpg"
            className="card-img-top"
            alt="..."
          />
          <div className="card-body d-flex flex-column justify-content-center align-items-center">
            <h5 className="card-title">Pikachu</h5>
            <p className="card-text"></p>
            <img
              src={openBall}
              alt=""
              style={{ width: "80px", cursor: "pointer" }}
            />
          </div>
        </div>
      </div>
    </>
  );
}
