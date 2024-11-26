import React, { useEffect, useState } from 'react';
import "../IntroHotel/introhotel.css";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import InputOption from "../../../Components/Input/InputOption";
import { CouponService } from '../../../../services/apis/CouponService';
import { HotelService } from '../../../../services/apis/HotelService';
import { Link } from 'react-router-dom';


const imgheader = [
    {
        imgURL: "https://th.bing.com/th/id/OIP.UecmWknyfqWzk18Gj8Z8xgHaE8?w=259&h=180&c=7&r=0&o=5&pid=1.7",
    },
    {
        imgURL: "https://th.bing.com/th/id/OIP.gTtb0T-zUik5W7oAvNrLagHaEo?w=295&h=184&c=7&r=0&o=5&pid=1.7",
    },
];

const itemvoucher = [
    {
        name: "voucher",
        voucherdetails: "Giam 300k, dat phong tu 3 trieu",
        vouchercode: "HOTELNE"
    },
    {
        name: "voucher",
        voucherdetails: "Giam 300k, dat phong tu 3 trieu",
        vouchercode: "HOTELNE"
    },
    {
        name: "voucher",
        voucherdetails: "Giam 300k, dat phong tu 3 trieu",
        vouchercode: "HOTELNE"
    },
    {
        name: "voucher",
        voucherdetails: "Giam 300k, dat phong tu 3 trieu",
        vouchercode: "HOTELNE"
    },
]

const dealinVN = [
    {
        namedeeal: "Da Nang",
    },
    {
        namedeeal: "Ho Chi Minh",
    },
    {
        namedeeal: "Nha Trang",
    },
    {
        namedeeal: "Da lat",
    },
    {
        namedeeal: "Ninh Thuận",
    },
    {
        namedeeal: "Bình Thuận",
    },
    {
        namedeeal: "An Giang",
    },
    {
        namedeeal: "Gia lai",
    },
]
const sampleCards = [
    {
        imgURL: "https://th.bing.com/th/id/OIP.gTtb0T-zUik5W7oAvNrLagHaEo?w=295&h=184&c=7&r=0&o=5&pid=1.7",
        name: "Khách sạn 5 sao",
        description: "Khách sạn sang trọng với đầy đủ tiện nghi hiện đại và dịch vụ 24/7.",
        basicprice: "20.000 VNĐ",
        newprice: "10.000 VNĐ",
        discount: 50,
    },
    {
        imgURL: "https://th.bing.com/th/id/OIP.gTtb0T-zUik5W7oAvNrLagHaEo?w=295&h=184&c=7&r=0&o=5&pid=1.7",
        name: "Khách sạn 4 sao",
        description: "Khách sạn với view biển đẹp, không gian thoáng mát.",
        basicprice: "18.000 VNĐ",
        newprice: "9.000 VNĐ",
        discount: 50,
    },
    {
        imgURL: "https://th.bing.com/th/id/OIP.gTtb0T-zUik5W7oAvNrLagHaEo?w=295&h=184&c=7&r=0&o=5&pid=1.7",
        name: "Khách sạn 3 sao",
        description: "Khách sạn giá rẻ nhưng đầy đủ tiện nghi, phù hợp cho gia đình.",
        basicprice: "15.000 VNĐ",
        newprice: "7.500 VNĐ",
        discount: 50,
    },
    {
        imgURL: "https://th.bing.com/th/id/OIP.gTtb0T-zUik5W7oAvNrLagHaEo?w=295&h=184&c=7&r=0&o=5&pid=1.7",
        name: "Khách sạn 2 sao",
        description: "Khách sạn giá cả phải chăng, vị trí thuận lợi.",
        basicprice: "10.000 VNĐ",
        newprice: "5.000 VNĐ",
        discount: 50,
    },
];


