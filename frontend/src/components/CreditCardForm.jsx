import React, { useState } from "react";
import { Form, Input, Button, Row, Col } from "antd";
import { useNavigate } from "react-router";

const CreditCardForm = () => {
    const [form] = Form.useForm();
    const [disabledSave, setDisabledSave] = useState(true);
    const navigate = useNavigate();

    const validateExpiry = (e) => {
        let MM = e.target.value.replace(/[^0-9]/g, "").substring(0, 2);
        let YYYY = e.target.value.replace(/[^0-9]/g, "").substring(2, 6);

        const expiryFormatted =
            MM + (e.target.value.length > 2 ? "/" : "") + YYYY;

        return expiryFormatted;
    };

    const handleSubmitForm = async () => {
        await fetch("http://localhost:5500/record/add", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(form.getFieldsValue()),
        }).catch((e) => {
            window.alert(e);
            return;
        });

        form.resetFields();
        navigate("/");
    };

    const onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo);
    };

    const handleFieldsChange = () => {
        const hasErrors = form
            .getFieldsError()
            .some(({ errors }) => errors.length);
        setDisabledSave(hasErrors);
    };

    return (
        <div className="formWrapper">
            <Form
                form={form}
                name="form_for_card"
                layout="vertical"
                className="formContainer"
                onFinish={handleSubmitForm}
                onFinishFailed={onFinishFailed}
                onFieldsChange={handleFieldsChange}
            >
                <div className="cardTitle">Card details</div>
                <Form.Item
                    name="number"
                    rules={[
                        {
                            required: true,
                            pattern: new RegExp(/^[0-9]\d*$/, "g"),
                            message: "Invalid character",
                        },
                        {
                            required: true,
                            validator: (_, value) => {
                                if (!value || value.length < 16) {
                                    return Promise.reject(
                                        new Error("Invalid card number")
                                    );
                                } else {
                                    return Promise.resolve(value);
                                }
                            },
                        },
                    ]}
                    getValueFromEvent={(event) => {
                        return event.target.value.replace(/\D/g, "");
                    }}
                >
                    <Input
                        size="large"
                        placeholder="Card Number"
                        maxLength="16"
                    />
                </Form.Item>
                <Form.Item
                    name="name"
                    rules={[
                        {
                            required: true,
                            pattern: new RegExp(/^[A-Z\d]+(?: [A-Z\d]+)$/, "g"),
                            message: "Invalid card holder",
                        },
                    ]}
                    getValueFromEvent={(event) => {
                        return event.target.value
                            .toLocaleUpperCase()
                            .replace(/[^a-zA-Z+\s]+/g, "");
                    }}
                >
                    <Input size="large" placeholder="Card Holder" />
                </Form.Item>
                <Row gutter={24}>
                    <Col span={12}>
                        <Form.Item
                            name="expiry"
                            rules={[
                                {
                                    required: true,
                                    pattern: new RegExp(
                                        /^(0[1-9]|1[012])\/(20)\d{2}$/,
                                        "g"
                                    ),
                                    message: "Invalid expiration date",
                                },
                            ]}
                            getValueFromEvent={validateExpiry}
                        >
                            <Input
                                size="large"
                                placeholder="MM/YYYY"
                                maxLength="7"
                            />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            name="cvc"
                            rules={[
                                {
                                    required: true,
                                    pattern: new RegExp(/^[0-9]\d*$/, "g"),
                                    message: "Invalid character",
                                },
                                {
                                    required: true,
                                    validator: (_, value) => {
                                        if (!value || value.length < 3) {
                                            return Promise.reject(
                                                new Error("Invalid cvc")
                                            );
                                        } else {
                                            return Promise.resolve(value);
                                        }
                                    },
                                },
                            ]}
                            getValueFromEvent={(event) => {
                                return event.target.value.replace(/\D/g, "");
                            }}
                        >
                            <Input
                                size="large"
                                placeholder="CVC"
                                type="tel"
                                maxLength="3"
                            />
                        </Form.Item>
                    </Col>
                </Row>
                <Form.Item
                    name="amount"
                    rules={[
                        {
                            required: true,
                            pattern: new RegExp(/^[1-9]\d*$/, "g"),
                            message: "Invalid character",
                        },
                    ]}
                    getValueFromEvent={(event) => {
                        return event.target.value.replace(/\D/g, "");
                    }}
                >
                    <Input size="large" placeholder="Amount" />
                </Form.Item>
                <Form.Item shouldUpdate>
                    {({ getFieldsValue }) => {
                        const { number, name, cvc, expiry, amount } =
                            getFieldsValue();
                        const formIsComplete =
                            !!number && !!name && !!cvc && !!amount && !!expiry;
                        return (
                            <Button
                                type="primary"
                                size="large"
                                shape="round"
                                block
                                htmlType="submit"
                                disabled={!formIsComplete || disabledSave}
                            >
                                Pay
                            </Button>
                        );
                    }}
                </Form.Item>
            </Form>
        </div>
    );
};

export default CreditCardForm;
