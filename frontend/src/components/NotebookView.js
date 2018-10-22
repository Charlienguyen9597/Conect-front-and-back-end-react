const React = require('react');
const moment = require('moment');

/**
 * Render edit/delete buttons and post timestamp.
 *
 * List of props: post, time, onEdit, onDelete
 */
const NotebookMeta = (props) => {
  return (
    <div className="notebook-meta">

      {/* Add a delete button */}
      <a role="button" title="Delete notebook"
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
const NotebookView = (props) => {
  const showNotes = (e) => {
    e.preventDefault();

    props.getNotes(props.notebook.id);

  }
  return (
    <div className="newNotebook">
      <a role='button'
      onClick={showNotes}
      className="notebook-title">{props.notebook.title}</a>

      {/* Display notebook metadata */
       <NotebookMeta {...props}/>}

    </div>
  );
};

module.exports = NotebookView;
