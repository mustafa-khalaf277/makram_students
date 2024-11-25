import {
  useParams,
  useNavigate
}from "react-router-dom"
import {
  useState,
  useEffect
}from "react"
import {
  ExamDetails
}from "../data/ExamDetails.jsx"
import {
  ErrorMessage
} from "../components/index.js"
import Swal from "sweetalert2"
export default function Details() {
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
    ExamDetails(params.id, setLoader, setError, setData, navigate)
  }, [params.id])
  return (
    <div>
      { !loader && !error.error && data.status == "success" && <HtmlCode
        data={data} /> }
      {
      error.error && ErrorMessage(error.message)
      }

    </div>
  )
}
  function HtmlCode( {
    data
  }) {
    const params = useParams();
    const navigate = useNavigate();
    const HandleOpenExam = ()=> {
      Swal.fire({
        title: "هل انت مستعد لدخول الاختبار ؟",
        icon: "question",
        cancelButtonText: "لا",
        confirmButtonText: "نعم",
        showCancelButton: true,
      }).then((result) => {
        if (result.isConfirmed) {
          navigate(`/exam/${params.id}`);
        }
      });
    }
    return(
      <div className="mt-20 px-2 md:px-4 lg:px-12 xl:px-20 text-right">
        <div className="shadow-[0_0_10px_1px_rgba(0,0,0,0.1)] mb-10 px-3 sm:p-5
          py-10 md:p-10 bg-white
          font-medium max-w-[600px] mx-auto">
          <div className="my-2 relative">
            <span className="after:content-[''] after:block after:absolute
              after:w-0.5 after:h-full
              after:bg-black after:right-0 after:top-0  px-3 text-black/80
              text-sm flex items-center justify-end  ">   {data.data.course_title}</span>
          </div>
          <div className=" text-xl md:text-2xl font-bold">
            {data.data.title}
          </div>
          <div className="text-lg md:text-xl mt-3 sm:mt-6">
            عدد الاسئله :    <span className="font-bold">{data.data.questions_count }</span> سؤال
          </div>
          <div className="text-lg md:text-xl mt-3 sm:mt-6">
            درجات الامتحان :    <span className="font-bold">{data.data.marks }</span>
          </div>
          <div className="text-xl mt-3 sm:mt-6">
            الوصف:  <span className="text-black/70 font-medium">{data.data.description }</span>
          </div>
          <div className="text-xl mt-3 sm:mt-6">
            تاريخ الانشاء :    <span className="font-bold">{data.data.created_at }</span>
          </div>
          <div className=" mt-5 sm:mt-10 text-center">
            <button onClick={HandleOpenExam} className=" px-8 font-bold
              text-white  text-lg rounded
              md:text-xl py-4 bg-[#1A1A1A] border-4 duration-300 border-[#1A1A1A]
              hover:bg-transparent hover:text-black py-3">دخول الاختبار</button>
          </div>
        </div>

      </div>
    )
  }