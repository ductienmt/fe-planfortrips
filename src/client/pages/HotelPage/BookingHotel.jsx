import React, { useState } from 'react';
import './bookinghotel.css';
import { EmojiPeople, Phone, Airplay, Tv, Storage, Wifi, Hotel, Shower, Icecream } from '@mui/icons-material';
import StarRatings from './StarRating';

export const BookingHotel = () => {

    const cardheaderlist = [
        { imageUrl: 'https://th.bing.com/th?id=OIP.I8G8xjBPrtAU3w6b5-qaBwHaFN&w=298&h=209&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2' },
        { imageUrl: 'https://th.bing.com/th?id=OIP.eUmRjpZOz3-yqS_-wEwRPQHaE8&w=306&h=204&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2' },
        { imageUrl: 'https://th.bing.com/th?id=OIP.ETQpUS3wKll91XlggYSEJQHaE8&w=306&h=204&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2' },
        { imageUrl: 'https://th.bing.com/th?id=OIP.uBZzLNUexdwwV7S-lX3o0QHaFj&w=288&h=216&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2' },
        { imageUrl: 'https://th.bing.com/th?id=OIP.pMbbR4yghEce8r2rV5aIRQAAAA&w=308&h=202&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2' }
    ];

    const contentheader = [
        {
            namecontent: 'Khách Sạn Mường Thành',
            addrescontent: 'Địa chỉ: 086, Đường Thanh Niên, thành phố Lào Cai, Việt Nam',
            reviewcontent: 2,
            amoutreviewcontent: '1+',
            originalprice: '100.000 VND',
            discountprice: '50.000 VND'
        }
    ];

    const servicemainlist = [
        { name: 'Các loại khăn', icon: <EmojiPeople /> },
        { name: 'Điện thoại', icon: <Phone /> },
        { name: 'Máy sấy tóc', icon: <Airplay /> },
        { name: 'Truyền hình cáp/vệ tinh', icon: <Tv /> },
        { name: 'Tủ quần áo', icon: <Storage /> },
        { name: 'Wi-Fi [miễn phí]', icon: <Wifi /> },
        { name: 'Dép đi trong nhà', icon: <Hotel /> },
        { name: 'Vật dụng tắm rửa', icon: <Shower /> },
        { name: 'Tủ lạnh', icon: <Icecream /> }
    ];

    const cardlist = [{
        image: 'https://th.bing.com/th?id=OIP.fW0_KUnoQ-lMiyIszIp4uAHaFj&w=288&h=216&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2',
        typeroom: 'Phòng đơn',
        amount: '1 người',
        service: 'Bao gồm tất cả tiện ích',
        price: '750,000đ',
    },
    {
        image: 'https://th.bing.com/th?id=OIP.ETQpUS3wKll91XlggYSEJQHaE8&w=306&h=204&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2',
        typeroom: 'Phòng đôi',
        amount: '2 người',
        service: 'Bao gồm tất cả tiện ích',
        price: '850,000đ',
    },
    {
        image: 'https://th.bing.com/th?id=OIP.goEMp-GB6KDGUOZbOLOfEAHaE8&w=306&h=204&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2',
        typeroom: 'Phòng gia đình',
        amount: '2 người,1 trẻ em',
        service: 'Bao gồm tất cả tiện ích',
        price: '1.750,000đ',
    }
    ]

    const reviewlist = [{
        avatar: 'https://th.bing.com/th?id=OIP.hCfHyL8u8XAbreXuaiTMQgHaHZ&w=250&h=249&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2',
        name: 'Huỳnh Anh Quân',
        rating: 4,
        description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Obcaecati similique debitis facilis'
    },
    {
        avatar: 'https://th.bing.com/th?id=OIP.hCfHyL8u8XAbreXuaiTMQgHaHZ&w=250&h=249&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2',
        name: 'Huỳnh Anh Quân',
        rating: 4,
        description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Obcaecati similique debitis facilis'
    },
    {
        avatar: 'https://th.bing.com/th?id=OIP.hCfHyL8u8XAbreXuaiTMQgHaHZ&w=250&h=249&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2',
        name: 'Huỳnh Anh Quân',
        rating: 4,
        description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Obcaecati similique debitis facilis'
    }
    ]



    const handleRoomSelection = (index) => {
        if (selectedRoom === index) {
            setSelectedRoom(null);
        } else {
            setSelectedRoom(index);
        }
    };
    const [selectedRating, setSelectedRating] = useState('all'); // "all" là giá trị mặc định để hiển thị tất cả

    const handleFilter = (rating) => {
        setSelectedRating(rating);
    };

    return (
        <div>
            <div className="bookingpage-header-card-container">
                <div className="bookingpage-header-card-image1">
                    <img src={cardheaderlist[0].imageUrl} alt="Header 1" />
                </div>
                <div className="bookingpage-header-card-image2">
                    <img src={cardheaderlist[1].imageUrl} alt="Header 2" />
                    <img src={cardheaderlist[3].imageUrl} alt="Header 4" />
                </div>
                <div className="bookingpage-header-card-image3">
                    <img className='bookingpage-header-card-image3-1' src={cardheaderlist[2].imageUrl} alt="Header 3" />
                    <img className='bookingpage-header-card-image3-2' src={cardheaderlist[4].imageUrl} alt="Header 5" />
                </div>
            </div>
            <div className='bookingpage-content-header'>
                <div className='bookingpage-content-header-left'>
                    <h3> <b>{contentheader[0].namecontent}</b></h3>
                    <h6><span>{contentheader[0].addrescontent}</span></h6>
                    <p>  <StarRatings rating={contentheader[0].reviewcontent} />({contentheader[0].amoutreviewcontent} reviews)</p>
                </div>
                <div className='bookingpage-content-header-center'>
                    <label style={{ textDecoration: "line-through" }}>Giá gốc: {contentheader[0].originalprice}</label>
                    <label style={{ color: "red", fontSize: "25px", fontWeight: "bold" }}>Giá sau giảm: {contentheader[0].discountprice}</label>
                    <span>(đã bao gồm thuế)</span>
                </div>
                <div className='bookingpage-content-header-right'>
                    <button className='bookingpage-content-header-button'>Đặt phòng</button>
                </div>
            </div>
            <hr className='bookingpage-content-header-line' />
            <div className='bookingpage-content-main-service'>
                <h2>Tiện ích</h2>
                <div className='bookingpage-content-main-service-list'>
                    {servicemainlist.map((service, index) => (
                        <div key={index} className="service-item">
                            <div className="service-name-icon">
                                {service.icon}
                                {service.name}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <hr className='bookingpage-content-header-line-2' />
            <br />
            <div className='bookingpage-content-card-list'>
                <h2>Phòng hiện có</h2>
                {cardlist.map((cardlist, index) => (
                    <div key={index} className='booking-content-card-list-item'>
                        <div className='booking-content-card-list-item-1'>
                            <img src={cardlist.image} alt="" />
                        </div>
                        <div className='booking-content-card-list-item-2'>
                            <div>
                                <h2>{cardlist.typeroom}</h2>
                                <span>Giới hạn: {cardlist.amount}</span> <br />
                                <div className='booking-content-card-list-item-2-service'>
                                    <small>{cardlist.service}</small>
                                </div>
                            </div>

                        </div>
                        <div className='booking-content-card-list-item-3'>
                            {/* <button
                                className={`circle-button ${selectedRoom === index ? 'selected' : ''}`}
                                onClick={() => handleRoomSelection(index)}

                            ></button> */}
                            <div className='booking-content-card-list-item-3-item'>
                                <br />
                                <div>
                                    <span style={{ fontSize: "35px", color: "white" }}><b>{cardlist.price}</b></span><br />
                                    <center style={{ color: "white" }}>/đêm</center>
                                </div>
                                <br />
                                <button>Đặt ngay</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className='booking-content-gps'>
                <br />
                <br />
                <h2>Vị trí</h2>
                <iframe className='booking-content-map'
                    src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d15676.573304912468!2d106.7122688!3d10.8003328!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1svi!2s!4v1728641751330!5m2!1svi!2s"
                    // width="270"
                    // height="200"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
            </div>
            <br />
            <div className='booking-content-filter-review'>
                <div className='booking-content-filter-review-item'>
                    <h2>Đánh giá</h2><small>(hơn 45 đánh giá)</small>
                    <h1>5.0</h1> <h2>trên 5.0</h2>

                </div>
                <div className="rating-filter">
                    <button
                        className={`filter-btn ${selectedRating === 'all' ? 'active' : ''}`}
                        onClick={() => handleFilter('all')}
                    >
                        Tất cả
                    </button>
                    <button
                        className={`filter-btn ${selectedRating === '1' ? 'active' : ''}`}
                        onClick={() => handleFilter('1')}
                    >
                        1 Sao
                    </button>
                    <button
                        className={`filter-btn ${selectedRating === '2' ? 'active' : ''}`}
                        onClick={() => handleFilter('2')}
                    >
                        2 Sao
                    </button>
                    <button
                        className={`filter-btn ${selectedRating === '3' ? 'active' : ''}`}
                        onClick={() => handleFilter('3')}
                    >
                        3 Sao
                    </button>
                    <button
                        className={`filter-btn ${selectedRating === '4' ? 'active' : ''}`}
                        onClick={() => handleFilter('4')}
                    >
                        4 Sao
                    </button>
                    <button
                        className={`filter-btn ${selectedRating === '5' ? 'active' : ''}`}
                        onClick={() => handleFilter('5')}
                    >
                        5 Sao
                    </button>
                </div>
                <div className='booking-content-filter-button'>
                    <button>Thêm đánh giá</button>
                </div>
            </div>
            <div className='booking-page-content-review-list-card'>
                {reviewlist.map((review, index) => (
                    <div key={index} className='booking-page-content-review-list-card-item'>
                        <img src={review.avatar} alt="" />
                        <div className='booking-page-content-review-list-card-item-1'>
                            <div className='booking-page-content-review-list-card-item-1-rating'>
                                <span style={{ fontSize: "20px" }}>{review.name}</span>
                                <StarRatings rating={review.rating} />

                            </div>
                            <span>{review.description}</span>

                        </div>
                    </div>

                ))}
            </div>
        </div>
    );
};
