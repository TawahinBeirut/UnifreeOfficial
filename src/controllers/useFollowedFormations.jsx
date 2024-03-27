import { useEffect, useState } from "react";
import BackRoutes from "../RoutesInterface";

const useFollowedFormations = (id) => {
  const [Formations, setFormations] = useState({
    loading: true,
  });

  useEffect(() => {
    // Premier Fetch
    fetch(BackRoutes.GetFollowedFormations(id))
      .then(async (res) => {
        const tmp = await res.json();
        return tmp;
      })
      .then((res) => {
        let FormationsList = [];

        if (res.Statut == 0) {
          throw new Error(res.Message);
        }
        console.log(res)
        let i = 0;
        res.data.forEach((el) => {
          let tmpFormation = {
            id: el[0].Id,
            title: el[0].Titre
          };
          i++;
          FormationsList.push(tmpFormation);
        });
      
        return FormationsList;
      })
      .then(res => setFormations(res))
      .catch((err) => setFormations({ error: true, ErrorContent: err }));
  }, [id]);
  return Formations;
}

export default useFollowedFormations;