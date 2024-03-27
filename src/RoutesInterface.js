
const Url = "https://unifreebackend.onrender.com"

const BackRoutes = {
    Formations : Url+"/Formations/",
    Coments : Url+"/Comments/",
    Lessons : Url+"/Lessons/",
    Likes : Url+"/Likes/",
    Quizz : Url+"/Quizz/",
    Qestions : Url+"/Questions/",
    Responses : Url+"/Responses/",

    SpecificUser : Url+"/Users/",
    AllUsers : Url+"/Users/All",
    Login : Url+"/login",
    Signup : Url+"/signup",
    
    JoinFormation : Url+"/Formations/joinFormation/",
    CompleteFormation : Url+"/Formations/PutIsComplete/",
    CheckIsJoinedFormation : Url+"/Formations/CheckIsJoined/",

    PutIsReadLesson : Url+"/Lessons/PutIsRead/",
    ChecIsReadLesson : Url+"/Lessons/CheckIsRead/",

    PutIsCompleteQuizz : Url+"/Quizz/PutIsComplete/",
    CheckIsCompleteQuizz : Url+"/Quizz/CheckIsComplete/",

    // A faire 
    GetFormationLessons : (id) => {
        return (Url+`/Formations/${id}/Lessons`)
    },
    GetFormationQuizzs : (id) => {
        return (Url+`/Formations/${id}/Quizzs`)
    },
    GetFormationComments : (id) => {
        return (Url+`/Formations/${id}/Comments`)
    },
    GetFormationLikes : (id) => {
        return (Url+`/Formations/${id}/Likes`)
    },
    GetQuizzQuestions : (id) => {
        return (Url+`/Quizz/${id}/Questions`)
    },
    GetQuestionResponses : (id) => {
        return (Url+`/Questions/${id}/Responses`)
    },
    GetFollowedFormations : (id) => {
        return (Url+`/Users/${id}/FollowedFormations`)
    },
    GetCreatedFormations : (id) => {
        return (Url+`/Users/${id}/CreatedFormations`)
    },
    GetLikedFormations : (id) => {
        return (Url+`/Users/${id}/LikedFormations`)
    },
    GetCompletedContent : (id) => {
        return (Url+`/Users/${id}/CompletedContent`)
    }
}

export default BackRoutes;
