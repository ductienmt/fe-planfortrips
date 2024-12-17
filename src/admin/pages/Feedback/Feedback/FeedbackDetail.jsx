import React, { useEffect, useState } from 'react';
import { Modal, Typography, Card, Rate, Space } from 'antd';
import { UserOutlined, CalendarOutlined, MessageOutlined, CommentOutlined } from '@ant-design/icons';
import { UserService } from '../../../../services/apis/UserService';

const { Text, Title } = Typography;

export default function FeedbackDetail({ open, setOpen, selectedTicket }) {
  const [user, setUser] = useState({});

  useEffect(() => {
    const fetchUserDetails = async () => {
      if (selectedTicket && selectedTicket.userName) {
        try {
          const userDetails = await UserService.findUserByUsername(selectedTicket.userName);
          setUser(userDetails);
        } catch (error) {
          console.error('Error fetching user details:', error);
        }
      }
    };

    if (open) {
      fetchUserDetails();
    }
  }, [open, selectedTicket]);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Modal
      title="Chi tiết Đánh giá"
      open={open}
      onCancel={handleClose}
      footer={null}
      centered
    >
      <Card 
        style={{ 
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
          borderRadius: '8px'
        }}
      >
        <Space direction="vertical" size="middle" style={{ width: '100%' }}>
          <div>
            <Text type="secondary"><UserOutlined style={{ marginRight: 8 }} />Người dùng:</Text>
            <Title level={5} style={{ margin: 0 }}>
              {user.fullName || selectedTicket?.userName || 'N/A'}
            </Title>
          </div>

          <div>
            <Text type="secondary"><CalendarOutlined style={{ marginRight: 8 }} />Ngày tạo:</Text>
            <Text style={{ marginRight: 8 }}>
              {selectedTicket?.createdAt 
                ? new Date(selectedTicket.createdAt).toLocaleDateString() 
                : 'N/A'}
            </Text>
          </div>

          <div>
            <Text type="secondary"><CommentOutlined style={{ marginRight: 8 }}/>Đánh giá:</Text>
            <Rate 
              disabled 
              value={selectedTicket?.rating || 0} 
              style={{ 
                color: '#faad14', 
                marginLeft: 8 
              }} 
            />
          </div>

          <div>
            <Text type="secondary"><MessageOutlined style={{ marginRight: 8 }} />Nội dung:</Text>
            <Text>
              {selectedTicket?.content || 'Chưa có nội dung đánh giá'}
            </Text>
          </div>
        </Space>
      </Card>
    </Modal>
  );
}