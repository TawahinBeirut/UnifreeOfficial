import { useEffect, useState } from "react";
import BackRoutes from "../RoutesInterface";

const useLikes = (id) => {
  const [Likes, setLikes] = useState({
    loading: true,
  });

  useEffect(() => {
    fetch(BackRoutes.GetFormationLikes(id))
      .then(async (res) => {
        const tmp = await res.json();
        return tmp.data;
        })
      .then(res =>setLikes(res))
      .catch((err) => setLikes({ error: true, ErrorContent: err }));
  }, [id]);
  return Likes;
};

export default useLikes;