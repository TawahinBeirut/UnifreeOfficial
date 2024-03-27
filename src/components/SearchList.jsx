/* eslint-disable react/prop-types */

import FormationCard from "./FormationComponents/FormationCard";
import SlideMenu from "../components/SlideMenu";
import { useParams } from "react-router-dom";

const SearchList = ({ list }) => {
  const { search } = useParams();

  
  const listFormationFiltered = list.filter((formation) =>
    formation.title.toLowerCase().includes(search.toLowerCase())
  );

  const listFormation = listFormationFiltered.map((formation) => (
    <FormationCard key={formation.title} formation={formation} />
  ));

  return (
    <div className="flex flex-col">
      <div className="w-full">
        <p className="font-medium text-xl p-5">
          {" "}
          Résultats pour &quot;{search}&quot;
        </p>
      </div>
      <div className="m-3 flex flex-col gap-3">{listFormation.length == 0 ? "Aucune formation n'a été trouvé :/" : listFormation}</div>
      <div className="border-t-2 mt-14">
      <SlideMenu title={"Formations conseillées"} list={ list }></SlideMenu>
      </div>
    </div>
  );
};

export default SearchList;
