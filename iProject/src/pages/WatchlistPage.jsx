import { useEffect, useState } from "react";
import animeAPI from "../api/AnimeApi";
import CardAnime from "../components/Card/Card";
import Swal from "sweetalert2";
import serverAPI from "../api/ServerApi"; 

export default function WatchlistPage() {
  const [watchlist, setWatchlist] = useState([]);
  const [userId, setUserId] = useState(1); 
  const [loading, setLoading] = useState(true);

  const fetchWatchlist = async () => {
    try {
      const response = await serverAPI.get(`/watchlist/user/${userId}`); 
      setWatchlist(response.data);
    } catch (err) {
      console.log("🚀 ~ fetchWatchlist ~ err:", err);
      Swal.fire(err.response.data.message || "Failed to fetch watchlist");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWatchlist();
  }, [userId]);

  return (
    <section>
      {loading ? (
        <div className="d-flex justify-content-center py-5">
          <h2>Loading...</h2>
        </div>
      ) : (
        <div className="d-flex justify-content-center py-5 flex-wrap gap-5 w-50%">
          {watchlist.length > 0 ? (
            watchlist.map((item) => (
              <CardAnime key={item.id} anime={{ mal_id: item.mal_id }} fetchAnimes={fetchWatchlist} />
            ))
          ) : (
            <h3>Tidak ada anime dalam watchlist.</h3>
          )}
        </div>
      )}
    </section>
  );
}
