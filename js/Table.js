var material;

class Table extends Object {
    constructor() {
        table.addElement(0, -0.25, 0, new THREE.BoxGeometry(20, 0.5, 10), TABLE_MATERIAL);
        table.addElement(8, -2, -3, new THREE.CylinderGeometry(0.4, 0.2, 3, 10), TABLE_MATERIAL);
        table.addElement(-8, -2, -3, new THREE.CylinderGeometry(0.4, 0.2, 3, 10), TABLE_MATERIAL);
        table.addElement(8, -2, 3, new THREE.CylinderGeometry(0.4, 0.2, 3, 10), TABLE_MATERIAL);
        table.addElement(-8, -2, 3, new THREE.CylinderGeometry(0.4, 0.2, 3, 10), TABLE_MATERIAL);

        return this;
    }
}