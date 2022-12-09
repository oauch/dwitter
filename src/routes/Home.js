import React, { useEffect, useState } from "react";
import { dbService } from "../fbase";

const Home = ({ userObj }) => {
    console.log(userObj);
  const [dweet, setDweet] = useState("");
  const [dweets, setDweets] = useState([]);
  const getDweets = async () => {
    const dbDweets = await dbService.collection("dweets").get();
    dbDweets.forEach((document) => {
      const dweetObject = {
        ...document.data(),
        id: document.id,
        creatorId: 12121,
      };
      setDweets((prev) => [dweetObject, ...prev]); // set이 붙는 함수는 값 대신 함수를 전달
    });
  };
  useEffect(() => {
    getDweets();
  }, []);
  const onSubmit = async (event) => {
    // dweet 하는 이벤트
    event.preventDefault();
    await dbService.collection("dweets").add({
      text: dweet,
      createdAt: Date.now(),
    });
    setDweet("");
  };
  const onChange = (event) => {
    const {
      target: { value },
    } = event; // event에 있는 targetd에 있는 value를 달라
    setDweet(value);
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          value={dweet}
          onChange={onChange}
          type="text"
          placeholder="한마디 적고 가세요."
          maxLength={120}
        />
        <input type="submit" value="Dweet" />
      </form>
      <div>
        {dweets.map((dweet) => (
          <div key={dweet.id}>
            <h4>{dweet.dweet}</h4>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Home;
