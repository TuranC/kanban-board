import React from 'react';
import { connect } from 'react-redux';
import { Droppable } from 'react-beautiful-dnd';
import PropTypes from 'prop-types';
import Card from '../../card/Card';
import './ColumnCardList.scss';

class ColumnCardList extends React.Component {
  getCards = (cards) => cards.map((card, index) => {
    const { column, handleDeleteCard } = this.props;
    return (
      <Card
        key={card.cardId}
        column={column}
        card={card}
        index={index}
        handleDeleteCard={handleDeleteCard}
      />
    );
  })

  render() {
    const { column, cardList, handleAddCard } = this.props;
    return (
      <div className="column-card-list">
        <Droppable droppableId={column.columnId} type="cards">
          {(provided) => (
            <>
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="column-card-list-inner"
                style={cardList.length === 0 ? { height: '50px' } : null}
              >
                {this.getCards(cardList)}
                {provided.placeholder}
              </div>
              <button type="button" className="column-main-add-card-button" onClick={handleAddCard}>Add Card</button>
            </>
          )}
        </Droppable>
      </div>
    );
  }
}

ColumnCardList.defaultProps = {
  column: {
    cardIds: [],
    title: '',
    columnId: '',
  },
  cardList: [],
  columns: {},
};

ColumnCardList.propTypes = {
  column: PropTypes.shape({
    cardIds: PropTypes.arrayOf(PropTypes.string).isRequired,
    title: PropTypes.string.isRequired,
    columnId: PropTypes.string.isRequired,
  }),
  cardList: PropTypes.arrayOf(PropTypes.shape({
    cardId: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
  })),
  handleAddCard: PropTypes.func.isRequired,
  handleDeleteCard: PropTypes.func.isRequired,
  columns: PropTypes.objectOf(PropTypes.shape({
    columnId: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    cardIds: PropTypes.arrayOf(PropTypes.string).isRequired,
  })),
};

function mapStateToProps(state) {
  return {
    cards: state.data.cards,
    columns: state.data.columns,
    columnOrder: state.data.columnOrder,
  };
}

export default connect(mapStateToProps)(ColumnCardList);
