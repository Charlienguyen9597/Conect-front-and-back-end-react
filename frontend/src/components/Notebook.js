const React = require('react');
const NotebookEdit = require('./NotebookEdit');
const NotebookView = require('./NotebookView');
  // start class Notebook
  class Notebook extends React.Component {

  render() {

    // this code is add for delete
    const deleteThisNotebook = () => {
    this.props.getDeleteId(this.props.notebook.id);
    this.props.deleteNotebook(this.props.notebook.id);
    };

    return (
        <NotebookView
        notebook ={this.props.notebook}
        onDelete ={deleteThisNotebook}
        getNotes={this.props.getNotes}

        />
    );
    } // end render
} // end componnet

// Export the notebook component
module.exports = Notebook;