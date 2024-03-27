import { useEffect, useState } from "react";
import BackRoutes from "../RoutesInterface";

const useCreatedFormations = (id) => {
  const [Formations, setFormations] = useState({
    loading: true,
  });

  useEffect(() => {
    // Premier Fetch
    fetch(BackRoutes.GetCreatedFormations(id))
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
            title: el.Titre
          };
          FormationsList.push(tmpFormation);
        });
        return FormationsList;
      })
      .then(res => setFormations(res))
      .catch((err) => setFormations({ error: true, ErrorContent: err }));
  }, [id]);
  return Formations;
}

export default useCreatedFormations;