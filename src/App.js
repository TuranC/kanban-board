import React from 'react';
import './App.scss';
import Column from './components/Column';

let key = 0;

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      columns: [],
    };
  }

  handleAddColumn = () => {
    const columnsArray = [];
    const { columns } = this.state;
    columns.push(<Column key={`column${key++}`} />);

    for (const col of columns) {
      columnsArray.push(col);
    }

    this.setState({
      columns: columnsArray,
    });
  }

  render() {
    const { columns } = this.state;
    const initColumns = columns.map((col) => col);
    return (
      <div className="bg-secondary" id="kanban-board">
        <div className="kanban-board-inner">
          <div className="kanban-board-adaptive">
            {initColumns}
            <button type="button" className="kanban-board-button" onClick={this.handleAddColumn}>Add new column</button>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
