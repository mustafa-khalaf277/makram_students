import Img from "../../assets/idea.svg"
import {
  useState,
  useEffect
} from "react"
import {
  Playsounds
} from "../../components/exam/Question.jsx"
import SuggestionsSound from "../../assets/sounds/negative_sound_2.m4a"
import {
  GetIdea
} from "../../data/GetIdea.jsx"
import Swal from "sweetalert2"

export default function Suggest( {
  count_of_suggestions,
  question_id
}) {
  const sound = new Audio(SuggestionsSound)
  const [idea,
    setIdea] = useState(null)
  const [suggestCount,
    setSuggestCount] = useState(count_of_suggestions)
  useEffect(()=> setIdea(null), [question_id])

  const HandleClick = ()=> {
    if (idea) {
      Swal.fire({
        icon: "info",
        title: idea
      });
    } else {
      GetIdea(question_id).then(e => {
        if (e) {
          if (e.status == "success" && e.suggest != null) {
            console.log(e)
            setIdea(e.suggest)
            setSuggestCount(e.suggestionsCount)
            Swal.fire({
              icon: "info",
              title: e.suggest
            });
          } else {
            Playsounds(sound)
          }
        }
      })
    }
  }
  return (
    <div>
      {suggestCount != 0 &&
      <button onClick={HandleClick} className="h-10 flex items-center gap-2
        w-max justify-between bg-black mx-auto
        text-white text-3xl px-2 py-6  rounded duration-500 border-4
        border-black
        hover:scale-110 ">
        <img className="h-9" src={Img} />
      <span className="mt-2 ">{suggestCount}</span>
    </button>
    }
  </div>
)
}