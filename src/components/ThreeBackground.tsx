"use client";

import { useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { 
  Environment, 
  Float, 
  MeshTransmissionMaterial,
  Text,
  RoundedBox
} from "@react-three/drei";
import * as THREE from "three";

// Scroll state types
type ScrollState = "hero" | "story" | "featured1" | "featured2" | "projects" | "final";

interface ScrollContextValue {
  scrollState: ScrollState;
  scrollProgress: number;
}

// Hook to get scroll progress
function useScrollProgress(): ScrollContextValue {
  const [scrollState, setScrollState] = useState<ScrollState>("hero");
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = Math.min(scrollY / docHeight, 1);
      setScrollProgress(progress);

      // Determine scroll state based on sections
      const sections = ["story", "featured", "projects", "experience", "skills", "contact"];
      const viewportHeight = window.innerHeight;
      
      // Get section positions
      const storyEl = document.getElementById("story");
      const featuredEl = document.getElementById("featured");
      const projectsEl = document.getElementById("projects");
      const experienceEl = document.getElementById("experience");
      
      const storyTop = storyEl?.offsetTop ?? 0;
      const featuredTop = featuredEl?.offsetTop ?? Infinity;
      const projectsTop = projectsEl?.offsetTop ?? Infinity;
      const experienceTop = experienceEl?.offsetTop ?? Infinity;
      
      const scrollPos = scrollY + viewportHeight * 0.3;
      
      if (scrollPos < storyTop + viewportHeight * 0.5) {
        setScrollState("hero");
      } else if (scrollPos < featuredTop) {
        setScrollState("story");
      } else if (scrollPos < featuredTop + viewportHeight) {
        setScrollState("featured1");
      } else if (scrollPos < projectsTop) {
        setScrollState("featured2");
      } else if (scrollPos < experienceTop) {
        setScrollState("projects");
      } else {
        setScrollState("final");
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return { scrollState, scrollProgress };
}

// Receipt paper component with realistic appearance
function Receipt({ scrollState }: { scrollState: ScrollState }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const textOpacity = useRef(1);
  
  // Create receipt texture with faint lines
  const receiptTexture = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 256;
    canvas.height = 512;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      // Paper base
      ctx.fillStyle = "#FAFAFA";
      ctx.fillRect(0, 0, 256, 512);
      
      // Subtle paper texture
      for (let i = 0; i < 1000; i++) {
        ctx.fillStyle = `rgba(0, 0, 0, ${Math.random() * 0.02})`;
        ctx.fillRect(Math.random() * 256, Math.random() * 512, 1, 1);
      }
      
      // Receipt text lines (simulated)
      ctx.fillStyle = "#CCCCCC";
      const linePositions = [40, 60, 90, 110, 130, 160, 180, 200, 230, 260, 290, 320, 360, 400, 440];
      linePositions.forEach((y, i) => {
        const width = i === 0 ? 120 : 60 + Math.random() * 100;
        const x = i === 0 ? 68 : 30 + Math.random() * 20;
        ctx.fillRect(x, y, width, i === 0 ? 6 : 3);
      });
      
      // Total line
      ctx.fillStyle = "#999999";
      ctx.fillRect(30, 460, 180, 4);
    }
    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;
    return texture;
  }, []);

  useFrame((state, delta) => {
    if (!meshRef.current) return;
    
    // Gentle floating animation
    const time = state.clock.elapsedTime;
    meshRef.current.position.y = -0.5 + Math.sin(time * 0.5) * 0.02;
    meshRef.current.rotation.z = Math.sin(time * 0.3) * 0.01;
    
    // Fade text when scanned
    if (scrollState === "featured1" || scrollState === "featured2" || scrollState === "projects" || scrollState === "final") {
      textOpacity.current = THREE.MathUtils.lerp(textOpacity.current, 0.3, delta * 2);
    } else {
      textOpacity.current = THREE.MathUtils.lerp(textOpacity.current, 1, delta * 2);
    }
  });

  return (
    <group position={[-1.5, 0, 0]}>
      {/* Receipt paper */}
      <mesh ref={meshRef} rotation={[0.1, 0.2, 0.02]}>
        <planeGeometry args={[1.2, 2.4, 32, 32]} />
        <meshStandardMaterial
          map={receiptTexture}
          side={THREE.DoubleSide}
          roughness={0.9}
          metalness={0}
        />
      </mesh>
      
      {/* Paperclip detail */}
      <mesh position={[0.4, 0.8, 0.05]} rotation={[0, 0, 0.3]}>
        <torusGeometry args={[0.08, 0.015, 8, 20, Math.PI * 1.5]} />
        <meshStandardMaterial color="#A0A0A0" metalness={0.8} roughness={0.2} />
      </mesh>
    </group>
  );
}

