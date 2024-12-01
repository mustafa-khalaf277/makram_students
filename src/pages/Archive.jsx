import {
  useEffect,
  useState,
  useRef
} from "react"
import {
  ArchiveData
} from "../data/ArchiveData"
import {
  useSearchParams,
  Link
} from "react-router-dom"
import {
  Loader,
  SuccessIcon
} from "../components/index.js"
import {
  FaRegCircleQuestion
} from "react-icons/fa6"

import {
  VscError
} from "react-icons/vsc";
export default function Archive() {
  const select = useRef()
  const next = useRef()
  const last = useRef()
  const [data,
    setData] = useState(null)
  const [loader,
    setLoader] = useState(true)
  const [page,
    setPage] = useSearchParams()
  useEffect(()=> {
    window.scrollTo({
      left: 0,
      top: 0,
      behavior: "smooth"
    })
    ArchiveData(page).then(e => {
      e != null?setData(e): ""
      setLoader(false)
    }
    )
  }, [page])

  const HandleChangePage = (id)=> {
    setPage({
      page: id
    })
  }

  const selectOptions = []


  useEffect(()=> {
    if (data && data.total) {
      select.current.innerHTML = ``
      for (let i = 1; i < Math.ceil(data.total/10) +1; i++) {
        select.current.innerHTML += `<option  ${ page.get("page") &&
        page.get("page") == i?"selected": ""} value="${i}">${i}</option>`
      }
    }

  },
    [data])

  const HandleButtons = e=> {
    if (e.target.name == "last" != null && page.get("page") > 1) {
      setPage({
        page: page.get("page") -1
      })
      setLoader(true)

    } else if (e.target.name == "next" && page.get("page") < Math.ceil(data.total/10)) {

      setPage({
        page: page.get("page") ?parseInt(page.get("page")) +1: 2
      })
      setLoader(true)

    }
  }

  return (
    <div className="mt-20 px-4 lg:px-12 xl:px-20 ">

      <div className=" bg-white
        rounded shadow-md mb-10 px-3">
        {loader && <div className="w-full z-50 h-screen bg-black/30 fixed top-0 right-0">
          <div className="h-full flex items-center justify-center">
            <Loader />
          </div>
        </div>
        }

        <div dir="rtl" className="relative overflow-x-auto divide-x">
          {data && <Questions data={data} />}

          {data && data.data.length === 0 && <div className="w-full text-center
            my-10 text-lg font-medium">
            لم تقم بانهاء اى اختبار حتى الان
          </div>

          }
        </div>
        {
        data && data.total.length !== 0 && <div dir="ltr" className="p-3 flex
          justify-between items-center border-t-2">
          <div className="flex items-center gap-8">
            <button name="next" onClick={HandleButtons} className=" rounded-md
              border border-slate-300 p-2.5 text-center text-sm transition-all
              shadow-sm hover:shadow-lg text-slate-600 hover:text-white
              hover:bg-[#6c7ae0] hover:border-[#6c7ae0] focus:text-white">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                <path fillRule="evenodd" d="M11.03 3.97a.75.75 0 0 1 0
                  1.06l-6.22 6.22H21a.75.75 0 0 1 0 1.5H4.81l6.22 6.22a.75.75 0 1
                  1-1.06 1.06l-7.5-7.5a.75.75 0 0 1 0-1.06l7.5-7.5a.75.75 0 0 1
                  1.06 0Z" clipRule="evenodd" />
              </svg>
            </button>
            <button name="last" onClick={HandleButtons} className="rounded-md
              border border-slate-300 p-2.5 text-center text-sm transition-all
              shadow-sm hover:shadow-lg text-slate-600 hover:text-white hover:bg-[#6c7ae0] hover:border-[#6c7ae0]">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                <path fillRule="evenodd" d="M12.97 3.97a.75.75 0 0 1 1.06 0l7.5
                  7.5a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 1
                  1-1.06-1.06l6.22-6.22H3a.75.75 0 0 1
                  0-1.5h16.19l-6.22-6.22a.75.75 0 0 1 0-1.06Z" clipRule="evenodd"
                  />
              </svg>
            </button>


          </div>
          <p className="text-slate-600">
            صفحه <strong className="text-slate-800">
              <select ref={select} onChange={e=> HandleChangePage(e.target.value)} className="outline-0 mx-2">
              </select>
            </strong>
            من&nbsp;<strong className="text-slate-800">{Math.ceil(data.total
              /15)}</strong>
          </p>
        </div>
        }


      </div>
    </div>
  )
}





  function Questions( {
    data
  }) {
    return(
      <div>
        {data && data.data.map((question,
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
                  يتم اختيار اجابه`}

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
                    يتم ارسال اجابه`}

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