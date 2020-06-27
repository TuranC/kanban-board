import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import EditColumnTitle from '../EditColumnTitle/EditColumnTitle';
import './ColumnMain.scss';

const ColumnMain = (props) => {
  const column = props.columns.get(props.columnId);
  const cards = [];
  column.cards.forEach((col) => cards.push(col.component));

  return (
    <div className="column">
      <div className="column-inner">
        <div className="column-title-and-settings">
          <EditColumnTitle
            handleClickedSetting={props.handleClickedSetting}
            columnId={props.columnId}
            handleEditTitleClicked={props.handleEditTitleClicked}
            editTitleClicked={props.editTitleClicked}
          />
        </div>
        <div className="column-cards">
          {cards}
          <button type="button" className="column-add-card" onClick={props.handleAddCard}>
            <i className="fas fa-plus" />
            &nbsp;
            Add Card
          </button>
        </div>
      </div>
    </div>
  );
};

ColumnMain.propTypes = {
  columnId: PropTypes.string.isRequired,
  columns: PropTypes.object,
  handleClickedSetting: PropTypes.func.isRequired,
  handleAddCard: PropTypes.func.isRequired,
  handleEditTitleClicked: PropTypes.func.isRequired,
  editTitleClicked: PropTypes.bool.isRequired,
};

function mapStateToProps(state) {
  return {
    columns: state.appReducer.columns,
  };
}

export default connect(mapStateToProps)(ColumnMain);
