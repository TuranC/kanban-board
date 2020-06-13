import React from 'react';
import PropTypes from 'prop-types';
import './ColumnSettings.scss';

class ColumnSettings extends React.Component {
  render() {
    let change = this.props.changeTag;
    const inputOrH3 = [
      <h3 className="text-center mt-2 column-title" onClick={this.props.handleChangeTag}>{this.props.title}</h3>,
      <i className="fas fa-ellipsis-v column-setting" />,
    ];

    if (!this.props.isChangedTag) {
      if (change) {
        const form = (
          <form onSubmit={this.props.handleSubmit} className="column-settings-form">
            <input
              type="text"
              value={this.props.title}
              placeholder="write title"
              className="column-input"
              onChange={this.props.handleChange}
            />
            <button type="submit" className="fas fa-check column-setting-check" />
          </form>
        );

        inputOrH3.shift();
        inputOrH3.shift();
        inputOrH3.push(form);
        change = false;
      }
    }

    return (
      <div className="column-settings-title">
        {inputOrH3}
      </div>
    );
  }
}

ColumnSettings.propTypes = {
  title: PropTypes.string.isRequired,
  changeTag: PropTypes.bool.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleChangeTag: PropTypes.func.isRequired,
  isChangedTag: PropTypes.bool.isRequired,
};

export default ColumnSettings;
