const React = require('react');
const NoteEdit = require('./NoteEdit');

/**
 * A button which expands into a form for writing a new notebook.
 */
class NoteNew extends React.Component {
  constructor(props) {
    super(props);
    // Set initial internal state for this component
    this.state = { editing: false };
  }

  render() {
    const openEdit = () => {
      this.setState({ editing: true });
    };
    // if dont have this const close edit => when click add new notebook.
    // => no action
    const closeEdit = () => {
      this.setState({ editing: false });
    };

    const createNote = (newNote) => {
      this.setState({editing:false});
      this.props.createNote(newNote)
    };

      //to switch to edit mode when editing is clicked.
    if(this.state.editing) {
      // Render component for editing the notebook
      return (
        <NoteEdit
          notebookId={this.props.notebookId}

         onSave={createNote}
          onCancel={closeEdit}
        />

      );
    }
    return (
      <button className="blog-load-more btn btn-primary btn-lg"
        onClick={ openEdit }
      >
        <span className="fa fa plus"></span>Add a new note</button>
    );
  }
}

module.exports = NoteNew;