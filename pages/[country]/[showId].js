import axios from "axios";
import parse from "html-react-parser";
import CustomError from "../_error";

import Cast from "../../components/Cast/Cast";

const ShowDetails = ({ show = {}, statusCode }) => {
  const { name, image, summary, _embedded } = show;

  if (statusCode) {
    return <CustomError statusCode={statusCode} />;
  }

  return (
    <div className="show-details">
      <div className="show-details__poster"></div>
      <h1>{name}</h1>
      {parse(summary)}

      {_embedded.cast.length > 0 && <Cast cast={_embedded.cast} />}

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
  try {
    const { data } = await axios.get(
      `https://api.tvmaze.com/shows/${query.showId}?embed=cast`
    );
    return { show: data };
  } catch (err) {
    return {
      statusCode: err.response ? err.response.status : 500,
    };
  }
};

export default ShowDetails;
