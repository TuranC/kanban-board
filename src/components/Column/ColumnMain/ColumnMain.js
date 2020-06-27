import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import EditColumnTitle from '../EditColumnTitle/EditColumnTitle';
import './ColumnMain.scss';

const ColumnMain = (props) => {
  const column = props.columns.get(props.columnId);
  const cards = [];
  column.cards.forEach((col) => cards.push(col));
  console.log('in ColumnMain', column);

  return (
    <div className="column">
      <div className="column-inner">
        <div className="column-title-and-settings">
          <EditColumnTitle
            handleClickedSetting={props.handleClickedSetting}
            columnId={props.columnId}
          />
        </div>
        <div className="column-cards">
          {cards}
          <button type="button" className="column-add-card" onClick={() => props.addCard(props.columnId)}>
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
  addCard: PropTypes.func.isRequired,
  columns: PropTypes.object,
  handleClickedSetting: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    columns: state.appReducer.columns,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    addCard: (id) => dispatch({ type: 'ADD_CARD', id }),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ColumnMain);
