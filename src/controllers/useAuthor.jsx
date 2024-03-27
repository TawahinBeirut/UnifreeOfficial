import { useEffect, useState } from "react";
import BackRoutes from "../RoutesInterface";

const useAuthor = (id) => {
  const [Author, setAuthor] = useState({
    loading: true,
  });

  useEffect(() => {
    fetch(BackRoutes.SpecificUser+id)
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
            Name : res.data.Nom,
            Prenom : res.data.Prenom,
            Email : res.data.Email,
            ProfileImage: res.data.ProfileImage
        }
        return tmp;
      })
      .then(res => setAuthor(res))
      .catch((err) => setAuthor({ error: true, ErrorContent: err }));
  }, [id]);
  return Author;
};

export default useAuthor;