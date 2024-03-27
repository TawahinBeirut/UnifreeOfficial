import { useEffect, useState } from "react";
import BackRoutes from "../RoutesInterface";

const useQuizzs = (id) => {
  const [Quizzs, setQuizzs] = useState({
    loading: true,
  });

  useEffect(() => {
    fetch(BackRoutes.GetFormationQuizzs(id))
      .then(async (res) => {
        const tmp = await res.json();
        return tmp;
      })
      .then((res) => {
        if (res.Statut == 0) {
          throw new Error(res.Message);
        }
        return res.data;
      })
      .then(res => setQuizzs(res))
      .catch((err) => setQuizzs({ error: true, ErrorContent: err }));
  }, [id]);
  return Quizzs;
};  

export default useQuizzs;