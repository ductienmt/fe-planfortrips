import { useEffect, useState } from 'react';
import './AdminList.css';
import AccountEtpService from '../../../../services/apis/AccountEnterprise';
import { format } from 'date-fns';  

function AdminList() {
    const [enterprises, setEnterprise] = useState([]);
    const [loading, setLoading] = useState(false);  
    const [message, setMessage] = useState('');  

    useEffect(() => {
        const fetchEnterprises = async () => {
            setLoading(true);  
            try {
                const res = await AccountEtpService.getAccountEnterpriseNeedAccept();
                setEnterprise(res.data);
            } catch (error) {
                console.error('Error fetching enterprises:', error);
            } finally {
                setLoading(false);  
            }
        };

        fetchEnterprises();
    }, []);

    const handleAccept = async (id) => {
        try {
            setLoading(true);  
            await AccountEtpService.toggleStage(id); 
            setMessage('Xét duyệt thành công!');  

            setEnterprise(prevEnterprises => 
                prevEnterprises.filter(etp => etp.accountEnterpriseId !== id)
            );
        } catch (error) {
            console.error('Error accepting enterprise:', error);
            setMessage('Đã có lỗi xảy ra. Vui lòng thử lại!');
        } finally {
            setLoading(false);  
        }
    };

    return (
        <>
            {message && <div className="alert alert-info">{message}</div>}

            {loading ? (
                <div className="spinner-border" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            ) : (
                <div style={{ maxHeight: '20rem', overflow: 'auto' }}>
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th scope="col">Thời gian tạo</th>
                                <th scope="col">Tên doanh nghiệp</th>
                                <th scope="col">Loại doanh nghiệp</th>
                                <th>Duyệt</th>
                            </tr>
                        </thead>
                        <tbody>
                            {enterprises.map((etp) => (
                                <tr key={etp.id}>
                                    <td>{format(new Date(etp.createAt), 'dd/MM/yyyy HH:mm')}</td>
                                    <td>{etp.enterpriseName}</td>
                                    <td>{etp.typeEnterpriseDetailName}</td>
                                    <td>
                                        <button
                                            className="btn btn-info"
                                            onClick={() => handleAccept(etp.accountEnterpriseId)}
                                        >
                                            Cho phép
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </>
    );
}

export default AdminList;
