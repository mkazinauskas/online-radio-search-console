import React, { Component } from 'react';
import { Modal, Form, Input, Alert } from 'antd';
import Axios from 'axios';
import { connect } from 'react-redux';
import { API_URL } from './../../../AppConfig';

const DEFAULT_STATE = {
    loading: false,
    errorMessage: null
}

class AddSongModal extends Component {

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
            .then(this.onCancel)
            .catch(() => this.setState({ ...this.state, loading: false, errorMessage: 'Failed to add song...' }));
    };

    onCancel = () => {
        this.props.onModalClose();
    }

    render() {
        const form = (
            <Form onFinish={this.onFinish} labelCol={{ span: 5 }} wrapperCol={{ span: 12 }} >
                <Form.Item label='Title' name='title' rules={[{ required: true, message: 'Please input song title!' }]}>
                    <Input />
                </Form.Item>
            </Form>
        );

        const errorMessage = this.state.errorMessage
            ? (<Alert message={this.state.errorMessage} showIcon type="error" />)
            : '';
        return (
            <span>
                <Modal
                    title="Add New Song"
                    visible={this.props.visible}
                    okText="Add"
                    okButtonProps={{ disabled: this.state.loading }}
                    onOk={form.on}
                    onCancel={this.onCancel}
                >
                    <div style={{ marginBottom: 10 }}>
                        {errorMessage}
                    </div>
                    {form}
                </Modal>
            </span>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        token: state.auth.token
    }
}

export default connect(mapStateToProps)(AddSongModal);
