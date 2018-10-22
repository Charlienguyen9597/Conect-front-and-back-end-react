const React = require('react');
const NoteEdit = require('./NoteEdit');
const NoteView = require('./NoteView');
  // start class Notebook
  class Note extends React.Component {

  render() {

    // this code is add for delete
    const deleteThisNote = () => {
    this.props.deleteNote(this.props.note.id);
    };

    return (
        <NoteView
        onDelete ={deleteThisNote}
        note={this.props.note}
        />
    );
    } // end render
} // end componnet

// Export the notebook component
module.exports = Note;