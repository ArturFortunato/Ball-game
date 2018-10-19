const RADIUS = Math.sqrt(5) / 2;
const NUM_BALLS = 5;
const BALL_MATERIAL = new THREE.MeshBasicMaterial( {color: 0xa9a9a9, wireframe: true} );
const TABLE_MATERIAL = new THREE.MeshBasicMaterial({color: 0x825201, wireframe: true});
var camera, topCamera, fixedCamera, mobileCamera;
var width = window.innerWidth;
var height = window.innerHeight;
var colide = false;
var tecla_E = false;
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
    topCamera = new THREE.OrthographicCamera( width / (-100), width / 100, height / 100, height / (-100), -100, 100 ); //left, right, top, bottom, near, far
    topCamera.position.x = 0;
    topCamera.position.y = 70;
    topCamera.position.z = 0;
    topCamera.lookAt(scene.position);

    camera = topCamera;

    fixedCamera = new THREE.PerspectiveCamera(45, width / height, 1, 1000);
    fixedCamera.position.x = 18;
    fixedCamera.position.y = 10;
    fixedCamera.position.z = 15;
    fixedCamera.lookAt(scene.position);

    mobileCamera = new THREE.PerspectiveCamera(45, width / height, 1, 1000);
    mobileCamera.position.x = 18;
    mobileCamera.position.y = 10;
    mobileCamera.position.z = 15;
    mobileCamera.lookAt(scene.children[2].position);
}

function render(){
    renderer.render(scene, camera);
}

function onResize(){

    renderer.setSize(window.innerWidth, window.innerHeight);

    if(window.innerHeight > 0 && window.innerWidth > 0){
        camera.aspect = renderer.getSize().width / renderer.getSize().height;
        camera.updateProjectionMatrix();
    }
}

function draw(type){
  for(i = 0; i < NUM_BALLS; i++)
    scene.children[i + 2].drawAxis(type);
  tecla_E = true;
}

function onKeyDown(event) {
    switch (event.keyCode) {
      case 69: //Tecla E -> esconder/aparecer eixos das bolas
        type = (tecla_E) ? 1:0;
        draw(type);
        tecla_E = !tecla_E;
        break;
      default: break;

    }
}

function onKeyUp(event) {

    switch(event.keyCode){
        case 49: //1
            camera = topCamera;
            controls = new THREE.OrbitControls(camera, renderer.domELement);
            break;
        case 50: //2
            camera = fixedCamera;
            controls = new THREE.OrbitControls(camera, renderer.domELement);
            break;
        case 51: //3
            camera = mobileCamera;
            //controls = new THREE.OrbitControls(camera, renderer.domELement);
            break;
        default: break;
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

    controls = new THREE.OrbitControls(camera, renderer.domELement);
}
