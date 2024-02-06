/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react'
import { LoadingSpinner } from './LoadingSpinner';
import Card from './Card';
import { useFetch } from '../hooks/useFetch';

const SpecialRatesSection = () => {
  // State variables for the filters
  const [containerSize, setContainerSize] = useState("20FT");
  const [containerType, setContainerType] = useState("dry");
  const [carrierName, setCarrierName] = useState(""); // The selected carrier name

  // State variables for the pagination
  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(9);
  const [allRates, setAllRates] = useState([]); // State to hold all fetched rates

  // The API url with the query parameters
  const url = `https://test-api.oneport365.com/api/live_rates/get_special_rates_no_auth?container_size=${containerSize}&container_type=${containerType}&page=${page}`;

  // Fetch the data from the API using the custom hook
  const { data, error, loading } = useFetch(url);

  // Update allRates when new data is fetched
  useEffect(() => {
    if (data && data.data && data.data.rates) {
      setAllRates(prevRates => [...prevRates, ...data.data.rates]);
    }
  }, [data]);

  // Get the items for the current page
  const currentPageData = allRates
    .filter((rate) => {
      // Filter by the carrier name if it is not empty
      return carrierName ? rate.carrier_name === carrierName : true;
    })
    .slice(0, page * itemsPerPage);

  // Get the list of unique carrier names from the data array
  const carrierNames = [...new Set(allRates.map((rate) => rate.carrier_name))];

  // Handle the change of the filters
  const handleSizeChange = (e) => {
    setContainerSize(e.target.value);
  };

  const handleTypeChange = (e) => {
    setContainerType(e.target.value);
  };

  const handleCarrierChange = (e) => {
    setCarrierName(e.target.value);
  };

  // Pagination button click handler
  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-gray-800">Special Rates</h1>
      <form className="mt-4 flex items-center space-x-4 flex-wrap md:flex-nowrap">
        <label htmlFor="size" className="text-gray-600">
          Container Size
        </label>
        <select
          id="size"
          value={containerSize}
          onChange={handleSizeChange}
          className="border border-gray-300 rounded-lg px-2 py-1"
        >
          <option value="20FT">20FT</option>
          <option value="40FT">40FT</option>
        </select>
        <label htmlFor="type" className="text-gray-600">
          Container Type
        </label>
        <select
          id="type"
          value={containerType}
          onChange={handleTypeChange}
          className="border border-gray-300 rounded-lg px-2 py-1"
        >
          <option value="dry">Dry</option>
          <option value="reefer">Reefer</option>
        </select>
        <label htmlFor="carrier" className="text-gray-600">
          Carrier Name
        </label>
        <select
          id="carrier"
          value={carrierName}
          onChange={handleCarrierChange}
          className="border border-gray-300 rounded-lg px-2 py-1"
        >
          <option value="">All</option>
          {carrierNames.map((name, index) => (
            <option key={index} value={name}>
              {name}
            </option>
          ))}
        </select>
      </form>
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {loading && <LoadingSpinner />}
        {error && <p>{error.message}</p>}
        {currentPageData.map((rate, index) => (
          <Card key={index} rate={rate} />
        ))}
      </div>
      <div className="mt-4 flex justify-center">
        <button
          onClick={handleLoadMore}
          disabled={loading || (data && allRates.length >= data.data.total_count)}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg"
        >
          {loading ? <LoadingSpinner /> : 'Load more'}
        </button>
      </div>
    </div>
  );
}

export default SpecialRatesSection