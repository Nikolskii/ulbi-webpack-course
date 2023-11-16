import { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';

import balloonsImg from '@/assets/balloons.png';
import fileImg from '@/assets/file.jpg';
import ErrorImg from '@/assets/error.svg';

import classes from './App.module.scss';

// Не попадет в бандл, потому что не вызывается (Tree Shaking)
function TODO() {
  console.log('Todo Function');
}

export const App = () => {
  const [count, setCount] = useState<number>(0);

  const increment = () => setCount(prev => prev + 1);

  if (__ENV__ === 'development') {
    // addDevtools();
  }

  return (
    <div>
      <h1>Platform: {__PLATFORM__}</h1>
      {__PLATFORM__ === 'desktop' && <p>is desktop platform</p>}
      {__PLATFORM__ === 'mobile' && <p>is mobile platform</p>}
      <div>
        <img width={100} src={balloonsImg} alt={balloonsImg} />
        <img width={100} src={fileImg} alt={fileImg} />
      </div>
      <div>
        <ErrorImg width={100} height={100} />
      </div>
      <Link to={'/about'}>About</Link>
      <br />
      <Link to={'/shop'}>Shop</Link>
      <h1 className={classes.value}>{count}</h1>
      <button className={classes.button} onClick={increment}><span>inc</span></button>
      <Outlet />
    </div>
  );
};