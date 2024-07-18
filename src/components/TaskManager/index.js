import {Component} from 'react'
import TaskItems from '../TaskItems'
import './index.css'

class TaskManager extends Component {
  constructor(props) {
    super(props)
    const {tagsList} = this.props
    const updated = tagsList.map(eachChange => ({
      ...eachChange,
      isActive: false,
    }))
    this.state = {
      options: updated,
      task: '',
      tagOption: tagsList[0].displayText,
      items: [],
      searchQ: '',
      isActive: false,
    }
  }

  onChangeAddTask = event => {
    this.setState({task: event.target.value})
  }

  onChangeAddSubmitTask = () => {
    const {task, tagOption, items} = this.state
    const updated = [...items, {text: task, option: tagOption}]
    this.setState({items: updated, task: ''})
  }

  onChangeSelectOption = event => {
    this.setState({tagOption: event.target.value})
  }

  onSearchItem = event => {
    const {isActive, options, searchQ} = this.state
    const updated = options.map(eachActive => {
      if (eachActive.displayText === event.target.id) {
        return {...eachActive, isActive: !eachActive.isActive}
      }
      return {...eachActive, isActive: false}
    })
    console.log(updated)
    const val = updated.filter(
      eachVal => eachVal.displayText === event.target.id,
    )
    if (val.length > 0 && val[0].isActive === true) {
      this.setState({
        options: updated,
        searchQ: event.target.id,
        isActive: true,
      })
    } else {
      this.setState({options: updated, searchQ: '', isActive: false})
    }
  }

  render() {
    const {options, items, task, tagOption, searchQ} = this.state
    const updatedSet = items.filter(eachSearch =>
      eachSearch.option.includes(searchQ),
    )

    return (
      <div className="main-container">
        <div className="left-container">
          <h1 className="left-container-title">Create a task!</h1>
          <div className="left-container-inputs">
            <label className="label-item-style" htmlFor="task">
              Task
            </label>
            <br />
            <input
              placeholder="Enter the task here"
              className="input-field-style"
              type="text"
              onChange={this.onChangeAddTask}
              id="task"
              value={task}
            />
          </div>
          <div className="left-container-inputs">
            <label className="label-item-style" htmlFor="tags">
              Tags
            </label>
            <br />
            <select
              className="input-field-style"
              value={tagOption}
              onChange={this.onChangeSelectOption}
            >
              {options.map(eachItem => (
                <option value={eachItem.displayText} key={eachItem.optionId}>
                  {eachItem.displayText}
                </option>
              ))}
            </select>
          </div>
          <button
            type="button"
            className="add-button-style"
            onClick={this.onChangeAddSubmitTask}
          >
            Add Task
          </button>
        </div>
        <div className="right-container">
          <h1 className="left-container-title tags-title">Tags</h1>
          <ul className="unordered-buttons">
            {options.map(eachSet => (
              <button
                className={`add-button-style filter-buttons ${
                  eachSet.isActive ? 'filter-background-color' : null
                }`}
                type="button"
                id={eachSet.displayText}
                key={eachSet.optionId}
                onClick={this.onSearchItem}
              >
                {eachSet.displayText}
              </button>
            ))}
          </ul>
          <h1 className="left-container-title tags-title">Tasks</h1>
          {updatedSet.length > 0 ? (
            <ul className="unordered-list-task-items-container">
              {updatedSet.map(eachOption => (
                <TaskItems eachOption={eachOption} key={eachOption.option} />
              ))}
            </ul>
          ) : (
            <div className="no-tasks-added-container">
              <h1 className="left-container-title tags-title">
                No Tasks Added Yet
              </h1>
            </div>
          )}
        </div>
      </div>
    )
  }
}
export default TaskManager
