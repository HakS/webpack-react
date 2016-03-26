import AltContainer from 'alt-container';
import React from 'react';
import Notes from './Notes.jsx';
import NoteActions from '../actions/NoteActions';
import NoteStore from '../stores/NoteStore';
import LaneActions from '../actions/LaneActions';

export default class Lane extends React.Component {
  render() {
    const {lane, ...props} = this.props;
    // JB_Doc: this means:
    // lane = this.props.lane
    // props = this.props (without the lane part)

    // JB_Doc: I think if you call props instead of ...props it would return
    // an array instead of ...... variables? fuck ES2015 :(
    // According to the book, this is used to not repeat the attributes
    // used at Lanes.jsx and just call properties sent from there

    // JB_Doc: gotcha found: you cannot put comments inside jsx context
    // this little stupid bitch will try to print em all, the comment above was
    // inside the jsx part
    return (
      <div {...props}>
        <div className="lane-header">
          <div className="lane-add-note">
            <button onClick={this.addNote}>+</button>
          </div>
          <div className="lane-name">{lane.name}</div>
        </div>
        <AltContainer
          stores={[NoteStore]}
          inject={{
            notes: () => NoteStore.getNotesByIds(lane.notes)
          }}
        >
          <Notes onEdit={this.editNote} onDelete={this.deleteNote} />
        </AltContainer>
      </div>
    );
  }
  editNote(id, task) {
    // Don't modify if trying set an empty value
    if(!task.trim()) {
      return;
    }
    NoteActions.update({id, task});
  }
  // JB_Doc: yes, previously it was addNote() and now is addNote = (e) =>
  // According to book it says "Methods where we need to refer to this have been bound using a property initializer"
  // so that weird syntax the books names it "property initializer"
  addNote = (e) => {
    const laneId = this.props.lane.id;
    const note = NoteActions.create({task: 'New task'});
    LaneActions.attachToLane({
      noteId: note.id,
      laneId
    });
  };
  deleteNote = (noteId, e) => {
    e.stopPropagation();
    const laneId = this.props.lane.id;
    LaneActions.detachFromLane({laneId, noteId});
    NoteActions.delete(noteId);
  };
}
