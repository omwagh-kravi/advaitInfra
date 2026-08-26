import { useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { ContactShadows, Line } from '@react-three/drei';

const BRAND = '#1CA7E0';
const FRAME_COUNT_DESKTOP = 16;
const FRAME_COUNT_COMPACT = 10;
const SPACING = 3.25;
const WIDTH = 14;
const COLUMN_HEIGHT = 5.8;
const RIDGE_HEIGHT = 8.25;

function clamp01(value) {
  return Math.min(Math.max(value, 0), 1);
}

function mapRange(value, start, end) {
  return clamp01((value - start) / (end - start));
}

function easeOutCubic(value) {
  return 1 - Math.pow(1 - clamp01(value), 3);
}

function stagger(progress, start, end, index, total) {
  const windowSize = (end - start) / total;
  return easeOutCubic(mapRange(progress, start + windowSize * index * 0.58, start + windowSize * (index + 1.12)));
}

function midpoint(a, b) {
  return [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2, (a[2] + b[2]) / 2];
}

function length(a, b) {
  return Math.hypot(b[0] - a[0], b[1] - a[1], b[2] - a[2]);
}

function quaternionBetween(a, b) {
  const direction = new THREE.Vector3(b[0] - a[0], b[1] - a[1], b[2] - a[2]).normalize();
  return new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), direction);
}

function Beam({ a, b, thickness = 0.18, progress = 1, material, delayOffset = [0, 0, 0], castShadow = true }) {
  const p = easeOutCubic(progress);
  const pos = midpoint(a, b);
  const q = quaternionBetween(a, b);
  const len = length(a, b);

  return (
    <mesh material={material} position={[pos[0] + delayOffset[0] * (1 - p), pos[1] + delayOffset[1] * (1 - p), pos[2] + delayOffset[2] * (1 - p)]} quaternion={q} scale={[1, Math.max(p, 0.001), 1]} castShadow={castShadow} receiveShadow>
      <boxGeometry args={[thickness, len, thickness]} />
    </mesh>
  );
}

function Foundation({ z, progress, compact }) {
  const p = easeOutCubic(progress);
  const xPositions = [-WIDTH / 2, WIDTH / 2];
  return (
    <group>
      {xPositions.map((x) => (
        <group key={`${x}-${z}`} position={[x, 0, z]}>
          <mesh position={[0, -0.18, 0]} scale={[p, p, p]} receiveShadow castShadow>
            <boxGeometry args={[1.65, 0.36, 1.65]} />
            <meshStandardMaterial color="#B9C0C3" roughness={0.78} metalness={0.05} />
          </mesh>
          <mesh position={[0, 0.05, 0]} scale={[p, p, p]} castShadow>
            <boxGeometry args={[1.1, 0.1, 1.1]} />
            <meshStandardMaterial color="#242B2F" roughness={0.38} metalness={0.82} />
          </mesh>
          {!compact &&
            [
              [-0.38, 0.17, -0.38],
              [0.38, 0.17, -0.38],
              [-0.38, 0.17, 0.38],
              [0.38, 0.17, 0.38]
            ].map((bolt) => (
              <mesh key={bolt.join('-')} position={bolt} scale={[p, p, p]} castShadow>
                <cylinderGeometry args={[0.06, 0.06, 0.24, 14]} />
                <meshStandardMaterial color="#0F1214" roughness={0.24} metalness={0.9} />
              </mesh>
            ))}
        </group>
      ))}
    </group>
  );
}

function Column({ x, z, progress, material }) {
  const p = easeOutCubic(progress);
  return (
    <group position={[x, 0, z]} scale={[1, Math.max(p, 0.001), 1]}>
      <mesh material={material} position={[0, COLUMN_HEIGHT / 2, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.46, COLUMN_HEIGHT, 0.38]} />
      </mesh>
      <mesh material={material} position={[0, COLUMN_HEIGHT * 0.62, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.7, COLUMN_HEIGHT * 0.36, 0.24]} />
      </mesh>
    </group>
  );
}

