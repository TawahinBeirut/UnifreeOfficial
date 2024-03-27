import User from "../models/User";

function Users() {
  const User1 = User({
        username: "jojo69",
        type: "Étudiant",
        email: "jojo69@gmail.com",
        icon: "https://w0.peakpx.com/wallpaper/979/89/HD-wallpaper-purple-smile-design-eye-smily-profile-pic-face.jpg",
        password : "123",
        followedFormation: ["Formation1", "Formation2"],
        likedFormation: ["Formation1"]
  });

  const User2 = User({
    username: "joubert",
    type: "Professeur",
    email: "joubert@gmail.com",
    icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Marmo_z17.JPG/800px-Marmo_z17.JPG",
    password : "123",
    createdFormation: ["Formation1", "Formation2"],
});

  const UserList = [User1, User2];

  return UserList;
}

export default Users;
