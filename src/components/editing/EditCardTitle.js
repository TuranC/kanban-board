import React from 'react';
import PropTypes from 'prop-types';
import './EditCardTitle.scss';

class EditCardTitle extends React.Component {
  render() {
    const editCardTitleKey = Math.floor(Math.random() * 10000);
    const change = this.props.changeTag;
    const inputOrP = [<p key={`editCardTitleKey${editCardTitleKey}`}>{this.props.cardTitle}</p>];

    if (!this.props.isChangedTag) {
      if (change) {
        const form = (
          <form onSubmit={this.props.handleSubmit} className="card-form">
            <input
              type="text"
              onChange={this.props.handleChange}
              value={this.props.cardTitle}
              placeholder="write card title"
              className="card-input"
            />
            <button type="button" className="fas fa-check card-button-submit" />
          </form>
        );

        inputOrP.shift();
        inputOrP.push(form);
      }
    }

    return (
      <div className="card">
        {inputOrP}
      </div>
    );
  }
}

EditCardTitle.propTypes = {
  cardTitle: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  isChangedTag: PropTypes.bool.isRequired,
  changeTag: PropTypes.bool.isRequired,
};

export default EditCardTitle;
