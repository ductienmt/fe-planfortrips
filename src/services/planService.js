import { GoogleGenerativeAI } from "@google/generative-ai";
// import { PlanServiceApi } from "./apis/PlanServiceApi";

const apiKey = "AIzaSyC--UPHZ3h05O7JyeDsA-MtAFCbN9YjVkI";
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

export const generateTripPlan = async (data) => {
  // const tripData = await PlanServiceApi.getData();
  const chatSession = model.startChat({
    generationConfig,
    history: [
      {
        role: "user",
        parts: [
          {
            text: 'bạn dựa vào dữ liệu tôi cung cấp chọn ra kế hoạch tốt nhất, userData chứa dữ liệu của người dùng để ý số người trong chuyến đi để tính toán phù hợp, nếu từ 2 người trơẻ lên hãy tính toán vé xe, tại vé xe tôi cung cấp chỉ là 1 vé 1 người, tính toán thêm vé tham quan ở các nơi check in dựa vào số người,  các dữ liệu khác là tôi cung cấp, nếu là hotel trả về luôn phòng và id, nam, price phòng đó, trả về cho tôi theo định dạng json, không thêm bất cứ điều gì khác. Trả về theo cú pháp, userData, transportation(departure, return), accomodation(nameHotel, hotelId, price_per_night, total, nameRoom, checkin, checkout, roomType, roomId), checkins(dựa vào những nơi tôi cung cấp, ít nhất 5 nơi), estimatedCost, itinerary(trả theo ngày, day1, day2,... đi đâu vào ngày làm gì,...)\n\nuser_info: {\n    current_location: "Hồ Chí Minh",\n    destination: "Đà Lạt",\n    departure_date: "2024-10-12",\n    return_date: "2024-10-14",\n    number_of_people: 2,\n    budget: 3000000,\n  },\n  transportation_options: [\n"departure": [\n                {\n                    "routeId": "R001",\n                    "code": "V001",\n price: 250000,\n                    "carCompanyName": "Công ty Xe Khách A",\n                    "carCompanyRating": 4.5,\n                    "countSeatsEmpty": 3,\n                    "departureTime": "2024-10-12T14:00:00",\n                    "arrivalTime": "2024-10-12T20:00:00",\n                    "id": 1\n                },\n{\n      id: 2,\n      price: 250000,\n      departure_location: "Đà Lạt",\n      arrival_location: "Hồ Chí Minh",\n      departure_time: "2024-10-12T14:00:00",\n      arrival_time: "2024-10-12T20:00:00",\n    },\n            ],\n    {\n\n    "return": [\n                {\n                    "routeId": "R004",\n                    "code": "V001",\n price: 250000,\n                    "carCompanyName": "Công ty Xe Khách A",\n                    "carCompanyRating": 4.5,\n                    "countSeatsEmpty": 3,\n                    "departureTime": "2024-10-14T15:00:00",\n                    "arrivalTime": "2024-10-14T21:00:00",\n                    "id": 4\n                },\n {\n      id: 3,\n      price: 280000,\n      departure_location: "Đà Lạt",\n      arrival_location: "Hồ Chí Minh",\n      departure_time: "2024-10-14T15:00:00",\n      arrival_time: "2024-10-14T21:00:00",\n    },\n            ]\n   \n    \n\n  ],\n "hotels": {\n            "Beachside Inn": {\n                "hotelPhonenumber": "098-765-4321",\n                "hotelImages": [],\n                "rating": 3,\n                "hotelAddress": "456 Elm St, Townsville",\n                "hotelId": 3,\n                "hotelName": "Beachside Inn",\n                "roomAvailable": [\n                    {\n                        "price": 100.00,\n                        "availability": true,\n                        "roomId": 3,\n                        "roomName": "Standard City View",\n                        "roomType": "Standard"\n                    }\n                ]\n            },\n            "Moon": {\n                "hotelPhonenumber": "0456123789",\n                "hotelImages": [],\n                "rating": 5,\n                "hotelAddress": "a",\n                "hotelId": 1,\n                "hotelName": "Moon",\n                "roomAvailable": [\n                    {\n                        "price": 200.00,\n                        "availability": true,\n                        "roomId": 1,\n                        "roomName": "Hoa",\n                        "roomType": "Standard"\n                    }\n                ]\n            },\n            "Khách Sạn A": {\n                "hotelPhonenumber": "0901234567",\n                "hotelImages": [],\n                "rating": 5,\n                "hotelAddress": "123 Đường ABC, Quận 1, TP.HCM",\n                "hotelId": 4,\n                "hotelName": "Khách Sạn A",\n                "roomAvailable": [\n                    {\n                        "price": 200.00,\n                        "availability": true,\n                        "roomId": 7,\n                        "roomName": "Phòng B1",\n                        "roomType": "Deluxe"\n                    }\n                ]\n            },\n            "City Center Hotel": {\n                "hotelPhonenumber": "123-456-7890",\n                "hotelImages": [],\n                "rating": 4,\n                "hotelAddress": "123 Main St, Cityville",\n                "hotelId": 2,\n                "hotelName": "City Center Hotel",\n                "roomAvailable": [\n                    {\n                        "price": 150.00,\n                        "availability": true,\n                        "roomId": 2,\n                        "roomName": "Deluxe Ocean View",\n                        "roomType": "Deluxe"\n                    }\n                ]\n            },\n            "Khách Sạn B": {\n                "hotelPhonenumber": "0907654321",\n                "hotelImages": [],\n                "rating": 3,\n                "hotelAddress": "456 Đường DEF, Quận 2, TP.HCM",\n                "hotelId": 5,\n                "hotelName": "Khách Sạn B",\n                "roomAvailable": [\n                    {\n                        "price": 80.00,\n                        "availability": true,\n                        "roomId": 8,\n                        "roomName": "Phòng A2",\n                        "roomType": "Standard"\n                    }\n                ]\n            }\n        },\n  checkin_point_options: [\n    {\n      id: 1,\n      name: "Thung lũng Tình Yêu",\n      price: 40000,\n    },\n    {\n      id: 2,\n      name: "Hồ Xuân Hương",\n      price: 20000,\n    },\n    {\n      id: 3,\n      name: "Chùa Linh Phước",\n      price: 50000,\n    },\n    {\n      id: 4,\n      name: "Đồi Mộng Mơ",\n      price: 30000,\n    },\n    {\n      id: 5,\n      name: "Vườn hoa Thành phố Đà Lạt",\n      price: 30000,\n    },\n    {\n      id: 6,\n      name: "Ga Đà Lạt",\n      price: 20000,\n    },\n  ],',
          },
        ],
      },
      {
        role: "model",
        parts: [
          {
            text: '```json\n{\n"userData": {\n"current_location": "Hồ Chí Minh",\n"destination": "Đà Lạt",\n"departure_date": "2024-10-12",\n"return_date": "2024-10-14",\n"number_of_people": 2,\n"budget": 3000000\n},\n"transportation": {\n"departure": {\n"routeId": "R001",\n"code": "V001",\n"price": 250000,\n"carCompanyName": "Công ty Xe Khách A",\n"carCompanyRating": 4.5,\n"countSeatsEmpty": 3,\n"departureTime": "2024-10-12T14:00:00",\n"arrivalTime": "2024-10-12T20:00:00",\n"id": 1\n},\n"return": {\n"routeId": "R004",\n"code": "V001",\n"price": 250000,\n"carCompanyName": "Công ty Xe Khách A",\n"carCompanyRating": 4.5,\n"countSeatsEmpty": 3,\n"departureTime": "2024-10-14T15:00:00",\n"arrivalTime": "2024-10-14T21:00:00",\n"id": 4\n}\n},\n"accomodation": {\n"nameHotel": "Moon",\n"hotelId": 1,\n"price_per_night": 200,\n"total": 400,\n"nameRoom": "Hoa",\n"checkin": "2024-10-12",\n"checkout": "2024-10-14",\n"roomType": "Standard",\n"roomId": 1\n},\n"checkins": [\n{\n"id": 1,\n"name": "Thung lũng Tình Yêu",\n"price": 40000\n},\n{\n"id": 2,\n"name": "Hồ Xuân Hương",\n"price": 20000\n},\n{\n"id": 3,\n"name": "Chùa Linh Phước",\n"price": 50000\n},\n{\n"id": 4,\n"name": "Đồi Mộng Mơ",\n"price": 30000\n},\n{\n"id": 5,\n"name": "Vườn hoa Thành phố Đà Lạt",\n"price": 30000\n}\n],\n"estimatedCost": 1170000,\n"itinerary": {\n"day1": "2024-10-12: Di chuyển từ Hồ Chí Minh đến Đà Lạt bằng xe khách. Nhận phòng tại khách sạn Moon. Buổi chiều tham quan Thung lũng Tình Yêu, Hồ Xuân Hương và Chùa Linh Phước.",\n"day2": "2024-10-13: Tham quan Đồi Mộng Mơ và Vườn hoa Thành phố Đà Lạt.",\n"day3": "2024-10-14: Di chuyển từ Đà Lạt về Hồ Chí Minh bằng xe khách."\n}\n}\n```',
          },
        ],
      },
      {
        role: "user",
        parts: [
          {
            text: "vé xe 1 vé là 250000 vậy 2 vé có phải là 500000 không, sao bạn không cộng vào\n ",
          },
        ],
      },
      {
        role: "model",
        parts: [
          {
            text: 'Bạn hoàn toàn đúng! Tôi xin lỗi vì lỗi này. Tôi đã quên tính giá vé cho hai người. \n\nHãy thử lại với dữ liệu được cập nhật, tôi đã sửa lại và tính toán giá vé cho 2 người:\n\n```json\n{\n"userData": {\n"current_location": "Hồ Chí Minh",\n"destination": "Đà Lạt",\n"departure_date": "2024-10-12",\n"return_date": "2024-10-14",\n"number_of_people": 2,\n"budget": 3000000\n},\n"transportation": {\n"departure": {\n"routeId": "R001",\n"code": "V001",\n"price": 500000, // Giá vé đã được nhân đôi cho 2 người\n"carCompanyName": "Công ty Xe Khách A",\n"carCompanyRating": 4.5,\n"countSeatsEmpty": 3,\n"departureTime": "2024-10-12T14:00:00",\n"arrivalTime": "2024-10-12T20:00:00",\n"id": 1\n},\n"return": {\n"routeId": "R004",\n"code": "V001",\n"price": 500000, // Giá vé đã được nhân đôi cho 2 người\n"carCompanyName": "Công ty Xe Khách A",\n"carCompanyRating": 4.5,\n"countSeatsEmpty": 3,\n"departureTime": "2024-10-14T15:00:00",\n"arrivalTime": "2024-10-14T21:00:00",\n"id": 4\n}\n},\n"accomodation": {\n"nameHotel": "Moon",\n"hotelId": 1,\n"price_per_night": 200,\n"total": 400,\n"nameRoom": "Hoa",\n"checkin": "2024-10-12",\n"checkout": "2024-10-14",\n"roomType": "Standard",\n"roomId": 1\n},\n"checkins": [\n{\n"id": 1,\n"name": "Thung lũng Tình Yêu",\n"price": 80000 // Giá vé đã được nhân đôi cho 2 người\n},\n{\n"id": 2,\n"name": "Hồ Xuân Hương",\n"price": 40000 // Giá vé đã được nhân đôi cho 2 người\n},\n{\n"id": 3,\n"name": "Chùa Linh Phước",\n"price": 100000 // Giá vé đã được nhân đôi cho 2 người\n},\n{\n"id": 4,\n"name": "Đồi Mộng Mơ",\n"price": 60000 // Giá vé đã được nhân đôi cho 2 người\n},\n{\n"id": 5,\n"name": "Vườn hoa Thành phố Đà Lạt",\n"price": 60000 // Giá vé đã được nhân đôi cho 2 người\n}\n],\n"estimatedCost": 1740000,\n"itinerary": {\n"day1": "2024-10-12: Di chuyển từ Hồ Chí Minh đến Đà Lạt bằng xe khách. Nhận phòng tại khách sạn Moon. Buổi chiều tham quan Thung lũng Tình Yêu, Hồ Xuân Hương và Chùa Linh Phước.",\n"day2": "2024-10-13: Tham quan Đồi Mộng Mơ và Vườn hoa Thành phố Đà Lạt.",\n"day3": "2024-10-14: Di chuyển từ Đà Lạt về Hồ Chí Minh bằng xe khách."\n}\n}\n```\n\nBây giờ giá vé đã được tính toán chính xác cho 2 người. Xin lỗi vì sự bất tiện này! \n',
          },
        ],
      },
      {
        role: "user",
        parts: [{ text: "bạn hãy để ý số người nhiều hơn nhé\n" }],
      },
      {
        role: "model",
        parts: [
          {
            text: "Bạn hoàn toàn đúng! Tôi sẽ nhớ điều này và tính toán giá cho tất cả các dịch vụ dựa trên số lượng người trong chuyến đi. \n\nCảm ơn bạn đã nhắc nhở tôi về lỗi này. Tôi sẽ cố gắng hết sức để trở thành một trợ lý thông minh hơn trong tương lai! \n",
          },
        ],
      },
    ],
  });

  try {
    const result = await chatSession.sendMessage(
      `bạn dựa vào dữ liệu tôi cung cấp chọn ra kế hoạch tốt nhất, userData chứa dữ liệu của người dùng để ý số người trong chuyến đi để tính toán phù hợp, nếu từ 2 người trơẻ lên hãy tính toán vé xe, tại vé xe tôi cung cấp chỉ là 1 vé 1 người, tính toán thêm vé tham quan ở các nơi check in dựa vào số người,  các dữ liệu khác là tôi cung cấp, nếu là hotel trả về luôn phòng và id, nam, price phòng đó, trả về cho tôi theo định dạng json, không thêm bất cứ điều gì khác. Trả về theo cú pháp, userData, transportation(departure, return), accomodation(nameHotel, hotelId, price_per_night, total, nameRoom, checkin, checkout, roomType, roomId), checkins(dựa vào những nơi tôi cung cấp, ít nhất 5 nơi), estimatedCost, itinerary(trả theo ngày, day1, day2,... đi đâu vào ngày làm gì,...), để ý số người mà tính toán cho đúng\n\n${JSON.stringify(
        data
      )}`
    );
    // console.log(result.response.text());
    let cleanedResponse = result.response
      .text()
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .replace(/\/\/.*$/gm, "")
      .replace(/\*.*$/gm, "")
      .trim();
    const lastCurlyBraceIndex = cleanedResponse.lastIndexOf("}");
    if (lastCurlyBraceIndex !== -1) {
      cleanedResponse = cleanedResponse.slice(0, lastCurlyBraceIndex + 1);
    }
    console.log(cleanedResponse);
    console.log(JSON.parse(cleanedResponse));
    return JSON.parse(cleanedResponse);
  } catch (error) {
    console.error("An error occurred while sending the message:", error);
    // throw new Error("Failed to generate trip plan");
  }
};

