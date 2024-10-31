import { useEffect, useState } from "react";
import animeAPI from "../api/AnimeApi";
import CardAnime from "../components/Card/Card";

export default function HomePage() {
  const [anime, setAnime] = useState([]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const fetchAnimes = async () => {
    try {
      const response = await animeAPI.get("/anime");
      setAnime(response.data.data);
      console.log(response.data.data);
    } catch (err) {
      console.log("🚀 ~ fetchAnimes ~ err:", err);
    }
  };

  useEffect(() => {
    fetchAnimes();
  }, []);

  return (
    <section>
        <div className="d-flex justify-content-center py-5 flex-wrap gap-5">
            {anime.map((e) => {
              return (
                <CardAnime
                  key={e.id}
                  anime={e}
                  fetchAnimes={fetchAnimes}
                />
              );
            })}
      </div>
    </section>
  );
}
