"use client";

import { useRef, useMemo, useEffect, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Html, Instances, Instance } from "@react-three/drei";
import * as THREE from "three";

const COPPER = "#c2855e";
const ELECTRIC = "#0095D5";
const PANEL_DARK = "#0a1220";

/**
 * Contorno del gabinete vía THREE.EdgesGeometry (no `wireframe:true` crudo):
 * un box con wireframe muestra las diagonales de su triangulación interna y
 * se ve "roto"; EdgesGeometry dibuja solo las aristas reales — el look de
 * plano técnico limpio que necesitamos para la pieza más grande y visible.
 */
function CabinetFrame({ powerOnRef }) {
  const boxGeo = useMemo(() => new THREE.BoxGeometry(1.7, 2.1, 0.42), []);
  const edgesGeo = useMemo(() => new THREE.EdgesGeometry(boxGeo), [boxGeo]);
  const solidMatRef = useRef();
  const edgeMatRef = useRef();

  useFrame(() => {
    const p = powerOnRef.current;
    if (solidMatRef.current) {
      solidMatRef.current.opacity = p * 0.3;
      solidMatRef.current.emissiveIntensity = p * 1.3;
    }
    // Las líneas cobre nunca desaparecen del todo: siguen dando estructura
    // técnica incluso con el panel "encendido".
    if (edgeMatRef.current) edgeMatRef.current.opacity = 1 - p * 0.55;
  });

  return (
    <group>
      <mesh geometry={boxGeo}>
        <meshStandardMaterial
          ref={solidMatRef}
          color={PANEL_DARK}
          emissive={ELECTRIC}
          emissiveIntensity={0}
          transparent
          opacity={0}
          metalness={0.6}
          roughness={0.3}
        />
      </mesh>
      <lineSegments geometry={edgesGeo}>
        <lineBasicMaterial ref={edgeMatRef} color={COPPER} transparent opacity={1} />
      </lineSegments>
    </group>
  );
}

/** Busbars — cobre metálico constante, no participan del cross-fade: son el ancla de marca visible incluso en reposo. */
function Busbars() {
  return (
    <group position={[0, 0.82, 0.05]}>
      {[0, 1, 2].map((i) => (
        <mesh key={i} position={[0, -i * 0.1, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.025, 0.025, 1.45, 8]} />
          <meshStandardMaterial color={COPPER} metalness={1} roughness={0.3} />
        </mesh>
      ))}
    </group>
  );
}

/**
 * Grid de disyuntores instanceado: 2 draw calls totales (una malla por capa)
 * sin importar cuántas celdas tenga, en vez de N meshes individuales.
 * La capa "diseño" usa wireframe:true crudo (no EdgesGeometry) — a esta
 * escala tan pequeña la triangulación no se nota, y evita instanciar
 * geometría de aristas por celda, que anularía la ganancia de performance.
 */
function BreakerGrid({ powerOnRef }) {
  const rows = 4;
  const cols = 5;

  const positions = useMemo(() => {
    const spacingX = 0.27;
    const spacingY = 0.27;
    const offsetX = -((cols - 1) * spacingX) / 2;
    const offsetY = ((rows - 1) * spacingY) / 2 - 0.15;
    const list = [];
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        list.push([offsetX + c * spacingX, offsetY - r * spacingY, 0.22]);
      }
    }
    return list;
  }, []);

  const wireMatRef = useRef();
  const solidMatRef = useRef();

  useFrame(() => {
    const p = powerOnRef.current;
    if (wireMatRef.current) wireMatRef.current.opacity = 1 - p;
    if (solidMatRef.current) {
      solidMatRef.current.opacity = p;
      solidMatRef.current.emissiveIntensity = 0.4 + p * 1.6;
    }
  });

  return (
    <group>
      <Instances limit={positions.length}>
        <boxGeometry args={[0.16, 0.16, 0.16]} />
        <meshBasicMaterial ref={wireMatRef} color={COPPER} wireframe transparent opacity={1} />
        {positions.map((pos, i) => (
          <Instance key={`w-${i}`} position={pos} />
        ))}
      </Instances>

      <Instances limit={positions.length}>
        <boxGeometry args={[0.14, 0.14, 0.14]} />
        <meshStandardMaterial
          ref={solidMatRef}
          color={PANEL_DARK}
          emissive={ELECTRIC}
          emissiveIntensity={0.4}
          transparent
          opacity={0}
          metalness={0.5}
          roughness={0.3}
        />
        {positions.map((pos, i) => (
          <Instance key={`s-${i}`} position={pos} />
        ))}
      </Instances>
    </group>
  );
}

/**
 * Capa ambiental de fondo: pocas partículas (80) en deriva lenta detrás del
 * panel, mezcla cobre/blanco vía vertexColors (un solo draw call). Dan
 * profundidad al navy sin competir con el tablero — decisión explícita:
 * el panel es el protagonista, esto es atmósfera.
 */
