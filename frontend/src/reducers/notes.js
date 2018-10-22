const _ = require('lodash');
const api = require('../helpers/api');

// Action type constants
/* *** TODO: Put action constants here *** */
const INSERT ='insert-note';
const  REMOVE ='remove-note';
const SHOW_NOTES = 'shownotes';

const initialState = {
  data: [

  ]
};

// Function which takes the current data state and an action,
// and returns a new state
function reducer(state, action) {
  state = state || initialState;
  action = action || {};

  switch(action.type) {
    /* *** TODO: Put per-action code here *** */
    case INSERT:{
      // Add in the new notebooks
      // Notice that we do not need to increment the notebook id. Since thenotebook that we
      // are putting in is one that is returned by the api server which already has
      // the id incremented.

      const unsortedNotes = _.concat(state.data, action.notes);

      const visibleNotes = _.orderBy(unsortedNotes, 'createdAt','desc');
      // return update state
      const newState=_.assign({}, state, { data:visibleNotes} );
      console.log('at reducer notes');
      console.log(newState);
      return newState;
  }
    // Removes a single notebook from the visible notebook list
    case REMOVE: {
      const visibleNotes = _.reject(state.data, {id: action.id});
      return _.assign({}, state, { data:visibleNotes });
    }

    case SHOW_NOTES: {

      return _.assign({}, state, { data: action.notes} );
    }

    default: return state;
  }
}

// Action creators
/* *** TODO: Put action creators here *** */

// Inserts notebook into the notebook list
reducer.insertNotes = (notes) => {
  return { type: INSERT, notes };
};
// Removes a notebooks from the visible notebook list
reducer.removeNote = (id) => {
  return { type: REMOVE, id };
};

// Attempts to delete a notebook from the server and removes it from the visible
// notebook list if successful
reducer.deleteNote = (noteId) => {
   //  Add code to perform delete
   return (dispatch) =>{
     api.delete('/notes/'+noteId).then((note)=>{
       // delete notebooks
        dispatch(reducer.removeNote(noteId));
     }).catch(()=>{
       alert('Failed to delete note');
     });
   };
};

// Attempts to update a notebook on the server and updates local notebook data if
// successful
reducer.saveNote = (editedNote, callback) => {
  return (dispatch) => {
    api.put('/notes/' + editedNote.id, editedNote).then((note) => {
      // Saves local notebook.
      dispatch(reducer.changeNote(note));
      callback();
    }).catch(() => {
      alert('Failed to save note.  Are all of the fields filled in correctly?');
    });
  };
};

// Attempts to create a notebook on the server and inserts it into the local notebook
// list if successful
reducer.createNote = (newNote, callback) => {
  return (dispatch) => {
    api.post('/notes', newNote).then((note) => {
      // This notebook is one that the store returns us! It has notebook id incremented to the next available id
      console.log('At create Note');
      console.log(note);
      dispatch(reducer.insertNotes(note));
    }).catch((error) => {
      alert(error.message);
    });
  };
};

reducer.getNotes = (notebookId) => {
   return (dispatch) => {
      api.get('/notebooks/' + notebookId + '/notes').then(notes =>{
      console.log('In note reducer'+notebookId);
      dispatch({type: SHOW_NOTES, notes});
    })
  };
};

// Export the action creators and reducer
module.exports = reducer;
