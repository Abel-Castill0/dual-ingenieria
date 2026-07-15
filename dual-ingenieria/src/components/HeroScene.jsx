"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { QuadraticBezierLine } from "@react-three/drei";
import * as THREE from "three";

const COPPER = "#c2855e";
const BLUE = "#0095D5";
const STEEL = "#bdc3c7";
const CONCRETE = "#2c3e50";
const TX_BLUE = "#1e4e8a";
const INSULATOR_COLOR = "#ecf0f1";

function smoothstep(t) {
  return t * t * (3 - 2 * t);
}

function part(overall, start, end) {
  if (overall <= start) return 0;
  if (overall >= end) return 1;
  return smoothstep((overall - start) / (end - start));
}

function animY(p, startY = -0.8, endY = 0) {
  return startY + (endY - startY) * p;
}

// ─── BASE ──────────────────────────────────────────
function Base({ progressRef }) {
  const ref = useRef();
  useFrame(() => {
    const p = part(progressRef.current, 0, 0.1);
    if (!ref.current) return;
    ref.current.position.y = animY(p, -0.6, 0);
    ref.current.children.forEach((c) => {
      if (c.material) c.material.opacity = 0.5 * p;
    });
  });
  return (
    <group ref={ref}>
      <mesh position={[0, 0.125, 0]}>
        <boxGeometry args={[5, 0.25, 3]} />
        <meshStandardMaterial color={CONCRETE} transparent opacity={0} metalness={0.2} roughness={0.9} />
      </mesh>
    </group>
  );
}

// ─── STRUCTURE (H-frame) ──────────────────────────
function Structure({ progressRef }) {
  const ref = useRef();

  const legs = useMemo(
    () => [
      { x: -0.9, h: 2.6 },
      { x: 0.9, h: 2.6 },
    ],
    []
  );

  const beams = useMemo(
    () => [
      { y: 0.25, w: 1.8 },
      { y: 1.3, w: 1.8 },
      { y: 2.35, w: 1.8 },
    ],
    []
  );

  useFrame(() => {
    const p = part(progressRef.current, 0.1, 0.28);
    if (!ref.current) return;
    ref.current.position.y = animY(p, -0.8, 0);
    ref.current.children.forEach((c) => {
      if (c.material) c.material.opacity = p;
    });
  });

  return (
    <group ref={ref}>
      {legs.map((leg, i) => (
        <mesh key={`leg-${i}`} position={[leg.x, leg.h / 2, 0]}>
          <boxGeometry args={[0.07, leg.h, 0.07]} />
          <meshStandardMaterial color={STEEL} transparent opacity={0} metalness={0.8} roughness={0.3} />
        </mesh>
      ))}
      {beams.map((bm, i) => (
        <mesh key={`bm-${i}`} position={[0, bm.y, 0]}>
          <boxGeometry args={[bm.w, 0.05, 0.05]} />
          <meshStandardMaterial color={STEEL} transparent opacity={0} metalness={0.8} roughness={0.3} />
        </mesh>
      ))}
      {[-0.45, 0.45].map((xOff) =>
        beams.map((_, i) => (
          <mesh key={`brace-${xOff}-${i}`} position={[xOff, 0.3 + i * 1.05, 0]}>
            <boxGeometry args={[0.04, 0.04, 0.04]} />
            <meshStandardMaterial color={STEEL} transparent opacity={0} metalness={0.8} roughness={0.3} />
          </mesh>
        ))
      )}
    </group>
  );
}

// ─── TRANSFORMER ──────────────────────────────────
function Transformer({ progressRef }) {
  const ref = useRef();

  const fins = useMemo(
    () =>
      Array.from({ length: 10 }, (_, i) => {
        const angle = (i / 10) * Math.PI * 2;
        return { x: Math.cos(angle) * 0.46, z: Math.sin(angle) * 0.46 };
      }),
    []
  );

  useFrame(() => {
    const p = part(progressRef.current, 0.28, 0.48);
    if (!ref.current) return;
    ref.current.position.y = animY(p, -0.8, 0);
    ref.current.children.forEach((c) => {
      if (c.material) c.material.opacity = p;
    });
  });

  return (
    <group ref={ref}>
      <mesh position={[0, 0.25, 0]}>
        <cylinderGeometry args={[0.4, 0.4, 0.5, 12]} />
        <meshStandardMaterial color={TX_BLUE} transparent opacity={0} metalness={0.3} roughness={0.6} />
      </mesh>
      {fins.map((f, i) => (
        <mesh key={`fin-${i}`} position={[f.x, 0.25, f.z]}>
          <boxGeometry args={[0.025, 0.4, 0.08]} />
          <meshStandardMaterial color={TX_BLUE} transparent opacity={0} metalness={0.4} roughness={0.5} />
        </mesh>
      ))}
    </group>
  );
}

