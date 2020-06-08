import React, { Component } from 'react';
import GenresTable from './GenresTable';
import CreateGenreButton from './createGenre/CreateGenreButton';
import { PageHeader } from 'antd';

class GenresView extends Component {

    render() {
        return (
            <div>
                <PageHeader title="Genres" />
                <div style={{ marginBottom: 10 }}>
                    <CreateGenreButton />
                </div>
                <GenresTable />
            </div>
        );
    }
}

export default GenresView;

