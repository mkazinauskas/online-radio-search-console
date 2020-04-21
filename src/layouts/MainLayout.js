import React, { Component } from 'react';
import LoadingApplicationLayout from './LoadingApplicationLayout';
import DefaultApplicationLayout from './DefaultApplicationLayout';
import { connect } from 'react-redux';
import ErrorApplicationLayout from './ErrorApplicationLayout';

class MainLayout extends Component {

  render() {
    if (this.props.error) {
      return (<ErrorApplicationLayout />);
    }
    if (this.props.loading) {
      return (<LoadingApplicationLayout />);
    }
    return (<DefaultApplicationLayout />);
  }
}

const mapStateToProps = (state) => {
  return {
    error: state.auth.error,
    loading: state.auth.loading,
  }
}

export default connect(mapStateToProps)(MainLayout);
