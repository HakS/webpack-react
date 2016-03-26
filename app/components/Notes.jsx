import React from 'react';
import Note from './Note.jsx';

export default ({notes, onEdit, onDelete}) => {
  return (
    <ul className="notes">{notes.map(note =>
      <li className="note" key={note.id}>
        <Note
          task={note.task}
          onEdit={onEdit.bind(null, note.id)}
          onDelete={onDelete.bind(null, note.id)} />
      </li>
    )}</ul>
  );
}

// JB_Doc: I think that would be the same as
// <ul>{notes.map(function(note) {
//   return <li key={note.id}>
//     <Note task={note.task} />
//   </li>
// })}</ul>
