var material;

class Table extends Objeto {}

function createTable() {

    var table = new Table();

    material = new THREE.MeshBasicMaterial({color: 0x825201, wireframe: true});

    table.addElement(0, -0.25, 0, new THREE.BoxGeometry(20, 0.5, 10));
    table.addElement(8, -2, -3, new THREE.CylinderGeometry(0.4, 0.2, 3, 10));
    table.addElement(-8, -2, -3, new THREE.CylinderGeometry(0.4, 0.2, 3, 10));
    table.addElement(8, -2, 3, new THREE.CylinderGeometry(0.4, 0.2, 3, 10));
    table.addElement(-8, -2, 3, new THREE.CylinderGeometry(0.4, 0.2, 3, 10));

    scene.add(table);
}