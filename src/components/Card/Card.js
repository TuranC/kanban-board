import React from 'react';
import { connect } from 'react-redux';
import './Card.scss';

const Card = (props) => (
  <div className="card">
    <div className="card-title-and-settings">
      <p>card</p>
    </div>
  </div>
);

export default connect()(Card);
