import { useEffect, useState } from "react";
import BackRoutes from "../RoutesInterface";

const useComments = (id) => {
    const [Comments, setComments] = useState({
      loading: true,
    });

    useEffect(() => {
      fetch(BackRoutes.GetFormationComments(id))
        .then(async (res) => {
          const tmp = await res.json();
          return tmp;
        })
        .then((res) => {
          let CommentsList = [];
  
          if (res.Statut == 0) {
            throw new Error(res.Message);
          }
  
          res.data.forEach((el) => {
            const tmpComment = {
              id : el.Id,
              author : el.AuthorId,
              content: el.Contenu,
            };
            CommentsList.push(tmpComment);
          });
          return CommentsList;
        })
        .then(res => {
          setComments(res)})
        .catch((err) => setComments({ error: true, ErrorContent: err }));
    }, [id]);
    return Comments;
}

export default useComments;