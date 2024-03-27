
const Spinner = () => {
  return (
    <div className="fixed top-0 left-0 z-50 w-screen h-screen flex justify-center items-center bg-gray-200 opacity-75">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-main-purple"></div>
    </div>
  );
};

export const SpinnerMin = () => {
  return (
    <div className="fixed top-0 left-0 z-50 w-full h-full flex justify-center items-center bg-gray-200 opacity-75">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-main-purple"></div>
    </div>
  );
};


export default Spinner;
