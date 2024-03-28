export default function Chat({ User, Text, mode }) {
  console.log(User)
    return (
      <div className={`p-5 drop-shadow-xl rounded-xl ${User == "UniGPT" ? " bg-purple-400 font-bold text-white mr-8" : "text-right ml-auto bg-white"}`}>
        <p className="font-bold">{User}</p>
        <p>{Text}</p>
      </div>
    );
  }
  