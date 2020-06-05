import React, { Component } from 'react';
import { Modal, Form, message, Upload, Button } from 'antd';
import {
    UploadOutlined,
} from '@ant-design/icons';
import Axios from 'axios';
import { connect } from 'react-redux';
import { API_URL } from '../../../AppConfig';
import { extractErrors } from '../../../utils/apiErrorUtils';

const ModalForm = ({ visible, onSubmit, onCancel, loading, errors, file, onFileRemove, beforeUpload }) => {

    const [form] = Form.useForm();

    if (errors.length > 0) {
        form.setFields(errors);
    }

    const uploadProps = {
        multiple: false,
        onRemove: onFileRemove,
        beforeUpload: beforeUpload,
        fileList: file === null ? [] : [file],
    };

    return (
        <Modal
            visible={visible}
            title="Import Radio Stations"
            okText="Upload"
            cancelText="Cancel"
            onCancel={onCancel}
            okButtonProps={{ disabled: loading }}
            onOk={() => {
                form
                    .validateFields()
                    .then(values => {
                        onSubmit(values);
                    });
            }}
        >
            <Form
                form={form}
                labelCol={{ span: 5 }}
                wrapperCol={{ span: 12 }}
            >
                <Upload {...uploadProps}>
                    <Button>
                        <UploadOutlined /> Click to Upload
                </Button>
                </Upload>
            </Form>
        </Modal>
    );
};


const DEFAULT_STATE = {
    loading: false,
    file: null,
    uploading: false,
    errors: []
}

class ImportStationsModal extends Component {

    state = {
        ...DEFAULT_STATE
    }

    onCancel = () => {
        this.props.form.resetFields();

    }

    onUpload = () => {
        const formData = new FormData();
        formData.append('file', this.state.file);

        this.setState({
            uploading: true,
        });

        const config = {
            headers: {
                Authorization: `Bearer ${this.props.token}`,
                ContentType: 'multipart/form-data'
            }
        }

        Axios.post(API_URL + '/admin/radio-stations/importer', formData, config)
            .then(() => {
                message.success({ content: `Radio stations were uploaded`, duration: 5 });
                this.props.onModalClose();
            })
            .catch((response) => {
                const errors = extractErrors(response)

                if (errors.length) {
                    this.setState({ ...this.state, loading: false, errors });
                } else {
                    message.error({ content: `Failed to upload radio stations`, duration: 5 });
                    this.setState({ ...this.state, loading: false });
                }
            });
    };

    render() {
        return (
            <ModalForm
                visible={this.props.visible}
                loading={this.state.loading}
                onSubmit={this.onUpload}
                onGenreSearch={this.onGenreSearch}
                genres={this.state.genres}
                radioStation={this.props.radioStation}
                onCancel={this.props.onModalClose}
                errors={this.state.errors}
                file={this.state.file}
                onFileRemove={() => this.setState({ ...this.state, file: null })}
                beforeUpload={file => this.setState({ ...this.state, file })}
            />
        );
    }
}

const mapStateToProps = (state) => {
    return {
        token: state.auth.token
    }
}

export default connect(mapStateToProps)(ImportStationsModal);
