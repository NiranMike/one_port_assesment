
import PropTypes from 'prop-types';

function Card({ rate }) {
  return (
    <div className="bg-white shadow-lg rounded-lg p-4 max-w-sm md:max-w-md lg:max-w-lg">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-gray-800">{rate.carrier_name}</h3>
        <img
          src={rate.carrier_image}
          alt={rate.carrier_name}
          className="h-10 w-10 rounded-[50%] object-cover"
        />
      </div>
      <div className="mt-2">
        <p className="text-gray-600">
          {rate.origin_port_code} — {rate.destination_port_code}
        </p>
        <p className="text-gray-600">
          Sailing Date: {rate.sailing_date ? rate.sailing_date : "Not Available"}
        </p>
        <p className="text-gray-600">Transit Time: {rate.transit_time} days</p>
        <p className="text-gray-600">
          Free Days: {rate.detention_days + rate.demurrage_days}
        </p>
      </div>
      <div className="mt-4 flex items-center justify-between">
        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg">
          Book Now
        </button>
        <span className="text-gray-800 font-bold text-xl">
          {rate?.total_amount_usd
            ? `$${rate.total_amount_usd.toLocaleString()}`
            : "Not available"}
        </span>
      </div>
    </div>
  );
}

Card.propTypes = {
  rate: PropTypes.shape({
    carrier_name: PropTypes.string.isRequired,
    carrier_image: PropTypes.string.isRequired,
    origin_port_code: PropTypes.string.isRequired,
    destination_port_code: PropTypes.string.isRequired,
    sailing_date: PropTypes.string,
    transit_time: PropTypes.number, // Remove `isRequired`
    detention_days: PropTypes.number.isRequired,
    demurrage_days: PropTypes.number.isRequired,
    total_amount_usd: PropTypes.number,
  }).isRequired,
};

export default Card