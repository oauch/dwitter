import React, { useState } from "react";
import { dbService, storageService } from "../fbase";

const Dweet = ({ dweetObj, isOwner }) => {
  const [editing, setEditing] = useState(false);
  const [newDweet, setNewDweet] = useState(dweetObj.text);
  const onDeleteClick = async () => {
    const ok = window.confirm("삭제하시겠습니까?");
    if (ok) {
      // 삭제 dweet
      await dbService.doc(`dweets/${dweetObj.id}`).delete();
      await storageService.refFromURL(dweetObj.attachmentUrl).delete();
    }
  };
  const toggleEditing = () => setEditing((prev) => !prev);
  const onSubmit = async (event) => {
    event.preventDefault();
    await dbService.doc(`dweets/${dweetObj.id}`).update({
      text: newDweet,
    });
    setEditing(false);
  };
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewDweet(value);
  };
  return (
    <div>
      {editing ? (
        <>
          <form onSubmit={onSubmit}>
            <input
              type="text"
              placeholder="수정할 내용 입력하세요."
              value={newDweet}
              required
              onChange={onChange}
            />
            <input type="submit" value="Update Dweet" />
          </form>
          <button onClick={toggleEditing}>Cancel</button>
        </>
      ) : (
        <>
          <h4>{dweetObj.text}</h4>
          {dweetObj.attachmentUrl && (
            <img src={dweetObj.attachmentUrl} widht="50px" height="50px" />
          )}
          {isOwner && (
            <>
              <button onClick={toggleEditing}>Edit Dweet</button>
              <button onClick={onDeleteClick}>Delete Dweet</button>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Dweet;
