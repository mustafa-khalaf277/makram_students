import Axios from "axios"
export async function GteExamData(id, setLoader, setError, setData, navigate) {
  try {
    const fetch = await Axios.get(`${import.meta.env.VITE_BACKEND_URL}/exam.php?id=${id}`);
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
      window.location(`/404`)
    }

  }
}