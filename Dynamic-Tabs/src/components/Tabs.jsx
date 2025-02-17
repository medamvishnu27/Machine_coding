import React, { useState, useEffect } from "react";


const DynamicTabs = () => {
  const defaultTab = [{
    id: 1,
    title: "Tab 1",
    content: (
      <div className="card responsive">
        <h2>Default Tab</h2>
        <p>This is the default tab that remains open.</p>
      </div>
    )
  }];

  const [tabs, setTabs] = useState(() => {
    return defaultTab;
  });

  const [activeTab, setActiveTab] = useState(1);

  useEffect(() => {
    setTabs(defaultTab);
    setActiveTab(1);
  }, []);

  const addTab = () => {
    const newId = tabs.length + 1;
    fetch(`https://fakestoreapi.com/products/${newId}`)
      .then(response => response.json())
      .then(item => {
        const newTab = {
          id: newId,
          title: `Tab ${newId}`,
          content: (
            <div className="card responsive">
              <img src={item.image} alt={item.title} className="product-image" />
              <h2>{item.title}</h2>
              <p><span className="decp">Description:</span>{item.description}</p>
              <h3><span className="price">Rs:</span>{item.price}</h3>
            </div>
          ),
        };
        setTabs([...tabs, newTab]);
        setActiveTab(newId);
      });
  };

  const removeTab = (id) => {
    if (tabs.length === 1) return;
    const updatedTabs = tabs.filter(tab => tab.id !== id);
    setTabs(updatedTabs);
    
    if (activeTab === id) {
      setActiveTab(updatedTabs[0]?.id || 1);
    }
  };

  return (
    <div className="tabs-container responsive">
      <div className="tabs">
        {tabs.map(tab => (
          <div 
            key={tab.id} 
            className={`tab ${tab.id === activeTab ? "active" : ""}`} 
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.title}
            {tabs.length > 1 && (
              <button onClick={(e) => { e.stopPropagation(); removeTab(tab.id); }}>x</button>
            )}
          </div>
        ))}
        <button className="add-btn" onClick={addTab}>+ Add Tab</button>
      </div>
      <div className="content responsive">
        {tabs.find(tab => tab.id === activeTab)?.content}
      </div>
    </div>
  );
};

export default DynamicTabs;
