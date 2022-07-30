import React, { useState, useEffect } from "react";

const Navbar = ({ setToggleWatchlist }) => {
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setDate(new Date());
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const date_string = date.toLocaleDateString();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  return (
    <header>
      <div className="hours">
        {date_string}, {hours}:{minutes}:{seconds}
      </div>
      <div className="watchlist__btn__div">
        <button
          className="watchlist__btn"
          onClick={() => setToggleWatchlist(true)}
        >
          WatchList
        </button>
      </div>
    </header>
  );
};

export default Navbar;
