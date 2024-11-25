import Axios from "axios"
import {
  ErrorMessage
} from "../components/ErrorMessage.js"
export async function GetIdea(question_id) {
  try {
    const fetch = await Axios.get(`${import.meta.env.VITE_BACKEND_URL}/suggest.php?question_id=${question_id}`)
    if (fetch.status == 200) {
      if (fetch.data.status == "success") {
        return(fetch.data)
      } else {
        ErrorMessage('لقد حدث خطاء ما')}
      return false
    }
  }catch(e) {}

}