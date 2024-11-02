import React from 'react';
import FormManager from "../Manager/FormManager";

function UserManager() {
    const userColumns = [
        { label: "Mã", field: "id" },
        { label: "Tên", field: "name" },
        { label: "Email", field: "email" },
        { label: "Loại", field: "role" },
        { label: "Trạng thái", field: "status" },
    ];

    const userData = [
        { id: "U001", name: "Nguyễn Văn A", email: "a.nguyen@example.com", role: "Admin", status: true },
        { id: "U002", name: "Trần Thị B", email: "b.tran@example.com", role: "User", status: false },
        { id: "U003", name: "Lê Văn C", email: "c.le@example.com", role: "Moderator", status: true },
        { id: "U004", name: "Phạm Minh D", email: "d.pham@example.com", role: "User", status: true },
        { id: "U005", name: "Hoàng Thị E", email: "e.hoang@example.com", role: "Admin", status: false },
    ];

    const handleAction = (action, item) => {
        if (action === 'edit') {
            console.log('Edit:', item);
        } else if (action === 'delete') {
            console.log('Delete:', item);
        }
    };

    return (
        <div>
            <FormManager title="User Manager" data={userData} column={userColumns} fn={handleAction} type={'USER'} />
        </div>
    );
}

export default UserManager;