const dealimg = [
    {
        imgURL: "https://th.bing.com/th/id/OIP.gTtb0T-zUik5W7oAvNrLagHaEo?w=295&h=184&c=7&r=0&o=5&pid=1.7",
        type: "Khách sạn",
        addres: "Hồ Chí Minh"
    },
    {
        imgURL: "https://th.bing.com/th/id/OIP.SmHwWGYmv8vEdyZ2H7h_XgHaEU?w=270&h=180&c=7&r=0&o=5&pid=1.7",
        type: "Khách sạn",
        addres: "Hồ Chí Minh"
    },
    {
        imgURL: "https://th.bing.com/th/id/OIP.SmHwWGYmv8vEdyZ2H7h_XgHaEU?w=270&h=180&c=7&r=0&o=5&pid=1.7",
        type: "Khách sạn",
        addres: "Hồ Chí Minh"
    },
    {
        imgURL: "https://th.bing.com/th/id/OIP.SmHwWGYmv8vEdyZ2H7h_XgHaEU?w=270&h=180&c=7&r=0&o=5&pid=1.7",
        type: "Khách sạn",
        addres: "Hồ Chí Minh"
    },
    {
        imgURL: "https://th.bing.com/th/id/OIP.SmHwWGYmv8vEdyZ2H7h_XgHaEU?w=270&h=180&c=7&r=0&o=5&pid=1.7",
        type: "Khách sạn",
        addres: "Hồ Chí Minh"
    },
    {
        imgURL: "https://th.bing.com/th/id/OIP.SmHwWGYmv8vEdyZ2H7h_XgHaEU?w=270&h=180&c=7&r=0&o=5&pid=1.7",
        type: "Khách sạn",
        addres: "Hồ Chí Minh"
    },
    {
        imgURL: "https://th.bing.com/th/id/OIP.SmHwWGYmv8vEdyZ2H7h_XgHaEU?w=270&h=180&c=7&r=0&o=5&pid=1.7",
        type: "Khách sạn",
        addres: "Hồ Chí Minh"
    }, {
        imgURL: "https://th.bing.com/th/id/OIP.SmHwWGYmv8vEdyZ2H7h_XgHaEU?w=270&h=180&c=7&r=0&o=5&pid=1.7",
        type: "Khách sạn",
        addres: "Hồ Chí Minh"
    },
]


const traveloption = ["Hồ Chí Minh", "Đà Lạt", "Lâm Đồng", "Đồng Nai", "Bình Dương"];


