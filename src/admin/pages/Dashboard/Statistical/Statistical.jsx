import './Statistical.css'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ListIcon from '@mui/icons-material/List';
import CardStatistical from '../../CardStatistical/CardStatistical';
function Statitical() {
    return (<>
        <div className="admin-statitiscal">
            <div className="admin-statitiscal-container">
                <div className="admin-statitiscal-nav d-flex justify-content-between">
                    <div className="admin-statitiscal-nav-title">
                        <span>Tổng thống kê</span>
                    </div>

                    <div className="admin-statitiscal-nav-print">
                        <button className='btn btn-outline-dark'>Xuất File</button>
                    </div>
                </div>

                <div className="admin-statistical-body">
                    <div className="row p-2 pt-0 mt-1 g-3">
                        <div className="col-6">
                        <CardStatistical number={1600} title={"Số lượng User"} percent={55} typeIcon={"User"}/>
                        </div>
                        <div className="col-6">
                        <CardStatistical number={5} title={"Số lượng Admin"} percent={22} typeIcon={"Admin"}/>
                        </div>
                        <div className="col-6">
                        <CardStatistical number={200} title={"Số lượng Doanh Nghiệp"} percent={147} typeIcon={"Enterprise"}/>
                        </div>
                        <div className="col-6">
                        <CardStatistical number={600} title={"Số lượng truy cập"} percent={300} typeIcon={"access"}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>);
}

export default Statitical;