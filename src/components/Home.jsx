import React, { useState, useEffect, useRef } from "react";
import Navbar from "./Navbar";
import MediaCard from "./MediaCard";
import WatchList from "./WatchList";

const Home = () => {
  const [popularMovies, setPopularMovies] = useState([]);
  const [popularSeries, setPopularSeries] = useState([]);
  const [watchlist, setWatchlist] = useState([]);
  const [watchedlist, setWatchedlist] = useState([]);
  const [toggleWatchlist, setToggleWatchlist] = useState(false);
  const titleRef = useRef(null);

  const addToWatchlist = (media) => {
    const { id, title } = media;
    setWatchlist((prevList) => {
      if (prevList.some((e) => e.title === title)) return prevList;

      return [...prevList, { id, title }];
    });
  };

  const deleteToWatchlist = (id) => {
    setWatchlist((prevList) => {
      if (!prevList.some((e) => e.id === id)) {
        return prevList;
      }

      const newList = prevList.filter((list) => {
        return list.id !== id;
      });
      return newList;
    });
  };

  const addToWatchedlist = (media) => {
    const { id, title } = media;
    setWatchedlist((prevList) => {
      if (prevList.some((e) => e.title === title)) return prevList;

      return [...prevList, { id, title }];
    });
    deleteToWatchlist(id);
  };

  const deleteToWatchedlist = (media) => {
    const { id, titleRef } = media;

    console.log(titleRef.current);
    titleRef.current.classList.add("deleted");
    setTimeout(() => {
      setWatchedlist((prevList) => {
        if (!prevList.some((e) => e.id === id)) {
          return prevList;
        }

        const newList = prevList.filter((list) => {
          return list.id !== id;
        });
        return newList;
      });
    }, 1000);
  };

  const deleteWatchlists = () => {
    setTimeout(() => {
      setWatchlist([]);
      setWatchedlist([]);
    }, 1000);
  };

  const url_movies = `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_API_KEY}`;

  const url_series = `https://api.themoviedb.org/3/tv/popular?api_key=${process.env.REACT_APP_API_KEY}`;

  const fetchPopularMovies = async () => {
    const res = await fetch(url_movies);
    const movies = (await res.json()).results;
    setPopularMovies(
      movies.map((movie) => {
        return {
          id: movie.id,
          title: movie.original_title,
          date: movie.release_date,
          posterPath: movie.poster_path,
        };
      })
    );
  };

  const fetchPopularSeries = async () => {
    const res = await fetch(url_series);
    const series = (await res.json()).results;

    setPopularSeries(
      series.map((serie) => {
        return {
          id: serie.id,
          title: serie.original_name,
          date: serie.first_air_date,
          posterPath: serie.poster_path,
        };
      })
    );
  };

  useEffect(() => {
    fetchPopularMovies();
    fetchPopularSeries();
  }, []);

  return (
    <div>
      <Navbar setToggleWatchlist={setToggleWatchlist} />
      <div className="container">
        <main>
          <section>
            <h2>Derniers films populaires</h2>
            <div className="movies__list">
              {popularMovies.map((movie) => (
                <MediaCard
                  key={movie.id}
                  media={movie}
                  addToWatchlist={addToWatchlist}
                />
              ))}
            </div>
          </section>
          <section>
            <h2>Dernières séries populaires</h2>
            <div className="series__list">
              {popularSeries.map((serie) => (
                <MediaCard
                  key={serie.id}
                  media={serie}
                  addToWatchlist={addToWatchlist}
                />
              ))}
            </div>
          </section>
        </main>
        {toggleWatchlist && (
          <WatchList
            watchlist={watchlist}
            watchedlist={watchedlist}
            addToWatchedlist={addToWatchedlist}
            deleteToWatchedlist={deleteToWatchedlist}
            deleteWatchlists={deleteWatchlists}
            setToggleWatchlist={setToggleWatchlist}
            titleRef={titleRef}
          />
        )}
      </div>
    </div>
  );
};

export default Home;
