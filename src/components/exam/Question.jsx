import {
  useEffect,
  useState,
  useRef
} from "react"
import Swal from "sweetalert2"
import confetti from "canvas-confetti"
import Suggest from "./Suggest.jsx"
import RaningtimeOut from "../../assets/sounds/ruinng_time_out.mp3"
import Axios from "axios"

import {
  Insertanswer,
  GetQuestion
} from "../../data/Insertanswer.jsx"
import {
  Loader,
  ErrorMessage
} from "../index.js"
import {
  useNavigate
} from "react-router-dom"
import Choose from "./Choose.jsx"
import Text from "./Text.jsx"
import {
  RiSaveLine
} from "react-icons/ri";
export default function Question( {
  exam_data, unCompletedquestions_count, examId, count_of_suggestions
}) {

  const ruinng_time_out = new Audio(RaningtimeOut);


  const navigate = useNavigate()
  const [loader,
    setLoader] = useState(true)
  const [unCompleated,
    setunCompleted] = useState(unCompletedquestions_count)
  const [data,
    setData] = useState(false)
  const [answerData,
    setAnswerData] = useState(false)
  const [answer,
    setAnswer] = useState(null)
  const [time,
    setTime] = useState("00:00")
  const [submitType,
    setSubmitType] = useState("submit")
  const [stopTimer,
    setStopTimer] = useState(false)
  const [answerDetails,
    setAnswerDetails] = useState(false)
  const [sounds,
    setSounds] = useState([])
  useEffect(()=> {
    Axios.get(`${import.meta.env.VITE_BACKEND_URL}/sounds.php`).then(e => {
      if (e.status == 200) {
        setSounds(e.data)
      } else {
        ErrorMessage(" حدث خطاء ما")
      }

    })
    GetQuestion(examId,
      navigate,
      setLoader,
      setData)


  }, [])

  const HandleSubmitAnswer = ()=> {
    if (answer != null) {
      Swal.fire({
        title: "هل تريد تسليم الاجابة ؟",
        text: "اذا قمت بتسليم الاجابة لن تستطيع تغييرها مجددا",
        icon: "question",
        cancelButtonText: "الغاء",
        confirmButtonText: "تسليم",
        showCloseButton: true,
        showCancelButton: true
      }).then((result) => {
        if (result.isConfirmed) {
          SubmitAnswer()
        }
      });

    }
  }
  const SubmitAnswer = ()=> {

    setLoader(true)
    Insertanswer(examId,
      data.id,
      answer,
      setLoader,
      navigate,
      setAnswerData).then(e => {
        if (data.type == "choose") {
          setSubmitType("getQuestion")
          setStopTimer(true)
          if (answer !== "null") {
            if (e) {
              confetti( {
                particleCount: 500,
                spread: 210,
                origin: {
                  y: 0.7
                }
              });
              sounds.length > 0?Playsounds(sounds, "positive"): ""
            } else if (!e && answer) {
              Playsounds(sounds, "negative")
            }
          }
        } else {
          HandleGetQuestion()
        }
      })

  }
  const HandleGetQuestion = ()=> {
    setunCompleted(unCompleated -1)
    setAnswerDetails(false)
    setLoader(true)
    GetQuestion(examId,
      navigate,
      setLoader,
      setData)
    if (data.type == "choose") {
      setSubmitType("submit")
    }
    setAnswerData(false)
    setStopTimer(false)
    setAnswer(null)
  }

  useEffect(()=> {
    const interval = setInterval(()=> {
      if (!stopTimer) {
        setTime(TimeExpirt(data.expirt_at,
          SubmitAnswer, ruinng_time_out))
      }
    },
      1000)
    return ()=>clearInterval(interval)
  }, [data.expirt_at, stopTimer])

  return (
    <div>
      {loader && <div className="w-full h-screen z-50 bg-black/30 fixed top-0 right-0">
        <div className="h-full flex items-center justify-center">
          <Loader />
        </div>
      </div>

      }
      <div className="flex justify-between items-center">
        <Save is_save={data.is_save} setLoader={setLoader}
          id={data.question_id} />
        <div className="text-2xl text-center ">
          {exam_data.title}
        </div>
        <Suggest question_id={data.question_id} count_of_suggestions={count_of_suggestions} />
      </div>

      {
      data.title && <div className="rounded my-10 bg-white shadow-[0_0_10px_1px_rgba(0,0,0,0.2)] p-3">
        <div className="flex items-center justify-between  mb-9 mt-1">
          <div className=" w-min text-3xl  md:text-4xl ">
            {time}
          </div>

          <div className="bg-[#1A1A1A] p-1 px-3  text-2xl text-white md:text-3xl
            flex items-center pb-0 xl:text-4xl ">
            <span>{exam_data.questions_count}</span>/
            <span>{exam_data.questions_count - unCompleated +1}</span>
          </div>
        </div>
        <div>
          <div className="text-right mt-3 mb-7 text-lg font-medium sm:text-lg
            lg:text-xl">
            {data.title}
          </div>

          <div className={`grid grid-cols-1
            ${data && data.img?"md:grid-cols-2": ""}`}>
            {data && data.img && <div className="mb-7 h-full flex">
              <img src={data.img} alt="" className="w-full h-full rounded" />
          </div>
          }
          <div>
            {data && data.type == "choose" && <Choose submitType={submitType} answerData={answerData} data={data}
              answer={answer} setAnswer={setAnswer} />}
            {data && data.type == "text" && <Text answer={answer} data={data} setAnswer={setAnswer} />}
          </div>
        </div>
        { data.type == "choose" && answerData &&
        answerData.answer_details && <div className="text-white my-8
          text-end text-2xl bg-blue-400 p-2 rounded font-medium text-justify">
          {answerData.answer_details}
        </div>
        }

        <div className="flex justify-center mt-5">
          <SubmitButton answer={answer} submitType={submitType}
            HandleSubmitAnswer={HandleSubmitAnswer} HandleGetQuestion={HandleGetQuestion} />
        </div>
      </div>
    </div>
    }

  </div>
)
}

