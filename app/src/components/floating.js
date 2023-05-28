export default function(props) {
  return (
    <div className={`border-2 border-gray-50 rounded bg-white m-1 p-1 shadow-sm shadow-white ${props.className}`}>
      {props.children}
    </div>
  )

}
