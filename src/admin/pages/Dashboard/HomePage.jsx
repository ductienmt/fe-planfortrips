import Statitical from '../Statistical/Statistical';
import AdminList from './AdminList/AdminList';
import './HomePage.css';

function HomePage() {
    return (
        <div style={{ width: '100%' }}>
            <div className="admin__hompage">
                <div className="admin__homepage-container">

                    {/* Admin HomePage Nav */}
                    <div className="admin__homepage-nav">
                        <div className="admin__homepage-nav-container
                         d-flex justify-content-between">

                            {/* Nav Left */}
                            <div className="admin__homepage-nav-left">
                                <h3 className='text-white fw-bold'>Dash board</h3>
                            </div>
                            {/* Nav Right */}
                            <div className="admin__homepage-nav-right">
                                <div className="admin__homepage-nav-right-container d-flex">
                                    <div className="admin__homepage-button">
                                        <button className='btn px-3 py-2'>Lọc</button>
                                    </div>

                                    <div className="admin__homepage-button admin-border-left">
                                        <button className='btn px-3 py-2'>Loại doanh nghiệp</button>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

                    {/* Admin HomePage Body */}
                    <div className="admin__homepage-body mt-3">
                        <div className="admin__homepage-body-container 
                        d-flex">

                            <div className="admin__homepage-body-left admin-body-item
                            admin__w-60 me-4">
                                {/* Tổng Thống Kê */}
                                    <Statitical/>
                            </div>

                            <div className="admin__homepage-body-right admin__w-40 admin-body-item">
                                {/* Danh sách doanh nghiệp chờ duyệt */}
                                <div className="admin-enterprises-wait">
                                    <div className="admin-enterprises-wait-container">
                                        <AdminList title={"Danh sách doanh nghiệp chờ duyệt"}/>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HomePage;