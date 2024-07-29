import React from 'react';

function Tabs( {tabs} ) {
    // const [activeTab, setActiveTab] = React.useState(0);

    return (
        <div className="ee-mobile-tabs">
            <div className="ee-tab-header-container">
                {tabs.map((tab, index) => ( 
                <div 
                className={tab.activeTab === index ? "ee-tab-header active" : "ee-tab-header"}
                onClick={() => tab.setActiveTab(index)}>
                    {tab.title}
                </div>
                ))}
            </div>
            <div className="ee-tab-content-container">
                {tabs.map((tab, index) => (
                    <div className={tab.activeTab === index ? "ee-tab-content active" : "ee-tab-content"}>
                        {tab.content}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Tabs;