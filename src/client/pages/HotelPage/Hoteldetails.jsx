import React from 'react';
import './hoteldetails.css';
import CheckIcon from '@mui/icons-material/Check';
import LocalHotelIcon from '@mui/icons-material/LocalHotel';
import StorefrontIcon from '@mui/icons-material/Storefront';
import LiquorIcon from '@mui/icons-material/Liquor';
import StairsIcon from '@mui/icons-material/Stairs';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import ParkIcon from '@mui/icons-material/Park';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
export const Hoteldetails = () => {

    const cardHeaderList = [
        { imageUrl: 'https://th.bing.com/th?id=OIP.s3tKApbNLXQ4SOkEn-z7SQHaE7&w=306&h=204&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2' },
        { imageUrl: 'https://th.bing.com/th?id=OIP.4QxqaCLjbLyUXaPxAodgHAHaE8&w=306&h=204&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2' },
        { imageUrl: 'https://th.bing.com/th?id=OIP.g_fSfH-ZSM5sTkWOh2IIGwHaFj&w=288&h=216&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2' },
        { imageUrl: 'https://th.bing.com/th?id=OIP.paZZm83p5p4HfCgz6xQQvQHaGs&w=262&h=237&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2' },
        { imageUrl: 'https://th.bing.com/th?id=OIP.Bw6Ax5MpOjT6X51pZ00iNQHaEw&w=311&h=200&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2' }
    ];

    const hotelInfo = {
        name: 'Khách Sạn Mường Thánh',
        rating: 4,
        address: 'Địa chỉ: 086, Đường Thanh Niên, thành phố Lào Cai, Việt Nam',
        description: `
            Được xây dựng vào năm 2015, Khách sạn Mường Thanh Grand Lào Cai là một trong những cơ sở
            lưu trú lớn nhất Lào Cai và là sự lựa chọn tuyệt vời dành cho khách du lịch. Từ đây, 
            khách có thể dễ dàng tiếp cận được nét đẹp sống động của thành phố ở mọi góc cạnh.
            Với vị trí thuận lợi, khách sạn dễ dàng tiếp cận những điểm tham quan du lịch nổi tiếng của thành phố.
            
            Khách sạn Mường Thanh Grand Lào Cai là một sự lựa chọn thông minh cho du khách khi đến Lào Cai, 
            nơi mang lại cho họ một kì nghỉ thư giãn và thoải mái.
        `,
        basicprice: '3,690,000',
        amoutprice: '1,750,000',
        reviews: '+1k'
    };
    const servicelist = [
        { name: 'Các loại khăn', icon: <CheckIcon /> },
        { name: 'Điện thoại', icon: <CheckIcon /> },
        { name: 'Máy sấy tóc', icon: <CheckIcon /> },
        { name: 'Truyền hình cáp/vệ tinh', icon: <CheckIcon /> },
        { name: 'Tủ quần áo', icon: <CheckIcon /> },
        { name: 'Wi-Fi [miễn phí]', icon: <CheckIcon /> },

    ];

    const rulelist = [
        { name: 'Nhận phòng từ: 14:00', icon: <LocalHotelIcon /> },
        { name: 'Nhận phòng đến: 23:59', icon: <LocalHotelIcon /> },
        { name: 'Trả phòng đến: 12:00', icon: <LocalHotelIcon /> },
        { name: 'Quầy tiếp tân mở đến: 23:59', icon: <StorefrontIcon /> },

    ];

    const hotelbar = [
        { name: 'số lượng bar: 1', icon: <LiquorIcon /> },
        { name: 'số lượng tầng: 18', icon: <StairsIcon /> },
        { name: 'số lượng nhà hàng: 1', icon: <RestaurantIcon /> },
        { name: 'số lượng phòng: 195', icon: <VpnKeyIcon /> },

    ];



    return (
        <>
            <div>
                <div className="hoteldetails-header-card">
                    <div className="hoteldetails-header-card-image1">
                        <img src={cardHeaderList[0].imageUrl} alt="Header 1" />
                    </div>
                    <div className="hoteldetails-header-card-image2">
                        <img src={cardHeaderList[1].imageUrl} alt="Header 2" />
                        <img src={cardHeaderList[3].imageUrl} alt="Header 4" />
                    </div>
                    <div className="hoteldetails-header-card-image3">
                        <img className="hoteldetails-header-card-image3-1" src={cardHeaderList[2].imageUrl} alt="Header 3" />
                        <img className="hoteldetails-header-card-image3-2" src={cardHeaderList[4].imageUrl} alt="Header 5" />
                    </div>
                </div>
                <div className='hoteldetails-content-main'>
                    <div className='hoteldetails-content-left'>
                        <div className="hoteldetails-information-hotel">
                            <div>
                                <h3><b>{hotelInfo.name}</b>   {hotelInfo.rating}★</h3>
                                <span>{hotelInfo.address}</span>
                            </div>
                            <hr />
                            <div>
                                <p>{hotelInfo.description}</p>
                            </div>
                        </div>
                        <div className='hoteldetails-service'>
                            <div> <h3><b>Tiện nghi</b></h3></div>
                            <div className='hoteldetails-service-list'>
                                {servicelist.map((servicelist, index) => (
                                    <div className='hoteldetails-service-lis' key={index}>
                                        {servicelist.icon}
                                        {servicelist.name}
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className='hoteldetails-service-rules'>
                            <h3><b>Quy định chỗ nghĩ</b></h3>
                            <div className='hoteldetails-service-rules-lis-body'>
                                <div className='hoteldetails-service-rules-lis-body-left'>
                                    <center><b>Nhận phòng/Trả phòng</b>
                                        {rulelist.map((rulelist, index) => (
                                            <div key={index}>
                                                {rulelist.icon}
                                                {rulelist.name}
                                            </div>
                                        ))}
                                    </center>
                                </div>
                                <div className='hoteldetails-service-rules-lis-body-right'>
                                    <center><b>Về khách sạn</b>
                                        {hotelbar.map((hotelbar, index) => (
                                            <div key={index}>
                                                {hotelbar.icon}
                                                {hotelbar.name}
                                            </div>
                                        ))}
                                    </center>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='hoteldetails-content-right'>
                        <div className='hoteldetails-siderbar-right'>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <div>
                                    <h3>Đánh giá</h3>
                                    <span>{hotelInfo.rating}/5⭐({hotelInfo.reviews})</span>
                                </div>
                                <div className='hotealdetails-siderbar-right-item-1'>
                                    <a href=""> đọc mọi đánh giá</a>
                                </div>
                            </div>
                            <div>
                                <h5>Giá gốc: {hotelInfo.basicprice}đ</h5>
                                <h5>Giá sau giảm: {hotelInfo.amoutprice}đ</h5>
                                <small>(đã bao gồm thuế phí)</small>
                            </div>
                            <div className='hotealdetails-siderbar-right-item-button'>
                                <button class="hoteldetails-sidebar-button">Đặt phòng ngay</button>
                            </div>
                        </div>

                        <div className='hoteldetails-content-right-map'>
                            <div>
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d15676.573304912468!2d106.7122688!3d10.8003328!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1svi!2s!4v1728641751330!5m2!1svi!2s"
                                    width="430"
                                    height="200"
                                    style={{ border: 0 }}
                                    allowFullScreen
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                ></iframe>
                                <center><a href=""><b>Địa điểm gần đây</b></a></center>
                            </div>

                            <div className='hoteldetails-content-right-list'>
                                <span> <LocalHospitalIcon />Bệnh viện</span><br />
                                <span> <ParkIcon />Công viên</span><br />
                                <span> <ShoppingBagIcon />Trung tâm thương mại</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};