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
          Welcome to AychGPT
        </h1>
        {/* <div className='flex items-center justify-center'>
          <button className='btn max-w-xs ' onClick={submitPrompt}>
            Activate AI
          </button>
        </div> */}
        <div className='flex items-center justify-center'>
          <label className='form-control w-full max-w-xs'>
            <div className='label'>
              <span className='label-text text-red-500'>AychAI</span>
            </div>
            <input
              type='text'
              placeholder='Enter Prompt'
              className='input input-bordered w-full max-w-xs'
            />
          </label>
        </div>
        <div>
          <span className='text-red-500'>AI Response:</span> {prompt}
        </div>
      </div>
    </>
  );
}

export default App;
