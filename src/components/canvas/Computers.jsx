import React, { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";

import CanvasLoader from "../Loader";

const Computers = ({ deviceType }) => {
  const computer = useGLTF("./desktop_pc/scene.gltf");

  // Adjust scale, position, and rotation dynamically based on the device type
  const configurations = {
    mobile: { scale: 0.7, position: [0, -3, -2.2], rotation: [-0.01, -0.2, -0.1] },
    tablet: { scale: 0.8, position: [0, -4.0, -1.8], rotation: [-0.01, -0.25, -0.1] },
    desktop: { scale: 0.9, position: [0, -3.25, -1.5], rotation: [-0.01, -0.2, -0.1] },
  };

  const { scale, position, rotation } = configurations[deviceType];

  return (
    <mesh>
      <hemisphereLight intensity={0.15} groundColor="black" />
      <spotLight
        position={[-20, 50, 10]}
        angle={0.12}
        penumbra={1}
        intensity={1}
        castShadow
        shadow-mapSize={1024}
      />
      <pointLight intensity={1} />
      <primitive object={computer.scene} scale={0.75} position={[0,-4.5,-1.5]} rotation={[-0.01,-0.2,-0.1]} />
    </mesh>
  );
};

const ComputersCanvas = () => {
  const [deviceType, setDeviceType] = useState("desktop");

  useEffect(() => {
    // Function to detect the device type based on window width
    const updateDeviceType = () => {
      const width = window.innerWidth;
      if (width <= 450) {
        setDeviceType("mobile");
      } else if (width > 500 && width <= 1024) {
        setDeviceType("tablet");
      } else {
        setDeviceType("desktop");
      }
    };

    // Set the initial device type
    updateDeviceType();

    // Add a listener for window resize to dynamically update the device type
    window.addEventListener("resize", updateDeviceType);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("resize", updateDeviceType);
    };
  }, []);

  return (
    <Canvas
      frameloop="demand"
      shadows
      dpr={[1, 2]}
      camera={{ position: [20, 3, 5], fov: 25 }}
      gl={{ preserveDrawingBuffer: true }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
        <Computers deviceType={deviceType} />
      </Suspense>

      <Preload all />
    </Canvas>
  );
};

export default ComputersCanvas;