// ─── INSULATORS ──────────────────────────────────
function Insulators({ progressRef }) {
  const ref = useRef();

  const stacks = useMemo(
    () => [
      { x: -0.4, z: 0 },
      { x: 0.4, z: 0 },
      { x: 0, z: 0 },
    ],
    []
  );

  const discPositions = useMemo(
    () =>
      stacks.flatMap((s) =>
        [0, 0.09, 0.18].map((yOff) => ({
          x: s.x,
          y: 0.5 + yOff,
          z: s.z,
          r: 0.055 + (yOff === 0.09 ? 0 : 0.01),
        }))
      ),
    [stacks]
  );

  useFrame(() => {
    const p = part(progressRef.current, 0.48, 0.65);
    if (!ref.current) return;
    ref.current.position.y = animY(p, -0.8, 0);
    ref.current.children.forEach((c) => {
      if (c.material) c.material.opacity = p;
    });
  });

  return (
    <group ref={ref}>
      {discPositions.map((d, i) => (
        <mesh key={`ins-${i}`} position={[d.x, d.y, d.z]}>
          <cylinderGeometry args={[d.r, d.r, 0.06, 8]} />
          <meshStandardMaterial color={INSULATOR_COLOR} transparent opacity={0} roughness={0.4} />
        </mesh>
      ))}
    </group>
  );
}

// ─── BUSBARS ──────────────────────────────────────
function Busbars({ progressRef }) {
  const ref = useRef();

  useFrame(() => {
    const p = part(progressRef.current, 0.65, 0.8);
    if (!ref.current) return;
    ref.current.position.y = animY(p, -0.8, 0);
    ref.current.children.forEach((c) => {
      if (c.material) c.material.opacity = p;
    });
  });

  return (
    <group ref={ref}>
      <mesh position={[0, 0.55, 0]}>
        <cylinderGeometry args={[0.035, 0.035, 0.8, 8]} rotation={[0, 0, Math.PI / 2]} />
        <meshStandardMaterial color={COPPER} transparent opacity={0} metalness={1} roughness={0.4} />
      </mesh>
    </group>
  );
}

// ─── HIGH-TENSION LINES ───────────────────────────
function Lines({ progressRef }) {
  const ref = useRef();

  const lineDefs = useMemo(
    () => [
      { start: [-0.4, 0.6, 0], end: [-1.6, 1.4, 0.3], mid: [-0.9, 1.1, 0.15] },
      { start: [0.4, 0.6, 0], end: [1.6, 1.4, -0.3], mid: [0.9, 1.1, -0.15] },
      { start: [0, 0.6, 0], end: [0, 1.6, 0.6], mid: [0, 1.2, 0.3] },
    ],
    []
  );

  const endPositions = useMemo(() => lineDefs.map((l) => l.end), [lineDefs]);
  const midPositions = useMemo(() => lineDefs.map((l) => l.mid), [lineDefs]);
  const startPositions = useMemo(() => lineDefs.map((l) => l.start), [lineDefs]);

  useFrame(() => {
    const p = part(progressRef.current, 0.7, 0.9);
    if (!ref.current) return;
    const opacity = p * 0.6;
    ref.current.children.forEach((c) => {
      if (c.material) c.material.opacity = opacity;
    });
  });

  return (
    <group ref={ref}>
      {lineDefs.map((l, i) => (
        <QuadraticBezierLine
          key={`line-${i}`}
          start={new THREE.Vector3(...l.start)}
          mid={new THREE.Vector3(...l.mid)}
          end={new THREE.Vector3(...l.end)}
          color={COPPER}
          lineWidth={1}
          transparent
          opacity={0}
        />
      ))}
    </group>
  );
}

