const _ = require('lodash');
const api = require('../helpers/api');

const noteActionCreator = require('./notes')

// Action type constants
/* *** TODO: Put action constants here *** */
const INSERT ='insert';
const  REMOVE ='remove';

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

      const unsortedNotebooks = _.concat(state.data, action.notebooks);

      const visibleNotebooks = _.orderBy(unsortedNotebooks, 'createdAt','desc');
      // return update state
      console.log('Insert reducer at notebook');
      return _.assign({}, state, { data:visibleNotebooks} );
  }
    // Removes a single notebook from the visible notebook list
    case REMOVE: {
      const visibleNotebooks = _.reject(state.data, {id: action.id});
      console.log(visibleNotebooks);
      return _.assign({}, state, { data:visibleNotebooks });
    }

    default: return state;
  }
}

// Action creators
/* *** TODO: Put action creators here *** */

// Inserts notebook into the notebook list
reducer.insertNotebooks = (notebooks) => {
  return { type: INSERT, notebooks };
};
// Removes a notebooks from the visible notebook list
reducer.removeNotebook = (id) => {
  return { type: REMOVE, id };
};

// Attempts to delete a notebook from the server and removes it from the visible
// notebook list if successful
reducer.deleteNotebook = (notebookId) => {
   //  Add code to perform delete
   return (dispatch) =>{
     api.delete('/notebooks/'+notebookId).then(()=>{
       // delete notebooks
        dispatch(reducer.removeNotebook(notebookId));
     }).catch((err)=>{
       alert(err.message);
     });
   };
};

// Attempts to update a notebook on the server and updates local notebook data if
// successful
// reducer.saveNotebook = (editedNotebook, callback) => {
//   return (dispatch) => {
//     api.put('/notebooks/' + editedNotebook.id, editedNotebook).then((notebook) => {
//       // Saves local notebook.
//       dispatch(reducer.changeNotebook(notebook));
//       callback();
//     }).catch(() => {
//       alert('Failed to save notebook.  Are all of the fields filled in correctly?');
//     });
//   };
// };

// Attempts to create a notebook on the server and inserts it into the local notebook
// list if successful
reducer.createNotebook = (newNotebook, callback) => {
  return (dispatch) => {
    api.post('/notebooks', newNotebook).then((notebook) => {
      // This notebook is one that the store returns us! It has notebook id incremented to the next available id
      console.table(notebook);
      dispatch(reducer.insertNotebooks(notebook));
    }).catch((error) => {
      alert(error.message);
    });
  };
};


reducer.getNotes = (notebookId) => {
  return (dispatch) => {
  dispatch(noteActionCreator.getNotes(notebookId));
  }
}


// Export the action creators and reducer
module.exports = reducer;
