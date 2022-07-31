// import { useRef } from "react";

const WatchList = ({
  watchlist,
  watchedlist,
  addToWatchedlist,
  deleteToWatchedlist,
  deleteWatchlists,
  setToggleWatchlist,
}) => {
  // const titleRef = useRef(null);
  return (
    <div className="watchlist__container">
      <div className="watchlist__clear__div">
        <button onClick={deleteWatchlists} className="watchlist__clear__btn">
          Clear All
        </button>
        <div className="watchlist__toggle__div">
          <button
            className="watchlist__toggle__btn"
            onClick={() => setToggleWatchlist(false)}
          >
            X
          </button>
        </div>
      </div>
      <h3>A Voir</h3>
      {watchlist.map(({ id, title }) => (
        <div className="watchlist__div" key={id}>
          <input
            className="watchlist__checkbox"
            type="checkbox"
            onClick={() => {
              setTimeout(() => {
                addToWatchedlist({ id, title });
              }, 1000);
            }}
          />
          <p>{title}</p>
        </div>
      ))}
      <h3>Vu</h3>
      {watchedlist.map(({ id, title }) => (
        <div className="watchedlist__div" key={id}>
          <input
            className="watchedlist__checkbox"
            type="checkbox"
            onClick={(e) => deleteToWatchedlist(e, id)}
          />
          <p>{title}</p> {/*ref={titleRef}*/}
        </div>
      ))}
    </div>
  );
};

export default WatchList;
