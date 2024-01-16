import { SetStateAction, useEffect, useState } from 'react';
import axios, { AxiosError } from 'axios';

function App() {
  const [prompt, setPrompt] = useState<string>('');
  const [aiResponse, setAiResponse] = useState<string>('I am AychGPT');
  const [loading, setIsLoading] = useState<boolean>(false);
  const [chatBox, setChatBox] = useState([]);

  useEffect(() => {
    if (chatBox.length > 0) {
      setChatBox((prevState) => [
        ...prevState,
        {
          role: 'user',
          content: prompt,
        },
        {
          role: 'assistant',
          content: aiResponse,
        },
      ]);
    }
  }, []);

  const submitPrompt = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      if (chatBox.length < 1) {
        const res = await axios.post('http://localhost:8000/completions', {
          userMessages: [{ role: 'user', content: prompt }],
        });

        setAiResponse(res.data);
        setIsLoading(false);
      } else if (chatBox.length > 0) {
        const res = await axios.post('http://localhost:8000/completions', {
          userMessages: chatBox,
        });

        setAiResponse(res.data);
        setIsLoading(false);
      }
    } catch (e) {
      console.error((e as AxiosError).message);
    }
  };
  console.log(chatBox);

  return (
    <>
      <div className='grid grid-cols gap-3 items-center justify-center'>
        <h1 className=' text-red-500 text-xl flex items-center justify-center mt-7 font-bold'>
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
              placeholder='Ask AychGPT...'
              className='input input-bordered w-full max-w-xs'
              onChange={(e) => setPrompt(e.target.value)}
              value={prompt}
            />
            <div className='flex items-center justify-center p-2'>
              {loading ? (
                <button
                  type='submit'
                  value='Submit'
                  className='btn btn-disabled mt-3 '
                >
                  Submit
                </button>
              ) : (
                <button type='submit' value='Submit' className='btn mt-3  '>
                  Submit
                </button>
              )}
            </div>
          </label>
        </form>
        <div className='max-w-2xl'>
          <span className='text-red-500'>AI Response:</span>{' '}
          {loading ? (
            <span className='loading loading-dots loading-md ml-5'></span>
          ) : (
            aiResponse
          )}
        </div>
      </div>
    </>
  );
}

export default App;
