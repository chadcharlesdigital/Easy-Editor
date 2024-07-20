import React, { useEffect } from 'react'
import Tabs from './Tabs';
import NewTaskForm from './NewTaskForm';
// import './Tabs'

function Sidebar() {

  const [sidebarVisible, setSidebarVisible] = React.useState("closed");

  const toggleSidebar = (e) => {
    e.preventDefault();
    setSidebarVisible(prevState => (prevState === "open" ? "closed" : "open"));
  };

  useEffect(() => {
    const sidebarToggles = document.querySelectorAll(".ee-sidebar-toggle");
    sidebarToggles.forEach(toggle => {
      toggle.addEventListener("click", toggleSidebar);
      if (sidebarVisible === "open") {
        document.body.classList.add('easy-editor-on');
      } else if (sidebarVisible === "closed") {
        document.body.classList.remove('easy-editor-on');
      }
    });

    return () => {
      sidebarToggles.forEach(toggle => {
        toggle.removeEventListener("click", toggleSidebar);
        document.body.classList.remove('easy-editor-on');
      });
    };
  }, [sidebarVisible]);

  return (
    <div id="easy-editor-sidebar">

      <div className="ee-header">
        <div className="ee-exit"
          onClick={(e) => { setSidebarVisible('closed') }}>
          <i className="fa-solid fa-x fa-2x"></i>
        </div>
        <div className="ee-logo">
          <h2>Easy Editor</h2>
        </div>

        <div className="ee-collapse">
          <i className="fa-sharp fa-solid fa-caret-down fa-2x"></i>
        </div>
      </div>
      <Tabs
        tabs={[
          {
            title: "New Task",
            content: <NewTaskForm
              sidebarState={sidebarVisible} />,
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