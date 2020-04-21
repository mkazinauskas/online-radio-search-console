import React from 'react';
import { Layout, Spin } from 'antd';

export default () => {
    return (
        <Spin tip="Loading..." size="large" >
            <Layout>
                <Layout.Content
                    style={{
                        background: '#fff',
                        minHeight: 120,
                    }}
                >
                </Layout.Content>
            </Layout>
        </Spin>
    )
};