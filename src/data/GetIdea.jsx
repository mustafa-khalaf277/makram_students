import Axios from "axios"
import Swal from "sweetalert2"
import {
  ErrorMessage
} from "../components/ErrorMessage.js"
export async function GetIdea(question_id) {
  try {
    const fetch = await Axios.get(`${import.meta.env.VITE_BACKEND_URL}/suggest.php?question_id=${question_id}`)
    if (fetch.status == 200) {
      if (fetch.data.status == "success") {
        return(fetch.data)
      } else if (fetch.data.status == "error" && fetch.data.message) {
         

        Swal.fire({
          icon: "info",
          text: fetch.data.message
        })
      
      } else {
        ErrorMessage('لقد حدث خطاء ما')}
      return false
    }
  }catch(e) {}

}