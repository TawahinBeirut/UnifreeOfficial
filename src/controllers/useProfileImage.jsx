import { useEffect, useState } from "react";
import BackRoutes from "../RoutesInterface";

const useProfileImage = (id) => {
  const [ProfileImage, setProfileImage] = useState({
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
        const tmp = res.data.ProfileImage
        return tmp;
      })
      .then(res => setProfileImage(res))
      .catch((err) => setProfileImage({ error: true, ErrorContent: err }));
  }, [id]);
  return ProfileImage;
};

export default useProfileImage;