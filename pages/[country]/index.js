import axios from "axios";

import Thumbnail from "../../components/Thumbnail/Thumbnail";

import TvShowsStyles from "./styles";

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
    <ul className="tvshows-grid">
      {renderShows()}
      <style jsx>{TvShowsStyles}</style>
    </ul>
  );
};

CountrySchedule.getInitialProps = async (context) => {
  const { country } = context.query || "us";
  const { data } = await axios.get(
    `http://api.tvmaze.com/schedule?country=${country}&date=2014-12-01`
  );

  return { shows: data, country };
};

export default CountrySchedule;
