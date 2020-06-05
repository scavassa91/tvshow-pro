import Thumbnail from "../Thumbnail/Thumbnail";

const Cast = ({ cast }) => {
  const renderCast = () => {
    return cast.map((castItem, index) => {
      const { name, image } = castItem.person;
      return (
        <li className="cast__list__item" key={index}>
          <Thumbnail
            imageUrl={(image && image.medium) || undefined}
            caption={name}
            small
          />
        </li>
      );
    });
  };

  return (
    <div className="cast">
      <h3>Cast</h3>
      <ul className="cast__list">{renderCast()}</ul>

      <style jsx>{`
        .cast__list {
          display: flex;
          overflow-x: auto;
        }
        .cast__list > :global(li) {
          margin-right: 10px;
        }
      `}</style>
    </div>
  );
};

export default Cast;