function PortalFrame({ z, progress, material }) {
  const left = [-WIDTH / 2, COLUMN_HEIGHT, z];
  const right = [WIDTH / 2, COLUMN_HEIGHT, z];
  const ridge = [0, RIDGE_HEIGHT, z];
  return (
    <group>
      <Beam a={left} b={ridge} thickness={0.34} progress={progress} material={material} delayOffset={[-1, 0.6, 0]} />
      <Beam a={right} b={ridge} thickness={0.34} progress={progress} material={material} delayOffset={[1, 0.6, 0]} />
      <Beam a={[-WIDTH / 2, COLUMN_HEIGHT - 0.2, z]} b={[WIDTH / 2, COLUMN_HEIGHT - 0.2, z]} thickness={0.16} progress={progress * 0.9} material={material} />
      <Line points={[left, ridge, right]} color={BRAND} lineWidth={1.2} transparent opacity={0.24 * progress} />
    </group>
  );
}

function Skeleton({ progress, compact, steelMaterial, accentMaterial }) {
  const frameCount = compact ? FRAME_COUNT_COMPACT : FRAME_COUNT_DESKTOP;
  const zPositions = useMemo(() => Array.from({ length: frameCount }, (_, i) => -i * SPACING), [frameCount]);
  const foundationP = mapRange(progress, 0, 0.12);
  const columnsP = mapRange(progress, 0.12, 0.28);
  const framesP = mapRange(progress, 0.28, 0.45);
  const gridP = mapRange(progress, 0.45, 0.62);

  const purlinRows = compact
    ? [-6.4, -3.2, 0, 3.2, 6.4]
    : [-6.6, -5.1, -3.6, -2, -0.65, 0.65, 2, 3.6, 5.1, 6.6];
  const girtRows = [1.35, 2.8, 4.25];

  return (
    <group>
      {zPositions.map((z, index) => {
        const foundation = index === 0 ? foundationP : stagger(progress, 0.1, 0.3, index, frameCount);
        const col = index === 0 ? mapRange(progress, 0.06, 0.18) : stagger(columnsP, 0, 1, index, frameCount);
        const frame = stagger(framesP, 0, 1, index, frameCount);
        return (
          <group key={`frame-${z}`}>
            <Foundation z={z} progress={foundation} compact={compact} />
            <Column x={-WIDTH / 2} z={z} progress={col} material={steelMaterial} />
            <Column x={WIDTH / 2} z={z} progress={col} material={steelMaterial} />
            <PortalFrame z={z} progress={frame} material={index % 4 === 0 ? accentMaterial : steelMaterial} />
          </group>
        );
      })}

      {purlinRows.map((x, rowIndex) => {
        const y = RIDGE_HEIGHT - Math.abs(x) * 0.35;
        return zPositions.slice(0, -1).map((z, index) => {
          const reveal = stagger(gridP, 0, 1, rowIndex * zPositions.length + index, purlinRows.length * zPositions.length);
          return (
            <Beam
              key={`purlin-${x}-${z}`}
              a={[x, y, z]}
              b={[x, y, z - SPACING]}
              thickness={0.11}
              progress={reveal}
              material={steelMaterial}
              delayOffset={[0, 0.35, 0.7]}
            />
          );
        });
      })}

      {[-WIDTH / 2, WIDTH / 2].map((x) =>
        girtRows.map((y, rowIndex) =>
          zPositions.slice(0, -1).map((z, index) => (
            <Beam
              key={`girt-${x}-${y}-${z}`}
              a={[x, y, z]}
              b={[x, y, z - SPACING]}
              thickness={0.1}
              progress={stagger(gridP, 0.08, 1, rowIndex * zPositions.length + index, girtRows.length * zPositions.length)}
              material={steelMaterial}
              delayOffset={[0, 0, 0.55]}
            />
          ))
        )
      )}

      {zPositions.slice(0, -2).map((z, index) => (
        <group key={`brace-${z}`}>
          <Beam a={[-WIDTH / 2, 1.1, z]} b={[-WIDTH / 2, 4.8, z - SPACING * 2]} thickness={0.07} progress={stagger(gridP, 0.2, 1, index, zPositions.length)} material={accentMaterial} />
          <Beam a={[WIDTH / 2, 4.8, z]} b={[WIDTH / 2, 1.1, z - SPACING * 2]} thickness={0.07} progress={stagger(gridP, 0.2, 1, index, zPositions.length)} material={accentMaterial} />
          {index % 3 === 0 && <Beam a={[-3.5, RIDGE_HEIGHT - 1.3, z]} b={[3.5, RIDGE_HEIGHT - 1.3, z - SPACING]} thickness={0.07} progress={stagger(gridP, 0.26, 1, index, zPositions.length)} material={accentMaterial} />}
        </group>
      ))}
    </group>
  );
}

