import { useEffect, useState } from 'react';
import './AdminList.css';
import AccountEtpService from '../../../../services/apis/AccountEnterprise';
import { format } from 'date-fns';

function AdminList({ title, enterprises, loading, handleAccept, message }) {


    return (
        <>
            {message && <div className="alert alert-info">{message}</div>}

            {loading ? (
                <div className="spinner-border" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            ) : (
                <div style={{ maxHeight: '20rem', overflow: 'auto' }}>
                    <h4>{title}</h4>
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
