export default function PageTitle( {
  title
}) {
  return (
    <div>
      <div className="text-lg md:text-xl xl:text-2xl font-medium text-center
        px-10  mx-auto">
        {title}
      </div>
    </div>
  )
}