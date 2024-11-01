import React from 'react';
import './formenterprise.css';

const FormenterpriseComponent = () => {
    return (
        <main className="formenterprise-main-wrapper">
            <section className="formenterprise-content-section-container">
                <div className="formenterprise-text-content-container">
                    <h1 className="formenterprise-headline-text">Kế nối với chúng tôi</h1>
                    <p className="formenterprise-subheadline-text">
                        Cùng nhau làm việc, Cùng <br /> nhau thành công
                    </p>
                    <img
                        className="formenterprise-image-content"
                        src="https://th.bing.com/th/id/OIF.f2Sc1E0nw2QlD8EPIQXz5g?rs=1&pid=ImgDetMain"
                    />
                </div>
                <form className="formenterprise-form-section-container">
                    <h2 className="formenterprise-form-title-text">Thông tin doanh nghiệp</h2>

                    <label className="formenterprise-input-field-container">
                        Username
                        <input type="text" name="username" className="formenterprise-input-field" />
                    </label>

                    <label className="formenterprise-input-field-container">
                        Password
                        <input type="password" name="password" className="formenterprise-input-field" />
                    </label>

                    <label className="formenterprise-input-field-container">
                        Phone Number
                        <input type="text" name="phone-number" className="formenterprise-input-field" />
                    </label>

                    <label className="formenterprise-input-field-container">
                        Enterprise Name
                        <input type="text" name="enterprise-name" className="formenterprise-input-field" />
                    </label>

                    <label className="formenterprise-input-field-container">
                        Representative
                        <input type="text" name="representative" className="formenterprise-input-field" />
                    </label>

                    <label className="formenterprise-input-field-container">
                        Tax Code
                        <input type="text" name="tax-code" className="formenterprise-input-field" />
                    </label>

                    <label className="formenterprise-input-field-container">
                        Additional Info
                        <input type="text" name="additional-info" className="formenterprise-input-field" />
                    </label>

                    <button type="submit" className="formenterprise-submit-button">Gữi</button>
                </form>
            </section>
        </main>
    );
};

export default FormenterpriseComponent;