const IntroHotel = () => {
    const [selectedDeal, setSelectedDeal] = useState(null);
    // setup date
    const [date, setDate] = useState("");
    const [coupon,setCoupon] = useState([]);
    const handDatechange = (event) => {
        setDate(event.target.value);
    }
    const [hotel,setHotel] = useState([]);
    // set up input vị trí class date-night
    const [isOpen, setIsOpen] = useState(false); // Kiểm soát dropdown
    const [inputValue, setInputValue] = useState(''); // Giá trị input
    const [selectedOption, setSelectedOption] = useState(''); // Tùy chọn được chọn

    const options = ["1 Đêm", "2 Đêm", "3 Đêm ", "4 Đêm", "5 Đêm"];
    const toggleDropdown = () => {
        setIsOpen(!isOpen); // Đổi trạng thái mở/đóng
    };

    const handleOptionClick = (option) => {
        setInputValue(option); // Gán giá trị vào input
        setSelectedOption(option); // Cập nhật tùy chọn được chọn
        setIsOpen(false); // Đóng dropdown
    };

    const handleInputChange = (e) => {
        setInputValue(e.target.value); // Cập nhật giá trị input
    };
    useEffect(()=>{ 
        const fetch = async()=>{
            const dataCoupon = await CouponService.getCoupons(0,6,"");
            const dataHotel = await HotelService.getHotels(0,10,"");
            if(dataCoupon){
                setCoupon(dataCoupon.listResponse);
            }if(dataHotel){
                setHotel(dataHotel.hotelResponseList);
            }
        };
        fetch();
    },[])
    return (
        <>
            <div className='introhotel-container'>
                <div className='header'>
                    <div className='item'>
                        <div className='text'>
                            <b style={{ color: "white", fontSize: "25px" }}>
                                Tìm & đặt phòng khách sạn giá rẻ chỉ với 3 bước đơn giản!
                            </b>
                            <br />
                            <p style={{ fontSize: "18px", color: "whitesmoke" }}>
                                Khám phá ngay những ưu đãi tốt nhất dành cho bạn tại Plan For Trip!
                            </p>
                        </div>
                        <div className='img1'>
                            <img src={imgheader[0].imgURL} alt="" />
                        </div>
                        <div className='img2'>
                            <img src={imgheader[1].imgURL} alt="" />
                        </div>
                    </div>

                </div>
                <div className='content-header'>
                    <div className='title'>
                        <b style={{ color: "rgb(1,148,243)" }}>
                            Khách sạn xem gần đây
                        </b>
                    </div>

                    <div className='main-header'>
                        <div className='input'>
                            <b style={{ color: "#777777" }}>
                                Thành phố, địa điểm hoặc tên khách sạn:
                            </b>
                            <InputOption
                                options={traveloption}
                                placeholder="Thành phố, khách sạn, điểm đến "
                            />
                        </div>
                        <b style={{ color: "#777777" }}>Chọn ngày:</b>
                        <div className='date-night'>
                            <input className='input-date'
                                type="date"
                                value={date}
                                onChange={handDatechange}
                                style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
                            />

                            <div className='input-night'>
                                {/* Ô nhập liệu */}
                                <input
                                    type="text"
                                    value={inputValue}
                                    onChange={handleInputChange}
                                    onClick={toggleDropdown} // Hiển thị dropdown khi nhấp
                                    placeholder="Chọn đêm"
                                    style={{
                                        outline: "none",
                                        width: '100%',
                                        padding: '10px',
                                        borderRadius: '5px',
                                        border: '1px solid #ccc',
                                    }}
                                />

                                {/* Dropdown */}
                                {isOpen && (
                                    <ul
                                        style={{
                                            position: 'absolute',
                                            top: '100%',
                                            left: 0,
                                            right: 0,
                                            background: '#fff',
                                            border: '1px solid #ccc',
                                            borderRadius: '5px',
                                            maxHeight: '150px',
                                            overflowY: 'auto',
                                            zIndex: 1000,
                                            margin: 0,
                                            padding: 0,
                                            listStyle: 'none',
                                        }}
                                    >
                                        {options
                                            .filter((option) => option.toLowerCase().includes(inputValue.toLowerCase())) // Lọc kết quả
                                            .map((option) => (
                                                <li
                                                    key={option}
                                                    onClick={() => handleOptionClick(option)} // Chọn tùy chọn
                                                    style={{
                                                        padding: '8px',
                                                        cursor: 'pointer',
                                                        borderBottom: '1px solid #f0f0f0',
                                                    }}
                                                >
                                                    {option}
                                                </li>
                                            ))}
                                    </ul>
                                )}
                            </div>
                        </div>
                        <br />
                        <div className='header-button'>
                            <button>Tìm khách sạn </button>
                        </div>
                    </div>
                </div>
                <br />
                <br />
                <div className='main-container'>
                    <div>
                        <a style={{ fontSize: "30px", fontWeight: "bold" }}> Mã voucher</a>
                    </div>
                    <div className="voucher-container">
                        {coupon.map((voucher, index) => (
                            <div className="voucher-card" key={index}>
                                <div className="voucher-content">
                                    <h4 className="voucher-title">Giảm {voucher.discount_value} {voucher.discount_type ? "%" : "VNĐ"}</h4>
                                    <p className="voucher-details">từ {voucher.start_date} đến {voucher.end_date}</p>
                                </div>
                                <div className="voucher-divider">
                                    <span className="divider-circle left"></span>
                                    <span className="divider-line"></span>
                                    <span className="divider-circle right"></span>
                                </div>
                                <div className="voucher-footer">
                                    <button className="voucher-button">
                                        <span className="voucher-code">{voucher.code}</span>
                                        <ContentCopyIcon />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    <br />
                    <br />
                    <div>
                        <a style={{ fontSize: "30px", fontWeight: "bold" }}> Deal nội địa</a>
                    </div>
                    <div className="deal">
                        {dealinVN.map((deal, index) => (
                            <div className="deal-item" key={index}>
                                <button
                                    onClick={() => setSelectedDeal(deal.namedeeal)}
                                    className={selectedDeal === deal.namedeeal ? 'active' : ''} >
                                    {deal.namedeeal}
                                </button>
                            </div>
                        ))}
                    </div>
                    <br />
                    <div className="deal-card">
                        {hotel.map((card, index) => (
                            <div key={index} className="card">
                                <div className="image">
                                    <img src={card.images[0] && card.images[0].url ?card.images[0].url: 'https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'} alt={card.name} />
                                </div>
                                <div className="content">
                                    <div className="content-item">
                                        <p className="card-title">{card.name}</p>
                                        <p className="card-description">{card.description}</p>
                                        <div className="price-info">
                                            <p className="card-price-old">{card.basicprice}</p>
                                            <p className="card-price-new">{card.newprice}</p>
                                        </div>
                                        <div className='card-button'>
                                            <Link to={`hotel:${id}`} className="buy-button"> Đặt ngay</Link>
                                            <button className="details-buttons"> Xem chi tiết</button>
                                        </div>
                                    </div>

                                </div>
                                {/* <div className="discount-banner">
                                    <p className="discount-text">Giảm giá {card.discount}%</p>
                                </div> */}
                            </div>
                        ))}
                    </div>

                    <br />
                    <br />
                    <div>
                        <a style={{ fontSize: "30px", fontWeight: "bold" }}> Giá tốt các địa điểm nội địa</a>
                    </div>
                    <div className='deal-img'>
                        {dealimg.map((img, index) => (
                            <div key={index} className='item-img'>
                                <div className="img-container">
                                    <img src={img.imgURL} alt={img.type} />
                                    <div className="img-text">
                                        <div className='type-text'>
                                            <a style={{ fontWeight: "bold" }}>{img.type}</a>
                                        </div>
                                        <div className='addres-text'>
                                            <a style={{ fontWeight: "bold" }}>{img.addres}</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div >
            </div>
        </>
    );
};

export default IntroHotel;