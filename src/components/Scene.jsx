import { useState, useRef, useEffect } from 'react'
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import * as THREE from 'three'

function YBot() {
  const { scene } = useGLTF("/models/ybot.glb");
  return <primitive object={scene} />;
}

function ClothingItem({ modelPath, isSelected, category }) {
  const { scene } = useGLTF(modelPath);
  const ref = useRef();
  
  // Clone scene to avoid conflicts if multiple items use the same model
  const clonedScene = useRef();
  if (!clonedScene.current) clonedScene.current = scene.clone();

  // Coordinates based on user adjustments
  const pantCoords = [0, -0.095, -0.01];
  const shirtCoords = [0, -0.08, 0.02];
  
  const targetCoords = category === 'pant' ? pantCoords : shirtCoords;
  const sideX = category === 'pant' ? -1.5 : 1.5;

  const pantScale = [1.09, 1.06, 1.05];
  const shirtScale = [1.05, 1.05, 1.05];
  const targetScale = category === 'pant' ? pantScale : shirtScale;

  useFrame((state, delta) => {
    if (ref.current) {
      if (isSelected) {
        // Move to fitted position
        const targetPos = new THREE.Vector3(...targetCoords);
        ref.current.position.lerp(targetPos, delta * 5);
        ref.current.scale.lerp(new THREE.Vector3(...targetScale), delta * 5);
      } else {
        // Move to side/invisible position
        const targetPos = new THREE.Vector3(sideX, -2, 0); // Hide below if not selected
        ref.current.position.lerp(targetPos, delta * 5);
        ref.current.scale.lerp(new THREE.Vector3(0, 0, 0), delta * 5);
      }
    }
  });

  return isSelected ? (
    <primitive
      ref={ref}
      object={clonedScene.current}
      scale={0} // Start small
      position={[sideX, -0.5, 0]} 
    />
  ) : null;
}

export default function Scene({ selectedShirt, selectedPant }) {
  return (
    <Canvas camera={{ position: [0, 2, 5] }}>
      <ambientLight intensity={0.8} />
      <directionalLight position={[5, 10, 5]} intensity={1} />
      
      <YBot />

      {/* Dynamic Clothing Rendering */}
      {selectedShirt && (
        <ClothingItem 
          key={selectedShirt} 
          modelPath={`/models/${selectedShirt}.glb`} 
          isSelected={true} 
          category="shirt" 
        />
      )}
      
      {selectedPant && (
        <ClothingItem 
          key={selectedPant} 
          modelPath={`/models/${selectedPant}.glb`} 
          isSelected={true} 
          category="pant" 
        />
      )}

      <OrbitControls minDistance={2} maxDistance={10} target={[0, 1, 0]} />
    </Canvas>
  );
}
