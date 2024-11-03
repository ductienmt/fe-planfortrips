export const cleanedResponse = (response) => {
  try {
    // Parse the JSON if necessary
    const parsedResponse =
      typeof response === "string" ? JSON.parse(response) : response;

    const {
      userData: {
        current_location,
        destination,
        departure_date,
        return_date,
        number_of_people,
        budget,
      },
      transportation,
      hotels,
      checkins,
      estimatedCost,
      itinerary,
    } = parsedResponse;

    // Calculate total transportation costs for both departure and return
    const totalTransportCost = Object.values(transportation).reduce(
      (total, trips) => {
        return (
          total +
          trips.reduce((sum, trip) => sum + trip.price * number_of_people, 0)
        );
      },
      0
    );

    // Prepare hotel data (assuming you need the first available room)
    const availableHotels = Object.values(hotels)
      .map((hotel) => ({
        name: hotel.hotelName,
        id: hotel.hotelId,
        price_per_night: hotel.roomAvailable[0].price,
        roomType: hotel.roomAvailable[0].roomType,
        available: hotel.roomAvailable.some((room) => room.availability),
      }))
      .filter((hotel) => hotel.available);

    // Prepare check-in points
    const checkinDetails = checkins.map((checkin) => ({
      id: checkin.id,
      name: checkin.name,
      price: checkin.price,
    }));

    return {
      userData: {
        current_location,
        destination,
        departure_date,
        return_date,
        number_of_people,
        budget,
      },
      transportation: {
        departure: transportation.departure,
        return: transportation.return,
        total_cost: totalTransportCost,
      },
      accommodation: availableHotels,
      checkins: checkinDetails,
      estimatedCost,
      itinerary,
    };
  } catch (error) {
    console.error("Error cleaning response:", error);
    return null; // Or handle the error as necessary
  }
};
