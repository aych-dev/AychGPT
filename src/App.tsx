import React from 'react';
import './App.css';
import axios, { AxiosRequestConfig } from 'axios';

function App(): JSX.Element {
  const getMessages = async () => {
    try {
      const options: AxiosRequestConfig = {
        method: 'POST',
        data: {
          message: 'How are you?',
        },
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const res = await axios.get(
        'https://localhost:8000/completions',
        options
      );
      console.log(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div>aych ai</div>
      <button onClick={getMessages}>testing</button>
    </>
  );
}

export default App;
