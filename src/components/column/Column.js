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
    this.setState((prevState) => ({ settingsColumnClicked: !prevState.settingsColumnClicked }));
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

Column.defaultProps = {
  column: {
    cardIds: [],
    title: '',
    columnId: '',
  },
};

Column.propTypes = {
  column: PropTypes.shape({
    cardIds: PropTypes.arrayOf(PropTypes.string).isRequired,
    title: PropTypes.string.isRequired,
    columnId: PropTypes.string.isRequired,
  }),
  index: PropTypes.number.isRequired,
  handleDeleteColumn: PropTypes.func.isRequired,
};

export default connect()(Column);
