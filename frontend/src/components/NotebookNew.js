const React = require('react');
const NotebookEdit = require('./NotebookEdit');

/**
 * A button which expands into a form for writing a new notebook.
 */
class NotebookNew extends React.Component {
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

    const createNotebook = (newNotebook) => {
      this.setState({editing:false});
      this.props.createNotebook(newNotebook)
    };

      //to switch to edit mode when editing is clicked.
    if(this.state.editing) {
      // Render component for editing the notebook
      return (
        <NotebookEdit

          onSave={createNotebook}
          onCancel={closeEdit}
        />

      );
    }
    return (
      <button className="blog-load-more btn btn-primary btn-lg"
        onClick={ openEdit }
      >
        <span className="fa fa plus"></span>
        <i className="fa fa-plus-circle"></i>
          Add a new notebook </button>
    );
  }
}

module.exports = NotebookNew;