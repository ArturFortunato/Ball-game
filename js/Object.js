class Objeto extends THREE.Object3D {

    constructor() {
        super();
    }

    createMesh(geometry, material, x, y, z) {
        var mesh = new THREE.Mesh(geometry, material);
        mesh.position.set(x, y, z);
        
        return mesh;
    }

    addElement(x, y, z, geometry, material) {
        //geometry.computeBoundingSphere();
		this.add(this.createMesh(geometry, material, x, y, z));
    }

    addToScene(mesh) {
        scene.add(mesh);
    }
}