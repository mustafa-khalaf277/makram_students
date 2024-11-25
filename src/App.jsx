import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom"
import {
  Details,
  Exam,
  ExamResult,
  AllExamsResults,
  Archive
} from "./pages/index.js"
export default function App() {
  return (
    <Router basename={ import.meta.env.VITE_BASENAME }>
      <Routes>
        <Route index element={<AllExamsResults />} />
        <Route path={"/exam/:id/details"} element={<Details />} />
        <Route path={"/exam/:id"} element={<Exam />} />
        <Route path={"/exam/results/:id"} element={<ExamResult />} />
        <Route path={"/archive"} element={<Archive />} />
      </Routes>
    </Router>
  )
}