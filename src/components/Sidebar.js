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

  let touchTimes = [];

  const tripleTap = (e) => {
    const now = Date.now();
    touchTimes.push(now);

    // Filter out touch times older than 500 milliseconds
    touchTimes = touchTimes.filter(time => now - time < 500);

    if (touchTimes.length === 3) {
      setSidebarVisible(prevState => (prevState === "open" ? "closed" : "open"));
      e.target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      touchTimes = []; // Reset the array after detecting a triple tap
    }
  }

  useEffect(() => {
    const sidebarToggles = document.querySelectorAll(".ee-sidebar-toggle");
    sidebarToggles.forEach(toggle => {
      toggle.addEventListener("click", toggleSidebar);
    });

    document.addEventListener('touchend', tripleTap);


    if (sidebarVisible === "open") {
        document.body.classList.add('easy-editor-on');
        console.log('adding easy editor to the body');
      } else if (sidebarVisible === "closed") {
        document.body.classList.remove('easy-editor-on');
        console.log('removing easy editor to the body');

      }

    return () => {
      sidebarToggles.forEach(toggle => {
        toggle.removeEventListener("click", toggleSidebar);
        document.body.classList.remove('easy-editor-on');
      });
      document.removeEventListener('touchend', tripleTap);
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
          <h2 className="ee-headline"><span className="text-blue">EASY </span> <span className="text-green">EDITOR</span></h2>
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
            title: "Active Tasks 3",
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