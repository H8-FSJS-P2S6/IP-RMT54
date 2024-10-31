import PropTypes from "prop-types";
import { Link, useNavigate } from "react-router-dom";

export default function CardAnime({ anime }) {
  const navigate = useNavigate();

  const handleAnimeDetail = (mal_id) => {
    navigate(`/anime/${mal_id}`)
  }
  return (
    <div className="card" style={{ width: "18rem" }}>
      <Link to={`/anime/${anime.mal_id}`} >
        <img
          src={anime.images.webp.image_url}
          className="card-img-top"
          alt={anime.title}
        />
      </Link>
      <div className="card-body">
        <h5 className="card-title">{anime.title}</h5>
      </div>
    </div>
  );
}

CardAnime.propTypes = {
  anime: PropTypes.shape({
    aired: PropTypes.shape({
      from: PropTypes.string.isRequired,
      to: PropTypes.string.isRequired,
      string: PropTypes.string.isRequired,
    }).isRequired,
    airing: PropTypes.bool.isRequired,
    approved: PropTypes.bool.isRequired,
    background: PropTypes.string.isRequired,
    broadcast: PropTypes.shape({
      day: PropTypes.string.isRequired,
      time: PropTypes.string.isRequired,
      timezone: PropTypes.string.isRequired,
      string: PropTypes.string.isRequired,
    }).isRequired,
    demographics: PropTypes.array.isRequired,
    duration: PropTypes.string.isRequired,
    episodes: PropTypes.number.isRequired,
    explicit_genres: PropTypes.array.isRequired,
    favorites: PropTypes.number.isRequired,
    genres: PropTypes.array.isRequired,
    images: PropTypes.shape({
      jpg: PropTypes.object.isRequired,
      webp: PropTypes.object.isRequired,
    }).isRequired,
    licensors: PropTypes.array.isRequired,
    mal_id: PropTypes.number.isRequired,
    members: PropTypes.number.isRequired,
    popularity: PropTypes.number.isRequired,
    producers: PropTypes.array.isRequired,
    rank: PropTypes.number.isRequired,
    rating: PropTypes.string.isRequired,
    score: PropTypes.number.isRequired,
    scored_by: PropTypes.number.isRequired,
    season: PropTypes.string.isRequired,
    source: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    studios: PropTypes.array.isRequired,
    synopsis: PropTypes.string.isRequired,
    themes: PropTypes.array.isRequired,
    title: PropTypes.string.isRequired,
    title_english: PropTypes.string.isRequired,
    title_japanese: PropTypes.string.isRequired,
    title_synonyms: PropTypes.array.isRequired,
    trailer: PropTypes.shape({
      youtube_id: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
      embed_url: PropTypes.string.isRequired,
      images: PropTypes.object.isRequired,
    }).isRequired,
    type: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    year: PropTypes.number.isRequired,
  }).isRequired,
};
