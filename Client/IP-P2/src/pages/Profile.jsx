import axios from "axios";
import { useEffect, useState } from "react";
import openBall from "../images/clipart1298306.png";
import { ImageUploadModal } from "../components/ModalUploadImg";
import { ProfileEditModal } from "../components/ProfileEdit";
import { errorSound, globalSound, releaseSound } from "../helpers/sound";
import { useDispatch, useSelector } from "react-redux";
import { fetchPokemon } from "../stores/PokemonSlice";
import Swal from "sweetalert2";

export function Profile() {
  const [user, setUser] = useState({});
  const [show, setShow] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [profiles,setProfiles] = useState([]) 

  const dispatch = useDispatch();
  const pokemonList = useSelector((state) => state.pokemon.list);

  const handleClose = () => {
    setShow(false);
  };

  const handleOpen = () => {
    globalSound.start();
    setShow(true);
  };

  const fetchFavorite = async () => {
    try {
      const { data } = await axios.get("https://ip-p2.brandon-hash268.online/favorites", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      // console.log(data,"<<<<<<<");

      setFavorites(data);
    } catch (error) {
      console.log("🚀 ~ fetchFavorite ~ error:", error)
      errorSound.start();
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.response.data.message,
      });
    }
  };

  const fetchUser = async () => {
    try {
      const { data } = await axios.get("https://ip-p2.brandon-hash268.online/users", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      // console.log(data);
      setUser(data);
    } catch (error) {
      console.log("🚀 ~ fetchUser ~ error:", error)
      errorSound.start();
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.response.data.message,
      });
    }
  };

  const fetchProfile = async () => {
    try {
      const { data } = await axios.get(
        "https://ip-p2.brandon-hash268.online/profiles",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      // console.log(data, "<<<<<");

      setProfiles (data)
    } catch (error) {
      errorSound.start();
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.response.data.message,
      });
    }
  };
  const handleUnfavorited = async (pokemonName) => {
    try {
      releaseSound.start();
      await axios.delete("https://ip-p2.brandon-hash268.online/favorites/" + pokemonName, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      fetchFavorite();
      Swal.fire({
        icon:"success",
        title:"Success!",
        text:`Pokemon ${pokemonName} is released!`
      })
    } catch (error) {
      console.log("🚀 ~ handleUnfavorited ~ error:", error)
      errorSound.start();
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.response.data.message,
      });
    }
  };

  useEffect(() => {
    fetchUser();
    fetchFavorite();
    fetchProfile()
    dispatch(fetchPokemon());
    // releaseSound.load()
  }, [dispatch]);


  return (
    <>
      <section
        className="w-100 px-4 py-5"
        style={{
          fontFamily: "Arial, sans-serif",
          backgroundImage:
            "url('https://static.vecteezy.com/system/resources/previews/035/992/009/non_2x/cartoon-landscape-with-white-clouds-on-sky-background-with-cloud-and-beautiful-field-summer-green-country-hill-meadow-scene-spring-nature-land-illustration-vector.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
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
                        onClick={() => {
                          globalSound.start();
                          setShowEditModal(true);
                        }}
                      >
                        <i className="fas fa-pen"></i>
                      </button>
                      <ProfileEditModal
                        show={showEditModal}
                        handleClose={() => setShowEditModal(false)}
                        fetchData={fetchUser}
                        name={user.userName}
                        profiles={profiles}
                      />

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
        fetchProfile={fetchProfile}
        show={show}
        handleClose={handleClose}
        centered
      />
      <div className="mt-3 gap-2 d-flex flex-wrap m-2 overflown-x-scroll">
        {pokemonList
          .filter((pokemon) =>
            favorites.some(
              (fav) => fav.pokemonName.toLowerCase() == pokemon.name
            )
          )
          .map((match, i) => (
            <div key={i} className="card" style={{ width: "10rem" }}>
              {console.log(match)}
              <div className="d-flex justify-content-center">
                <img
                  src={match.sprites.other["official-artwork"].front_default}
                  className="card-img-top"
                  alt={match.name}
                  style={{ width: "120px" }}
                />
              </div>
              <div className="card-body d-flex flex-column justify-content-center align-items-center">
                <h5 className="card-title">
                  {match.name.replace(/^./, (str) => str.toUpperCase())}
                </h5>
                <p className="card-text"></p>
                <img
                  src={openBall}
                  alt=""
                  style={{ width: "80px", cursor: "pointer" }}
                  onClick={() =>
                    handleUnfavorited(
                      match.name.replace(/^./, (str) => str.toUpperCase())
                    )
                  }
                />
              </div>
            </div>
          ))}
      </div>
    </>
  );
}
