import React, { useState } from "react";
import { dbService, storageService } from "../fbase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencilAlt } from "@fortawesome/free-solid-svg-icons";

const dweet = ({ dweetObj, isOwner }) => {
  const [editing, setEditing] = useState(false);
  const [newdweet, setNewdweet] = useState(dweetObj.text);
  const onDeleteClick = async () => {
    const ok = window.confirm("Are you sure you want to delete this dweet?");
    if (ok) {
      await dbService.doc(`dweets/${dweetObj.id}`).delete();
      await storageService.refFromURL(dweetObj.attachmentUrl).delete();
    }
  };
  const toggleEditing = () => setEditing((prev) => !prev);
  const onSubmit = async (event) => {
    event.preventDefault();
    await dbService.doc(`dweets/${dweetObj.id}`).update({
      text: newdweet,
    });
    setEditing(false);
  };
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewdweet(value);
  };
  return (
    <div className="dweet">
      {editing ? (
        <>
          <form onSubmit={onSubmit} className="container dweetEdit">
            <input
              type="text"
              placeholder="Edit your dweet"
              value={newdweet}
              required
              autoFocus
              onChange={onChange}
              className="formInput"
            />
            <input type="submit" value="Update dweet" className="formBtn" />
          </form>
          <span onClick={toggleEditing} className="formBtn cancelBtn">
            Cancel
          </span>
        </>
      ) : (
        <>
          <h4>{dweetObj.text}</h4>
          {dweetObj.attachmentUrl && <img src={dweetObj.attachmentUrl} />}
          {isOwner && (
            <div class="dweet__actions">
              <span onClick={onDeleteClick}>
                <FontAwesomeIcon icon={faTrash} />
              </span>
              <span onClick={toggleEditing}>
                <FontAwesomeIcon icon={faPencilAlt} />
              </span>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default dweet;