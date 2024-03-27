import useAuthor from "../controllers/useAuthor";
import { storage, Url } from "../firebase";
import useProfileImage from "../controllers/useProfileImage";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import BackRoutes from "../RoutesInterface";
import { toast } from "react-hot-toast";

const Comment = ({ comment }) => {
  const user = Cookies.get("token") ? jwtDecode(Cookies.get("token")) : null;
  const Author = useAuthor(comment.author);
  const CurrentProfile = useProfileImage(Author.id);

  const deleteComment = () => {
    fetch(BackRoutes.Coments + comment.id, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      }
    })
      .then(() => toast.success("Commentaire supprimé"))
      .catch(() => toast.error("Commentaire non supprimé, erreur"))
      .finally(() => setTimeout(() => window.location.reload(), 150));
  };

  return (
    <>
      <div key={comment.author} className="border rounded-xl p-3 mb-2">
        <div className="text-xs font-semibold flex gap-3">
          <img
            className="w-10 h-10 object-cover rounded-full"
            src={CurrentProfile}
            alt="Profile Image"
          ></img>
          <div className=" w-full flex flex-row items-center justify-between">
            {Author.Prenom ? Author.Name + "  " + Author.Prenom : "loading..."}
            {comment.author === user?.Id ? (
            <button class="[&>*]:hover:brightness-0 [&>*]:hover:invert [&>*]:hover:grayscale  hover:bg-red-400 rounded-xl p-1 duration-300" onClick={deleteComment}><img src="delete-icon.png"></img></button>
          ) : null}
          </div>
        </div>
        <div className="ml-14">
          {comment.content}

          
        </div>
      </div>
    </>
  );
};
export default Comment;
