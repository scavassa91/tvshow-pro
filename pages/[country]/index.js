import axios from "axios";
import cookies from "nookies";

import CustomError from "../_error";
import Thumbnail from "../../components/Thumbnail/Thumbnail";
import { withAuthorization } from "../../utils/withAuthorization";

const CountrySchedule = ({ shows = [], country = "us", statusCode }) => {
  if (statusCode) {
    return <CustomError statusCode={statusCode} />;
  }
  const renderShows = () => {
    return shows.map((showItem, index) => {
      const { show } = showItem;
      return (
        <li key={index}>
          <Thumbnail
            imageUrl={(show.image && show.image.medium) || undefined}
            caption={show.name}
            href="/[country]/[showId]"
            as={`/${country}/${show.id}`}
          />
        </li>
      );
    });
  };
  return (
    <div className="home">
      <ul className="tvshows-grid">
        {renderShows()}
        <style jsx>{`
          .tvshows-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 20px;
          }
        `}</style>
      </ul>
    </div>
  );
};

CountrySchedule.getInitialProps = async (context) => {
  const { defaultCountry } = cookies.get(context);
  const country = context.query.country || defaultCountry || "us";

  try {
    const { data } = await axios.get(
      `https://api.tvmaze.com/schedule?country=${country}&date=2014-12-01`
    );
    return { shows: data, country };
  } catch (err) {
    return {
      statusCode: err.response ? err.response.status : 500,
    };
  }
};

export default CountrySchedule;
