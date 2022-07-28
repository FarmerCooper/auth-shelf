import React from 'react';
import {useEffect} from 'react';
import { useDispatch } from 'react-redux';
import useReduxStore from '../../hooks/useReduxStore';


function ShelfPage() {

  const dispatch = useDispatch();
  const store = useReduxStore();

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
      {store.items.map((item, i) => (
        <li key ={i}>{item.description}<img src={item.image_url} /></li>
        
      ))}

    </div>
  );
}

export default ShelfPage;
