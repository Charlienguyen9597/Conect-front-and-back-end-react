const React = require('react');
const moment = require('moment');

/**
 * Render edit/delete buttons and post timestamp.
 *
 * List of props: post, time, onEdit, onDelete
 */
const NoteMeta = (props) => {
  return (
    <div className="note-meta">

      {/* Add a delete button */}
      <a role="button" title="Delete note"
          style={{ paddingRight: '8px' }}
           onClick={ props.onDelete }
                  >
            <span className="fa fa-remove" />
         </a>
    </div>
  );
};

/**
 * A read-only view of a blog post.
 * This is a stateless functional component.
 * It takes props as its args and returns what the render method would return.
 *
 * List of props: post, time, onEdit, onDelete
 */
const Content =(props)=>{
    return (
        <p>{props.content}</p>
    )
}

class NoteView extends React.Component {
   constructor(props) {
     super(props);
     this.state={showContent:false};
   }

  render() {
    const displayContent =()=>{
        const isShow =!this.state.showContent;
        this.setState({showContent:isShow});
    }
  return (
    <div className="newNote">
      <h2 className="note-title" onClick={displayContent}>{this.props.note.title}</h2>

      {/* Display notebook metadata */
       <NoteMeta {...this.props}/>}
     {this.state.showContent && <Content content={this.props.note.content}/> }
    </div>
  );
  }
};

module.exports = NoteView;
