export function ColumnMesh({ position, height = 2.9, opacity = 1, scaleY = 1, color = '#AEB8C1' }) {
  return (
    <group position={position} scale={[1, Math.max(scaleY, 0.001), 1]}>
      <mesh position={[0, height / 2, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.12, height, 0.12]} />
        <meshStandardMaterial color={color} metalness={0.65} roughness={0.32} transparent opacity={opacity} />
      </mesh>
      <mesh position={[0, 0.025, 0]} castShadow>
        <boxGeometry args={[0.58, 0.05, 0.58]} />
        <meshStandardMaterial color="#3D454B" metalness={0.45} roughness={0.38} transparent opacity={opacity} />
      </mesh>
      {[
        [-0.19, 0.07, -0.19],
        [0.19, 0.07, -0.19],
        [-0.19, 0.07, 0.19],
        [0.19, 0.07, 0.19]
      ].map((bolt) => (
        <mesh key={bolt.join('-')} position={bolt} castShadow>
          <cylinderGeometry args={[0.035, 0.035, 0.045, 12]} />
          <meshStandardMaterial color="#0D0D0D" metalness={0.75} roughness={0.25} transparent opacity={opacity} />
        </mesh>
      ))}
    </group>
  );
}
