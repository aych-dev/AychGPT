import { useState } from 'react';
import axios, { AxiosError } from 'axios';

function App() {
  const [prompt, setPrompt] = useState<string>('Ask AI something');

  const submitPrompt = async () => {
    try {
      const res = await axios.get('http://localhost:8000/completions');
      setPrompt(res.data);
    } catch (e) {
      console.error((e as AxiosError).message);
    }
  };

  return (
    <>
      <div className='grid grid-cols gap-3 items-center justify-center'>
        <h1 className=' text-red-500 text-xl flex items-center justify-center'>
          aych ai
        </h1>
        <button className='btn max-w-xs ' onClick={submitPrompt}>
          Activate AI
        </button>
        <div className='text-red-500'>AI Response: {prompt}</div>
      </div>
    </>
  );
}

export default App;
