import React, { Component } from 'react';
import { Modal, Form, message, Upload, Button, Switch } from 'antd';
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
        listType: "text",
        multiple: false,
        onRemove: onFileRemove,
        beforeUpload: file => {
            beforeUpload(file);
            return false;
        },
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
                    })
                    .catch(() => { return false; });
            }}
        >
            <Form
                form={form}
                layout="horizontal"
            >
                <Form.Item label="Import Unique Id's" name="importUniqueIds" valuePropName="checked">
                    <Switch/>
                </Form.Item>
                <Form.Item label="Radio Stations from '.csv'" name="file" rules={
                    [
                        {
                            required: true,
                            message: "Please select Radio stations .csv to upload"
                        }
                    ]
                }>
                    <Upload {...uploadProps}>
                        <Button><UploadOutlined />Click to Upload</Button>
                    </Upload>
                </Form.Item>
            </Form>
        </Modal>
    );
};


const DEFAULT_STATE = {
    loading: false,
    file: null,
    errors: []
}

class ImportStationsModal extends Component {

    state = {
        ...DEFAULT_STATE
    }

    onCancel = () => {
        this.props.form.resetFields();

    }

    onUpload = values => {
        if (!this.state.file) {
            return;
        }
        const formData = new FormData();
        formData.append('file', this.state.file);
        formData.append('importUniqueIds', values.importUniqueIds);

        this.setState({
            loading: true,
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

    onFileRemove = () => {
        this.setState({ ...this.state, file: null, errors: [] });
    }

    beforeUpload = file => {
        this.setState({ ...this.state, file });
    }

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
                onFileRemove={this.onFileRemove}
                beforeUpload={this.beforeUpload}
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
