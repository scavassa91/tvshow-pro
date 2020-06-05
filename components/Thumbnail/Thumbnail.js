import Link from "next/link";

import ThumbnailStyles from "./styles";

const Thumbnail = ({
  imageUrl = "https://via.placeholder.com/210x295?text=?",
  caption,
  href = "",
  as = "",
}) => {
  return (
    <div className="thumbnail">
      <Link href={href} as={as}>
        <a>
          <img className="thumbnail__image" src={imageUrl} />
          <h4 className="thumbnail__caption">{caption}</h4>
        </a>
      </Link>

      <style jsx>{ThumbnailStyles}</style>
    </div>
  );
};

export default Thumbnail;