// Scanner device component
function Scanner({ scrollState }: { scrollState: ScrollState }) {
  const groupRef = useRef<THREE.Group>(null);
  const scanLineRef = useRef<THREE.Mesh>(null);
  const glowIntensity = useRef(0);
  
  useFrame((state, delta) => {
    if (!groupRef.current || !scanLineRef.current) return;
    
    const time = state.clock.elapsedTime;
    
    // Scanner glow based on state
    const targetGlow = scrollState === "story" || scrollState === "featured1" ? 1 : 
                       scrollState === "hero" ? 0 : 0.3;
    glowIntensity.current = THREE.MathUtils.lerp(glowIntensity.current, targetGlow, delta * 3);
    
    // Scan line animation
    if (scrollState === "featured1") {
      scanLineRef.current.position.y = Math.sin(time * 2) * 1.1;
      scanLineRef.current.visible = true;
    } else {
      scanLineRef.current.visible = scrollState === "story";
      scanLineRef.current.position.y = -1.2;
    }
    
    // Subtle hover
    groupRef.current.position.y = Math.sin(time * 0.4) * 0.015;
  });

  return (
    <group ref={groupRef} position={[0, -0.3, 0.5]}>
      {/* Scanner body - main housing */}
      <RoundedBox args={[2.2, 0.4, 1.2]} radius={0.05} smoothness={4} position={[0, -0.2, 0]}>
        <meshStandardMaterial color="#2A2A2A" roughness={0.4} metalness={0.3} />
      </RoundedBox>
      
      {/* Scanner top cover */}
      <RoundedBox args={[2.0, 0.15, 1.0]} radius={0.03} smoothness={4} position={[0, 0.1, 0]}>
        <meshStandardMaterial color="#1A1A1A" roughness={0.5} metalness={0.2} />
      </RoundedBox>
      
      {/* Scanner slot */}
      <mesh position={[0, 0.02, 0.2]}>
        <boxGeometry args={[1.8, 0.08, 0.1]} />
        <meshStandardMaterial color="#0A0A0A" roughness={0.9} />
      </mesh>
      
      {/* Orange accent strip */}
      <mesh position={[0, 0.18, 0.35]}>
        <boxGeometry args={[1.6, 0.02, 0.08]} />
        <meshStandardMaterial 
          color="#FF5A1F" 
          emissive="#FF5A1F" 
          emissiveIntensity={glowIntensity.current * 0.5}
          roughness={0.3}
        />
      </mesh>
      
      {/* Scanner glass window */}
      <mesh position={[0, 0.22, 0]}>
        <boxGeometry args={[1.5, 0.02, 0.6]} />
        <meshPhysicalMaterial 
          color="#1a1a2e"
          transparent
          opacity={0.4}
          roughness={0.1}
          metalness={0.1}
        />
      </mesh>
      
      {/* Scan line */}
      <mesh ref={scanLineRef} position={[0, 0, 0.3]} visible={false}>
        <planeGeometry args={[1.4, 0.03]} />
        <meshBasicMaterial color="#FF5A1F" transparent opacity={0.9} />
      </mesh>
      
      {/* Scanner glow */}
      <pointLight
        position={[0, 0.3, 0.3]}
        color="#FF5A1F"
        intensity={glowIntensity.current * 2}
        distance={3}
      />
    </group>
  );
}

