import { useState } from 'react';
import axios, { AxiosError } from 'axios';

function App() {
  const [prompt, setPrompt] = useState<string>('Ask AI something');
  const [aiResponse, setAiResponse] = useState<string>('I am AychGPT');

  const submitPrompt = async (e) => {
    console.log(aiResponse);
    e.preventDefault();

    try {
      const res = await axios.post('http://localhost:8000/completions', {
        messages: prompt,
      });
      setAiResponse(res.data);
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

        <form
          className='flex items-center justify-center'
          onSubmit={submitPrompt}
        >
          <label className='form-control w-full max-w-xs'>
            <div className='label'>
              <span className='label-text text-red-500'>AychAI</span>
            </div>
            <input
              type='text'
              placeholder='Enter Prompt'
              className='input input-bordered w-full max-w-xs'
              onChange={(e) => setPrompt(e.target.value)}
              value={prompt}
            />
            <div className='flex items-center justify-center p-2'>
              <input type='submit' value='Submit' className='btn' />
            </div>
          </label>
        </form>
        <div className='max-w-2xl'>
          <span className='text-red-500'>AI Response:</span> {aiResponse}
        </div>
      </div>
    </>
  );
}

export default App;
