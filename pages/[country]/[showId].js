import axios from "axios";
import parse from "html-react-parser";

import Cast from "../../components/Cast/Cast";

const ShowDetails = ({ show }) => {
  const { name, image, summary, _embedded } = show;
  return (
    <div className="show-details">
      <div className="show-details__poster"></div>
      <h1>{name}</h1>
      {parse(summary)}

      <Cast cast={_embedded.cast} />

      <style jsx>{`
        .show-details__poster {
          background-image: url(${image.original});
          height: 200px;
          background-size: cover;
        }
      `}</style>
    </div>
  );
};

ShowDetails.getInitialProps = async ({ query }) => {
  const { data } = await axios.get(
    `http://api.tvmaze.com/shows/${query.showId}?embed=cast`
  );
  return { show: data };
};

export default ShowDetails;
