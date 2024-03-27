import { useEffect, useState } from "react";
import BackRoutes from "../RoutesInterface";

const useLessons = (id) => {
  const [Lessons, setLessons] = useState({
    loading: true,
  });

  useEffect(() => {
    fetch(BackRoutes.GetFormationLessons(id))
      .then(async (res) => {
        const tmp = await res.json();
        return tmp;
      })
      .then((res) => {
        let LessonsList = [];

        if (res.Statut === 0) {
          throw new Error(res.Message);
        }

        res.data.forEach((el) => {
          const tmpLesson = {
            id : el.Id,
            isQuizz : false,
            title: el.Titre,
            content: el.Contenu,
          };
          LessonsList.push(tmpLesson);
        });
        return LessonsList;
      })
      .then(res =>setLessons(res))
      .catch((err) => setLessons({ error: true, ErrorContent: err }));
  }, [id]);
  return Lessons;
};

export default useLessons;
