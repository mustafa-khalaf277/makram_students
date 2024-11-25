import Axios from "axios"
export async function ExamDetails(id, setLoader, setError, setData, navigate) {
  try {
    const fetch = await Axios.get(`${import.meta.env.VITE_BACKEND_URL}/exam_details.php?id=${id}`);
    switch (fetch.status) {
      case 200:
        const data = await fetch.data;
        data.status == "error"?setError({
          error: true, message: data.message
        }): setData(data)
        setLoader(false);
        break;
      case 201:
        navigate(`/`)
        break;
      case 204:
        window.location = `/`
        break;
    }
  }catch(e) {
    if (e.status == 404) {
      navigate(`/404`)

    } else {
      setError({
        error: true, message: "لقد حدث خطاء ما"
      })
      setLoader(false);

    }
  }

}