function TimeExpirt(expirtTime, SubmitAnswer, ruinng_time_out) {
  const currentDate = new Date()
  let dateDiff = ((expirtTime - 10)*1000) -currentDate.getTime()

  let minutes = Math.floor((dateDiff % (1000 * 60 * 60)) / (1000 * 60));
  let seconds = Math.floor((dateDiff % (1000 * 60)) / 1000);
  if (minutes == 0 && seconds == 0) {
    SubmitAnswer()
  } else if (minutes < 0 && seconds <= 0) {
    return(`00:00`);
  } else if (minutes == 0 && seconds == 59) {
    Playsounds(ruinng_time_out)
  }

  return(`${minutes < 10?"0"+minutes: minutes}:${seconds < 10?"0"+seconds: seconds}`);

}

function SubmitButton( {
  submitType,
  HandleSubmitAnswer,
  HandleGetQuestion,
  answer
}) {
  return(
    <div className={`mt-4 w-full col-span-2 md:w-1/2 md:mx-auto`}>
      <button onClick={submitType == "submit"?HandleSubmitAnswer:
        HandleGetQuestion} className={`w-full ${answer == null ?"bg-black/60   border-transparent":
        "bg-gray-800 hover:text-black hover:bg-white border-gray-800 "}  text-white py-2
        rounded duration-300 block mx-auto md:mr-0 text-3xl border-4
        font-medium
        `}>
        {submitType == "submit"?"تسليم": "التالى"}

      </button>

    </div>

  )
}

export function Playsounds(sounds, type) {
  if (type && sounds.length > 0) {
    const random = (Math.floor(Math.random() * sounds.filter(e => e.type == type).length) + 0)
    if (sounds) {
      const url = sounds.filter(e => e.type == type)
      const audio = new Audio(url[random].url);
      audio.play()
    }
  } else {
    sounds.play()
  }
}
import {
  IoSaveOutline
} from "react-icons/io5";
import {
  IoMdSave
} from "react-icons/io";
function Save( {
  is_save, setLoader, id
}) {

  const HandleSave = ()=> {
    setLoader(true)
    Axios.get(`${import.meta.env.VITE_BACKEND_URL}/save.php?id=${id}`).then(e => {
      setLoader(false)
      if (e.status == 200) {
        Swal.fire({
          icon: "success",
          text: !save?"تم الحفظ بنجاح": "تم الغاء الحفظ بنجاح"
        })
        setSave(!save)
      } else {
        ErrorMessage("حدث خطاء ما")
      }
    })
  }

  const [save,
    setSave] = useState(0)
  useEffect(_=>setSave(is_save),
    [is_save])
  return(
    <div className="hover:scale-[1.15] duration-500" onClick={HandleSave}>
      {!save && <SaveAddIcon />
      }
      {save == 1 && <SaveRemoveIcon />
      }
    </div>
  )
}

