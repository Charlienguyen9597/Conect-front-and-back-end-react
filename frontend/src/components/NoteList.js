const React = require('react');
const ReactRedux = require('react-redux');

const createActionDispatchers = require('../helpers/createActionDispatchers');
const notesActionCreators = require('../reducers/notes');
const NoteNew = require('./NoteNew');
const Note = require('./Note');

/*
  *** TODO: Build more functionality into the NotebookList component ***
  At the moment, the NotebookList component simply renders the notebooks
  as a plain list containing their titles. This code is just a starting point,
  you will need to build upon it in order to complete the assignment.
*/
class NoteList extends React.Component {
  render() {
    const createNoteListItem = (note) => {

      return (

          <li key={note.id}>
          <Note note={note} deleteNote={this.props.deleteNote}/>
          </li>
        )
      }






       return (
      <div>
        <h2>Notes</h2>
          <NoteNew
          createNote={this.props.createNote}
          notebookId={this.props.notebookId}/>
         <ul>
          {this.props.notes.data.map((note) => createNoteListItem(note))}
        </ul>
      </div>
    );
  }



}

const NoteListContainer = ReactRedux.connect(
  state => ({
    notes: state.notes
  }),
  createActionDispatchers(notesActionCreators)
)(NoteList);

module.exports = NoteListContainer;
