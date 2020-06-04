import axios from "axios";

import Thumbnail from "../..//components/Thumbnail/Thumbnail";

const CountrySchedule = ({ shows }) => {
  const renderShows = () => {
    return shows
      .filter((showItem) => showItem.show.image && showItem.show.image.medium)
      .map((showItem, index) => {
        const { show } = showItem;
        return (
          <li key={index}>
            <Thumbnail imageUrl={show.image.medium} caption={show.name} />
          </li>
        );
      });
  };
  return (
    <>
      <h1>This is a country trest!</h1>
      {renderShows()}
    </>
  );
};

CountrySchedule.getInitialProps = async (context) => {
  const { country } = context.query || "us";
  const { data } = await axios.get(
    `http://api.tvmaze.com/schedule?country=${country}&date=2014-12-01`
  );

  return { shows: data };
};

export default CountrySchedule;
