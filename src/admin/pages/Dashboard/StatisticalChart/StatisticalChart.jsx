import './StatisticalChart.css'

function StatisticalChart({title,data}) {
    return ( 
        <>
        <div className="stc-chart">
            <div className="stc-chart__container">
                <div className="stc-chart-title">
                    <h4>{title}</h4>
                </div>

                <div className="stc-chart-content">
                    {/* Biểu đồ ở đây - Truyền Data Vào*/}
                </div>
            </div>
        </div>
        </>
     );
}

export default StatisticalChart;