function Panels({ progress, compact }) {
  const frameCount = compact ? FRAME_COUNT_COMPACT : FRAME_COUNT_DESKTOP;
  const lengthTotal = (frameCount - 1) * SPACING;
  const roofP = mapRange(progress, 0.72, 0.83);
  const wallP = mapRange(progress, 0.83, 0.93);
  const panelCount = compact ? 10 : 16;
  const panelDepth = lengthTotal / panelCount;
  const halfWidth = WIDTH / 2;
  const roofOverhang = 0.65;
  const roofOffset = 0.16;
  const roofRise = RIDGE_HEIGHT - COLUMN_HEIGHT;
  const roofRun = halfWidth + roofOverhang;
  const roofAngle = Math.atan2(roofRise, roofRun);
  const roofLength = Math.hypot(roofRun, roofRise);
  const roofCenterY = (COLUMN_HEIGHT + RIDGE_HEIGHT) / 2 + roofOffset;
  const roofCenters = [
    { key: 'left', x: -roofRun / 2, rotation: roofAngle },
    { key: 'right', x: roofRun / 2, rotation: -roofAngle }
  ];
  const ridgeInstall = easeOutCubic(mapRange(roofP, 0.82, 1));

  return (
    <group>
      {Array.from({ length: panelCount }, (_, index) => {
        const z = -index * panelDepth - panelDepth / 2;
        const install = stagger(roofP, 0, 1, index, panelCount);
        if (install <= 0.01) return null;

        return (
          <group key={`roof-panel-${index}`} position={[0, (1 - install) * 1.45, z + (1 - install) * 0.25]}>
            {roofCenters.map((slope) => (
              <mesh key={slope.key} position={[slope.x, roofCenterY, 0]} rotation-z={slope.rotation} castShadow receiveShadow>
                <boxGeometry args={[roofLength, 0.075, panelDepth * 0.92]} />
                <meshPhysicalMaterial
                  color="#343C42"
                  roughness={0.36}
                  metalness={0.78}
                  clearcoat={0.16}
                  transparent
                  opacity={0.16 + install * 0.84}
                  side={THREE.FrontSide}
                />
              </mesh>
            ))}
            {index % 5 === 2 && (
              <mesh position={[0, RIDGE_HEIGHT + roofOffset + 0.05, 0]} castShadow receiveShadow>
                <boxGeometry args={[1.05, 0.045, panelDepth * 0.78]} />
                <meshPhysicalMaterial color="#8EC4D6" roughness={0.24} metalness={0.22} transmission={0.08} transparent opacity={0.1 + install * 0.26} />
              </mesh>
            )}
          </group>
        );
      })}

      {ridgeInstall > 0.01 && (
        <mesh position={[0, RIDGE_HEIGHT + roofOffset + (1 - ridgeInstall) * 1.1, -lengthTotal / 2]} castShadow receiveShadow>
          <boxGeometry args={[0.8, 0.14, lengthTotal + 0.7]} />
          <meshPhysicalMaterial color="#424B51" roughness={0.34} metalness={0.82} clearcoat={0.18} transparent opacity={ridgeInstall} />
        </mesh>
      )}

      {[-WIDTH / 2 - 0.06, WIDTH / 2 + 0.06].map((x) =>
        Array.from({ length: panelCount }, (_, index) => {
          const install = stagger(wallP, 0, 1, index, panelCount);
          const z = -index * panelDepth - panelDepth / 2;
          if (install <= 0.01) return null;

          return (
            <mesh key={`wall-${x}-${index}`} position={[x + (x < 0 ? -0.95 : 0.95) * (1 - install), 2.9, z]} castShadow receiveShadow>
              <boxGeometry args={[0.08, 5.25, panelDepth * 0.9]} />
              <meshPhysicalMaterial color="#20262A" roughness={0.4} metalness={0.78} clearcoat={0.12} transparent opacity={0.1 + install * 0.85} side={THREE.FrontSide} />
            </mesh>
          );
        })
      )}
      {Array.from({ length: Math.max(4, Math.floor(panelCount / 2)) }, (_, index) => {
        const install = stagger(wallP, 0.25, 1, index, panelCount / 2);
        if (install <= 0.01) return null;

        return (
          <mesh key={`opening-${index}`} position={[-WIDTH / 2 - 0.12, 2.35, -index * panelDepth * 2 - panelDepth]}>
            <boxGeometry args={[0.11, 1.55, panelDepth * 0.65]} />
            <meshStandardMaterial color="#071013" roughness={0.18} metalness={0.1} transparent opacity={install} />
          </mesh>
        );
      })}
    </group>
  );
}

