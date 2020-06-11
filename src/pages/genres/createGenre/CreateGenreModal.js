import React, { Component } from 'react';
import { Modal, Form, Input, message } from 'antd';
import Axios from 'axios';
import { connect } from 'react-redux';
import { API_URL } from '../../../AppConfig';
import { extractErrors } from '../../../utils/apiErrorUtils';

const ModalForm = ({ visible, onAdd, onCancel, loading, errors }) => {

    const [form] = Form.useForm();

    if (errors.length > 0) {
        form.setFields(errors);
    }

    return (
        <Modal
            visible={visible}
            title="Create New Genre"
            okText="Create"
            cancelText="Cancel"
            onCancel={onCancel}
            okButtonProps={{ disabled: loading }}
            onOk={() => {
                form
                    .validateFields()
                    .then(values => {
                        onAdd(values);
                    })
                    .catch(console.debug);
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
                            message: 'Please input genre title!'
                        },
                        {
                            max: 300,
                            message: 'Genre title too long! (Max 50)'
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

class CreateGenreModal extends Component {

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

        Axios.post(API_URL + '/admin/genres', content, config)
            .then(() => {
                message.success({ content: `Genre '${values.title}' has been created`, duration: 3 });
                this.props.onModalClose();
            })
            .catch(( response ) => {
                const errors = extractErrors(response)

                if(errors.length){
                    this.setState({ ...this.state, loading: false, errors });
                } else {
                    message.error({ content: `Failed to create genre '${values.title}'`, duration: 5 });
                    this.setState({ ...this.state, loading: false });
                }
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

export default connect(mapStateToProps)(CreateGenreModal);
