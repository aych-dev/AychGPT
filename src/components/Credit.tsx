import { FaGithub } from 'react-icons/fa';

const Credit = () => {
  return (
    <div className='flex items-center justify-center text-red-500 font-semibold'>
      <h1>Created by Aychdev </h1>
      <div className='ml-2'>
        <a
          href='https://github.com/aych-dev/AychGPT'
          rel='noopener noreferrer'
          target='_blank'
        >
          <FaGithub />
        </a>
      </div>
    </div>
  );
};

export default Credit;
