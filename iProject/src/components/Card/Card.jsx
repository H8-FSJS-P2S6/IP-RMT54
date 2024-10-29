import { useEffect, useState } from 'react';
import axios from 'axios';

const AnimeCard = () => {
  const [anime, setAnime] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAnime = async () => {
      try {
        const  response  = await axios.get('https://api.jikan.moe/v4/anime');
        setAnime(response.data.data);
        console.log( response.data.data )
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAnime();
  }, []);

  if (loading) return <div className="text-center">Loading...</div>;
  if (error) return <div className="text-red-500 text-center">Error: {error.message}</div>;

  return (
    
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {anime.map((anime) => (
        <div key={anime.id} className="max-w-sm mx-auto bg-white rounded-lg shadow-md overflow-hidden">
          <img className="w-full h-48 object-cover" src={anime.images.jpg.image_url} alt={anime.title} /> {/* Ukuran fix */}
          <div className="p-4">
            <h2 className="text-xl font-bold mb-2">{anime.title}</h2>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AnimeCard;
