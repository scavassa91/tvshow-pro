import axios from "axios";

import Thumbnail from "../../components/Thumbnail/Thumbnail";
import Header from "../../components/Header/Header";

const CountrySchedule = ({ shows, country }) => {
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
  const { country } = context.query || "us";
  const { data } = await axios.get(
    `https://api.tvmaze.com/schedule?country=${country}&date=2014-12-01`
  );

  return { shows: data, country };
};

export default CountrySchedule;
