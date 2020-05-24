import React, { Component } from 'react';
import { Modal, Form, Input, Alert } from 'antd';
import Axios from 'axios';
import { connect } from 'react-redux';
import { API_URL } from '../../../AppConfig';

const DEFAULT_STATE = {
    loading: false,
    successMessage: null,
    errorMessage: null
}

class ExportStationsModal extends Component {

    state = {
        ...DEFAULT_STATE
    }

    handleSubmit = e => {
        e.preventDefault();
        this.setState({ loading: true, successMessage: null, errorMessage: null });
        this.props.form.validateFields((err, values) => {
            if (!err) {
                Axios({
                    url: `${API_URL}/admin/radio-stations/exporter?size=${values.size}&page=${values.page}`,
                    method: 'GET',
                    headers: { Authorization: `Bearer ${this.props.token}` },
                    responseType: 'blob'
                })
                    .then((response) => {
                        const url = window.URL.createObjectURL(new Blob([response.data]));
                        const link = document.createElement('a');
                        link.href = url;
                        link.setAttribute('download', 'export.csv');
                        document.body.appendChild(link);
                        link.click();
                        this.setState({ ...this.state, successMessage: 'Radio Stations were exported' })
                    })
                    .catch(() => this.setState({ ...this.state, errorMessage: 'Radio Stations failed to export' }))
                    .then(() => this.setState({ ...this.state, loading: false }));
            }
        });
    };

    onCancel = () => {
        this.props.form.resetFields();
        this.props.onModalClose();
    }

    render() {
        const { getFieldDecorator } = this.props.form;

        const form = (
            <Form labelCol={{ span: 5 }} wrapperCol={{ span: 12 }} onSubmit={this.handleSubmit}>
                <Form.Item label="Page">
                    {getFieldDecorator('page', {
                        initialValue: 0,
                        rules: [{ required: true, message: 'Please enter page for export!' }],
                    })(<Input type='page' />)}
                </Form.Item>
                <Form.Item label="Size">
                    {getFieldDecorator('size', {
                        initialValue: 10,
                        rules: [{ required: true, message: 'Please enter size of items to export!' }],
                    })(<Input type='size' />)}
                </Form.Item>
            </Form>
        );

        const successMessage = this.state.successMessage
            ? (<Alert message={this.state.successMessage} showIcon type="success" />)
            : '';

        const errorMessage = this.state.errorMessage
            ? (<Alert message={this.state.errorMessage} showIcon type="error" />)
            : '';
        return (
            <span>
                <Modal
                    title="Export Radio Stations"
                    visible={this.props.visible}
                    okText="Export"
                    okButtonProps={{ disabled: this.state.loading }}
                    onOk={this.handleSubmit}
                    onCancel={this.onCancel}
                >
                    <div style={{ marginBottom: 10 }}>
                        {successMessage}
                        {errorMessage}
                    </div>
                    {form}
                </Modal>
            </span>
        );
    }
}

const form = Form.create({ name: 'coordinated' })(ExportStationsModal)

const mapStateToProps = (state) => {
    return {
        token: state.auth.token
    }
}

export default connect(mapStateToProps)(form);