// Data card component - glass HUD panel
function DataCard({ scrollState }: { scrollState: ScrollState }) {
  const groupRef = useRef<THREE.Group>(null);
  const rowsVisible = useRef(0);
  const checkmarkOpacity = useRef(0);
  
  useFrame((state, delta) => {
    if (!groupRef.current) return;
    
    const time = state.clock.elapsedTime;
    
    // Animate based on scroll state
    const targetRows = scrollState === "featured1" ? 3 : 
                       scrollState === "featured2" || scrollState === "projects" || scrollState === "final" ? 6 : 0;
    rowsVisible.current = THREE.MathUtils.lerp(rowsVisible.current, targetRows, delta * 2);
    
    // Checkmark appears after rows
    const targetCheck = scrollState === "featured2" || scrollState === "projects" || scrollState === "final" ? 1 : 0;
    checkmarkOpacity.current = THREE.MathUtils.lerp(checkmarkOpacity.current, targetCheck, delta * 3);
    
    // Card position and hover
    const targetX = scrollState === "hero" || scrollState === "story" ? 3 : 1.5;
    groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, targetX, delta * 2);
    groupRef.current.position.y = Math.sin(time * 0.6) * 0.02;
    groupRef.current.rotation.y = Math.sin(time * 0.3) * 0.02 - 0.1;
  });

  const dataRows = [
    { label: "Vendor", value: "Office Supply Co." },
    { label: "Amount", value: "$247.50" },
    { label: "Category", value: "Equipment" },
    { label: "Project", value: "Lab Setup" },
    { label: "Date", value: "01/15/2026" },
    { label: "Status", value: "Validated" },
  ];

  return (
    <group ref={groupRef} position={[2.5, 0, -0.5]}>
      {/* Glass card frame */}
      <RoundedBox args={[2, 2.8, 0.05]} radius={0.08} smoothness={4}>
        <MeshTransmissionMaterial
          backside
          samples={4}
          thickness={0.1}
          chromaticAberration={0.02}
          anisotropy={0.1}
          distortion={0.1}
          distortionScale={0.2}
          temporalDistortion={0.1}
          iridescence={0.3}
          iridescenceIOR={1}
          iridescenceThicknessRange={[0, 1400]}
          color="#ffffff"
          transmission={0.95}
          roughness={0.1}
        />
      </RoundedBox>
      
      {/* Card border glow */}
      <mesh position={[0, 0, -0.03]}>
        <planeGeometry args={[2.05, 2.85]} />
        <meshBasicMaterial color="#E7DACB" transparent opacity={0.3} />
      </mesh>
      
      {/* Data rows */}
      {dataRows.map((row, i) => (
        <group 
          key={i} 
          position={[0, 1.1 - i * 0.35, 0.04]}
          visible={rowsVisible.current > i}
        >
          <Text
            position={[-0.8, 0, 0]}
            fontSize={0.1}
            color="#5A5A5A"
            anchorX="left"
          >
            {row.label}
          </Text>
          <Text
            position={[0.8, 0, 0]}
            fontSize={0.1}
            color="#141414"
            anchorX="right"
          >
            {row.value}
          </Text>
          {/* Underline */}
          <mesh position={[0, -0.12, 0]}>
            <planeGeometry args={[1.6, 0.005]} />
            <meshBasicMaterial color="#E7DACB" transparent opacity={0.5} />
          </mesh>
        </group>
      ))}
      
      {/* Teal checkmark */}
      <group position={[0, -1.1, 0.04]} visible={checkmarkOpacity.current > 0.1}>
        <mesh>
          <circleGeometry args={[0.2, 32]} />
          <meshBasicMaterial color="#0AA6A6" transparent opacity={checkmarkOpacity.current} />
        </mesh>
        <Text
          position={[0, 0, 0.01]}
          fontSize={0.15}
          color="#FFFFFF"
        >
          ✓
        </Text>
      </group>
    </group>
  );
}

