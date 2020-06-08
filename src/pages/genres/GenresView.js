import React, { Component } from 'react';
import GenresTable from './GenresTable';
import CreateGenreButton from './createGenre/CreateGenreButton';

class GenresView extends Component {

    render() {
        return (
            <div>
                <div style={{ marginBottom: 10 }}>
                    <CreateGenreButton />
                </div>
                <GenresTable />
            </div>
        );
    }
}

export default GenresView;

