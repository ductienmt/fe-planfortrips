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
            text: 'bạn dựa vào đây chọn cho tôi 1 kế hoạch du lịch tốt nhất {\n    "userData": {\n        "currentLocation": "Hanoi",\n        "destination": "Danang",\n        "departureDate": "2024-10-15",\n        "returnDate": "2024-10-20",\n        "numberOfPeople": 4,\n        "budget": 5000.0\n    },\n    "busRoutes": [\n        {"id": "1", "departureLocation": "Hanoi", "arrivalLocation": "Danang", "price": 100.0, "departureDateTime": "2024-10-15T08:00:00"},\n        {"id": "2", "departureLocation": "Hanoi", "arrivalLocation": "Danang", "price": 120.0, "departureDateTime": "2024-10-15T10:00:00"}\n    ],\n    "hotels": [\n        {"id": "1", "name": "Hotel A", "roomPrice": 300.0},\n        {"id": "2", "name": "Hotel B", "roomPrice": 350.0}\n    ],\n    "checkIns": [\n        {"id": "1", "name": "Location A", "entranceFee": 50.0},\n        {"id": "2", "name": "Location B", "entranceFee": 70.0}\n    ]\n}\n',
          },
        ],
      },
      {
        role: "model",
        parts: [
          {
            text: "## Kế hoạch du lịch Đà Nẵng từ Hà Nội\n\nDựa vào thông tin bạn cung cấp, đây là một kế hoạch du lịch tối ưu cho 4 người, xuất phát từ Hà Nội đến Đà Nẵng từ ngày 15/10/2024 đến 20/10/2024 với ngân sách 5000.0:\n\n**Phương tiện di chuyển:**\n\n* **Xe khách:** Chọn chuyến xe khách **ID 1** với giá 100.0/người, xuất phát lúc 8:00 sáng ngày 15/10/2024 từ Hà Nội đến Đà Nẵng. \n\n**Lưu trú:**\n\n* **Khách sạn:** Chọn **Hotel A** với giá phòng 300.0/phòng/đêm.  Tổng chi phí cho 4 người, 5 đêm là 600.0 (300.0 x 2).\n\n**Lịch trình:**\n\n**Ngày 1 (15/10/2024):**\n\n* 8:00 sáng: Xuất phát từ Hà Nội bằng xe khách.\n* 15:00 chiều: Đến Đà Nẵng, nhận phòng tại **Hotel A**.\n* Tối: Tự do dạo chơi, thưởng thức ẩm thực đường phố Đà Nẵng.\n\n**Ngày 2 (16/10/2024):**\n\n* Sáng: Tham quan **Bãi biển Mỹ Khê**, tắm biển, nghỉ ngơi.\n* Chiều: Viếng **Chùa Linh Ứng**, ngắm toàn cảnh thành phố Đà Nẵng từ trên cao.\n* Tối: Thưởng thức ẩm thực Đà Nẵng tại các nhà hàng.\n\n**Ngày 3 (17/10/2024):**\n\n* Sáng: Khám phá **Bán đảo Sơn Trà**, chinh phục đỉnh núi Sơn Trà, ngắm cảnh đẹp thiên nhiên.\n* Chiều: Thư giãn tại **Công viên Biển Non Nước**, tắm biển, vui chơi giải trí.\n* Tối: Thưởng thức ẩm thực đường phố, mua sắm tại **Chợ đêm Helio**.\n\n**Ngày 4 (18/10/2024):**\n\n* Sáng: Tham quan **Phố cổ Hội An**, ngắm kiến trúc cổ kính, mua sắm đặc sản.\n* Chiều: Tham quan **Cù Lao Chàm**, lặn ngắm san hô, khám phá vẻ đẹp hoang sơ.\n* Tối: Thưởng thức ẩm thực Hội An, xem đèn lồng lung linh.\n\n**Ngày 5 (19/10/2024):**\n\n* Sáng: Tham quan **Núi Ngũ Hành Sơn**, chiêm ngưỡng vẻ đẹp của các hang động, chùa chiền.\n* Chiều: Tham quan **Cầu Rồng**, chụp ảnh lưu niệm.\n* Tối: Tự do dạo chơi, nghỉ ngơi.\n\n**Ngày 6 (20/10/2024):**\n\n* Sáng: Trả phòng khách sạn.\n* 8:00 sáng: Xuất phát về Hà Nội bằng xe khách.\n\n**Chi phí dự kiến:**\n\n* Xe khách: 400.0 (100.0 x 4)\n* Khách sạn: 600.0\n* Ăn uống: 1000.0\n* Vé tham quan: 200.0 (50.0 + 70.0 + 80.0)\n* Chi phí khác: 200.0\n\n**Tổng chi phí:** 2400.0\n\n**Lưu ý:**\n\n* Đây chỉ là một kế hoạch du lịch gợi ý, bạn có thể điều chỉnh phù hợp với sở thích và nhu cầu của mình.\n* Bạn nên đặt vé xe, phòng khách sạn trước để đảm bảo chỗ ở và di chuyển.\n* Nên mang theo kem chống nắng, mũ nón, áo mưa để bảo vệ sức khỏe trong quá trình du lịch.\n* Chuẩn bị sẵn tiền mặt để chi tiêu trong những trường hợp cần thiết.\n\nChúc bạn có một chuyến du lịch Đà Nẵng thật vui vẻ và đáng nhớ! \n",
          },
        ],
      },
      {
        role: "user",
        parts: [{ text: "trả về theo dạng json\n" }],
      },
      {
        role: "model",
        parts: [
          {
            text: '```json\n{\n  "tripPlan": {\n    "transportation": {\n      "mode": "Bus",\n      "routeId": "1",\n      "cost": 400.0\n    },\n    "accommodation": {\n      "hotelId": "1",\n      "cost": 600.0\n    },\n    "itinerary": [\n      {\n        "day": 1,\n        "date": "2024-10-15",\n        "activities": [\n          "Travel to Da Nang by bus (8:00 AM)",\n          "Check-in at Hotel A",\n          "Explore Da Nang night market and street food"\n        ]\n      },\n      {\n        "day": 2,\n        "date": "2024-10-16",\n        "activities": [\n          "Visit My Khe Beach",\n          "Visit Linh Ung Pagoda",\n          "Dine at local restaurants"\n        ]\n      },\n      {\n        "day": 3,\n        "date": "2024-10-17",\n        "activities": [\n          "Explore Son Tra Peninsula",\n          "Relax at Non Nuoc Beach",\n          "Enjoy street food and shopping at Helio Night Market"\n        ]\n      },\n      {\n        "day": 4,\n        "date": "2024-10-18",\n        "activities": [\n          "Visit Hoi An Ancient Town",\n          "Visit Cu Lao Cham Island",\n          "Enjoy Hoi An cuisine and lantern experience"\n        ]\n      },\n      {\n        "day": 5,\n        "date": "2024-10-19",\n        "activities": [\n          "Visit Ngu Hanh Son Mountain",\n          "Visit Dragon Bridge",\n          "Free time"\n        ]\n      },\n      {\n        "day": 6,\n        "date": "2024-10-20",\n        "activities": [\n          "Check out from hotel",\n          "Return to Hanoi by bus (8:00 AM)"\n        ]\n      }\n    ],\n    "estimatedCost": {\n      "transportation": 400.0,\n      "accommodation": 600.0,\n      "food": 1000.0,\n      "entranceFees": 200.0,\n      "otherExpenses": 200.0,\n      "total": 2400.0\n    },\n    "notes": [\n      "This is a suggested plan, you can adjust it according to your preferences.",\n      "Book bus tickets and hotel rooms in advance to secure your travel arrangements.",\n      "Bring sunscreen, hats, and raincoats for protection.",\n      "Prepare cash for miscellaneous expenses."\n    ]\n  }\n}\n```',
          },
        ],
      },
      {
        role: "user",
        parts: [{ text: "tôi muốn có luôn khứ hồi nha" }],
      },
      {
        role: "model",
        parts: [
          {
            text: '```json\n{\n  "tripPlan": {\n    "transportation": {\n      "outbound": {\n        "mode": "Bus",\n        "routeId": "1",\n        "cost": 400.0\n      },\n      "return": {\n        "mode": "Bus",\n        "routeId": "1",\n        "cost": 400.0\n      }\n    },\n    "accommodation": {\n      "hotelId": "1",\n      "cost": 600.0\n    },\n    "itinerary": [\n      {\n        "day": 1,\n        "date": "2024-10-15",\n        "activities": [\n          "Travel to Da Nang by bus (8:00 AM)",\n          "Check-in at Hotel A",\n          "Explore Da Nang night market and street food"\n        ]\n      },\n      {\n        "day": 2,\n        "date": "2024-10-16",\n        "activities": [\n          "Visit My Khe Beach",\n          "Visit Linh Ung Pagoda",\n          "Dine at local restaurants"\n        ]\n      },\n      {\n        "day": 3,\n        "date": "2024-10-17",\n        "activities": [\n          "Explore Son Tra Peninsula",\n          "Relax at Non Nuoc Beach",\n          "Enjoy street food and shopping at Helio Night Market"\n        ]\n      },\n      {\n        "day": 4,\n        "date": "2024-10-18",\n        "activities": [\n          "Visit Hoi An Ancient Town",\n          "Visit Cu Lao Cham Island",\n          "Enjoy Hoi An cuisine and lantern experience"\n        ]\n      },\n      {\n        "day": 5,\n        "date": "2024-10-19",\n        "activities": [\n          "Visit Ngu Hanh Son Mountain",\n          "Visit Dragon Bridge",\n          "Free time"\n        ]\n      },\n      {\n        "day": 6,\n        "date": "2024-10-20",\n        "activities": [\n          "Check out from hotel",\n          "Return to Hanoi by bus (8:00 AM)"\n        ]\n      }\n    ],\n    "estimatedCost": {\n      "transportation": 800.0,\n      "accommodation": 600.0,\n      "food": 1000.0,\n      "entranceFees": 200.0,\n      "otherExpenses": 200.0,\n      "total": 2800.0\n    },\n    "notes": [\n      "This is a suggested plan, you can adjust it according to your preferences.",\n      "Book bus tickets and hotel rooms in advance to secure your travel arrangements.",\n      "Bring sunscreen, hats, and raincoats for protection.",\n      "Prepare cash for miscellaneous expenses."\n    ]\n  }\n}\n```\n\n**Thay đổi:**\n\n* Thêm thông tin khứ hồi cho phương tiện di chuyển ("outbound" và "return").\n* Cập nhật chi phí vận chuyển thành 800.0 (400.0 cho mỗi chiều).\n* Cập nhật tổng chi phí thành 2800.0. \n',
          },
        ],
      },
      {
        role: "user",
        parts: [
          {
            text: "bạn trả về cho tôi theo định dạng như sau: tripData: userData, transportation, accomodation, itinerary, estimatedCost, notes và ngoài ra không trả về thêm bất cứ gì",
          },
        ],
      },
      {
        role: "model",
        parts: [
          {
            text: '```json\n{\n  "tripData": {\n    "userData": {\n        "currentLocation": "Hanoi",\n        "destination": "Danang",\n        "departureDate": "2024-10-15",\n        "returnDate": "2024-10-20",\n        "numberOfPeople": 4,\n        "budget": 5000.0\n    },\n    "transportation": {\n      "outbound": {\n        "mode": "Bus",\n        "routeId": "1",\n        "cost": 400.0\n      },\n      "return": {\n        "mode": "Bus",\n        "routeId": "1",\n        "cost": 400.0\n      }\n    },\n    "accommodation": {\n      "hotelId": "1",\n      "cost": 600.0\n    },\n    "itinerary": [\n      {\n        "day": 1,\n        "date": "2024-10-15",\n        "activities": [\n          "Travel to Da Nang by bus (8:00 AM)",\n          "Check-in at Hotel A",\n          "Explore Da Nang night market and street food"\n        ]\n      },\n      {\n        "day": 2,\n        "date": "2024-10-16",\n        "activities": [\n          "Visit My Khe Beach",\n          "Visit Linh Ung Pagoda",\n          "Dine at local restaurants"\n        ]\n      },\n      {\n        "day": 3,\n        "date": "2024-10-17",\n        "activities": [\n          "Explore Son Tra Peninsula",\n          "Relax at Non Nuoc Beach",\n          "Enjoy street food and shopping at Helio Night Market"\n        ]\n      },\n      {\n        "day": 4,\n        "date": "2024-10-18",\n        "activities": [\n          "Visit Hoi An Ancient Town",\n          "Visit Cu Lao Cham Island",\n          "Enjoy Hoi An cuisine and lantern experience"\n        ]\n      },\n      {\n        "day": 5,\n        "date": "2024-10-19",\n        "activities": [\n          "Visit Ngu Hanh Son Mountain",\n          "Visit Dragon Bridge",\n          "Free time"\n        ]\n      },\n      {\n        "day": 6,\n        "date": "2024-10-20",\n        "activities": [\n          "Check out from hotel",\n          "Return to Hanoi by bus (8:00 AM)"\n        ]\n      }\n    ],\n    "estimatedCost": {\n      "transportation": 800.0,\n      "accommodation": 600.0,\n      "food": 1000.0,\n      "entranceFees": 200.0,\n      "otherExpenses": 200.0,\n      "total": 2800.0\n    },\n    "notes": [\n      "This is a suggested plan, you can adjust it according to your preferences.",\n      "Book bus tickets and hotel rooms in advance to secure your travel arrangements.",\n      "Bring sunscreen, hats, and raincoats for protection.",\n      "Prepare cash for miscellaneous expenses."\n    ]\n  }\n}\n```\n\n**Giải thích:**\n\n* Đã thêm phần `tripData` bao gồm các phần con: `userData`, `transportation`, `accommodation`, `itinerary`, `estimatedCost`, `notes`.\n* Phần `userData` giữ nguyên thông tin đã cung cấp.\n* Các phần còn lại giữ nguyên thông tin từ kết quả trước đó.\n\nBây giờ dữ liệu được tổ chức rõ ràng hơn trong một phần `tripData`, dễ dàng truy cập và sử dụng. \n',
          },
        ],
      },
    ],
  });

  try {
    const result = await chatSession.sendMessage(
      `bạn hãy giúp tôi chọn ra kế hoạch tốt nhất trả về cho tôi dạng json\n\n${JSON.stringify(
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
