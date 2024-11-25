import {
  useState,
  useEffect
} from "react"
export default function Text( {
  setAnswer, data
}) {
  const [value,
    setValue] = useState("");
  useEffect(()=>setValue(""), [data])
  return (
    <div className="h-full">
      <div className={`${data.img?"md:ml-3": ""} h-full `}>
        <textarea maxLength={1000} value={value}
          onChange={e=> { setAnswer(e.target.value); setValue(e.target.value)}}
          className={`w-full h-40 mt-10 md:mt-0 ${data.img?"md:h-full": "md:h-72"}  bg-transparent border-4
          runded border-black/20 outline-0 p-3 placeholder:text-right
          placeholder:text-2xl `} dir="auto" placeholder="الاجابه هى
          "></textarea>
      </div>
    </div>
  )
}