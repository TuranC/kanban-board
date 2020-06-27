import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ColumnMain from './ColumnMain/ColumnMain';
import ColumnSetting from './ColumnSetting/ColumnSetting';
import Card from '../Card/Card';
import CardSetting from '../Card/CardSetting/CardSetting';

class Column extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      settingsClicked: false,
      cardId: '',
      editTitleClicked: true,
    };
  }

  handleEditTitleClicked = () => {
    this.setState((prevState) => ({
      editTitleClicked: !prevState.editTitleClicked,
    }));
  }

  handleClickedSetting = () => {
    this.setState((prevState) => ({
      settingsClicked: !prevState.settingsClicked,
    }));
  }

  handleAddCard = () => {
    const id = `Card:${Math.floor(Math.random() * 1000000)}`;
    this.props.addNewCard(<Card
      key={id}
      cardId={id}
      handleCardClicked={this.handleCardClicked}
      columnId={this.props.columnId}
    />, this.props.columnId, id);
  }

  handleCardClicked = (id) => {
    this.setState({
      cardId: id,
    });
    this.props.cardClicked(this.props.columnId);
  }

  render() {
    const column = this.props.columns.get(this.props.columnId);

    let whichRender = (
      <ColumnMain
        handleClickedSetting={this.handleClickedSetting}
        columnId={this.props.columnId}
        handleAddCard={this.handleAddCard}
        handleEditTitleClicked={this.handleEditTitleClicked}
        editTitleClicked={this.state.editTitleClicked}
      />
    );

    if (this.state.settingsClicked) {
      whichRender = (
        <ColumnSetting
          handleClickedSetting={this.handleClickedSetting}
          columnId={this.props.columnId}
        />
      );
    }

    return column.cardSettingsClicked
      ? (
        <CardSetting
          cardId={this.state.cardId}
          handleCardClicked={this.handleCardClicked}
          columnId={this.props.columnId}
        />
      )
      : whichRender;
  }
}

Column.propTypes = {
  columnId: PropTypes.string.isRequired,
  addNewCard: PropTypes.func.isRequired,
  cardClicked: PropTypes.func.isRequired,
  columns: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    columns: state.appReducer.columns,
  };
}

function mapDispatchtoProps(dispatch) {
  return {
    addNewCard: (card, columnId, cardId) => dispatch({
      type: 'ADD_CARD', card, columnId, cardId,
    }),
    cardClicked: (id) => dispatch({ type: 'CARD_CLICKED', id }),
  };
}

export default connect(mapStateToProps, mapDispatchtoProps)(Column);
