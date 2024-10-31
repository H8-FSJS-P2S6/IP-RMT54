import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import animeAPI from "../api/AnimeApi";

export default function DetailsPage() {
  const { mal_id } = useParams();
  const [anime, setAnime] = useState(null);
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const {userId} = req.user
  const fetchAnimeDetails = async () => {
    try {
      const response = await animeAPI.get(`/anime/${mal_id}`);
      setAnime(response.data.data);
    } catch (err) {
      console.log("🚀 ~ fetchAnimeDetails ~ err:", err);
    }
  };

  const postComment = async () => {
    const newComment = {
        userId,
      mal_id: parseInt(mal_id),
      comment,
    };

    try {
      const response = await fetch("https://p2.alifnaufaldo.online/comments/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newComment),
      });

      if (!response.ok) {
        throw new Error("Failed to submit comment");
      }

      const data = await response.json();
      setComments((prev) => [...prev, data.comment]); // Assuming the response returns the created comment
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
            src={anime.images.webp.image_url}
            className="img-fluid"
            alt={anime.title}
          />
        </div>
        <div className="col-md-6">
          <h1>{anime.title}</h1>
          <p>{anime.synopsis}</p>
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
          <ul className="list-unstyled">
            {comments.map((c, index) => (
              <li key={index} className="border p-2 mb-2">
                {c}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
