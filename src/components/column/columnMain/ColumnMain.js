import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ColumnInput from '../columnInput/ColumnInput';
import ColumnCardList from '../columnCardList/ColumnCardList';
import './ColumnMain.scss';
import { ADD_CARD, DELETE_CARD } from '../../../redux/actionConst/actionConst';

class ColumnMain extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      editingColumnTitle: true,
    };
  }

  handleEditingColumnTitle = (isClicked) => {
    this.setState({
      editingColumnTitle: !isClicked,
    });
  }

  inputOrTitle = () => {
    const { column } = this.props;
    const { editingColumnTitle } = this.state;
    if (column.title !== '') {
      if (editingColumnTitle === true) {
        return false;
      }
      return true;
    }

    if (column.title === '') {
      if (editingColumnTitle === true) {
        return true;
      }
      return false;
    }
    return true;
  }

  handleAddCard = () => {
    const { dispatch, column } = this.props;
    dispatch({ type: ADD_CARD, columnId: column.columnId });
    this.setState({});
  }

  handleDeleteCard = (cardId) => {
    const { dispatch, column } = this.props;
    dispatch({
      type: DELETE_CARD,
      columnId: column.columnId,
      cardId,
    });
    this.setState({});
  }

  handleGetCards = () => {
    const { column, cards } = this.props;
    return column.cardIds.map((elemId) => cards[elemId]);
  }

  render() {
    const { column, provided, handleSettingsColumnClicked } = this.props;
    return (
      <>
        {this.inputOrTitle() ? (
          <ColumnInput
            provided={provided}
            handleEditingColumnTitle={this.handleEditingColumnTitle}
            column={column}
          >
            <ColumnCardList
              cardList={this.handleGetCards()}
              handleAddCard={this.handleAddCard}
              handleDeleteCard={this.handleDeleteCard}
              column={column}
            />
          </ColumnInput>
        )
          : (
            <>
              <div className="column-main" {...provided.dragHandleProps}>
                <h3 className="column-title">
                  <button
                    className="column-title-button"
                    type="button"
                    onClick={() => this.handleEditingColumnTitle(true)}
                    onKeyDown={() => this.handleEditingColumnTitle(true)}
                  >
                    {column.title}
                  </button>
                </h3>
                <button
                  type="button"
                  onClick={handleSettingsColumnClicked}
                  className="column-settings-button"
                >
                  <i className="fas fa-ellipsis-v" />
                </button>
              </div>
              <ColumnCardList
                cardList={this.handleGetCards()}
                handleAddCard={this.handleAddCard}
                handleDeleteCard={this.handleDeleteCard}
                column={column}
              />
            </>
          )}
      </>
    );
  }
}

ColumnMain.defaultProps = {
  column: {
    cardIds: [],
    title: '',
    columnId: '',
  },
  cards: {
    cardId: '',
    content: '',
  },
};

ColumnMain.propTypes = {
  column: PropTypes.shape({
    cardIds: PropTypes.arrayOf(PropTypes.string).isRequired,
    title: PropTypes.string.isRequired,
    columnId: PropTypes.string.isRequired,
  }),
  handleSettingsColumnClicked: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  provided: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  cards: PropTypes.objectOf(PropTypes.shape({
    cardId: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
  })),
};

function mapStateToProps(state) {
  return {
    cards: state.data.cards,
  };
}

export default connect(mapStateToProps)(ColumnMain);
