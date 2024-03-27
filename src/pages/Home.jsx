import Header from "../components/Header";
import SlideMenu from "../components/SlideMenu";
import useFormations from "../controllers/useFormations";
import Spinner from "../components/Spinner";
import Footer from "../components/Footer";

const Home = () => {

  const firstlist = useFormations();
  let categories = {}

  // Tri des formations
  if(Array.isArray(firstlist)){

    firstlist.forEach(item => {
      let categ = item.categorie.toLowerCase()

      if(categories[categ] != undefined){
        categories[categ] = categories[categ] + 1 
      }else{
        categories[categ] = 1
      }
    })
  }
  // this fellowing line just transform the object o array and sort it and return it to object
  categories = Object.entries(categories).sort((a,b) => b[1] - a[1])
  console.log(categories)

  // Rendu
  return (
    <div>
      {(Array.isArray(firstlist)) ?
      <div className="w-screen h-screen flex flex-col overflow-x-hidden">
      <Header />
      <div>
      <SlideMenu title={"Formations les plus suivies"} list={ firstlist }></SlideMenu>

        {
            categories.length > 0 ?(
              // find the original Title of the categorie (ex : test -> Test)  and the list of formation with this catgorie  
              <SlideMenu title={"De la catégorie " + firstlist.find(item => item.categorie.toLowerCase() == categories[0][0]).categorie} list={ firstlist.filter(item => item.categorie.toLowerCase() === categories[0][0]) }></SlideMenu>
            ): null
        }
        {
            categories.length > 1 ?(
              <SlideMenu title={"De la catégorie " + firstlist.find(item => item.categorie.toLowerCase() == categories[1][0]).categorie} list={ firstlist.filter(item => item.categorie.toLowerCase() === categories[1][0]) }></SlideMenu>
            ): null
        }
        {
            categories.length > 2 ?(
              <SlideMenu title={"De la catégorie " + firstlist.find(item => item.categorie.toLowerCase() == categories[2][0]).categorie} list={ firstlist.filter(item => item.categorie.toLowerCase() === categories[2][0]) }></SlideMenu>
            ): null
        }
        </div>
      <Footer></Footer>
    </div>  
    : <Spinner />}
    
    </div>
  );
};

export default Home;
