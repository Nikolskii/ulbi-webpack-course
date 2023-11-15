import { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';

import balloonsImg from '@/assets/balloons.png';
import fileImg from '@/assets/file.jpg';
import ErrorImg from '@/assets/error.svg';

import classes from './App.module.scss';

export const App = () => {
  const [count, setCount] = useState<number>(0);

  const increment = () => setCount(prev => prev + 1);

  return (
    <div>
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