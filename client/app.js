import React, { useEffect, useState } from 'react';
import { hot } from 'react-hot-loader/root';

import { fetchPizza } from './api/index'

const App = () => {
  const [pizzaData, setPizzaData] = useState([])

  useEffect(() => {
  async function getData() {
    const response = await fetchPizza()
    const { data } = await response 
    console.log(data)
    setPizzaData([...data])
  }

  if(!pizzaData.length) getData()
  }, [pizzaData])

  return <div>Hello from react cyberpizza!</div>
}

export default hot(App);
