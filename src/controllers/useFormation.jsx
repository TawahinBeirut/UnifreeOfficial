import { useEffect, useState } from "react";
import BackRoutes from "../RoutesInterface";

const useFormation = (id) => {
  const [Formation, setFormation] = useState({
    loading: true,
  });
  
  useEffect(() => {
    fetch(BackRoutes.Formations+id)
      .then(async (res) => {
        const tmp = await res.json();
        return tmp;
      })
      .then((res) => {
        if (res.Statut == 0) {
          throw new Error(res.Message);
        }

        const tmp = {
            id : res.data.Id,
            title : res.data.Titre,
            author : res.data.AuthorId
        }
        return tmp;
      })
      .then(res => setFormation(res))
      .catch((err) => setFormation({ error: true, ErrorContent: err }));
  }, [id]);
  
  return Formation;
};

export default useFormation;