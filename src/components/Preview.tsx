import { Canvas } from "@react-three/fiber";
import { useGLTF, Stage, Center } from "@react-three/drei";
import { Suspense } from "react";

interface ModelProps {
  path: string;
}

function Model({ path }: ModelProps) {
  const { scene } = useGLTF(path);
  return <primitive object={scene} scale={1.5} />;
}

interface PreviewProps {
  modelPath: string;
}

export default function Preview({ modelPath }: PreviewProps) {
  return (
    <div style={{ width: "100%", height: "60px" }}>
      <Canvas shadows camera={{ position: [0, 0, 150], fov: 50 }}>
        <Suspense fallback={null}>
          <Stage environment="city" intensity={0.5} adjustCamera={true}>
             <Center>
                <Model path={modelPath} />
             </Center>
          </Stage>
        </Suspense>
      </Canvas>
    </div>
  );
}

