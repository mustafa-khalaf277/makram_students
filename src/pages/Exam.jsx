import {
  useEffect,
  useState
} from "react"
import {
  PageTitle,
  Question
} from "../components/exam/index.js"
import {
  useParams,
  useNavigate
} from "react-router-dom"
import {
  GteExamData
} from "../data/ExamData.jsx"
import {
  ErrorMessage
} from "../components/index.js"
export default function Exam() {
  const params = useParams()
  const navigate = useNavigate()
  const [loader,
    setLoader] = useState(true)
  const [error,
    setError] = useState( {
      error: false,
      message: ""
    })
  const [data,
    setData] = useState( {
      title: null
    })
  useEffect(()=> {
    GteExamData(params.id, setLoader, setError, setData, navigate)
  }, [])
  useEffect(()=> {
    if (data.exam_done) {
      navigate(`/exam/results/${params.id}`);
    }
  },
    [data])
  return (
    <div className="mt-20 px-4 lg:px-12 xl:px-20 ">
      { !loader && !error.error && data.status == "success" &&
      <>
        <Question examId={params.id} exam_data={data}
          unCompletedquestions_count={data.un_completed}
          count_of_suggestions={data.count_of_suggestions} />
      </>
      }
      {
      error.error && ErrorMessage(error.message)
      }

    </div>
  )
}