/* eslint-disable react/prop-types */

import LikeImage from "..//../assets/thumb_up.png";
import useLessons from "../../controllers/useLessons";
import useQuizzs from "../../controllers/useQuizzs";
import useLikes from "../../controllers/UseLikes";

import { Link } from "react-router-dom";

const FormationCard = ({ formation }) => {
  const Cover =
    "https://www.batisafe.fr/wp-content/uploads/2020/04/POST_FORMATION-EN-LIGNE.jpg";
  const Lessons = useLessons(formation.id);
  const quizzList = useQuizzs(formation.id);
  const likes = useLikes(formation.id);

  return (
    <div className="h-full shrink-0 border rounded-[18px] border-solid border-[#C7C7C7] hover:border-purple-600">
      <Link className="flex flex-col items-center" to={`/${formation.id}`}>
        <img
          className="w-[238.433px] h-[126px] shrink-0 rounded-[14px] mt-6"
          src={Cover}
        />
        <div>
          <p className="w-[220.874px] text-black text-base not-italic font-medium leading-[normal]">
            {formation.title}
          </p>
          <p className=" text-white inline-block bg-[#7a9aed] rounded text-sm px-2 not-italic font-medium leading-[normal]">
            {formation.categorie}
          </p>
          <div className="flex flex-row justify-between p-2">
            <div className="flex gap-2">
              <p className=" text-[#949494] text-[13px] not-italic font-normal ">
                {Lessons.length > 0 ? Lessons.length : 0} leçons
              </p>
              <p className=" text-[#949494] text-[13px] not-italic font-normal ">
                {quizzList.length > 0 ? quizzList.length : 0} quizz
              </p>
            </div>
            <div className="flex gap-2 items-center">
              <p className=" text-[#949494] text-[10px] not-italic font-medium leading-[normal]">
                {Number.isInteger(likes) ? likes : "..."} likes
              </p>
              <img className="w-[14.787px] h-4 shrink-0" src={LikeImage} />
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default FormationCard;
