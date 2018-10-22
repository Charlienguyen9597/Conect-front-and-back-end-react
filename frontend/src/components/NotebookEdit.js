const React = require('react');
const _ = require('lodash');

/**
 * A form for editing a notebook title.
 */
class NotebookEdit extends React.Component {
  constructor(props) {
    super(props);


    this.state = {
      title: ''

    };
  }

  render() {
    const revertAndStopEditing = (event) => {
      event.preventDefault();

      this.props.onCancel();
    };

    const submitAndStopEditing = (event) => {
     event.preventDefault();
      // Creates a new noebook object and saves it.
      const editedNotebook = {
        title: this.state.title}

      this.props.onSave(editedNotebook);
    };

    const onTitleChange = (event) => {

      this.setState({ title: event.target.value });
    };

    const onContentChange = (event) => {
      this.setState({ content: event.target.value });
    };



    return (
      <form className="blog-post">
        {/* Title field */}
        <div className="form-group">
          <input className="form-control input-lg" value={this.state.title}
            placeholder="Notebook title" onChange={onTitleChange}
          />
        </div>

        {/* Save button */}
        <button className="btn btn-primary pull-right" onClick={submitAndStopEditing}>
          Save
        </button>
        {/* Cancel button */}
        <button className="btn btn-danger pull-right"
          style={{ marginRight: '12px' }}
          onClick={revertAndStopEditing}
        >
          Cancel
        </button>
      </form>
    );
  }
}

module.exports = NotebookEdit;