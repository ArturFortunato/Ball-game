const RADIUS = Math.sqrt(5) / 2;
const NUM_BALLS = 10;
const VELOCITY = 1;
const MAX_VELOCITY = 11;
const BALL_MATERIAL = new THREE.MeshBasicMaterial( {color: 0xa9a9a9, wireframe: true} );
const TABLE_MATERIAL = new THREE.MeshBasicMaterial({color: 0x825201, wireframe: true} );
var camera, topCamera, fixedCamera, mobileCamera;
var width = window.innerWidth;
var height = window.innerHeight;
var tecla_E = true;
var scene;
var clock = new THREE.Clock();
var goal = new THREE.Object3D;

function animate(){
    game.refresh();
    updateCamera();
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
    topCamera.position.set(0, 70, 0);
    topCamera.lookAt(scene.position);

    fixedCamera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    fixedCamera.position.set(18, 10, 15);
    fixedCamera.lookAt(scene.position);

    mobileCamera = new THREE.PerspectiveCamera(45, width / height, 1, 1000);
    mobileCamera.position.set(game.ball_list[1].mesh.position.x + 2, 10, game.ball_list[1].mesh.position.z + 2);
    mobileCamera.lookAt(game.ball_list[1].mesh.position);

    camera = topCamera;
}

function render(){
    renderer.render(scene, camera);
}

function onResize(){

    renderer.setSize(window.innerWidth, window.innerHeight);

    if(window.innerWidth > 0 && window.innerHeight > 0){
        camera.aspect = renderer.getSize().width / renderer.getSize().height;
        camera.updateProjectionMatrix();
    }
}

function draw(type){
  for(i = 0; i < NUM_BALLS; i++)
    game.ball_list[i].drawAxis(type);
}

//funcao para dar update na mobileCamera de forma a seguir a bola selecionada
function updateCamera(){

  goal.position.set(game.ball_list[1].mesh.position.x, 4, game.ball_list[1].mesh.position.z);
  mobileCamera.lookAt(goal.position);
}

function onKeyDown(event) {

    switch(event.keyCode){
        case 49: //1
            camera = topCamera;
            break;
        case 50: //2
            camera = fixedCamera;
            break;
        case 51: //3
            camera = mobileCamera;
            break;
        case 69: //Tecla E -> esconder/aparecer eixos das bolas
            var type = (tecla_E) ? 1:0; //1 = desenhar eixos; 0 = apagar eixos;
            draw(type);
            tecla_E = !tecla_E;
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

    controls = new THREE.OrbitControls(camera, renderer.domELement);


}
