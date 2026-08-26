import { Line } from '@react-three/drei';

export function TrussMesh({ x = 0, opacity = 1, color = '#1CA7E0' }) {
  const yTop = 3.55;
  const yEave = 2.9;
  const half = 1.45;

  return (
    <group position={[x, 0, 0]}>
      <Line points={[[0, yEave, -half], [0, yTop, 0], [0, yEave, half]]} color={color} lineWidth={3} transparent opacity={opacity} />
      <Line points={[[0, yEave, -half], [0, yEave, half]]} color="#AEB8C1" lineWidth={2} transparent opacity={opacity * 0.75} />
      {[-1, -0.5, 0, 0.5, 1].map((z, index) => (
        <Line
          key={z}
          points={[[0, yEave, z * half], [0, yTop, 0], [0, yEave, (z + 0.35) * half]]}
          color="#8A9299"
          lineWidth={1}
          transparent
          opacity={opacity * (index % 2 ? 0.55 : 0.35)}
        />
      ))}
    </group>
  );
}
