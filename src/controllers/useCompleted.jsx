import { useEffect, useState } from "react";
import BackRoutes from "../RoutesInterface";

const useCompleted = (id) => {
  const [Lessons, setLessons] = useState({
    loading: true,
  });

  useEffect(() => {
    fetch(BackRoutes.GetCompletedContent(id))
      .then(async (res) => {
        const tmp = await res.json();
        return tmp;
      })
      .then(res =>setLessons(res))
      .catch((err) => setLessons({ error: true, ErrorContent: err }));
  }, [id]);
  return Lessons;
};

export default useCompleted;
