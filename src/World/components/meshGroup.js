import {
  PolyhedronGeometry,
  Group,
  MathUtils,
  Mesh,
  MeshStandardMaterial,
} from 'https://cdn.skypack.dev/three@0.132.2';

function createMeshGroup() {
  // a group holds other objects
  // but cannot be seen itself
  const group = new Group();

  const verticesOfCube = [
    -1,-1,-1,    1,-1,-1,    1, 1,-1,    -1, 1,-1,
    -1,-1, 1,    1,-1, 1,    1, 1, 1,    -1, 1, 1,
  ];

  const indicesOfFaces = [
      2,1,0,    0,3,2,
      0,4,7,    7,3,0,
      0,1,5,    5,4,0,
      1,2,6,    6,5,1,
      2,3,7,    7,6,2,
      4,5,6,    6,7,4
  ];

  const geometry = new PolyhedronGeometry( verticesOfCube, indicesOfFaces, 1, 2 );


  const material = new MeshStandardMaterial({
    color: 'indigo',
  });

  const protoSphere = new Mesh(geometry, material);

  // add the protoSphere to the group
  // group.add(protoSphere);

  // create twenty clones of the protoSphere
  // and add each to the group
  for (let i = 0; i < 1; i += 0.01) {
    const sphere = protoSphere.clone();

    // position the spheres on around a circle
    sphere.position.x = Math.cos(2 * Math.PI * i);
    sphere.position.y = Math.sin(2 * Math.PI * i);
    sphere.position.z = -i * 5;

    sphere.scale.multiplyScalar(0.01 + i);

    group.add(sphere);
  }

  // every sphere inside the group will be scaled
  group.scale.multiplyScalar(2);

  const radiansPerSecond = MathUtils.degToRad(30);

  // each frame, rotate the entire group of spheres
  group.tick = (delta) => {
    group.rotation.z -= delta * radiansPerSecond;
  };

  return group;
}

export { createMeshGroup };
