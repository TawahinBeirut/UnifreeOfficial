/* eslint-disable react/prop-types */

import useLessons from "../../controllers/useLessons";
import useQuizzs from "../../controllers/useQuizzs";
import useComments from "../../controllers/useComments";
import LikeImage from "../../assets/thumb_up.png";
import LikeImage2 from "../../assets/thumb_up_filled.png";
import useAuthor from "../../controllers/useAuthor";
import BackRoutes from "../../RoutesInterface";
import Comment from "../Comment";
import Cookies from "js-cookie";
import useLikes from "../../controllers/UseLikes";
import Spinner from "../Spinner";
import useLikedFormations from "../../controllers/useLikedFormations";
import { jwtDecode } from "jwt-decode";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";

const FormationInfo = ({ formation, showEditButton }) => {
  const Cover =
    "https://www.batisafe.fr/wp-content/uploads/2020/04/POST_FORMATION-EN-LIGNE.jpg";
  const quizzList = useQuizzs(formation.id);
  const Lessons = useLessons(formation.id);
  const Author = useAuthor(formation.author);
  
  const UserId = Cookies.get("token")
    ? jwtDecode(Cookies.get("token")).Id
    : null;
  const LikedFormations = useLikedFormations(UserId);
  const [tmpLike, setTmpLike] = useState(null);
  
  const [canLike, setCanLike] = useState(true);
  if (Array.isArray(LikedFormations) &&
              LikedFormations.find(
                (Formation) => Formation.id === formation.id
              ) && canLike){setCanLike(false)}
  console.log(canLike)
  const user = Author.id ? Author.id : "User";

  var commentsList = useComments(formation.id);

  const toggleLike = async () => {
    const likeBtn = document.getElementById("likeBtn");
    const tmpLike = {
      FormationId: formation.id,
      AuthorId: UserId,
    };
    if (canLike) {
      likeBtn.src = "/thumb_up_filled.png";
      let result = await fetch(BackRoutes.Likes, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(tmpLike),
      });
      result = await result.json();
      if (result.data.Statut !== 0) {
        setTmpLike(result.data.Id);
        setCanLike(false);
      } else {
        toast.error("Like echoué");
        likeBtn.src = "/thumb_up.png";
        setCanLike(true);
      }
    } else {
      likeBtn.src = "/thumb_up.png";
      let result = await fetch(BackRoutes.Likes + tmpLike, {
        method: "POST",
        headers: {  
          "Content-Type": "application/json",
        },
        body: JSON.stringify(tmpLike)
      });
      result = await result.json();
      console.log(result)
      if (result.Statut === 0) {
        toast.error("Like echoué");
        likeBtn.src = "/thumb_up_filled.png";
        setCanLike(false);
      } else {
        setCanLike(true);
      }
    }
  };

  function addComment() {
    const comment = document.getElementById("comment");
    comment.classList.toggle("hidden");
  }

  function sendComment() {
    const comment = document.getElementById("comment");
    comment.classList.toggle("hidden");
    const content = document.getElementById("content");
    const newComment = {
      AuthorId: UserId,
      FormationId: formation.id,
      Contenu: content.value,
    };
    content.value = "";

    fetch(BackRoutes.Coments, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newComment),
    })
      .then(() => toast.success("Commentaire crée"))
      .catch(() => toast.error("Commentaire non envoyé, erreur"))
      .finally(() => setTimeout(() => refreshComments(), 450));
  }

  function refreshComments() {
    window.location.reload();
    if (Array.isArray(commentsList)) {
      commentsList = commentsList.map((comment) => (
        <div key={comment.author} className="border rounded-xl p-3 mb-2">
          <div className="text-xs font-semibold ">{comment.author}</div>
          <div>{comment.content}</div>
        </div>
      ));
    }
  }

  return (
    <div className="w-full md:w-1/2 flex flex-col items-center shrink-0 rounded-[18px] border-solid">
      <div>{showEditButton(formation.id)}</div>
      <img
        className="md:w-[555px] md:h-[293px] shrink-0 rounded-[14px] mt-6"
        src={Cover}
      />
      <div>
        <p className="md:w-[529px] text-black text-2xl font-medium leading-[normal]">
          {formation.title}
        </p>
        <p className="inline-block text-white bg-cyan-300 rounded text-sm px-2 not-italic font-medium leading-[normal]">
          {formation.categorie}
        </p>
        <div className="flex">
          <p className=" text-[#949494] text-[13px] not-italic font-normal leading-[normal] mr-4">
            {Lessons.length > 0 ? Lessons.length : 0} leçons
          </p>
          <p className=" text-[#949494] text-[13px] not-italic font-normal leading-[normal]">
            {quizzList.length > 0 ? quizzList.length : 0} quizz
          </p>
        </div>
        <div className="flex items-center justify-between mt-3 mb-3">
          <div className=" text-[#949494] text-[13px] not-italic font-normal leading-[normal] flex flex-row items-center gap-3">
            <img
              className="w-9 h-9 mt-2 object-cover rounded-full"
              src={Author.ProfileImage}
              alt="Profile Image"
            ></img>
            <div>
              Écrit par{" "}
              <b>{Author.Name ? Author.Name + " " + Author.Prenom : "User"}</b>
            </div>
          </div>

          <div className="flex flex-row">
            <p className=" text-[#949494] text-base not-italic font-medium leading-[normal]"></p>
            <button>
              {Array.isArray(LikedFormations) &&
              LikedFormations.find(
                (Formation) => Formation.id === formation.id
              ) ? (
                <img
                  id="likeBtn"
                  onClick={toggleLike}
                  className="w-6 h-6 ml-2 shrink-0"
                  src={LikeImage2}
                />
              ) : (
                <img
                  id="likeBtn"
                  onClick={toggleLike}
                  className="w-6 h-6 ml-2 shrink-0"
                  src={LikeImage}
                />
              )}
            </button>
          </div>
        </div>
      </div>
      <div className="w-full p-6">
        <div className="font-medium text-xl mb-4 flex justify-between items-center">
          <p>Commentaires</p>
          <button
            onClick={addComment}
            className=" py-2 text-sm text-white px-5 border rounded-full drop-shadow bg-main-purple hover:bg-purple-800 duration-300 "
          >
            Commenter
          </button>{" "}
        </div>
        <div id="comment" className="hidden mb-6">
          <textarea
            id="content"
            className="w-full border rounded-xl p-3 mb-2"
            placeholder="Ajouter un commentaire..."
          ></textarea>
          <button
            onClick={sendComment}
            className=" py-2 text-sm text-white px-5 border rounded-full drop-shadow bg-main-purple hover:bg-purple-800 duration-300 "
          >
            Envoyer
          </button>
        </div>
        {!commentsList.loading && !commentsList.error
          ? commentsList.map((comment) => <Comment comment={comment} />)
          : null}
      </div>
    </div>
  );
};

export default FormationInfo;
