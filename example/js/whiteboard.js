class WhiteBoard extends THREE.Mesh {
  constructor() {
    var material = new THREEx.DynamicTexture(512,512);

    super(
      new THREE.PlaneGeometry(5.0, 2.5, 0.5),
      new THREE.MeshBasicMaterial({
        map : material.texture
      })
    );

    this.dynamicTexture = material;
    material.clear('white');

    this.respondsToIntersection = true;
  }

  // A raycast intersected us, indicating we want to draw
  // TODO: Only respond if the original rayCaster was the controller
  // TODO: And only if it had a texta in hand?
  raycastIntersected(intersection) {
    var localIntersect = this.worldToLocal(intersection.point);
    var face = intersection.face;
    var faceIndex = intersection.faceIndex;

    // Convert from local coordinate to Barycentric coordinates
    var coordinates = THREE.Triangle.barycoordFromPoint(localIntersect,
      this.geometry.vertices[face.a],
      this.geometry.vertices[face.b],
      this.geometry.vertices[face.c]
    );

    // Work out the relevant texture coordinates
    // TODO: This probably belongs on the DynamicTexture class
    var uv = new THREE.Vector2 ();
    uv.x += coordinates.x * this.geometry.faceVertexUvs[0][faceIndex][0].x;
    uv.y += coordinates.x * this.geometry.faceVertexUvs[0][faceIndex][0].y;
    uv.x += coordinates.y * this.geometry.faceVertexUvs[0][faceIndex][1].x;
    uv.y += coordinates.y * this.geometry.faceVertexUvs[0][faceIndex][1].y;
    uv.x += coordinates.z * this.geometry.faceVertexUvs[0][faceIndex][2].x;
    uv.y += coordinates.z * this.geometry.faceVertexUvs[0][faceIndex][2].y;

    // Now take the texture coordinates, and work out the canvas coordinates
    var canvas = this.dynamicTexture.canvas;
    var context = this.dynamicTexture.context;
    var x = uv.x * canvas.width;
    var y = (1 - uv.y) * canvas.height;

    // Draw!
    // TODO: Probably belongs on the dynamic texture class?
    context.beginPath();
    context.rect(x - 4, y - 4, 8, 8);
    context.fillStyle = '#175ac6';
    context.fill();

    this.dynamicTexture.texture.needsUpdate = true;
  };
};
