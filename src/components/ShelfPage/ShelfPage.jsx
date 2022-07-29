import React from "react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import useReduxStore from "../../hooks/useReduxStore";
import "./ShelfPage.css";

function ShelfPage() {
  const [newDesc, setNewDesc] = useState("");
  const [newImgUrl, setNewImgUrl] = useState("");
  const [item, setItem] = useState('');

  const dispatch = useDispatch();
  const store = useReduxStore();

  const handleSubmit = (event) => {
    event.preventDefault();

    dispatch({
      type: "ADD_ITEM",
      payload: { description: newDesc, image_url: newImgUrl },
    });
    dispatch({ type: "FETCH_ITEMS" });
    setNewDesc("");
    setNewImgUrl("");
  };

  const vanishTheItem = (item) => {
    console.log("start of vanishTheItem");
    setItem(item.id);
    console.log('this is item.id', item.id);
    dispatch({
      type: 'VANISH_ITEM',
      payload: item.id
    });
  };

  // On load, useEffect for items
  useEffect(() => {
    dispatch({ type: "FETCH_ITEMS" });
  }, []);
  // bring in the list of items
  console.log("This is items:", store.items);
  console.log("This is the store:", store);
  return (
    <div className="container">
      <h2>Shelf</h2>
      {/* Mike/Miner added this */}
      <form onSubmit={handleSubmit}>
        <label>desc</label>
        <input
          type="text"
          value={newDesc}
          onChange={(event) => setNewDesc(event.target.value)}
        ></input>
        <label>img url</label>
        <input
          type="text"
          value={newImgUrl}
          onChange={(event) => setNewImgUrl(event.target.value)}
        ></input>
        <button type="submit">SUBMIT NEW</button>
      </form>
      {store.items?.map((item, i) => (
        <div key={i}>
          <h4>{item?.description}</h4>
          <div>
            <img src={item?.image_url} className="image-div"></img>
          </div>
          <br />
          <button onClick={(event) => vanishTheItem(item)}>Vanish This Food!</button>
          <br />
        </div>
      ))}
    </div>
  );
}

export default ShelfPage;
