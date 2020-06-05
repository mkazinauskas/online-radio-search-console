import React, { Component } from 'react';
import { Modal, Form, Input, message } from 'antd';
import Axios from 'axios';
import { connect } from 'react-redux';
import { API_URL } from '../../../AppConfig';
import { extractErrors as handleErrors } from '../../../utils/apiErrorUtils';

const ModalForm = ({ visible, onCreate, onCancel, loading, errors }) => {

    const [form] = Form.useForm();

    if (errors.length > 0) {
        form.setFields(errors);
    }

    return (
        <Modal
            visible={visible}
            title="Create New Radio Station"
            okText="Create"
            cancelText="Cancel"
            onCancel={onCancel}
            okButtonProps={{ disabled: loading }}
            onOk={() => {
                form
                    .validateFields()
                    .then(values => {
                        onCreate(values);
                    });
            }}
        >
            <Form
                form={form}
                labelCol={{ span: 5 }}
                wrapperCol={{ span: 12 }}
            >
                <Form.Item label='Title' name='title' rules={
                    [
                        {
                            required: true,
                            message: 'Please input radio station title!'
                        },
                        {
                            max: 100,
                            message: 'Title too long! (Max 100)'
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

class CreateRadioStationModal extends Component {

    state = {
        ...DEFAULT_STATE
    }

    onCreate = values => {
        this.setState({ loading: true, errors: [] });
        const config = {
            headers: {
                Authorization: `Bearer ${this.props.token}`
            }
        }

        const content = {
            ...values
        }

        Axios.post(API_URL + '/admin/radio-stations', content, config)
            .then(() => {
                message.success({ content: `Radio station '${values.title}' was created successfuly` })
                this.props.onModalClose();
            })
            .catch((response) => {
                const errors = handleErrors(response)

                if(errors.length){
                    this.setState({ ...this.state, loading: false, errors });
                } else {
                    message.error({ content: `Failed to create radio station '${values.title}'`, duration: 5 });
                    this.setState({ ...this.state, loading: false });
                }
            })
    };

    render() {
        return (
            <ModalForm
                visible={this.props.visible}
                loading={this.state.loading}
                onCreate={this.onCreate}
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

export default connect(mapStateToProps)(CreateRadioStationModal);
