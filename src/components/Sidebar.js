import React, { useEffect } from 'react'
import Tabs from './Tabs';
import NewTaskForm from './NewTaskForm';
import ActiveTasks from './ActiveTasks';


/*
Top level component
*/
function Sidebar() {

  const [sidebarVisible, setSidebarVisible] = React.useState("closed");
  const [activeTasks, setActiveTasks] = React.useState({status:"loading", body:[]});
  const [activeTab, setActiveTab] = React.useState(0);


  const activeTasksTabHeader = () => {
    let tabHeader;
    switch (activeTasks.status) {
      case "loading":
        tabHeader = "Loading...";
        break;
      case "success":
      tabHeader = `Active Tasks (${activeTasks.body.length})`;
        break;
      case "error":
        tabHeader = "Active Tasks (0)";
    }

    return tabHeader;
  }

  //click listener applied to all elements with a class of ee-sidebar-toggle
  const toggleSidebar = (e) => {
    e.preventDefault();
    setSidebarVisible(prevState => (prevState === "open" ? "closed" : "open"));
  };


  //handles the triple tap to open editor on mobile
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

  const fetchActiveTasks = () => {
    wp.apiRequest({ path: 'wp/v2/task/?per_page=100' }).then(tasks => {
      console.log(tasks);
      setActiveTasks({status:"success",body:tasks});
    }).catch(error => {
      console.log('error', error)
      setActiveTasks({status: "error", body:"Error getting active tasks, please reload the page. If the problem persists contact your site admin"});
    });
  }

  //sets up the listeners for opening the sidebar
  useEffect(() => {
    const sidebarToggles = document.querySelectorAll(".ee-sidebar-toggle");
    sidebarToggles.forEach(toggle => {
      toggle.addEventListener("click", toggleSidebar);
    });

    document.addEventListener('touchend', tripleTap);


    if (sidebarVisible === "open") {
      document.body.classList.add('easy-editor-on');
      // console.log('adding easy editor to the body');
    } else if (sidebarVisible === "closed") {
      document.body.classList.remove('easy-editor-on');
      // console.log('removing easy editor to the body');

    }

    return () => {
      sidebarToggles.forEach(toggle => {
        toggle.removeEventListener("click", toggleSidebar);
        document.body.classList.remove('easy-editor-on');
      });
      document.removeEventListener('touchend', tripleTap);
    };
  }, [sidebarVisible]);


  //this is responsible for fetching tasks from the server
  useEffect(() => {
    console.log('fetching tasks')
    // wp.apiRequest({ path: 'wp/v2/task/?per_page=100' }).then(tasks => {
    //   console.log(tasks);
    //   setActiveTasks({status:"success",body:tasks});
    // }).catch(error => {
    //   console.log('error', error)
    //   setActiveTasks({status: "error", body:"Error getting active tasks, please reload the page. If the problem persists contact your site admin"});
    // });
    fetchActiveTasks(); 

  }, []);

  return (
    <div id="easy-editor-sidebar">

      <div className="ee-header">
        <div className="ee-exit"
          onClick={(e) => { setSidebarVisible('closed') }}>
          <i className="fa-solid fa-x"></i>
        </div>
        <div className="ee-logo">
          <div className="ee-headline"><span className="text-blue">EASY </span> <span className="text-green">EDITOR</span></div>
        </div>

        <div className="ee-collapse">
          <i className="fa-sharp fa-solid fa-caret-down"></i>
        </div>
      </div>
      <Tabs
        tabs={[
          {
            title: "New Task",
            content: <NewTaskForm
              sidebarState={sidebarVisible}
              fetchActiveTasks={fetchActiveTasks}
              setActiveTab={setActiveTab} />,
            activeTab: activeTab,
            setActiveTab: setActiveTab
          },
          {
            title: activeTasksTabHeader(),
            content: <ActiveTasks tasks={activeTasks} />,
            activeTab: activeTab,
            setActiveTab: setActiveTab
          }
        ]} />
    </div>
  );
}

export default Sidebar;