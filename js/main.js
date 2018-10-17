const RADIUS = Math.sqrt(5);
const NUM_BALLS = 3;
const BALL_MATERIAL = new THREE.MeshBasicMaterial( {color: 0xa9a9a9, wireframe: true} ); 
const TABLE_MATERIAL = new THREE.MeshBasicMaterial({color: 0x825201, wireframe: true});

var scene;

function animate(){
    render();       
    requestAnimationFrame(animate); //Pede ao browser para correr esta funcao assim que puder  
}

function createScene(){

    scene = new THREE.Scene();
    scene.add(new THREE.AxesHelper(1));

    game = new Game(NUM_BALLS);
}

function createCamera(){
    var width = window.innerWidth;
    var height = window.innerHeight;
    //Mudar estes cancros
    camera = new THREE.OrthographicCamera( width / (-100), width / 100, height / 100, height / (-100), -100, 100 ); //left, right, top, bottom, near, far
    
    camera.position.x = 0;
    camera.position.y = 0;
    camera.position.z = -12;
    camera.lookAt(scene.position);  
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

function onKeyDown(event) {
    //TODO
}

function onKeyUp(event) {
    //TODO
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