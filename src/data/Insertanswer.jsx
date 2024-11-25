import {
  ErrorMessage
} from "../components/ErrorMessage.js"
import Axios from "axios"
export async function Insertanswer(examId, questionId,
  answer, setLoader, navigate, setAnswerData) {
  try {
    const requestData = new FormData();
    requestData.append("answer", answer)
    requestData.append("exam_id", examId)
    requestData.append("question_id", questionId)
    const fetch = await Axios( {
      method: "post",
      url: `${import.meta.env.VITE_BACKEND_URL}/Insert_option.php`,
      data: requestData
    });
    switch (fetch.status) {
      case 200:
        const data = await fetch.data;
        data.status == "error"?(ErrorMessage(data.message) && setData(null)): setAnswerData(data)
        setLoader(false);
        return data.question_success
        break;
      case 201:
        navigate(`/`)
        break;
      case 204:
        location.reload();
        break;
      case 205:
        location.reload();
        break;
    }
  }catch(e) {
    if (e.status == 404) {
      window.location(`/404`)
    } else {
      setLoader(false);
      ErrorMessage("لقد حدث خطاء غير معروف")
    }
  }
}



export async function GetQuestion(exam_id, navigate, setLoader, setData) {
  try {
    const fetch = await Axios.get(`${import.meta.env.VITE_BACKEND_URL}/get_question.php?exam_id=${exam_id}`)
    setLoader(false);
    switch (fetch.status) {
      case 200:
        setData(fetch.data)
        break;
      case 201:
        navigate(`/`)
        break;
      case 205:
        window.location = "/"
        break;
    }

  }catch(e) {
    if (e.status == 404) {
      navigate(`/404`)
    } else {
      setLoader(false);
      ErrorMessage("لقد حدث خطاء غير معروف")
    }
  }
}