function SitePlane({ progress }) {
  const gridOpacity = 0.22 + mapRange(progress, 0.45, 0.95) * 0.2;
  return (
    <group>
      <mesh rotation-x={-Math.PI / 2} position={[0, -0.38, -22]} receiveShadow>
        <planeGeometry args={[54, 76, 1, 1]} />
        <meshStandardMaterial color="#D9DEDF" roughness={0.82} metalness={0.02} />
      </mesh>
      <gridHelper args={[60, 36, BRAND, '#7F898F']} position={[0, -0.35, -22]} material-opacity={gridOpacity} material-transparent />
    </group>
  );
}

function CameraRig({ progress, compact }) {
  const { camera } = useThree();
  const current = useRef(progress);
  const targetRef = useRef(new THREE.Vector3(-WIDTH / 2, 1.2, 0));
  const buildingCenter = useMemo(() => new THREE.Vector3(0, 3.4, -((compact ? FRAME_COUNT_COMPACT : FRAME_COUNT_DESKTOP) - 1) * SPACING * 0.5), [compact]);
  const finalDistance = useMemo(() => {
    const modelLength = ((compact ? FRAME_COUNT_COMPACT : FRAME_COUNT_DESKTOP) - 1) * SPACING;
    const modelWidth = WIDTH;
    const radius = Math.sqrt(modelLength * modelLength + modelWidth * modelWidth) * 0.5;
    return radius / Math.sin(THREE.MathUtils.degToRad((compact ? 55 : 42) * 0.5));
  }, [compact]);
  const path = useMemo(
    () =>
      new THREE.CatmullRomCurve3([
        new THREE.Vector3(-6.6, 1.5, 4.8),
        new THREE.Vector3(-7.4, 4.2, 5.3),
        new THREE.Vector3(-12, 7.4, -4),
        new THREE.Vector3(-6.2, 10.8, -15),
        new THREE.Vector3(0, 9.2, -31),
        new THREE.Vector3(13.5, 8.8, -28),
        new THREE.Vector3(18, 15.5, -16),
        new THREE.Vector3(24, 23, 2),
        new THREE.Vector3(28, 29, 18)
      ]),
    []
  );
  const lookPath = useMemo(
    () =>
      new THREE.CatmullRomCurve3([
        new THREE.Vector3(-WIDTH / 2, 1.2, 0),
        new THREE.Vector3(-WIDTH / 2, 5.4, -1),
        new THREE.Vector3(0, 5.2, -8),
        new THREE.Vector3(0, 6.6, -19),
        new THREE.Vector3(0, 6.8, -32),
        new THREE.Vector3(0, 5.2, -28),
        new THREE.Vector3(0, 4.8, -24),
        new THREE.Vector3(0, 4, -24),
        new THREE.Vector3(0, 3.4, -24)
      ]),
    []
  );

  useFrame((_, delta) => {
    current.current = THREE.MathUtils.damp(current.current, progress, 4.5, delta);
    const p = easeOutCubic(current.current);
    let position = path.getPointAt(p);
    let lookAt = lookPath.getPointAt(p);

    if (p > 0.88) {
      const lift = easeOutCubic(mapRange(p, 0.88, 0.96));
      const hold = mapRange(p, 0.96, 1);
      const orbit = THREE.MathUtils.degToRad(5) * hold;
      const aerialRadius = finalDistance * (compact ? 0.64 : 0.56);
      const finalPosition = new THREE.Vector3(
        buildingCenter.x + Math.cos(0.64 + orbit) * aerialRadius,
        buildingCenter.y + finalDistance * (compact ? 0.42 : 0.48),
        buildingCenter.z + Math.sin(0.64 + orbit) * aerialRadius
      );
      position = position.lerp(finalPosition, lift);
      lookAt = lookAt.lerp(buildingCenter, lift);
    }

    camera.position.lerp(position, compact ? 0.09 : 0.12);
    targetRef.current.lerp(lookAt, compact ? 0.11 : 0.14);
    camera.lookAt(targetRef.current);
    camera.fov = THREE.MathUtils.lerp(camera.fov, compact ? 55 : 42, 0.05);
    camera.updateProjectionMatrix();
  });

  return null;
}

