import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import animeAPI from "../api/AnimeApi";
import serverAPI from "../api/ServerApi";
import { jwtDecode } from "jwt-decode";

export default function DetailsPage() {
  const { mal_id } = useParams();
  const [anime, setAnime] = useState(null);
  const [newComments, setNewComments] = useState("");
  const [reload, setReload] = useState(false);
  const [comment, setComment] = useState("");
  //   const {userId} = req.user
  const fetchAnimeDetails = async () => {
    try {
      const response = await animeAPI.get(`/anime/${mal_id}`);
      setAnime(response.data.data);
    } catch (err) {
      console.log("🚀 ~ fetchAnimeDetails ~ err:", err);
    }
  };

  const getUserId = () => {
    const token = localStorage.getItem("access_token");
    if (token) {
      const decodedToken = jwtDecode(token);
      console.log("Decoded Token:", decodedToken);
      return decodedToken.id;
    }
    return null;
  };

  const postComment = async () => {
    // const userId = getUserId(); // Get user ID
    // console.log("Posting Comment with User ID:", userId);
    try {
      const response = await serverAPI.post(
        `/comments`,
        {
          userId: 9,
          mal_id: mal_id,
          comment: comment,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );

      if (response.status === 200) {
        setReload(true);
        setComment(""); // Clear the input if successful
      } else {
        console.error("Failed to submit comment:", response.data);
      }
    } catch (err) {
      console.log("🚀 ~ postComment ~ err:", err);
    }
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (comment.trim()) {
      postComment(); // Call the function to post the comment
      setComment(""); // Clear the input
    }
  };

  useEffect(() => {
    fetchAnimeDetails();
  }, [mal_id]);

  if (!anime) {
    return (
      <div className="container mt-5">
        <h2>Loading...</h2>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6">
          <img
            src={anime.images.webp.large_image_url}
            className="img-fluid"
            alt={anime.title}
          />
        </div>
        <div className="col-md-6">
          <h1>{anime.title}</h1>
          <h5>Rank: {anime.rank}</h5>
          <h5>Score: {anime.score}</h5>
          <p style={{ fontFamily: 'Hozier, sans-serif', fontSize: '16px', lineHeight: '1.5' }}>
          {anime.synopsis}
          </p>
          <ul>
            <li>
              <strong>Genre:</strong>{" "}
              {anime.genres.map((genre) => genre.name).join(", ")}
            </li>
            <li>
              <strong>Rating:</strong> {anime.rating}
            </li>
            <li>
              <strong>Episode:</strong> {anime.episodes}
            </li>
            <li>
              <strong>Status:</strong> {anime.status}
            </li>
              <div className="embed-container mt-3">
                <iframe
                  src={anime.trailer.embed_url} 
                  title="Trailer"
                  frameBorder="0"
                  allowFullScreen
                  className="embed-responsive"
                ></iframe>
              </div>
          </ul>
        </div>
      </div>

      <div className="mt-5">
        <h2>Komentar</h2>
        <form onSubmit={handleCommentSubmit}>
          <div className="mb-3">
            <textarea
              className="form-control"
              rows="3"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Tinggalkan komentar..."
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Kirim Komentar
          </button>
        </form>

        <div className="mt-4">
          <h4>Daftar Komentar:</h4>
          {/* <ul className="list-unstyled">
            {.map((c, index) => (
              <li key={index} className="border p-2 mb-2">
                {c}
              </li>
            ))}
          </ul> */}
        </div>
      </div>
    </div>
  );
}
