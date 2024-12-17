import { useState } from 'react';
import './FeedBack.css';
import { FeedbackService } from '../../../services/apis/FeedbackService';
import { CircularProgress } from '@mui/material';  
import { useSnackbar } from 'notistack';  

function Feedback({ planId ,accountEnterpriseId, accountEnterpriseName, nameService, typeService }) {
    const { enqueueSnackbar } = useSnackbar();  
    const [feedback, setFeedBack] = useState({
        content: "",
        rating: 0,
        username: sessionStorage.getItem('username'),
        accountEnterpriseId: accountEnterpriseId,
        planId : planId
    });

    const [loading, setLoading] = useState(false);  
    const [isFeedBack, setIsFeedBack] = useState(false);

    const handleRating = (rating) => {
        setFeedBack({
            ...feedback,
            rating: rating
        });
    };

    const validateFeedback = () => {
        if (!feedback.content.trim()) {
            enqueueSnackbar('Nội dung đánh giá không được để trống', { variant: 'error' });
            return false;
        }
        if (feedback.rating === 0) {
            enqueueSnackbar('Vui lòng chọn mức đánh giá', { variant: 'error' });
            return false;
        }
        return true;
    };

    const handleCreateFeedBack = async () => {
        if (!validateFeedback()) {
            return;
        }
        setLoading(true);  
        
        if (typeService == 'Hotel') {
            setFeedBack({
                ...feedback,
                content : nameService.map(room => room.room_name).join("-") + " -> " + feedback.content
            })
        }
        else {
            setFeedBack({
                ...feedback,
                content : nameService  + " -> " + feedback.content
            })
        }
        try {
            const res = await FeedbackService.createFeedback(feedback);     
            if (res == 201) {
                enqueueSnackbar(`Phản hồi cho ${accountEnterpriseName} thành công!`, { variant: 'success' });
                setIsFeedBack(true);
                resourceFeedBack(true);
            } else {
                enqueueSnackbar('Lỗi khi gửi phản hồi.', { variant: 'error' });
            }
        } catch (error) {
            // enqueueSnackbar('Đã xảy ra lỗi, vui lòng thử lại!', { variant: 'error' });
        } finally {
            setLoading(false);  // Stop loading
        }
    };

    return (
        <>
            <div className="feedback-content">
                <div className="feedback-container">
                    {isFeedBack ? <>
                        <img src="https://img.freepik.com/free-vector/hand-drawn-creative-thanks-supporting-rectangle-sticker_742173-9145.jpg?ga=GA1.1.1664133868.1732424221&semt=ais_hybrid" alt="" />
                    </> : <>
                        <div className="feedback-head">
                        <div className="feedback-heading">
                            <h1>Đánh giá doanh nghiệp <span className='text-info'>{accountEnterpriseName}</span></h1>
                        </div>
                        {/* <div className="feedback-close">
                            <div className="s s1"></div>
                            <div className="s s2"></div>
                        </div> */}
                    </div>

                    <div className="feedback-mid">
                        <div
                            className={`feedback-media ${feedback.rating === 1 ? 'feedback-active' : ''}`}
                            onClick={() => handleRating(1)}
                        >
                            <img src="https://cdn-icons-png.flaticon.com/128/3260/3260838.png" alt="angry" />
                        </div>
                        <div
                            className={`feedback-media ${feedback.rating === 2 ? 'feedback-active' : ''}`}
                            onClick={() => handleRating(2)}
                        >
                            <img src="https://cdn-icons-png.flaticon.com/128/42/42901.png" alt="moderate" />
                        </div>
                        <div
                            className={`feedback-media ${feedback.rating === 3 ? 'feedback-active' : ''}`}
                            onClick={() => handleRating(3)}
                        >
                            <img src="https://cdn-icons-png.flaticon.com/128/3260/3260877.png" alt="neutral" />
                        </div>
                        <div
                            className={`feedback-media ${feedback.rating === 4 ? 'feedback-active' : ''}`}
                            onClick={() => handleRating(4)}
                        >
                            <img src="https://cdn-icons-png.flaticon.com/128/569/569501.png" alt="smile" />
                        </div>
                        <div
                            className={`feedback-media ${feedback.rating === 5 ? 'feedback-active' : ''}`}
                            onClick={() => handleRating(5)}
                        >
                            <img src="https://cdn-icons-png.flaticon.com/128/1356/1356639.png" alt="happy" />
                        </div>
                    </div>

                    <div className="feedback-rating-text text-center">
                        {feedback.rating === 1 && <span className='fs-4 fw-bold text-danger'>Tệ</span>}
                        {feedback.rating === 2 && <span className='fs-4 fw-bold text-primary'>Không hài lòng</span>}
                        {feedback.rating === 3 && <span className='fs-4 fw-bold text-info'>Bình thường</span>}
                        {feedback.rating === 4 && <span className='fs-4 fw-bold text-success'>Tốt</span>}
                        {feedback.rating === 5 && <span className='fs-4 fw-bold text-warning'>Rất tốt</span>}
                    </div>

                    <div className="feedback-textarea">
                        <p>Đánh giá trải nghiệm của bạn với
                            <span className='ms-1 fs-4'>{typeService === 'hotel' ? <>
                                các phòng
                                <span className='ms-2'>{nameService.map(room => room.room_name).join("-")}</span>
                            </> :
                                <>
                                    xe
                                    <span className='ms-2'>{nameService}</span>
                                </>}
                            </span>
                        </p>
                        <textarea
                            className="feedback-textarea"
                            name="exp"
                            id="exp"
                            placeholder="Đánh giá"
                            onChange={(e) => setFeedBack({
                                ...feedback,
                                content: e.target.value
                            })}
                        />
                    </div>

                    <div className="feedback-end">
                        <div className="feedback-submission">
                            <button
                                className="feedback-sub btn"
                                onClick={handleCreateFeedBack}
                                style={{ width: 'fit-content' }}
                            >
                                {loading ? <CircularProgress size={24} /> : 'FeedBack'}
                            </button>
                        </div>
                    </div>
                    </>}
                </div>
            </div>
        </>
    );
}

export default Feedback;
