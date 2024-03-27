/* eslint-disable react/prop-types */
import { motion } from "framer-motion";

const Quizz = ({
  questionIndex,
  scoreIndex,
  length,
  title,
  responses,
  setScore,
}) => {
  // response.isCorrect == true ? 'Correct' : 'Incorrect'
  const setChecked = (e) => {
    e.target.classList.toggle("bg-gray-200");
    e.target.classList.toggle("hover:bg-gray-300");
  };
  const setStart = document.querySelectorAll(".bg-gray-200");

  // Reset des couleurs des réponses
  setStart.forEach((element) => {
    if (element.classList.contains("bg-green-300")) {
      element.classList.remove("bg-green-300");
      element.classList.remove("styling");
    } else {
      element.classList.remove("bg-red-200");
      element.classList.remove("styling");
      const goodAnswer = document.querySelector('[value="true"]');
      element.classList.remove("bg-gray-200");
      goodAnswer.classList.remove("border-green-300");
      goodAnswer.classList.remove("border-4");
    }
  });

  const sendSelection = () => {
    const selected = document.querySelectorAll(".bg-gray-200");
    const submit = document.getElementById("Submit");
    submit.classList.add("hidden");

    // Affichage des réponses
    selected.forEach((element) => {
      if (element.value == "true") {
        element.classList.add("styling");
        element.classList.add("bg-green-300");
        setScore();
      } else {
        element.classList.add("bg-red-200");
        element.classList.add("styling");
        const goodAnswer = document.querySelector("[value=true]");
        goodAnswer.classList.add("border-green-300");
        goodAnswer.classList.add("border-4");
        goodAnswer.classList.add("styling");
      }
    });
  };

  return (
    <div className="flex flex-col items-center">
      <p className="font-semibold mb-4">{title}</p>
      <div className="flex justify-between w-full">
        <p className="text-main-purple border-2 border-main-purple rounded-full py-2 px-3 mb-6 mr-auto font-semibold">
          Question {questionIndex + 1}/{length + 1}
        </p>
        <motion.div
          key={scoreIndex}
          initial={{ scale: 0 }}
          animate={{ rotate: 360, scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20,
            triggerOnce: true,
          }}
        >
          <p className="text-white bg-main-purple rounded-full py-2 px-3 mb-6 font-semibold duration-300 flex">
            Score : {scoreIndex}
          </p>{" "}
        </motion.div>
      </div>
      <div
        id="answersList"
        className="flex flex-wrap justify-center gap-3 overflow-hidden"
      >
        {responses.map((response, index) => (
          <button
            onClick={setChecked}
            key={index}
            value={response.isCorrect}
            className="response-box w-full h-full py-4 px-24 border rounded drop-shadow	hover:bg-gray-100 hover:animate-pulse duration-100"
          >
            {response.title}
          </button>
        ))}
      </div>
      <button
        onClick={sendSelection}
        id="Submit"
        className="ml-auto mt-4 py-2 text-white px-5 border rounded-full drop-shadow bg-main-purple hover:bg-purple-800 duration-300"
      >
        Envoyer
      </button>
    </div>
  );
};

export default Quizz;
