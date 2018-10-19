const RADIUS = Math.sqrt(5) / 2;
const NUM_BALLS = 10;
const VELOCITY = 10;
const MAX_VELOCITY = 11;
const BALL_MATERIAL = new THREE.MeshBasicMaterial( {color: 0xa9a9a9, wireframe: true} );
const TABLE_MATERIAL = new THREE.MeshBasicMaterial({color: 0x825201, wireframe: true} );
var camera_1, camera_2, camera_3;
var width = window.innerWidth;
var height = window.innerHeight;
var colide = false;

var scene;
var clock = new THREE.Clock();

function animate(){
    game.refresh();
    render();
    requestAnimationFrame(animate); //Pede ao browser para correr esta funcao assim que puder
}

function createScene(){

    scene = new THREE.Scene();
    scene.add(new THREE.AxesHelper(1));

    game = new Game(NUM_BALLS);
}

function createCamera(){
    //Mudar estes cancros
    camera_1 = new THREE.OrthographicCamera( width / (-100), width / 100, height / 100, height / (-100), -100, 100 ); //left, right, top, bottom, near, far
    camera_1.position.x = 0;
    camera_1.position.y = 70;
    camera_1.position.z = 0;
    camera_1.lookAt(scene.position);

    camera_2 = new THREE.PerspectiveCamera(45, width / height, 1, 1000);
    camera_2.position.x = 0;
    camera_2.position.y = 15;
    camera_2.position.z = 0;
    camera_2.lookAt(scene.position);
}

function render(){
    renderer.render(scene, camera_1);
}

function onResize(){

    renderer.setSize(window.innerWidth, window.innerHeight);

    if(window.innerHeight > 0 && window.innerWidth > 0){
        camera_1.aspect = renderer.getSize().width / renderer.getSize().height;
        camera_1.updateProjectionMatrix();
    }
}

function onKeyDown(event) {
    //TODO
}

function onKeyUp(event) {
    //TODO
    switch(event.keyCode){
        case 49: //1
            break;
        case 50: //2
            break;
        case 51: //3
            break;
    }
}

function init(){
    renderer = new THREE.WebGLRenderer();

    renderer.setSize(window.innerWidth, window.innerHeight);

    document.body.appendChild(renderer.domElement);

    createScene();
    createCamera();
    render();

    window.addEventListener('resize', onResize);

    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);

    controls = new THREE.OrbitControls(camera_1, renderer.domELement);
}
