class Table extends Objeto {
    constructor() {
        super();
        
        this.addElement(0, -0.25, 0, new THREE.BoxGeometry(20, 0.5, 10), TABLE_MATERIAL);
        this.addElement(8, -2, -3, new THREE.CylinderGeometry(0.4, 0.2, 3, 10), TABLE_MATERIAL);
        this.addElement(-8, -2, -3, new THREE.CylinderGeometry(0.4, 0.2, 3, 10), TABLE_MATERIAL);
        this.addElement(8, -2, 3, new THREE.CylinderGeometry(0.4, 0.2, 3, 10), TABLE_MATERIAL);
        this.addElement(-8, -2, 3, new THREE.CylinderGeometry(0.4, 0.2, 3, 10), TABLE_MATERIAL);

        return this;
    }
}