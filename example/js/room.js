class Room extends THREE.Mesh {
  constructor(textureLoader, scene) {
    var carpetTexture = textureLoader.load('textures/pattern_238/diffuse.tga');
    carpetTexture.wrapS = carpetTexture.wrapT = THREE.RepeatWrapping;
    carpetTexture.repeat.set( 5, 5 );

    var carpetSpecularMap = textureLoader.load('textures/pattern_238/specular.tga');
    carpetSpecularMap.wrapS = carpetSpecularMap.wrapT = THREE.RepeatWrapping;
    carpetSpecularMap.repeat.set( 5, 5 );

    var carpetNormalMap = textureLoader.load('textures/pattern_238/normal.tga');
    carpetNormalMap.wrapS = carpetNormalMap.wrapT = THREE.RepeatWrapping;
    carpetNormalMap.repeat.set( 5, 5 );

    var wallTexture = textureLoader.load('textures/pattern_205/diffuse.tga');
    wallTexture.wrapS = wallTexture.wrapT = THREE.RepeatWrapping;
    wallTexture.repeat.set( 2, 2 );

    var wallSpecularMap = textureLoader.load('textures/pattern_205/specular.tga');
    wallSpecularMap.wrapS = wallSpecularMap.wrapT = THREE.RepeatWrapping;
    wallSpecularMap.repeat.set( 2, 2 );

    var wallNormalMap = textureLoader.load('textures/pattern_205/normal.tga');
    wallNormalMap.wrapS = wallNormalMap.wrapT = THREE.RepeatWrapping;
    wallNormalMap.repeat.set( 2, 2 );

    var carpetMaterial = new THREE.MeshPhongMaterial({
      color: '#dbd8b6',
      map: carpetTexture,
      specularMap: carpetSpecularMap,
      normalMap: carpetNormalMap,
      side: THREE.BackSide
    });

    var wallMaterial = new THREE.MeshPhongMaterial({
      color: '#2194ce',
      map: wallTexture,
      specularMap: wallSpecularMap,
      normalMap: wallNormalMap,
      side: THREE.BackSide
    });

    var roomMaterial = new THREE.MultiMaterial([wallMaterial, wallMaterial, wallMaterial, carpetMaterial, wallMaterial, wallMaterial]);

    super(
      new THREE.BoxGeometry(6, 6, 6, 8, 8, 8),
      roomMaterial
    );
    this.position.y = 3;
    scene.add(this);

    scene.add(new THREE.HemisphereLight(0x606060, 0x404040));
    scene.fog = new THREE.FogExp2( 0xd0e0f0, 0.0025 );

    var light = new THREE.DirectionalLight(0xffffff);
    light.position.set(1, 1, 1).normalize();
    scene.add(light);
  }
};
