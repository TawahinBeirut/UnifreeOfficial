import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Header from "../components/Header";
import ProgramList from "../components/FormationComponents/ProgramList";
import useFormations from "../controllers/useFormations";
import useFormation from "../controllers/useFormation";
import Quizz from "../components/Quizz";
import NotFound from "./NotFound";
import useLessons from "../controllers/useLessons";
import useQuizzs from "../controllers/useQuizzs";
import BackRoutes from "../RoutesInterface";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import useCompleted from "../controllers/useCompleted";
import Spinner from "../components/Spinner";
import Footer from "../components/Footer";

const Lesson = () => {

  // Récuperation des infos de la formation
  const { formationName, lessonName } = useParams();
  const formation = useFormation(formationName);

  // Initialisation des hooks pour le quizz
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentScore, setCurrentScore] = useState(0);
  const [loading, setLoading] = useState(false);
  const lessonLink = lessonName.toLowerCase().replace(/\s+/g, "");

  function refreshPage() {
    setTimeout(() => {
      window.location.reload(false);
    }, 500);
  }

  const userId = Cookies.get("token")
    ? jwtDecode(Cookies.get("token")).Id
    : null;
  const lessons = useLessons(formationName);
  const quizzs = useQuizzs(formationName);  


  function handleScore() {
    setCurrentScore((currentScore) => currentScore + 1);
  }

  let LessonsQuizz;
  LessonsQuizz =
    Array.isArray(lessons) && Array.isArray(quizzs)
      ? [...lessons, ...quizzs]
      : null;
    


  const lesson = Array.isArray(LessonsQuizz)
    ? LessonsQuizz.filter(
        (lesson) =>
          lesson.title.toLowerCase().replace(/\s+/g, "") === lessonLink
      )[0]
    : null;


  const Completed = useCompleted(userId);
  let LessonsCompleted = Completed.data
    ? Completed.data.map((lesson) => {
        const result = Object.keys(lesson).includes("LeconId")
          ? { id: lesson.LeconId, isQuizz: false }
          : { id: lesson.QuizzId, isQuizz: true };
        return result;
      })
    : null;

  var content = (
    <div className="flex flex-col items-center justify-center w-full">
      <p className="text-3xl font-bold text-main-purple animate-bounce">
        Bravo. Quizz terminé !!!
      </p>
      <img src="https://media.tenor.com/HHPMFMlwwMIAAAAi/congratulations-congrats.gif" />
    </div>
  );

  const fetchLessonsStatus = async (lesson) => {
    let res = await fetch(BackRoutes.CheckIsJoinedFormation + formationName, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ UserId: userId }),
    });
    res = await res.json();
    if (!res.data) {
      let res2 = await fetch(BackRoutes.JoinFormation + formationName, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ UserId: userId }),
      });
      res2 = await res2.json();
    }
    const route = lesson.isQuizz
      ? BackRoutes.CheckIsCompleteQuizz
      : BackRoutes.ChecIsReadLesson;
    let res3 = await fetch(route + lesson.id, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ UserId: userId }),
    });
    res3 = await res3.json();
    if (!res3.data) {
      const route2 = lesson.isQuizz
        ? BackRoutes.PutIsCompleteQuizz
        : BackRoutes.PutIsReadLesson;
      let res4 = await fetch(route2 + lesson.id, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ UserId: userId }),
      });
      res4 = await res4.json();
      console.log(res4);
      if (res4.Statut == 0) throw new Error("Statut non modifiées");
      return "Lecon ajoutés au Lus";
    }
    return "Lecon déja Lue !!! ";
  };

  const setRead = async (lesson) => {
    fetchLessonsStatus(lesson).finally(() => {
      setLoading(false);
      refreshPage();
    });
    setLoading(true);
  };

  if (lesson) {
    console.log(lesson);
    if (lesson.isQuizz) {
      const currentQuestion = lesson.content.questions[currentIndex];
      const nbQuestion = lesson.content.questions.length - 1;

      var suivantBtn = "";
      if (currentIndex <= nbQuestion) {
        suivantBtn = (
          <button
            className="mt-4 py-2 text-white px-5 border rounded-full drop-shadow bg-main-purple hover:bg-purple-800 duration-300"
            onClick={() => {
              setCurrentIndex(currentIndex + 1);
              const submitButton = document.getElementById("Submit");
              submitButton.classList.remove("hidden");
            }}
          >
            Suivant
          </button>
        );
        content = (
          <>
            <Quizz
              questionIndex={currentIndex}
              scoreIndex={currentScore}
              setScore={handleScore}
              length={nbQuestion}
              title={currentQuestion.title}
              responses={currentQuestion.answers}
            />
            <div className="w-full flex justify-end">{suivantBtn}</div>
          </>
        );
      }
    } else content = lesson.content;
  }

  return (
    <>
      {!loading ? (
        <>
          {lesson ? (
            <div className="w-screen h-screen flex flex-col overflow-x-hidden">
              <Header />
              <div className="flex flex-col md:flex-row w-screen">
                <div className="md:w-1/3 md:mt-8 p-4">
                  <ProgramList formation={formation}></ProgramList>
                </div>
                <div className="flex flex-col w-full p-6 md:p-12">
                  <div className="flex flex-row text-xl font-medium">
                    <Link to={`/${formationName}`} className="text-[#919191]">
                      {formation.title}&nbsp;/&nbsp;
                    </Link>
                    <div className="text-main-purple">{lesson.title}</div>
                  </div>
                  <div className="flex flex-col items-center">
                    <img
                      className="w-[243px] h-[167px] mt-10 mb-10"
                      src="/lessonImage.png"
                    ></img>
                    <div className="p-10 whitespace-pre-line">{content}</div>
                    {!(
                      Array.isArray(LessonsCompleted) &&
                      LessonsCompleted.find(
                        (Lesson) =>
                          Lesson.id === lesson.id &&
                          Lesson.isQuizz === lesson.isQuizz
                      )
                    ) ? (
                      <button
                        onClick={() => {
                          setRead(lesson);
                        }}
                        className="ml-auto mt-4 py-2 text-white px-5 border rounded-full drop-shadow bg-main-purple hover:bg-purple-800 duration-300"
                      >
                        Lu
                      </button>
                    ) : null  }
                  </div>
                </div>
              </div>
              <Footer></Footer>
            </div>
          ) : (
            <h1><Spinner/></h1>
          )}
        </>
      ) : (
        <Spinner />
      )}
    </>
  );
};

export default Lesson;
