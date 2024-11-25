import Axios from "axios"
import {
  ErrorMessage
} from "../components/ErrorMessage.js"
export async function ArchiveData(page) {
  try {
    const fetch = await
    Axios.get(`${import.meta.env.VITE_BACKEND_URL}/archive.php?${page}`)
    if (fetch.status == 200 && fetch.data.status == "success") {
      return fetch.data
    } else {
      ErrorMessage("لقد حدث خطأ")
      return null
    }
  }catch (e) {
    ErrorMessage("لقد حدث خطأ")
  }
  
}
