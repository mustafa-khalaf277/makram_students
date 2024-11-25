import {
  FaCircleCheck
} from "react-icons/fa6";
import {
  FaRegCircle
} from "react-icons/fa";
export default function Choose( {
  data, answer, setAnswer, answerData, submitType
}) {

  /*
function Answer(x){
  const arr=[
  a:0,
  b:1,
  c:2,
  d:3,
  0:setAnswer("a"),
  1:setAnswer("b"),
  2:setAnswer("c"),
  3:setAnswer("d")
  ]
  return arr[x];
}
//not working
*/

  function Answer(x) {
    switch (x) {
    case 0:
      setAnswer("a")
      break;
    case 1:
      setAnswer("b")
      break;
    case 2:
      setAnswer("c")
      break;
    case 3:
      setAnswer("d")
      break;
    case "a":
      return 0
      break;
    case "b":
      return 1
      break;
    case "c":
      return 2
      break;
    case "d":
      return 3
      break;
    default:
      return null
    }
  }

  return (
    <ul className={`text-right h-full  ${data.img?`md:pl-3
      items-between grid mt-5 md:mt-0`: `md:grid
      md:grid-cols-2 `}
      gap-3`}>
      {[data.a,
        data.b,
        data.c,
        data.d].map((item, index)=> {
          return <li onClick={_=>submitType === "submit"? Answer(index): ""}
            key={index} className={` w-full col-span-1  p-2 duration-300 mt-3
            md:mt-0 bg-black/5  rounded font-medium flex items-center
            justify-end md:text-xl sm:text-lg
            `}>
            <div>
              {
              item
              }
            </div>
            <div className="ml-3 ">
              {Answer(answer) != index && Answer(answerData.answer) != index && <FaRegCircle className={
                `text-4xl` } />
              }
              {Answer(answer) == index && !answerData && <FaCircleCheck className={
                `text-4xl` } />
              }
              {Answer(answer) === index && answerData && <FaCircleCheck className={
                `text-4xl ${answerData.question_success?"text-green-400": "text-red-500"}` } />
              }
              {Answer(answer) != index && Answer(answerData.answer) == index && <FaCircleCheck className={
                `text-4xl text-green-500` } />
              }


            </div>
          </li>
        })}
    </ul>
  )
}