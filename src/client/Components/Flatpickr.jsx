import React, { Component } from "react";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/material_green.css";
import { flatpickrConfig } from "../../utils/ConfigFlatpickr";

export class FlatpickrComponent extends Component {
  constructor(props) {
    super(props);

    // Kiểm tra và chuyển đổi giá trị ban đầu
    const initialDate = props.value ? new Date(props.value) : new Date();

    this.state = {
      date: initialDate,
    };
  }

  handleChange = ([date]) => {
    if (date) {
      this.setState({ date });
      // Chỉ lấy giá trị từ date và trả về
      if (this.props.onChange) {
        const formattedDate = date.toISOString().split("T")[0]; // Định dạng thành yyyy-mm-dd
        this.props.onChange({
          target: { name: this.props.name, value: formattedDate },
        });
      }
    }
  };

  render() {
    const { date } = this.state;
    const { name } = this.props;

    return (
      <Flatpickr
        name={name}
        value={date}
        options={{
          dateFormat: "Y-m-d", // Định dạng giá trị để gửi về
          altFormat: "d-m-Y", // Định dạng hiển thị
          locale: flatpickrConfig,
          maxDate: "today",
        }}
        onChange={this.handleChange}
        placeholder="Chọn ngày"
        style={{
          width: "100%",
          padding: "10px 15px",
          border: "solid 1px #cbcbcb",
          borderRadius: "8px",
        }}
      />
    );
  }
}
