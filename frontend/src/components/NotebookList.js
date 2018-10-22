const React = require('react');
const ReactRedux = require('react-redux');

const createActionDispatchers = require('../helpers/createActionDispatchers');
const notebooksActionCreators = require('../reducers/notebooks');
const NotebookNew = require('./NotebookNew');
const Notebook = require('./Notebook');
const NoteList = require('./NoteList');

/*
  *** TODO: Build more functionality into the NotebookList component ***
  At the moment, the NotebookList component simply renders the notebooks
  as a plain list containing their titles. This code is just a starting point,
  you will need to build upon it in order to complete the assignment.
*/
class NotebookList extends React.Component {
   constructor(props){
     super(props);
     this.state={showNote:false,showNotebookId:''};
   }


  render() {

    const getNotes =(id)=>{
      this.setState({showNote:true,showNotebookId:id});
      this.props.getNotes(id);
    }
    const getDeleteId=(deleteId) =>{
        if(this.state.showNotebookId===deleteId) {
           this.setState({showNote:false})
        }
    }
    const createNotebookListItem = (notebook) => {
    return (
        <li key={notebook.id}>
         <Notebook notebook={notebook} deleteNotebook={this.props.deleteNotebook} getNotes={getNotes} getDeleteId={getDeleteId}/>
        </li>
      )
    }

    return (
      <div>
        <h2>Notebooks</h2>
        <NotebookNew createNotebook={this.props.createNotebook}/>
        <ul>
          {this.props.notebooks.data.map(createNotebookListItem)}
        </ul>
       {this.state.showNote && <NoteList notebookId={this.state.showNotebookId} /> }
      </div>
    );
  }
}

const NotebookListContainer = ReactRedux.connect(
  state => ({
    notebooks: state.notebooks
  }),
  createActionDispatchers(notebooksActionCreators)
)(NotebookList);

module.exports = NotebookListContainer;
