import React from 'react';
import { Layout } from 'antd';

const year = new Date().getUTCFullYear();

export default () => (
    <Layout.Footer style={{ textAlign: 'center' }}>Online Radio Search ©{year}</Layout.Footer>
);