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
      <div className="show-details__poster">
        <h1>{name}</h1>
      </div>
      {parse(summary)}

      {_embedded.cast.length > 0 && <Cast cast={_embedded.cast} />}

      <style jsx>{`
        .show-details__poster {
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          padding-bottom: 20px;
          background: linear-gradient(
              to bottom,
              rgba(0, 0, 0, 0),
              rgba(0, 0, 0, 0.5)
            ),
            url(${image.original});
          background-repeat: no-repeat;
          background-position: top center;
          background-size: cover;
          height: 60vh;
        }
        .show-details__poster > :global(h1) {
          color: #fcbe1e;
          line-height: 105%;
          margin-bottom: 0;
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
