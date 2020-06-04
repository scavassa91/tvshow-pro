import ThumbnailStyles from "./styles";

const Thumbnail = ({ imageUrl, caption }) => {
  return (
    <div className="thumbnail">
      <img className="thumbnail__image" src={imageUrl} />
      <h4 className="thumbnail__caption">{caption}</h4>

      <style jsx>{ThumbnailStyles}</style>
    </div>
  );
};

export default Thumbnail;