// ─── ENERGY FLOW ──────────────────────────────────
function EnergyFlow({ progressRef }) {
  const spheresRef = useRef([]);

  const linePaths = useMemo(
    () => [
      {
        start: [-0.4, 0.6, 0],
        end: [-1.6, 1.4, 0.3],
        mid: [-0.9, 1.1, 0.15],
      },
      {
        start: [0.4, 0.6, 0],
        end: [1.6, 1.4, -0.3],
        mid: [0.9, 1.1, -0.15],
      },
      {
        start: [0, 0.6, 0],
        end: [0, 1.6, 0.6],
        mid: [0, 1.2, 0.3],
      },
    ],
    []
  );

  const curves = useMemo(
    () =>
      linePaths.map((lp) => {
        const pts = [];
        const count = 40;
        for (let k = 0; k <= count; k++) {
          const t = k / count;
          const s = new THREE.Vector3(...lp.start);
          const e = new THREE.Vector3(...lp.end);
          const m = new THREE.Vector3(...lp.mid);
          const q0 = new THREE.Vector3().lerpVectors(s, m, t);
          const q1 = new THREE.Vector3().lerpVectors(m, e, t);
          pts.push(new THREE.Vector3().lerpVectors(q0, q1, t));
        }
        return pts;
      }),
    [linePaths]
  );

  const totalDists = useMemo(
    () =>
      curves.map((pts) => {
        let d = 0;
        for (let i = 1; i < pts.length; i++) d += pts[i].distanceTo(pts[i - 1]);
        return d;
      }),
    [curves]
  );

  useFrame(({ clock }) => {
    const p = part(progressRef.current, 0.85, 1);
    if (p <= 0) {
      spheresRef.current.forEach((s) => {
        if (s) s.visible = false;
      });
      return;
    }

    const speed = 0.15;

    curves.forEach((pts, lineIdx) => {
      const sphere = spheresRef.current[lineIdx];
      if (!sphere) return;
      sphere.visible = p > 0.3;

      const rawT = ((clock.getElapsedTime() * speed + lineIdx * 0.4) % 1);
      const t = rawT;
      const totalDist = totalDists[lineIdx];
      const targetDist = t * totalDist;
      let accum = 0;
      for (let i = 1; i < pts.length; i++) {
        const seg = pts[i].distanceTo(pts[i - 1]);
        if (accum + seg >= targetDist) {
          const frac = (targetDist - accum) / seg;
          sphere.position.lerpVectors(pts[i - 1], pts[i], frac);
          break;
        }
        accum += seg;
      }
    });
  });

  return (
    <group>
      {curves.map((_, i) => (
        <mesh
          key={`energy-${i}`}
          ref={(el) => (spheresRef.current[i] = el)}
          visible={false}
        >
          <sphereGeometry args={[0.035, 8, 8]} />
          <meshBasicMaterial color={BLUE} transparent opacity={0.9} />
        </mesh>
      ))}
    </group>
  );
}

// ─── FINAL GLOW ────────────────────────────────────
function FinalGlow({ progressRef }) {
  const lightRef = useRef();

  useFrame(() => {
    const p = part(progressRef.current, 0.85, 1);
    if (lightRef.current) {
      lightRef.current.intensity = p * 0.8;
    }
  });

  return (
    <pointLight
      ref={lightRef}
      position={[0, 0.8, 0.5]}
      color={BLUE}
      intensity={0}
      distance={6}
      decay={2}
    />
  );
}

// ─── SCENE CONTENT ────────────────────────────────
function SceneContent({ progressRef }) {
  const { pointer, camera } = useThree();
  const lightRef = useRef();

  useFrame(() => {
    const targetRotX = -pointer.y * 0.08;
    const targetRotY = pointer.x * 0.1;
    camera.position.x += (Math.sin(targetRotY) * 1.2 - camera.position.x) * 0.03;
    camera.position.y += (Math.sin(targetRotX) * 0.6 - camera.position.y) * 0.03;
    camera.lookAt(0, 0.5, 0);

    if (lightRef.current) {
      const lx = pointer.x * 2;
      const ly = -pointer.y * 1.5;
      lightRef.current.position.set(lx, ly + 0.5, 2);
    }
  });

  return (
    <>
      <ambientLight intensity={0.25} />
      <directionalLight position={[3, 4, 3]} intensity={0.35} color="#ffffff" />
      <pointLight ref={lightRef} color="#ffffff" intensity={0.3} distance={6} decay={2} />

      <group position={[0, -0.2, 0]}>
        <Base progressRef={progressRef} />
        <Structure progressRef={progressRef} />
        <Transformer progressRef={progressRef} />
        <Insulators progressRef={progressRef} />
        <Busbars progressRef={progressRef} />
        <Lines progressRef={progressRef} />
        <EnergyFlow progressRef={progressRef} />
        <FinalGlow progressRef={progressRef} />
      </group>
    </>
  );
}

// ─── EXPORTED COMPONENT ────────────────────────────
export default function HeroScene({ progressRef = { current: 0 }, opacity = 1 }) {
  return (
    <div style={{ opacity }} className="absolute inset-0 transition-opacity duration-100">
      <Canvas
        camera={{ position: [0, 1.2, 5], fov: 45 }}
        dpr={[1, 1.5]}
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
        <SceneContent progressRef={progressRef} />
      </Canvas>
    </div>
  );
}