function SceneLighting({ progress }) {
  const final = mapRange(progress, 0.93, 1);
  return (
    <>
      <ambientLight intensity={0.72} />
      <hemisphereLight args={['#dce8ee', '#3b4145', 1.15]} />
      <directionalLight position={[-8, 14, 8]} intensity={3.4} castShadow shadow-mapSize-width={1024} shadow-mapSize-height={1024} />
      <pointLight position={[0, 6.8, 2]} intensity={0.65 + final * 3} color={BRAND} />
    </>
  );
}

function PEBStructure({ progress, compact }) {
  const steelMaterial = useMemo(
    () => new THREE.MeshPhysicalMaterial({ color: '#4F5B61', roughness: 0.36, metalness: 0.88, clearcoat: 0.16 }),
    []
  );
  const accentMaterial = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: '#1D8DBE',
        roughness: 0.32,
        metalness: 0.86,
        emissive: new THREE.Color(BRAND),
        emissiveIntensity: 0.04
      }),
    []
  );
  const finalP = mapRange(progress, 0.93, 1);

  return (
    <group position={[0, 0, 0]}>
      <SitePlane progress={progress} />
      <Skeleton progress={progress} compact={compact} steelMaterial={steelMaterial} accentMaterial={accentMaterial} />
      <Panels progress={progress} compact={compact} />
      <Line
        points={[[-WIDTH / 2 - 0.5, 0.2, 1.2], [WIDTH / 2 + 0.5, 0.2, 1.2], [WIDTH / 2 + 0.5, 0.2, -50.5], [-WIDTH / 2 - 0.5, 0.2, -50.5], [-WIDTH / 2 - 0.5, 0.2, 1.2]]}
        color={BRAND}
        lineWidth={1}
        transparent
        opacity={0.16 + finalP * 0.5}
      />
      <Line points={[[-WIDTH / 2, 5.9, -50 * finalP], [0, RIDGE_HEIGHT, -50 * finalP], [WIDTH / 2, 5.9, -50 * finalP]]} color="#BEEBFA" lineWidth={2.3} transparent opacity={finalP * 0.78} />
    </group>
  );
}

function Scene({ progress, compact, onReady }) {
  useEffect(() => {
    onReady?.();
  }, [onReady]);

  return (
    <>
      <color attach="background" args={['#080A0B']} />
      <fog attach="fog" args={['#D7DEE1', 18, 72]} />
      <SceneLighting progress={progress} />
      <CameraRig progress={progress} compact={compact} />
      <PEBStructure progress={progress} compact={compact} />
      <ContactShadows position={[0, -0.33, -20]} opacity={0.42} scale={42} blur={2.5} far={18} />
    </>
  );
}

export default function SteelStructureScene({ progress = 1, compact = false, onReady }) {
  return (
    <Canvas
      dpr={compact ? [0.8, 1.25] : [1, 1.7]}
      shadows={!compact}
      camera={{ position: [-6.6, 1.5, 4.8], fov: compact ? 55 : 42, near: 0.1, far: 140 }}
      gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping, outputColorSpace: THREE.SRGBColorSpace }}
    >
      <Scene progress={progress} compact={compact} onReady={onReady} />
    </Canvas>
  );
}
