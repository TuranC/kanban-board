import React from 'react';
import './App.scss';
import Column from './components/Column';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      columns: new Map(),
    };
  }

  handleAddColumn = () => {
    const { columns } = this.state;
    const id = `Column${Math.floor(Math.random() * 1000000)}`;
    if (!columns.has(id)) {
      columns.set(id, <Column key={id} id={id} handleDeleteColumn={this.handleDeleteColumn} />);
    }
    this.setState({
      columns,
    });
  }

  handleDeleteColumn = (id) => {
    const { columns } = this.state;
    columns.delete(id.target.id);
    this.setState({ columns });
  }

  render() {
    const initColumns = [];
    this.state.columns.forEach((col) => initColumns.push(col));

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
