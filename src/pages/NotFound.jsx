import Header from "../components/Header";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <Header />
      <div className="flex flex-col md:flex-row items-center justify-center">
        <div className="flex flex-col items-center justify-center my-auto h-screen">
          <p className="text-main-purple font-bold text-4xl">404</p>
          <p><b>Not Found:</b> La page que vous recherchez n&apos;a pas été trouvé</p>
        </div>
        <img className="w-72 my-auto" src="/404robot.png" />
      </div>
    </div>
  );
};

export default NotFound;
