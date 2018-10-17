class Object extends THREE.Object3D {

    constructor() {
        super();
    }

    createMesh(geometry, material, x, y, z) {
        var mesh = new THREE.Mesh(geometry, material);
        mesh.position.set(x, y, z);

        return mesh;
    }

    addElement(x, y, z, geometry, material) {
		this.add(this.createMesh(geometry, material, x, y, z));
    }

    addToScene(object) {
        scene.add(object);
    }
}