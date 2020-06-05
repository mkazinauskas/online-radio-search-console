import React, { Component } from 'react';
import { Modal, Form, Input, message } from 'antd';
import Axios from 'axios';
import { connect } from 'react-redux';
import { API_URL } from '../../../AppConfig';

const ModalForm = ({ visible, onAdd, onCancel, loading, errors }) => {

    const [form] = Form.useForm();

    form.setFields(errors);

    return (
        <Modal
            visible={visible}
            title="Create New Song"
            okText="Create"
            cancelText="Cancel"
            onCancel={onCancel}
            okButtonProps={{ disabled: loading }}
            onOk={() => {
                form
                    .validateFields()
                    .then(values => {
                        onAdd(values);
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
                            message: 'Please input song title!'
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

class CreateSongModal extends Component {

    state = {
        ...DEFAULT_STATE
    }

    onFinish = values => {
        this.setState({ loading: true, errorMessage: null });
        const config = {
            headers: {
                Authorization: `Bearer ${this.props.token}`
            }
        }

        const content = {
            ...values
        }

        Axios.post(API_URL + '/admin/songs', content, config)
            .then(() => {
                message.success({ content: `Song '${values.title}' has been created`, duration: 3 });
                this.props.onModalClose();
            })
            .catch(({ response }) => {
                const { data } = response
                let errors = [];
                if (data && data.id === "FIELD_TITLE_ALREADY_EXISTS") {
                    errors.push({
                        name: 'title',
                        errors: [data.message],
                    });
                } else {
                    message.error({ content: 'Failed to add song.', duration: 10 });
                }

                this.setState({
                    ...this.state,
                    loading: false,
                    errors
                });

            });
    };

    render() {
        return (
            <ModalForm
                visible={this.props.visible}
                loading={this.state.loading}
                onAdd={this.onFinish}
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

export default connect(mapStateToProps)(CreateSongModal);