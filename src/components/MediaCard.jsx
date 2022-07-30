const MediaCard = ({ media, addToWatchlist }) => {
  const { id, title, date, posterPath } = media;

  return (
    <div className="hover__background">
      <div className="media__card">
        <img
          className="media__img"
          src={`https://image.tmdb.org/t/p/w500${posterPath}`}
          alt={`${title} poster`}
        ></img>
        <div className="media__infos">
          <h3>{title}</h3>
          <p>{date}</p>
        </div>
        <button
          className="watch__button"
          onClick={() => addToWatchlist({ id, title })}
        >
          A voir
        </button>
      </div>
    </div>
  );
};

export default MediaCard;
