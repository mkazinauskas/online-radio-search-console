import React, { Component } from 'react';
import { Modal, Form, Input, message } from 'antd';
import Axios from 'axios';
import { connect } from 'react-redux';
import { API_URL } from '../../../AppConfig';
import { extractErrors } from '../../../utils/apiErrorUtils';

const ModalForm = ({ visible, onSubmit, onCancel, loading, errors }) => {

    const [form] = Form.useForm();

    if (errors.length > 0) {
        form.setFields(errors);
    }

    return (
        <Modal
            visible={visible}
            title="Export Radio Stations"
            okText="Upload"
            cancelText="Cancel"
            onCancel={onCancel}
            okButtonProps={{ disabled: loading }}
            onOk={() => {
                form
                    .validateFields()
                    .then(values => {
                        onSubmit(values);
                    })
                    .catch(console.debug);
            }}
        >
            <Form
                form={form}
                layout='vertical'
                initialValues={{
                    'page': 0,
                    'size': 10
                }}
            >
                <Form.Item label="Page" name="page" rules={
                    [
                        {
                            required: true,
                            message: 'Please enter page for export!'
                        }
                    ]
                }>
                    <Input type='page' />
                </Form.Item>
                <Form.Item label="Size" name="size" rules={
                    [
                        {
                            required: true,
                            message: 'Please enter size of items to export!'
                        }
                    ]
                }>
                    <Input type='size' />
                </Form.Item>
            </Form>
        </Modal>
    );
};

const DEFAULT_STATE = {
    loading: false,
    errors: []
}

class ExportStationsModal extends Component {

    state = {
        ...DEFAULT_STATE
    }

    handleSubmit = values => {
        this.setState({ loading: true, errors: [] });
        Axios({
            url: `${API_URL}/admin/radio-stations/exporter?size=${values.size}&page=${values.page}`,
            method: 'GET',
            headers: { Authorization: `Bearer ${this.props.token}` },
            responseType: 'blob'
        })
            .then(response => {
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', 'export.csv');
                document.body.appendChild(link);
                link.click();

                message.success({ content: `Radio stations were exported`, duration: 5 });
                this.props.onModalClose();
            })
            .catch((response) => {
                const errors = extractErrors(response)

                if (errors.length) {
                    this.setState({ ...this.state, loading: false, errors });
                } else {
                    message.error({ content: `Failed to export radio stations`, duration: 5 });
                    this.setState({ ...this.state, loading: false });
                }
            });
    };

    render() {
        return (
            <ModalForm
                visible={this.props.visible}
                loading={this.state.loading}
                onSubmit={this.handleSubmit}
                onGenreSearch={this.onGenreSearch}
                genres={this.state.genres}
                radioStation={this.props.radioStation}
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

export default connect(mapStateToProps)(ExportStationsModal);
