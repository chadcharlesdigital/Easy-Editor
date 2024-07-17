import React from 'react'
import './Tabs'
import Tabs from './Tabs';

function Sidebar() {

  // const [sidebarVisible, setSidebarVisible] = React.useState("open");

  return (
    <div id="easy-editor-sidebar">

      <div className="ee-header">
        <div className="ee-exit">
          <i class="fa-solid fa-x fa-2x"></i>
        </div>
        <div className="ee-logo">
          <h2>Easy Editor</h2>
        </div>

        <div className="ee-collapse">
          <i class="fa-sharp fa-solid fa-caret-down fa-2x"></i>
        </div>
      </div>
      <Tabs
        tabs={[
          {
            title: "New Task",
            content: <form>
              <h3>New Task</h3>
              <label htmlFor="task-name">Task Name</label>
              <input type="text" id="task-name" name="task-name" />
              <label htmlFor="task-description">Task Description</label>
              <textarea id="task-description" name="task-description"></textarea>
              <input type="submit" value="Submit" />
            </form>,
            activeTab: 0,
          },
          {
            title: "Current tasks on this page",
            content: <ul>
              <li>Task 1<br />lorum ipsum lorum nunmum lical spocil</li>
              <li>Task 2<br />lorum ipsum lorum nunmum lical spocil</li>
              <li>Task 3<br />lorum ipsum lorum nunmum lical spocil</li>
            </ul>,
            activeTab: 0
          }
        ]} />
    </div>
  );
}

export default Sidebar;