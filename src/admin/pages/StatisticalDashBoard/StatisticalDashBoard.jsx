import './Statistical.css';
import { useEffect, useState } from 'react';
import { StatisticalService } from '../../../services/apis/StatisticalService';
import CarStatistical from '../CardStatistical/CardStatistical';

function StatisticalDashBoard() {
    const [countAc, setCountAc] = useState({
        countUser: 0,
        countAdmin: 0,
        countEtp: 0,
        countPlan : 0
    });

    const [sum, setSum] = useState(0);


    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const [countUser, countAdmin, countEtp, countPlan] = await Promise.all([
                StatisticalService.getCountUser(),
                StatisticalService.getCountAdmin(),
                StatisticalService.getCountEnterprise(),
                StatisticalService.getCountPlan()   
            ]);
    
            const total = countUser + countAdmin + countEtp + countPlan; 
            setCountAc({ countUser, countAdmin, countEtp, countPlan }); 
            setSum(total);
        } catch (error) {
            console.error('Error fetching statistical data:', error);
        }
    };
    ;

    const calculatePercent = (value) => {
        if (!sum || !value) return 0;
        return ((value / sum) * 100).toFixed(2);
    };

    return (
        <div className="admin-statitiscal mt-3">
            <div className="admin-statitiscal-container bg-light">
                <div className="admin-statitiscal-nav d-flex justify-content-between">
                    <div className="admin-statitiscal-nav-title">
                        <span>Tổng thống kê</span>
                    </div>
                    <div className="admin-statitiscal-nav-print">
                        <button className="btn btn-outline-dark">Xuất File</button>
                    </div>
                </div>

                <div className="admin-statistical-body">
                    <div className="row p-2 mt-2 g-3">
                        <div className="col-6">
                            <CarStatistical
                                number={countAc.countUser}
                                title="Số lượng User"
                                percent={calculatePercent(countAc.countUser)}
                                typeIcon="User"
                            />
                        </div>
                        <div className="col-6">
                            <CarStatistical
                                number={countAc.countAdmin}
                                title="Số lượng Admin"
                                percent={calculatePercent(countAc.countAdmin)}
                                typeIcon="Admin"
                            />
                        </div>
                        <div className="col-6">
                            <CarStatistical
                                number={countAc.countEtp}
                                title="Số lượng Doanh Nghiệp"
                                percent={calculatePercent(countAc.countEtp)}
                                typeIcon="Enterprise"
                            />
                        </div>
                        <div className="col-6">
                            <CarStatistical number={countAc.countPlan} title={"Kế hoạch đã được đã được tạo ra"} percent={''} typeIcon={"Plan"} />
                        </div>
                    </div>
                    
                </div>


            </div>
        </div>
    );
}

export default StatisticalDashBoard;
