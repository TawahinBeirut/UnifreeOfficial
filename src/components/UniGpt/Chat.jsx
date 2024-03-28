export default function Chat({ User, Text, mode }) {
  console.log(User)
    return (
      <div className={`p-5 drop-shadow-xl rounded-xl bg-white ${User == "UniGPT" ? " bg-[#D881FF] font-bold text-white mr-8" : "text-right ml-auto"}`}>
        <p className="font-bold">{User}</p>
        <p>{Text}</p>
      </div>
    );
  }
  