import { AdminPanelSettings, ListOutlined, AccountCircle, HelpCenterRounded } from '@mui/icons-material';
import './CardStatistical.css';
function CardStatistical({ number, title, percent, typeIcon }) {
    let Icon;
    const lowerCaseTypeIcon = typeIcon.toLowerCase();

    if (lowerCaseTypeIcon === 'user') {
        Icon = AccountCircle;
    } else if (lowerCaseTypeIcon === 'admin') {
        Icon = AdminPanelSettings; 
    } else {
        Icon = HelpCenterRounded; 
    }

    return (
        <>
            <div className="admin__card-statistical">
                <div className="admin__card-statistical-container d-flex">

                    {/* Card Left */}
                    <div className="admin__card-statistical-left admin__w-70">
                        <div className="admin__card-statistical-left-container d-flex flex-column justify-content-between">
                            <div className="admin__card-statistical__icon">
                                <div className="admin__card-statistical__icon-container">
                                    {Icon && <Icon className='card-statistical-icon' />} {/* Render icon */}
                                </div>
                            </div>
                            <div className="admin__card-statistical__info mt-2">
                                <span className='admin__card-statistical__info-number'>{number}</span>
                                <span className='admin__card-statistical__info-title'>{title}</span>
                            </div>
                        </div>
                    </div>

                    {/* Card Right */}
                    <div className="admin__card-statistical-right admin__w-30">
                        <div className="admin__card-statistical-right-container d-flex flex-column justify-content-between">
                            <div className="admin__card-statistical-right__detail">
                                <button className='btn btn-outline-light px-2 py-1'>
                                    <ListOutlined />
                                </button>
                            </div>

                            <div className="admin__card-statistical-right__detail">
                                <span className='admin__card-statistical-right__detail-percent'>
                                    +{percent}%
                                </span>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </>
    );
}

export default CardStatistical;
