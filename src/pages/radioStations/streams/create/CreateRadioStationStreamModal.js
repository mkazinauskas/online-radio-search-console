import React, { Component } from 'react';
import { Modal, Form, Input, message } from 'antd';
import Axios from 'axios';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { isWebUri } from 'valid-url';
import { API_URL } from '../../../../AppConfig';
import { extractErrors } from '../../../../utils/apiErrorUtils';

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
            <Form form={form} layout='vertical'>
                <Form.Item label="URL" name='url' rules={
                    [
                        {
                            required: true,
                            message: 'Please input radio station stream title!'
                        },
                        {
                            validator: (error, value) => {
                                if (value === value.trim()) {
                                    return Promise.resolve();
                                } else {
                                    return Promise.reject('Value cannot have empty spaces around');
                                }
                            },
                        },
                        {
                            validator: (error, value) => {
                                if (isWebUri(value)) {
                                    return Promise.resolve();
                                } else {
                                    return Promise.reject('Radio station stream url is invalid');
                                }
                            },
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
    errors: []
}

class CreateRadioStationStreamModal extends Component {

    state = {
        ...DEFAULT_STATE
    }

    handleSubmit = values => {
        this.setState({ loading: true, errors: [] });
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
                    message.error({ content: 'Failed to add stream', duration: 5 });
                    this.setState({ ...this.state, loading: false });
                }
            })
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

export default connect(mapStateToProps)(withRouter(CreateRadioStationStreamModal));
