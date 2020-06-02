import React, { Component } from 'react';
import { Modal, Form, Alert, Upload, Button } from 'antd';
import {
    UploadOutlined,
} from '@ant-design/icons';
import Axios from 'axios';
import { connect } from 'react-redux';
import { API_URL } from '../../../AppConfig';

const DEFAULT_STATE = {
    loading: false,
    successMessage: null,
    errorMessage: null,
    file: null,
    uploading: false
}

class ImportStationsModal extends Component {

    state = {
        ...DEFAULT_STATE
    }

    onCancel = () => {
        this.props.form.resetFields();
        this.props.onModalClose();
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
            .then(() => this.setState({ ...this.state, successMessage: 'Radio stations were imported' }))
            .catch(() => this.setState({ ...this.state, errorMessage: 'Failed to import radio stations' }))
            .then(() => this.setState({ ...this.state, loading: false }));
    };

    render() {
        const { file } = this.state;

        const props = {
            multiple: false,
            onRemove: () => {
                this.setState(() => {
                    return {
                        file: null,
                    };
                });
            },
            beforeUpload: file => {
                this.setState(() => ({
                    file: file,
                }));
                return false;
            },
            fileList: file === null ? [] : [file],
        };


        const form = (
            <Upload {...props}>
                <Button>
                    <UploadOutlined /> Click to Upload
                </Button>
            </Upload>
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
                    title="Import Radio Stations"
                    visible={this.props.visible}
                    onCancel={this.onCancel}
                    okText='Upload'
                    onOk={this.onUpload}
                >
                    <div style={{ marginBottom: 10 }}>
                        {successMessage}
                        {errorMessage}
                    </div>
                    {form}
                </Modal>
            </span >
        );
    }
}

const form = Form.create({ name: 'coordinated' })(ImportStationsModal)

const mapStateToProps = (state) => {
    return {
        token: state.auth.token
    }
}

export default connect(mapStateToProps)(form);
