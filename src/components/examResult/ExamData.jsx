import {
  useParams,
  useNavigate
} from "react-router-dom"
import {
  Result
} from "../../data/Result"
import {
  useState,
  useEffect
} from "react"
import {
  Loader,
  SuccessIcon
} from "../index.js"
import {
  FaRegCircleQuestion
} from "react-icons/fa6"
import {
  VscError
} from "react-icons/vsc";
export default function ExamData() {

  const navigate = useNavigate()
  const [data,
    setData] = useState(null)
  const [loader,
    setLoader] = useState(true)
  const {
    id
  } = useParams()
  useEffect(()=> {
    Result(id, navigate, setLoader).then(e => {
      setData(e);
      console.log(data)

    }
    )
  }, [id])
  return (
    <div>
      {loader && <div className="w-full z-50 h-screen bg-black/30 fixed top-0 right-0">
        <div className="h-full flex items-center justify-center">
          <Loader />
        </div>
      </div>
      }
      {data && data.data.questions && data.data.questions.map((question,
        index)=><div key={index}>
        <div dir="rtl" className={` rounded  my-3 border-4 font-medium
          ${question.is_success === 1?" border-green-400 bg-green-300 text-green-900": " border-red-400 bg-red-300 text-red-800"} text-right p-3`}>
          <div className="flex justify-between mb-4 ">
            <div className="text-2xl w-max">
              {index +1} -
            </div>
            <div className=" text-lg">
              {question.marks}/{question.question_mark}
            </div>
          </div>
          <div className="flex text-justify items-center text-xl">
            <FaRegCircleQuestion className="
              text-gray-600 h-min ml-2  min-w-10" /> {
            question.title
            }
          </div>
          <div className={`grid ${question.img?"md:grid-cols-2 gap-3": ""}`}>
            { question.type == "choose" && <div className="  flex flex-col justify-center">
              <div className="flex my-3 bg-green-400 rounded p-2 items-center
                text-xl">
                <span className="w-10"><SuccessIcon /></span>
                {question[question.choose_answer]}
              </div>
              {!question.is_success &&
              JSON.parse(question.details).student_answer !== null && <div
                className="flex  bg-red-400 rounded p-2 items-center
                text-xl my-3">
                <span className="w-10 text-3xl"><VscError /></span>
                {JSON.parse(question.details).student_answer !== "null"?question[JSON.parse(question.details).student_answer]: `لم
                يتم اختيار اجابة`}

              </div>
              }
            </div>
            }
            {
            question.type == "text" && <div className=" flex flex-col justify-center">
              {question.is_success === 1 && <div
                className="flex  bg-green-400 rounded p-2 items-center
                text-xl my-3">
                <span className="w-10 text-3xl ml-1"><SuccessIcon /></span>
                { JSON.parse(question.details).student_answer}
              </div>
              }
              {question.is_success === 0 && <div>
                <div
                  className="flex  bg-green-400 rounded p-2 items-center
                  text-xl my-3">
                  <span className="w-10 text-3xl ml-1"><SuccessIcon /></span>
                  { question.TEXT}
                </div>
                { JSON.parse(question.details).student_answer !== null && <div
                  className="flex  bg-red-400 rounded p-2 items-center
                  text-xl my-3">
                  <span className="w-10 text-3xl"><VscError /></span>
                  {JSON.parse(question.details).student_answer !== "null"?JSON.parse(question.details).student_answer: `لم
                  يتم ارسال اجابة`}

                </div>
                }
              </div>
              }



            </div>
            }

            {
            question.img && <div className="w-full">
              <img src={question.img} loading="lazy" alt={index} className="rounded w-full max-w-[500px] mx-auto" />
          </div>
          }
        </div>
        {!question.is_success && <div className="text-white my-4
           text-2xl bg-blue-400 p-2 rounded font-medium text-justify">
          {question.answer_details}
        </div>
        }
      </div>
      </div>

    )}
  </div>
)
}