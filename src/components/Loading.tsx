import { Triangle } from 'react-loader-spinner';

const Loading = () => (
  <div className="flex h-screen items-center justify-center">
    <Triangle
      height="80"
      width="80"
      color="#000"
      ariaLabel="triangle-loading"
      visible
    />
  </div>
);

export default Loading;
