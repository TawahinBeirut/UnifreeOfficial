import useFormations from '../controllers/useFormations';
import Header from '../components/Header';
import SearchList from '../components/SearchList';
import Spinner from '../components/Spinner';
const Home = () => {
  const firstlist = useFormations();
  return (
    <>
    {Array.isArray(firstlist) ?
    <div className="w-screen h-screen flex flex-col overflow-x-hidden">
      <Header />
      <div>
      <SearchList title={"De la catégorie informatique"} list={ firstlist }></SearchList>
      </div>
    </div>
    : <Spinner/> }
    </>
  );  
}; 
export default Home;
