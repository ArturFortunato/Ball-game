const RADIUS = Math.sqrt(5) / 2;
const NUM_BALLS = 10;
const VELOCITY = 1;
const MAX_VELOCITY = 5;
var BALL_MATERIAL;
const TABLE_MATERIAL = new THREE.MeshBasicMaterial({color: 0x825201, wireframe: true} );
var camera, topCamera, fixedCamera, mobileCamera;
var width = window.innerWidth;
var height = window.innerHeight;
var tecla_E = false;
var scene;
var ball_look = generateRandomBall();
var clock = new THREE.Clock();
var goal = new THREE.Object3D;

function animate(){
    game.refresh();
    updateCamera();
    render();
    requestAnimationFrame(animate); //Pede ao browser para correr esta funcao assim que puder
}

function generateRandomBall(){
    return Math.floor(Math.random() * 9) + 0;
}

function generateRandomColor(){
    //Math.random () -> gera valores dentro intervalo [0, 1[
    //Math.floor() -> retorna o maior inteiro menor ou igual ao numero dado
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (i = 0; i < 6; i++)
      color += letters[Math.floor(Math.random() * 16)];

    return color;
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
    mobileCamera.position.set(game.ball_list[ball_look].mesh.position.x + 2, 10, game.ball_list[ball_look].mesh.position.z + 2);
    mobileCamera.lookAt(game.ball_list[ball_look].mesh.position);

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
  goal.position.set(game.ball_list[ball_look].mesh.position.x, 4, game.ball_list[ball_look].mesh.position.z);
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
            ball_look = generateRandomBall();
            camera = mobileCamera;
            break;
        case 65: //Tecla 'a' -> alternar entre wireframe e solid color
            scene.traverse(function (node){
                if(node instanceof THREE.Mesh){
                    node.material.wireframe = !node.material.wireframe;
                }
            });
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
