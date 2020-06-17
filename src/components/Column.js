import React from 'react';
import './Column.scss';
import PropTypes from 'prop-types';
import Card from './Card';
import EditColumnTitle from './editing/EditColumnTitle';
import ColumnSettings from './settings/ColumnSettings';

class Column extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      cards: new Map(),
      isChangedTag: false,
      settingsClicked: false,
    };
  }

  handleAddCard = () => {
    const { cards } = this.state;
    const id = `Column${Math.floor(Math.random() * 1000000)}`;
    if (!cards.has(id)) {
      cards.set(id, <Card key={id} handleDeleteCard={this.handleDeleteCard} id={id} />);
    }

    this.setState({
      cards,
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

  handleSettings = () => {
    this.setState({
      settingsClicked: !this.state.settingsClicked,
    });
  }

  handleDeleteCard = (id) => {
    const { cards } = this.state;
    cards.delete(id.target.id);
    this.setState({ cards });
  }

  render() {
    const classesCardField = ['card-field'];
    const cards = [];
    this.state.cards.forEach((col) => cards.push(col));

    if (this.state.cards.length === 0) {
      classesCardField.push('card-field-default');
    }
    const changeTag = true;

    let columnOrSettings;
    if (this.state.settingsClicked) {
      columnOrSettings = (
        <ColumnSettings
          handleSettings={this.handleSettings}
          handleDeleteColumn={this.props.handleDeleteColumn}
          id={this.props.id}
        />
      );
    } else {
      columnOrSettings = (
        <div className="column bg-primary">
          <EditColumnTitle
            title={this.state.title}
            changeTag={changeTag}
            handleSubmit={this.handleSubmit}
            handleChange={this.handleChange}
            handleChangeTag={this.handleChangeTag}
            isChangedTag={this.state.isChangedTag}
            handleSettings={this.handleSettings}
          />
          <div className={classesCardField.join(' ')}>
            {cards}
            {
            this.state.title.length !== 0
              ? <button type="button" className="card-field-button" onClick={this.handleAddCard}>Add new card</button>
              : <button type="button" className="card-field-button">Add new card</button>
            }
          </div>
        </div>
      );
    }

    return columnOrSettings;
  }
}

Column.propTypes = {
  id: PropTypes.string.isRequired,
  handleDeleteColumn: PropTypes.func.isRequired,
};

export default Column;
