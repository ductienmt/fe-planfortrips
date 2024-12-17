import React from "react";
import "./YourTripQuery.css";
import { PlanServiceApi } from "../../../../services/apis/PlanServiceApi";
import TripCompo from "../TripCompo/TripCompo";

const YourTripsQuery = () => {
  const [trips, setTrips] = React.useState([]);

  const loadYourTripsQuery = async () => {
    try {
      const res = await PlanServiceApi.getPlanByUserId();
      setTrips(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  React.useEffect(() => {
    loadYourTripsQuery();
  }, []);
  return (
    <>
      {trips.length > 0 &&
        trips.map((trip, index) => (
          <TripCompo key={trip.id || index} trip={trip} />
        ))}
    </>
  );
};

export default YourTripsQuery;