function AmbientParticles({ count = 80 }) {
  const ref = useRef();

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const copper = new THREE.Color(COPPER);
    const white = new THREE.Color("#ffffff");
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 9;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 5.5;
      pos[i * 3 + 2] = -1.6 - Math.random() * 2;
      const c = Math.random() < 0.55 ? copper : white;
      col[i * 3] = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;
    }
    return [pos, col];
  }, [count]);

  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.012;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        vertexColors
        size={0.022}
        sizeAttenuation
        transparent
        opacity={0.35}
        depthWrite={false}
      />
    </points>
  );
}

/** Placa base — pie de montaje industrial, estático. */
function BasePlate() {
  return (
    <mesh position={[0, -1.15, 0]}>
      <boxGeometry args={[1.9, 0.12, 0.55]} />
      <meshStandardMaterial color={PANEL_DARK} metalness={0.4} roughness={0.6} />
    </mesh>
  );
}

/** Luz interior que crece con powerOn: refuerza la narrativa "se enciende". */
function PanelGlow({ powerOnRef }) {
  const lightRef = useRef();
  useFrame(() => {
    if (lightRef.current) lightRef.current.intensity = 0.15 + powerOnRef.current * 1.3;
  });
  return <pointLight ref={lightRef} color={ELECTRIC} position={[0, 0, 0.6]} distance={4} decay={2} intensity={0.15} />;
}

/**
 * Tablero eléctrico industrial. `powerOnRef` (0=diseño/wireframe,
 * 1=encendido/sólido) se deriva de la proximidad del puntero a un punto
 * ancla fijo en NDC: el Canvas es pointer-events:none (para no bloquear los
 * links del texto), así que no hay raycasting real disponible — se mide
 * distancia contra `pointerRef` (rastreado a mano en `window`, ver default
 * export) y se suaviza con lerp para que la transición no sea un salto.
 */
function ElectricalPanel({ progressRef, pointerRef }) {
  const groupRef = useRef();
  const powerOnRef = useRef(0);
  const anchor = useMemo(() => ({ x: 0.55, y: 0 }), []);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;

    const idle = clock.getElapsedTime() * 0.1;
    const scrollSpin = progressRef.current * Math.PI * 1.2;
    groupRef.current.rotation.y = idle + scrollSpin;
    groupRef.current.rotation.x = Math.sin(idle * 0.4) * 0.05;

    const dx = pointerRef.current.x - anchor.x;
    const dy = pointerRef.current.y - anchor.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const proximity = 1 - Math.min(dist / 0.9, 1);
    const target = proximity * proximity * (3 - 2 * proximity); // smoothstep
    powerOnRef.current += (target - powerOnRef.current) * 0.06;
  });

  return (
    <group ref={groupRef}>
      <CabinetFrame powerOnRef={powerOnRef} />
      <Busbars />
      <BreakerGrid powerOnRef={powerOnRef} />
      <BasePlate />
      <PanelGlow powerOnRef={powerOnRef} />
    </group>
  );
}

/**
 * Inclina el grupo hacia el puntero con lerp (sin resortes de física).
 * El Canvas tiene pointer-events:none (para no bloquear los links del texto
 * superpuesto), así que R3F nunca recibe eventos nativos y `useThree().pointer`
 * quedaría siempre en (0,0). Por eso el puntero se rastrea a mano en `window`
 * y se pasa por ref — barato, sin re-renders, y funciona con el click-through.
 */
function PointerTilt({ pointerRef, children }) {
  const ref = useRef();

  useFrame(() => {
    if (!ref.current) return;
    const targetX = -pointerRef.current.y * 0.15;
    const targetY = pointerRef.current.x * 0.2;
    ref.current.rotation.x += (targetX - ref.current.rotation.x) * 0.05;
    ref.current.rotation.y += (targetY - ref.current.rotation.y) * 0.05;
  });

  return <group ref={ref}>{children}</group>;
}

function Loader() {
  return (
    <Html center>
      <span className="text-[10px] uppercase tracking-[0.3em] text-white/30">Cargando</span>
    </Html>
  );
}

export default function Hero3D({ progressRef = { current: 0 }, opacity = 1 }) {
  const pointerRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const handleMove = (e) => {
      pointerRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointerRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("pointermove", handleMove, { passive: true });
    return () => window.removeEventListener("pointermove", handleMove);
  }, []);

  return (
    <div style={{ opacity }} className="absolute inset-0 transition-opacity duration-100">
      <Canvas
        camera={{ position: [0, 0, 4.2], fov: 45 }}
        dpr={[1, 1.5]}
        performance={{ min: 0.5 }}
        gl={{ alpha: true, antialias: true }}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
          zIndex: 0,
        }}
      >
        <ambientLight intensity={0.25} />
        <directionalLight position={[3, 4, 3]} intensity={0.55} color="#ffffff" />
        <directionalLight position={[-2, -1, 2]} intensity={0.15} color={ELECTRIC} />

        <AmbientParticles />

        <group position={[0.9, 0, 0]} scale={[0.85, 0.85, 0.85]}>
          <Suspense fallback={<Loader />}>
            <PointerTilt pointerRef={pointerRef}>
              <Float speed={1.1} rotationIntensity={0.2} floatIntensity={0.4}>
                <ElectricalPanel progressRef={progressRef} pointerRef={pointerRef} />
              </Float>
            </PointerTilt>
          </Suspense>
        </group>
      </Canvas>
    </div>
  );
}
