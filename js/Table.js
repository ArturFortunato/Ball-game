class Table extends Objeto {
    constructor() {
        super();

        this.addElement(0, -0.25, 0, new THREE.BoxGeometry(20, 0.5, 10), TABLE_MATERIAL);

        this.addElement(10.25, RADIUS / 2 - 0.25, 0, new THREE.BoxGeometry(0.5, RADIUS + 0.5, 11), TABLE_MATERIAL);
        this.addElement(-10.25, RADIUS / 2 - 0.25, 0, new THREE.BoxGeometry(0.5, RADIUS + 0.5, 11), TABLE_MATERIAL);
        this.addElement(0, RADIUS / 2 - 0.25, 5.25, new THREE.BoxGeometry(20, RADIUS + 0.5, 0.5), TABLE_MATERIAL);
        this.addElement(0, RADIUS / 2 - 0.25, -5.25, new THREE.BoxGeometry(20, RADIUS + 0.5, 0.5), TABLE_MATERIAL);

        return this;
    }
}