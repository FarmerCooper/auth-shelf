import React from 'react';
import {useEffect, useState} from 'react';
import { useDispatch } from 'react-redux';
import useReduxStore from '../../hooks/useReduxStore';


function ShelfPage() {

  const [newDesc, setNewDesc] = useState('');
  const [newImgUrl, setNewImgUrl] = useState('');

  const dispatch = useDispatch();
  const store = useReduxStore();

  const handleSubmit = (event) => {
    event.preventDefault();

    dispatch({
        type: 'ADD_ITEM',
        payload: {description: newDesc,
          image_url: newImgUrl}
    });
    dispatch({ type: 'FETCH_ITEMS' });
    setNewDesc('');
    setNewImgUrl('');
  }

  const vanishTheItem = () => {
    console.log('start of vanishTheItem');
  }

  // On load, useEffect for items
  useEffect(() => {
    dispatch({ type: 'FETCH_ITEMS' });
  }, []);
  // bring in the list of items
  console.log('This is items:', store.items);
  console.log('This is the store:', store);
  return (
    <div className="container">
      <h2>Shelf</h2>
          {/* Mike/Miner added this */}
        <form onSubmit={handleSubmit}>
          <label>desc</label>
          <input type="text" value={newDesc} onChange={(event) => setNewDesc(event.target.value)}></input>
          <label>img url</label>
          <input type="text" value={newImgUrl} onChange={(event) => setNewImgUrl(event.target.value)} ></input>
          <button type="submit">SUBMIT NEW</button>
        </form>
        {store.items?.map((item, i) => (
          <div>          
          <li key ={i}>{item?.description}<img src={item?.image_url} /></li>
          <button onClick={vanishTheItem}>Vanish This Food!</button>
          </div>
      ))}
    </div>
  );
}

export default ShelfPage;
