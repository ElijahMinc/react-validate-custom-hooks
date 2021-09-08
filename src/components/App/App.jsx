import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { setRepose } from '../../store/reducers/rootReducer';
import FormPage from '../FormPage';

import styles from './App.module.css';

const App = () => {
   const state = useSelector(state => state.rootReducer)
   const dispatch = useDispatch()
   console.log(state)
   React.useEffect(() => {
      dispatch(setRepose())
   }, [])
   return (
      <div className="container form">
         <FormPage />
      </div>
   );
}

export default App;