function SaveAddIcon() {
  return(

    <svg viewBox="0 0 24 24" width="70px" fill="white" xmlns="http://www.w3.org/2000/svg">
      <path d="M16 8.98987V20.3499C16 21.7999 14.96 22.4099 13.69
        21.7099L9.76001 19.5199C9.34001 19.2899 8.65999 19.2899 8.23999
        19.5199L4.31 21.7099C3.04 22.4099 2 21.7999 2 20.3499V8.98987C2 7.27987
        3.39999 5.87988 5.10999 5.87988H12.89C14.6 5.87988 16 7.27987 16 8.98987Z"
        stroke="#292D32" strokeWidth="1.5" strokeLinecap="round"
        strokeLinejoin="round" />
      <path d="M22 5.10999V16.47C22 17.92 20.96 18.53 19.69 17.83L16
        15.77V8.98999C16 7.27999 14.6 5.88 12.89 5.88H8V5.10999C8 3.39999 9.39999
        2 11.11 2H18.89C20.6 2 22 3.39999 22 5.10999Z" stroke="#292D32"
        strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M7 12H11" stroke="#292D32" strokeWidth="1.5"
        strokeLinecap="round" strokeLinejoin="round" />
      <path d="M9 14V10" stroke="#292D32" strokeWidth="1.5"
        strokeLinecap="round" strokeLinejoin="round" />
    </svg>

  )
}
function SaveRemoveIcon() {
  return(
    <svg viewBox="0 0 24 24" width="70px" fill="black" xmlns="http://www.w3.org/2000/svg">
      <path d="M21.9998 5.11V16.47C21.9998 17.92 20.9598 18.53 19.6898
        17.83L17.7598 16.75C17.5998 16.66 17.4998 16.49 17.4998 16.31V8.99C17.4998
        6.45 15.4298 4.38 12.8898 4.38H8.81984C8.44984 4.38 8.18984 3.99 8.35984
        3.67C8.87984 2.68 9.91984 2 11.1098 2H18.8898C20.5998 2 21.9998 3.4
        21.9998 5.11Z" fill="black" />
      <path d="M12.89 5.87891H5.11C3.4 5.87891 2 7.27891 2 8.98891V20.3489C2
        21.7989 3.04 22.4089 4.31 21.7089L8.24 19.5189C8.66 19.2889 9.34 19.2889
        9.76 19.5189L13.69 21.7089C14.96 22.4089 16 21.7989 16 20.3489V8.98891C16
        7.27891 14.6 5.87891 12.89 5.87891ZM10.94 12.8789C11.23 13.1689 11.23
        13.6489 10.94 13.9389C10.79 14.0889 10.6 14.1589 10.41 14.1589C10.22
        14.1589 10.03 14.0889 9.88 13.9389L9 13.0589L8.12 13.9389C7.97 14.0889
        7.78 14.1589 7.59 14.1589C7.4 14.1589 7.21 14.0889 7.06 13.9389C6.77
        13.6489 6.77 13.1689 7.06 12.8789L7.94 11.9989L7.06 11.1189C6.77 10.8289
        6.77 10.3489 7.06 10.0589C7.35 9.76891 7.83 9.76891 8.12 10.0589L9
        10.9389L9.88 10.0589C10.17 9.76891 10.65 9.76891 10.94 10.0589C11.23
        10.3489 11.23 10.8289 10.94 11.1189L10.06 11.9989L10.94 12.8789Z"
        fill="black"
        />
    </svg>
  )
}