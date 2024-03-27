/* eslint-disable react/prop-types */
import { Link, useParams } from "react-router-dom";
import useLessons from "../../controllers/useLessons";
import useQuizzs from "../../controllers/useQuizzs";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import useCompleted from "../../controllers/useCompleted";
import SpinnerMin from "../Spinner";

const ProgramList = ({ formation }) => {
  const formationLink = useParams();
  const userid = (Cookies.get('token')) ? jwtDecode(Cookies.get('token')).Id : null

  const Completed = useCompleted(userid)
  const linkPrefix =
    formationLink.id === formation.id ? "./" : `/${formation.id}/`;

  function refreshPage() {
    setTimeout(() => {
      window.location.reload(false);
    }, 500);
  }
  const Lessons = useLessons(formation.id);
  const Quizzs = useQuizzs(formation.id);
  let LessonsQuizz;
  
  LessonsQuizz = (Array.isArray(Lessons) && Array.isArray(Quizzs)) ? [...Lessons,...Quizzs] : null; 
  let LessonsCompleted = (Completed.data) ? Completed.data.map(lesson =>{
    const result = (Object.keys(lesson).includes("LeconId")) ? {id: lesson.LeconId,isQuizz: false}: {id: lesson.QuizzId,isQuizz: true}
    return result;
  }) : null
  const lessonList = (LessonsQuizz) ? LessonsQuizz.map((lesson) => (
    <>
    {
      lesson.title ?
    <Link
      className="p-3 w-full hover:bg-gray-200"
      key={lesson.title}
      to={`${linkPrefix}${lesson.title.toLowerCase().replace(/\s+/g, "")}`}
      // onClick={refreshPage}
    >
      <img
        src={lesson.isQuizz ? "/quizzIcon.png" : "/lessonIcon.png"}
        className={`w-6 h-6 mr-4 inline-block ${(Array.isArray(LessonsCompleted) && LessonsCompleted.find(Lesson => Lesson.id === lesson.id && Lesson.isQuizz === lesson.isQuizz))? 'grayscale-0' : 'grayscale'}`}
        />
      {lesson.title}
    </Link>
    : null}
    </>
  )) : null;

  return (
    <div className="flex flex-col w-full border rounded-[18px] border-solid border-[#C7C7C7] border-between">
      {lessonList? lessonList: <SpinnerMin/>}
    </div>
  );
};

export default ProgramList;
