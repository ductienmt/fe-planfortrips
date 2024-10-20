export const flatpickrConfig = {
  weekdays: {
    shorthand: ["CN", "T2", "T3", "T4", "T5", "T6", "T7"],
    longhand: [
      "Chủ Nhật",
      "Thứ Hai",
      "Thứ Ba",
      "Thứ Tư",
      "Thứ Năm",
      "Thứ Sáu",
      "Thứ Bảy",
    ],
  },
  months: {
    shorthand: [
      "Th1",
      "Th2",
      "Th3",
      "Th4",
      "Th5",
      "Th6",
      "Th7",
      "Th8",
      "Th9",
      "Th10",
      "Th11",
      "Th12",
    ],
    longhand: [
      "Tháng 1",
      "Tháng 2",
      "Tháng 3",
      "Tháng 4",
      "Tháng 5",
      "Tháng 6",
      "Tháng 7",
      "Tháng 8",
      "Tháng 9",
      "Tháng 10",
      "Tháng 11",
      "Tháng 12",
    ],
  },
  firstDayOfWeek: 1,
  rangeSeparator: " đến ",
  weekAbbreviation: "Tuần",
  scrollTitle: "Cuộn để tăng giảm",
  toggleTitle: "Nhấp để chuyển đổi",
  ordinal: (nth) => {
    if (nth > 1) return "th";
    return "";
  },
};
