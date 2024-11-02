import React from 'react';
import FormManager from "../Manager/FormManager";

function EnerpriseManager() {
    const enterpriseColumns = [
        { label: "Mã Doanh Nghiệp", field: "id" },
        { label: "Tên Doanh Nghiệp", field: "name" },
        { label: "Email", field: "email" },
        { label: "Loại", field: "type" },
        { label: "Trạng thái", field: "status" },
    ];

    const enterpriseData = [
        { id: "E001", name: "Công ty TNHH ABC", email: "contact@abc.com", type: "Nhà xe", status: true },
        { id: "E002", name: "Nhà hàng XYZ", email: "info@xyz.com", type: "Ăn uống", status: false },
        { id: "E003", name: "Khách sạn 123", email: "support@123.com", type: "Nơi ở", status: true },
        { id: "E004", name: "Nhà xe DEF", email: "hello@def.com", type: "Nhà xe", status: true },
        { id: "E005", name: "Nhà hàng GHI", email: "contact@ghi.com", type: "Ăn uống", status: false },
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
            <FormManager
                title="Enterprise Manager"
                data={enterpriseData}
                column={enterpriseColumns}
                fn={handleAction}
                type={'ENTERPRISE'}
            />
        </div>
    );
}

export default EnerpriseManager;
