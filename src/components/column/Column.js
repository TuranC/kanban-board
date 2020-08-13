import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './Column.scss';
import ColumnSettings from './columnSettings/ColumnSettings';
import ColumnMain from './columnMain/ColumnMain';

class Column extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      settingsColumnClicked: false,
    };
  }

  handleSettingsColumnClicked = () => {
    this.setState({
      settingsColumnClicked: !this.state.settingsColumnClicked,
    });
  }

  render() {
    const {
      column, index, handleDeleteColumn,
    } = this.props;
    const { settingsColumnClicked } = this.state;
    return (
      <Draggable draggableId={column.columnId} index={index}>
        {(provided) => (
          <div
            className="column"
            ref={provided.innerRef}
            {...provided.draggableProps}
          >
            <div className="column-inner">
              <div className="column-inner-all">
                {settingsColumnClicked === false
                  ? (
                    <ColumnMain
                      provided={provided}
                      columnId={column.columnId}
                      column={column}
                      handleSettingsColumnClicked={this.handleSettingsColumnClicked}
                    />
                  )
                  : (
                    <ColumnSettings
                      provided={provided}
                      column={column}
                      handleDeleteColumn={handleDeleteColumn}
                      handleSettingsColumnClicked={this.handleSettingsColumnClicked}
                    />
                  )}
              </div>
            </div>
          </div>
        )}
      </Draggable>
    );
  }
}

Column.propTypes = {
  column: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  handleDeleteColumn: PropTypes.func.isRequired,
};

export default connect()(Column);
