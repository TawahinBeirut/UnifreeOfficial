import Header from "../components/Header";
import FormationInfo from "../components/FormationComponents/FormationInfo";
import ProgramList from "../components/FormationComponents/ProgramList";
import useFormation from "../controllers/useFormation";
import { useParams, Link } from "react-router-dom";
import NotFound from "./NotFound";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import Footer from "../components/Footer";

const Formation = () => {

  // Récuperation des données de l'utilisateur
  const { id } = useParams();
  const formation = useFormation(parseInt(id));
  const userid = Cookies.get("token") ? jwtDecode(Cookies.get("token")).Id : null;


  // Rendu 
  
  if (!formation || formation.error) {
    return <NotFound />;
  }
  
  const editButton = (FormationId) => {
    return (
      <>
    {userid == formation.author ?
      <div className="w-full flex align-center justify-center">
        <Link
          to={`/edit-formation/${FormationId}`}
          className="mt-6 flex flex-row border-2 border-gray-400 text-gray-600 py-2 px-4 rounded-full gap-3 font-semibold hover:bg-gray-200 duration-300"
        >
          <p>Modifier la formation</p>{" "}
          <img className="w-6 " src="/edit-button.png" />
        </Link>
      </div>
     : null }
    </>
    )
  }

  return (
    <div className="w-full h-full flex flex-col ">
      <Header />
      <div className="flex flex-col md:flex-row w-full">
        <FormationInfo
          formation={formation}
          showEditButton={editButton}
        ></FormationInfo>
        <div className="w-full p-4">
          <ProgramList formation={formation}></ProgramList>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default Formation;
