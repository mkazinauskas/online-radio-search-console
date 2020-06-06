import React, { Component } from 'react';
import { Modal, Form, Input, message } from 'antd';
import Axios from 'axios';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { isWebUri } from 'valid-url';
import { API_URL } from '../../../../AppConfig';

const ModalForm = ({ visible, onCreate, onCancel, loading, errors }) => {

    const [form] = Form.useForm();

    if (errors.length > 0) {
        form.setFields(errors);
    }

    return (
        <Modal
            visible={visible}
            title="Create New Radio Station Stream"
            okText="Create"
            cancelText="Cancel"
            onCancel={onCancel}
            okButtonProps={{ disabled: loading }}
            onOk={() => {
                form
                    .validateFields()
                    .then(values => {
                        onCreate(values);
                    })
                    .catch(console.debug);
            }}
        >
            <Form
                form={form}
                labelCol={{ span: 5 }}
                wrapperCol={{ span: 12 }}
            >
                <Form.Item label="URL" url='url' rules={
                    [
                        {
                            required: true,
                            message: 'Please input radio station stream title!'
                        },
                        {
                            validator: (rule, value, callback) => {
                                if (value === value.trim()) {
                                    callback();
                                } else {
                                    callback(false);
                                }
                            },
                            message: 'Value cannot have empty spaces around',
                        },
                        {
                            validator: (rule, value, callback) => {
                                if (isWebUri(value)) {
                                    callback();
                                } else {
                                    callback(false);
                                }
                            },
                            message: 'Radio station stream url is invalid',
                        }
                    ]
                }>
                    <Input />
                </Form.Item>
            </Form>
        </Modal>
    );
};

const DEFAULT_STATE = {
    loading: false,
    successMessage: null,
    errorMessage: null
}

class AddRadioStationStreamModal extends Component {

    state = {
        ...DEFAULT_STATE
    }

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.setState({ loading: true, successMessage: null, errorMessage: null });
                const config = {
                    headers: {
                        Authorization: `Bearer ${this.props.token}`
                    }
                }

                const content = {
                    ...values
                }

                const radioStationId = this.props.match.params.radioStationId;

                Axios.post(`${API_URL}/admin/radio-stations/${radioStationId}/streams`, content, config)
                    .then(() => {
                        message.success({ content: `Radio station stream was added` })
                        this.props.onModalClose();
                    })
                    .catch((response) => {
                        const errors = extractErrors(response)

                        if (errors.length) {
                            this.setState({ ...this.state, loading: false, errors });
                        } else {
                            message.error({ content: 'ailed to add stream', duration: 5 });
                            this.setState({ ...this.state, loading: false });
                        }
                    })
            }
        });
    };

    render() {
        return (
            <ModalForm
                visible={this.props.visible}
                loading={this.state.loading}
                onCreate={this.handleSubmit}
                onCancel={this.props.onModalClose}
                errors={this.state.errors}
            />
        );
    }
}

const mapStateToProps = (state) => {
    return {
        token: state.auth.token
    }
}

export default connect(mapStateToProps)(withRouter(AddRadioStationStreamModal));
