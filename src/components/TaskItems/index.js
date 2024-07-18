import './index.css'

const TaskItems = props => {
  const {eachOption} = props
  const {text, option} = eachOption
  return (
    <li className="each-task-item">
      <p className="task-item-title">{text}</p>
      <p className="task-item-para">{option}</p>
    </li>
  )
}
export default TaskItems
