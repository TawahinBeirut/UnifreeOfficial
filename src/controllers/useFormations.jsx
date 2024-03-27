import { useEffect, useState } from "react";
import BackRoutes from "../RoutesInterface";

const useFormations = () => {
  const [Formations, setFormations] = useState({
    loading: true,
  });

  useEffect(() => {
    // Premier Fetch
    fetch(BackRoutes.Formations)
      .then(async (res) => {
        const tmp = await res.json();
        return tmp;
      })
      .then((res) => {
        let FormationsList = [];

        if (res.Statut == 0) {
          throw new Error(res.Message);
        }

        res.data.forEach((el) => {
          let tmpFormation = {
            id: el.Id,
            title: el.Titre,
            categorie : el.Categorie
          };
          FormationsList.push(tmpFormation);
        });
        return FormationsList;
      })
      .then(res => setFormations(res))
      .catch((err) => setFormations({ error: true, ErrorContent: err }));
  }, []);
  return Formations;
}

export default useFormations;