const testData = {
  user_info: {
    current_location: "Hồ Chí Minh",
    destination: "Đà Lạt",
    departure_date: "2024-10-12",
    return_date: "2024-10-14",
    number_of_people: 2,
    budget: 3000000,
  },
  transportation_options: [
    {
      id: 1,
      price: 250000,
      departure_location: "Hồ Chí Minh",
      arrival_location: "Đà Lạt",
      departure_time: "2024-10-12T06:00:00",
      arrival_time: "2024-10-12T12:00:00",
    },
    {
      id: 2,
      price: 250000,
      departure_location: "Đà Lạt",
      arrival_location: "Hồ Chí Minh",
      departure_time: "2024-10-14T14:00:00",
      arrival_time: "2024-10-14T20:00:00",
    },
    {
      id: 3,
      price: 280000,
      departure_location: "Đà Lạt",
      arrival_location: "Hồ Chí Minh",
      departure_time: "2024-10-14T15:00:00",
      arrival_time: "2024-10-14T21:00:00",
    },
    {
      id: 4,
      price: 290000,
      departure_location: "Hồ Chí Minh",
      arrival_location: "Đà Lạt",
      departure_time: "2024-10-12T09:00:00",
      arrival_time: "2024-10-12T15:00:00",
    },
  ],
  hotel_options: [
    {
      id: 1,
      name: "Khách sạn Sunshine",
      price_per_night: 800000,
      total_price: 1600000,
      check_in_date: "2024-10-12",
      check_out_date: "2024-10-14",
    },
    {
      id: 2,
      name: "Homestay Dalat",
      price_per_night: 600000,
      total_price: 1200000,
      check_in_date: "2024-10-12",
      check_out_date: "2024-10-14",
    },
  ],
  checkin_point_options: [
    {
      id: 1,
      name: "Thung lũng Tình Yêu",
      price: 40000,
    },
    {
      id: 2,
      name: "Hồ Xuân Hương",
      price: 20000,
    },
    {
      id: 3,
      name: "Chùa Linh Phước",
      price: 50000,
    },
    {
      id: 4,
      name: "Đồi Mộng Mơ",
      price: 30000,
    },
    {
      id: 5,
      name: "Vườn hoa Thành phố Đà Lạt",
      price: 30000,
    },
    {
      id: 6,
      name: "Ga Đà Lạt",
      price: 20000,
    },
  ],
};
