import React from 'react';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';

function ShelfPage() {
  // state as an array or or string??? START HERE TOMORROW
  const [newItem, setNewItem] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newImgUrl, setNewImgUrl] = useState('');

  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();

    dispatch({
        type: 'ADD_SHELF_ITEM',
        payload: newItem
    });
    dispatch({
      type: 'FETCH_ITEMS'
    });
    // history.push('/understanding');
    setNewItem('');
    setNewDesc('');
    setNewImgUrl('');
  }

  return (
    <div className="container">
      <h2>Shelf</h2>
      <p>All of the available items can be seen here.</p>
      {/* Mike/Miner added this */}
      <form onSubmit={handleSubmit}>
        <label>item</label>
        <input type="text" value={newItem} onChange={(event) => setNewItem(event.target.value)}></input>
        <label>desc</label>
        <input type="text" value={newDesc} onChange={(event) => setNewDesc(event.target.value)}></input>
        <label>img url</label>
        <input type="text" value={newImgUrl} onChange={(event) => setNewImgUrl(event.target.value)} ></input>
        <button type="submit">SUBMIT NEW</button>
      </form>
    </div>
  );
}

export default ShelfPage;
