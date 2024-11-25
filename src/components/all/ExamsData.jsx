import {
  useEffect,
  useState,
  useRef
} from "react"
import {
  AllResults
} from "../../data/AllResults"
import {
  useSearchParams,
  Link,
  useNavigate
} from "react-router-dom"
import {
  Loader
} from "../index.js"
import {
  motion
} from "framer-motion"
import {
  CgMoreO
} from "react-icons/cg";
import Swal from "sweetalert2"
export default function ExamsData() {
  const select = useRef()
  const next = useRef()
  const last = useRef()
  const navgate = useNavigate()
  const [data,
    setData] = useState(null)
  const [loader,
    setLoader] = useState(true)
  const [page,
    setPage] = useSearchParams()
  useEffect(()=> {
    window.scrollTo({
      x: 0,
      y: 0,
      behavior: "smooth"
    })
    AllResults(page).then(e => {
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

  const HandleShowDetails = (data, img)=> {
    console.log(img)
    Swal.fire({
      html: `
      <div class="w-full text-right text-xl relative min-h-[200px]" >
      <img class="absolute -z-10 opacity-[0.2] h-full left-1/2 -translate-x-1/2 bottom-0" src="http://localhost:8080/ahmed-makram/api/inc/static/img/20240131_214333_39.png" alt=""/>
      ${data.Corrected === 0?"<div class='w-full grid place-items-center h-full text-2xl '>جار تصحيح الامتحان</div>": `
      ${img != null? `<div class="rounded-full  w-[200px] h-[200px] bg-red-100
      mx-auto my-5 grid place-items-center overflow-hidden"> <img src="${img}"
      class="w-full h-full" alt='img'/></div>`: ""}
      <div>
      <span>الاسئلة</span> :
      <span class="font-medium text-black"> ${data.total_questions}</span>
      </div>
      <div>
      <span>النتيجة</span> :
      <span class="font-medium text-black"> %${(data.exam_marks/data.marks * 100).toFixed(2)}</span>
      </div>
      <div>
      <span>الدرجات</span> :
      <span class="font-medium text-black"> ${data.exam_marks} / ${data.marks}</span>
      </div>
      <div>
      <span>الاسئلة المسلمة </span> :
      <span class="font-medium text-black"> ${data.completed}</span>
      </div>
      <div>
      <span>الاسئلة الصحيحه</span> :
      <span class="font-medium text-black"> ${data.success}</span>
      </div>
      <div>
      <span class="font-medium">
      <span>حالة الامتحان </span>:
      <span class=" px-2 mt-3 ">
      <a class="text-black underline" href="/exam/results/${data.id}">عرض
      النتيجة</a>

      </span>

      </div>
      <div><span></span><span>
      </span></div>`}
      </div>
      `
    });
  }

  return (
    <div className=" bg-white
      rounded shadow-md mb-10">
      {loader && <div className="w-full z-50 h-screen bg-black/30 fixed top-0 right-0">
        <div className="h-full flex items-center justify-center">
          <Loader />
        </div>
      </div>
      }

      <div dir="rtl" className="relative sm:overflow-x-auto divide-x">
        <table className="w-full table-auto text-sm lg:text-lg  text-center
          text-black
          ">
          <thead className="text-lg  uppercase bg-[#6c7ae0] text-white">
            <tr>
              <th scope="col" className="px-6 py-3  md:min-w-44 ">
                الامتحان
              </th>
              <th scope="col" className="px-6 py-3 hidden sm:table-cell">
                الاسئلة
              </th>
              <th scope="col" className="px-6 py-3 hidden sm:table-cell">
                النتيجة
              </th>
              <th scope="col" className="px-6 py-3 hidden sm:table-cell">
                الدرجات
              </th>
              <th scope="col" className="px-6 py-3  hidden sm:table-cell">
                الاسئلة المسلمة
              </th>
              <th scope="col" className="px-6 py-3 hidden sm:table-cell">
                الاسئلة الصحيحة
              </th>
              <th scope="col" className="px-6 py-3 hidden sm:table-cell">
                حالة الامتحان
              </th>
              <th className="px-6 py-3 sm:hidden ">
                معلومات
              </th>
            </tr>
          </thead>
          <tbody>
            {data && data.data.length !== 0 && data.data.map((item, index) => {
              return(
                <motion.tr key={index} className="  even:bg-[#f8f6ff] border-gray-700"
                  initial={ { x: "100%", opacity: 0.5 }}
                  trjansition={ { duratsion: 0.3 }}
                  animate={ { x: 0, opacity: 1 }}
                  >
                  <th scope="row" className="px-6 py-4 font-medium text-gray-900">
                    {
                    item.Corrected === 0? item.title: <Link to={"/exam/results/1"}> {item.title}</Link>
                    }
                  </th>
                  <td className="px-6 py-4 hidden sm:table-cell">
                    {item.total_questions}

                  </td>
                  <td className="px-6 py-4 hidden sm:table-cell">
                    {(item.exam_marks/item.marks * 100).toFixed(2)}%
                  </td>
                  <td className="px-6 py-4 hidden sm:table-cell">
                    {item.exam_marks} / {item.marks}
                  </td>
                  <td className="px-6 py-4 hidden sm:table-cell">
                    {item.completed}
                  </td>
                  <td className="px-6 py-4 hidden sm:table-cell">
                    {item.success}
                  </td>
                  <td className="px-6 py-4 hidden sm:table-cell">
                    <button className={`w-full p-2
                      rounded
                      ${
                      item.Corrected ===
                      0?"bg-blue-400  text-blue-800": (item.exam_marks/item.marks) <
                      .5?"bg-red-400  text-red-800": "bg-green-300  text-green-800"
                      }
                      `}>
                      {
                      item.Corrected === 0?"قيد التصحيح": <Link
                        className="w-full h-full"
                        to={`/exam/results/${
                        item.id
                        }`}>عرض النتيجة</Link>
                      }
                    </button>
                  </td>
                  <td className="px-6 py-3 sm:hidden ">
                    <button onClick={_=>HandleShowDetails(item, data.img)} className="text-3xl text-blue-600"><CgMoreO /></button>
                  </td>
                </motion.tr>

              )
            })}
          </tbody>
        </table>
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
            /10)}</strong>
        </p>
      </div>
      }


    </div>
  )
}