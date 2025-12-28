import { useState } from 'react'
import './App.css'
import Scene from "./components/Scene";
import Preview from "./components/Preview";

function App() {
  const [selectedShirt, setSelectedShirt] = useState<string | null>(null);
  const [selectedPant, setSelectedPant] = useState<string | null>(null);

  const shirts = [
    { id: 't1', name: 'T-Shirt 1', path: '/models/t1.glb' },
    { id: 't2', name: 'T-Shirt 2', path: '/models/t2.glb' },
    { id: 't3', name: 'T-Shirt 3', path: '/models/t3.glb' },
    { id: 't4', name: 'T-Shirt 4', path: '/models/t4.glb' },
  ];

  const pants = [
    { id: 'p1', name: 'Pant 1', path: '/models/p1.glb' },
    { id: 'p2', name: 'Pant 2', path: '/models/p2.glb' },
    { id: 'p3', name: 'Pant 3', path: '/models/p3.glb' },
    { id: 'p4', name: 'Pant 4', path: '/models/p4.glb' },
  ];

  return (
    <div style={{ width: "100vw", height: "100vh", display: 'flex' }}>
      {/* Sidebar */}
      <div className="sidebar">
        <h2 className="sidebar-title">3D Dresser</h2>
        
        <div className="category">
          <h3 className="category-title">Shirts</h3>
          <div className="item-grid">
            {shirts.map((shirt) => (
              <button
                key={shirt.id}
                className={`item-button ${selectedShirt === shirt.id ? 'active' : ''}`}
                onClick={() => setSelectedShirt(shirt.id)}
              >
                <div className="item-preview">
                  <Preview modelPath={shirt.path} />
                </div>
                <span className="item-name">{shirt.name}</span>
              </button>
            ))}
            <button 
              className="item-button reset" 
              onClick={() => setSelectedShirt(null)}
            >
              None
            </button>
          </div>
        </div>

        <div className="category">
          <h3 className="category-title">Pants</h3>
          <div className="item-grid">
            {pants.map((pant) => (
              <button
                key={pant.id}
                className={`item-button ${selectedPant === pant.id ? 'active' : ''}`}
                onClick={() => setSelectedPant(pant.id)}
              >
                <div className="item-preview">
                  <Preview modelPath={pant.path} />
                </div>
                <span className="item-name">{pant.name}</span>
              </button>
            ))}
            <button 
              className="item-button reset" 
              onClick={() => setSelectedPant(null)}
            >
              None
            </button>
          </div>
        </div>
      </div>

      {/* 3D Scene */}
      <div style={{ flex: 1, position: 'relative' }}>
        <Scene selectedShirt={selectedShirt} selectedPant={selectedPant} />
      </div>
    </div>
  )
}

export default App
