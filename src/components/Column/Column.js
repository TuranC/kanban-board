import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './Column.scss';
import ColumnMain from './ColumnMain/ColumnMain';
import ColumnSetting from './ColumnSetting/ColumnSetting';

class Column extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      settingsClicked: false,
    };
  }

  handleClickedSetting = () => {
    this.setState((prevState) => ({
      settingsClicked: !prevState.settingsClicked,
    }));
  }

  render() {
    return this.state.settingsClicked
      ? (
        <ColumnSetting
          handleClickedSetting={this.handleClickedSetting}
          columnId={this.props.columnId}
        />
      )
      : (
        <ColumnMain
          handleClickedSetting={this.handleClickedSetting}
          columnId={this.props.columnId}
        />
      );
  }
}

Column.propTypes = {
  columnId: PropTypes.string.isRequired,
};

export default connect()(Column);
