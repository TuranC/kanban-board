import React from 'react';
import './Column.scss';
import Card from './Card';
import EditColumnTitle from './editing/EditColumnTitle';

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
      cards.set(id, <Card key={id} />);
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
        <div className="column bg-primary">
          <div className="column-settings">
            <div className="column-settings-close">
              <i className="fas fa-times" onClick={this.handleSettings} />
            </div>
            <div className="column-settings-buttons">
              <button className="column-setting-button">Delete column</button>
              <button className="column-setting-button">some setting</button>
            </div>
          </div>
        </div>
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

export default Column;
