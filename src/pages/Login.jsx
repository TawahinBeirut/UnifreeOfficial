import logo from "../assets/whitelogo.png";
import Cookies from "js-cookie";
import { useNavigate } from "react-router";
import { useState,useEffect} from "react";
import { Link } from "react-router-dom";
  
const Login = () => {
  const [user, setUser] = useState({
    Email : "",
    Password: "",
  })

  
  const [inputError, setInputError] = useState(false);
  
  const navigate = useNavigate();
  
  const SubmitCheck =  (e) => {
    e.preventDefault();
    if (!user.Password && !user.Email) {
      setInputError(true);
      return;
    }

    fetchData();
  };

  useEffect(() => {
      setTimeout(() => setInputError(false), 3000);
    }, [inputError])
    

  const fetchData = () => {  
    fetch("https://unifreebackend.onrender.com/users/login", 
      {
        method : "POST",
        headers: {
                  "Content-Type": "application/json",
                },
        body: JSON.stringify(user),
      }
      )
    .then((res) => res.json())
    .then((datares) => {

      if(datares.Statut == 200){
        
        Cookies.set('token',datares.Message.JwtToken);
        navigate('/');
      }else{
        
        setInputError(true);
      }
    })
    .catch((e) => {
      //setInputError(true)
      console.log(e)
    })
  } 

  return (
    <div className="w-screen h-screen flex flex-row ">
      <div className="basis-1/2 flex flex-col items-center justify-center">
        <div className="flex items-center justify-center">
          <Link className="font-semibold text-main-purple border-b-2 px-5 py-1 border-b-main-purple">
            Se connecter
          </Link>
          <Link className="font-semibold text-secondary-grey border-b-2 px-5 py-1 border-b-secondary-grey" to="/signup">
            S&apos;inscrire
          </Link>
        </div>
        <form className="mt-7 flex flex-col gap-2" onSubmit={SubmitCheck}>
           {
            inputError == true ?(<p className="bg-red-200 rounded-md p-4">l'email / mot de passe sont  incorrect !</p>): null
          }
          <input
            type="email"
            className="bg-transparent px-3 py-2 border-b border-b-secondary-grey focus:outline-none focus:border-b-slate-500"
            placeholder="Email"
            onChange={(e) => setUser({...user, Email : e.target.value})}
            value={user.Email}
          />
          <input
            type="password"
            className="bg-transparent px-3 py-2 border-b border-b-secondary-grey focus:outline-none focus:border-b-slate-500"
            placeholder="Mot de passe"
            onChange={(e) => setUser({...user, Password : e.target.value})}
            value={user.Password}
          />
          <button
            type="submit"
            className="font-semibold bg-main-purple mt-7 rounded hover:bg-purple-900 text-white p-3"
          >
            Se connecter
          </button>
        </form>
      </div>
      <div className=" w-full basis-1/2 bg-main-purple flex items-center justify-center">
      <Link to={"/"} className="w-1/2"><img src={logo} className="w-full" /></Link>
      </div>
    </div>
  );
};

export default Login;
