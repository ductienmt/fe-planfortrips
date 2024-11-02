import React, { useState, useEffect, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function FormManager({ title, data, column, fn, type }) {
    const [isCreate, setIsCreate] = useState(false);
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        role: 'USER',
    });
    const [filter, setFilter] = useState(""); // Thêm trạng thái filter

    const usernameRef = useRef(null);

    const toogleIsCreate = () => {
        setIsCreate(!isCreate);
    };

    useEffect(() => {
        if (isCreate && usernameRef.current) {
            usernameRef.current.focus();
        }
    }, [isCreate]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('User created:', formData);
        setIsCreate(false);
    };

    const handleFilterChange = (e) => {
        setFilter(e.target.value);
        // Logic xử lý dữ liệu sau khi chọn bộ lọc
        console.log("Selected filter:", e.target.value);
    };

    return (
        <div className="container mt-4">
            <div className="admin-form-filter">
                <div className="admin__homepage-nav">
                    <div className="admin__homepage-nav-container d-flex justify-content-between">
                        <div className="admin__homepage-nav-left">
                            <h3 className='text-white fw-bold'>Dashboard</h3>
                        </div>
                        {type === 'ENTERPRISE' &&  <div className="admin__homepage-nav-right">
                            <div className="admin__homepage-nav-right-container d-flex">
                                <div className="p-2">
                                    <button className='btn px-3 py-1'>Lọc</button>
                                </div>
                                <select className='form-control' value={filter} onChange={handleFilterChange} style={{cursor: 'pointer'}}> 
                                    <option value="">PHƯƠNG TIỆN</option>
                                    <option value="food">ĂN UỐNG</option>
                                    <option value="accommodation">NƠI Ở</option>
                                </select>
                            </div>
                        </div>}
                    </div>
                </div>
            </div>

            <h2 className="text-center mb-4">{title}</h2>
            <table className="table table-hover table-striped table-bordered">
                <thead className="thead-dark">
                    <tr>
                        <th>#</th>
                        {column.map((col, idx) => (
                            <th key={idx}>{col.label}</th>
                        ))}
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {data && data.length > 0 ? (
                        data.map((item, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                {column.map((col, idx) => (
                                    <td key={idx}>
                                        {col.field === "status" ? (item[col.field] ? "Hoạt động" : "Ngừng hoạt động") : item[col.field]}
                                    </td>
                                ))}
                                <td>
                                    <button
                                        className="btn btn-primary btn-sm me-2"
                                        onClick={() => fn('edit', item)}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="btn btn-danger btn-sm me-2"
                                        onClick={() => fn('delete', item)}
                                    >
                                        Delete
                                    </button>
                                    <button
                                        className={`btn btn-sm ${item.status ? 'btn-warning' : 'btn-success'}`}
                                    >
                                        {item.status ? 'Tạm dừng' : 'Mở hoạt động'}
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={column.length + 2} className="text-center">No data available</td>
                        </tr>
                    )}
                </tbody>
            </table>

            {(type !== 'ENTERPRISE' && type) && (
                <button className='btn btn-primary' onClick={toogleIsCreate}>
                    {isCreate ? 'Đóng' : 'Thêm'}
                </button>
            )}

            {isCreate && (
                <form onSubmit={handleSubmit} className="admin-user-form m-2 mt-4 mx-2">
                    <div className="admin-user-form-title">
                        <h3 className='fw-bold text-uppercase'>Tạo người dùng</h3>
                    </div>
                    <div className="admin-user-form-body row">
                        <div className="admin-user-form__left admin__w-60">
                            <div className="form-group">
                                <label htmlFor="username" className="form-label">Username</label>
                                <input
                                    name='username'
                                    id='username'
                                    type="text"
                                    className="form-control"
                                    value={formData.username}
                                    onChange={handleInputChange}
                                    ref={usernameRef}
                                />
                            </div>
                            <div className="form-group mt-2">
                                <label htmlFor="password" className="form-label">Password</label>
                                <input
                                    name='password'
                                    id='password'
                                    type="password"
                                    className="form-control"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>
                        <div className="admin-user-form__right admin__w-40 d-flex justify-content-between flex-column">
                            <div className="form-group">
                                <label htmlFor="role" className='form-label'>Quyền</label>
                                <select
                                    name="role"
                                    className="form-control"
                                    id="role"
                                    value={formData.role}
                                    onChange={handleInputChange}
                                >
                                    <option value="USER">USER</option>
                                    <option value="ADMIN">ADMIN</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <button type="submit" className='btn btn-outline-info'>Thêm người dùng</button>
                            </div>
                        </div>
                    </div>
                </form>
            )}
        </div>
    );
}

export default FormManager;
