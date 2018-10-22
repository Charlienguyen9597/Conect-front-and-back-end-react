const React = require('react');
const _ = require('lodash');
const MarkdownEditor = require('./MarkdownEditor');

/**
 * A form for editing a notebook title.
 */
class NoteEdit extends React.Component {
  constructor(props) {
    super(props);


    this.state = {
      title: '',content:''
    };
  }

  render() {
    const revertAndStopEditing = (event) => {
      event.preventDefault();
      console.log('Cancel');
      this.props.onCancel();
    };

    const submitAndStopEditing = (event) => {
     event.preventDefault();
      // Creates a new noebook object and saves it.
      const editedNote =  {
        title: this.state.title,
        notebookId:this.props.notebookId,
        content:this.state.content
      }
      console.log(this.props.notebookId);
      this.props.onSave(editedNote);
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
            placeholder="Note title" onChange={onTitleChange}
          />
          <MarkdownEditor onChange={onContentChange} />
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

module.exports = NoteEdit;