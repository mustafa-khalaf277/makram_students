import {
  BiSolidError
} from "react-icons/bi";
export default function ErrorMessage(message) {

  return(
    <div className="w-full h-[60vh] flex items-center flex-wrap justify-center text-3xl">
      <div className="w-full flex items-center flex-col font-bold  ">
        <BiSolidError className="text-[170px] text-red-600 mb-3" />
        {message}
      </div>
    </div>

  )
}