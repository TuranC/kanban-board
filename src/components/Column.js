import React from 'react';
import './Column.scss';
import PropTypes from 'prop-types';
import Card from './Card';
import ColumnSettings from './settings/ColumnSettings';

let key = 0;
const colSetKey = 0;

class Column extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      cards: [],
      isChangedTag: false,
    };
  }

  handleAddCard = () => {
    this.setState({
      cards: this.props.cards.push('new card'),
    });
  }

  handleChangeTag = () => {
    this.setState({
      isChangedTag: !this.state.isChangedTag,
    });
  }

  handleChange = (event) => {
    this.setState({
      title: event.target.value,
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    if (this.state.title.length > 0) {
      this.setState({
        isChangedTag: true,
      });
    }
  }

  render() {
    const classesCardField = ['card-field'];
    const cards = this.props.cards.map((card) => (
      <Card cardText={card} key={`card${key++}`} />
    ));

    if (this.props.cards.length === 0) {
      classesCardField.push('card-field-default');
    }
    const changeTag = true;

    return (
      <div className="column bg-primary">
        <ColumnSettings
          title={this.state.title}
          changeTag={changeTag}
          handleSubmit={this.handleSubmit}
          handleChange={this.handleChange}
          handleChangeTag={this.handleChangeTag}
          isChangedTag={this.state.isChangedTag}

        />
        <div className={classesCardField.join(' ')}>
          {cards}
          <button type="button" className="card-field-button" onClick={this.handleAddCard}>Add new card</button>
        </div>
      </div>
    );
  }
}

Column.propTypes = {
  title: PropTypes.string.isRequired,
  cards: PropTypes.array.isRequired,
};

export default Column;
