import { useState } from 'react';
import axios, { AxiosError } from 'axios';

interface ChatBox {
  role: string;
  content: string;
}

function App() {
  const [prompt, setPrompt] = useState<string>('');
  const [aiResponse, setAiResponse] = useState<string>('I am AychGPT');
  const [loading, setIsLoading] = useState<boolean>(false);
  const [chatBox, setChatBox] = useState<ChatBox[]>([]);

  const submitPrompt = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      if (chatBox.length < 1) {
        const res = await axios.post(
          'https://cryptic-anchorage-73113-c632759ca232.herokuapp.com/completions',
          {
            userMessages: [{ role: 'user', content: prompt }],
          }
        );
        setPrompt('');
        setAiResponse(res.data);
        setChatBox([
          {
            role: 'user',
            content: prompt,
          },
          {
            role: 'assistant',
            content: res.data,
          },
        ]);
      } else {
        chatBox.push({ role: 'user', content: prompt });
        const res = await axios.post(
          'https://cryptic-anchorage-73113-c632759ca232.herokuapp.com/completions',
          {
            userMessages: chatBox,
          }
        );
        setPrompt('');
        setAiResponse(res.data);
        setChatBox((prevState) => [
          ...prevState,
          {
            role: 'assistant',
            content: res.data,
          },
        ]);
      }
      setIsLoading(false);
    } catch (e) {
      console.error((e as AxiosError).message);
    }
  };

  const handleClick = () => {
    setPrompt('');
    setChatBox([]);
    setAiResponse('I am AychGPT');
    setIsLoading(false);
  };

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
            <div className='grid grid-cols'>
              {loading ? (
                <>
                  <button
                    type='submit'
                    value='Submit'
                    className='btn btn-disabled my-4'
                  >
                    Submit
                  </button>
                </>
              ) : (
                <>
                  <button type='submit' value='Submit' className='btn my-4'>
                    Submit
                  </button>
                </>
              )}
            </div>
          </label>
        </form>
        <div className='grid grid-cols'>
          <div
            className='flex items-center justify-center'
            onClick={() => handleClick()}
          >
            {loading ? (
              <button className='btn-xs btn btn-disabled btn-error btn-outline'>
                New Prompt
              </button>
            ) : (
              <button className='btn-xs btn  btn-error btn-outline'>
                New Prompt
              </button>
            )}
          </div>
        </div>
        <div className='max-w-2xl'>
          <span className='text-red-500 ml-2'>AI Response:</span>{' '}
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