// Reimbursed confirmation card
function ReimbursedCard({ scrollState }: { scrollState: ScrollState }) {
  const groupRef = useRef<THREE.Group>(null);
  const opacity = useRef(0);
  
  useFrame((state, delta) => {
    if (!groupRef.current) return;
    
    const time = state.clock.elapsedTime;
    
    // Slide in and fade based on state
    const targetOpacity = scrollState === "projects" || scrollState === "final" ? 1 : 0;
    opacity.current = THREE.MathUtils.lerp(opacity.current, targetOpacity, delta * 2);
    
    const targetY = scrollState === "projects" || scrollState === "final" ? -1.8 : -3;
    groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, targetY, delta * 2);
    
    // Gentle hover
    groupRef.current.position.y += Math.sin(time * 0.5) * 0.01;
  });

  return (
    <group ref={groupRef} position={[0, -3, 0.8]}>
      {/* Confirmation slip - glass card style */}
      <RoundedBox args={[3, 0.8, 0.04]} radius={0.05} smoothness={4}>
        <meshPhysicalMaterial
          color="#FFFFFF"
          transparent
          opacity={opacity.current * 0.9}
          roughness={0.1}
          metalness={0}
          clearcoat={0.5}
        />
      </RoundedBox>
      
      {/* Teal accent bar */}
      <mesh position={[-1.3, 0, 0.025]}>
        <boxGeometry args={[0.08, 0.6, 0.01]} />
        <meshBasicMaterial color="#0AA6A6" transparent opacity={opacity.current} />
      </mesh>
      
      {/* Reimbursed text */}
      <Text
        position={[0, 0.1, 0.03]}
        fontSize={0.18}
        color="#0AA6A6"
        visible={opacity.current > 0.5}
      >
        REIMBURSED
      </Text>
      
      {/* Amount */}
      <Text
        position={[0, -0.15, 0.03]}
        fontSize={0.12}
        color="#5A5A5A"
        visible={opacity.current > 0.5}
      >
        Transaction Complete • $247.50
      </Text>
    </group>
  );
}

// Desk surface
function DeskSurface() {
  return (
    <mesh position={[0, -2.5, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[20, 20]} />
      <meshStandardMaterial 
        color="#F5F0E6" 
        roughness={0.95} 
        metalness={0}
      />
    </mesh>
  );
}

// Mouse-following spotlight
function MouseLight() {
  const lightRef = useRef<THREE.PointLight>(null);
  const { viewport } = useThree();
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!lightRef.current) return;
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      lightRef.current.position.x = x * viewport.width * 0.5;
      lightRef.current.position.y = y * viewport.height * 0.5;
    };
    
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [viewport]);

  return (
    <pointLight
      ref={lightRef}
      position={[0, 2, 4]}
      color="#FFFFFF"
      intensity={0.4}
      distance={10}
    />
  );
}

// Main scene component
function Scene({ scrollState }: { scrollState: ScrollState }) {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (!groupRef.current) return;
    // Subtle camera sway
    const time = state.clock.elapsedTime;
    state.camera.position.x = Math.sin(time * 0.1) * 0.1;
  });

  return (
    <group ref={groupRef}>
      {/* Lighting setup - product photography style */}
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]} intensity={0.6} castShadow />
      <directionalLight position={[-3, 3, -2]} intensity={0.3} color="#FFE4D6" />
      <MouseLight />
      
      {/* Environment for reflections */}
      <Environment preset="studio" />
      
      {/* Scene objects */}
      <DeskSurface />
      <Receipt scrollState={scrollState} />
      <Scanner scrollState={scrollState} />
      <DataCard scrollState={scrollState} />
      <ReimbursedCard scrollState={scrollState} />
    </group>
  );
}

// Wrapper component with Canvas
export default function ThreeBackground() {
  const { scrollState, scrollProgress } = useScrollProgress();
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  // Check for reduced motion preference
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  useEffect(() => {
    setPrefersReducedMotion(
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    );
  }, []);
  
  if (!mounted || prefersReducedMotion) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-10 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ 
          antialias: true,
          alpha: true,
          powerPreference: "high-performance"
        }}
      >
        <Scene scrollState={scrollState} />
      </Canvas>
    </div>
  );
}
