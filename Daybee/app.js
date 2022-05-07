let container;
let camera;
let renderer;
let scene;
let cloth;

function init() {
    container = document.querySelector('.scene');
    //create scene
    scene = new THREE.Scene();

    const fov = 35;
    const aspect = container.clientWidth / container.clientHeight;
    const near = .1;
    const far = 500;

    //camera setup
    camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.set(0, 1, 5);

    //light setup
    const ambient = new THREE.AmbientLight(0x404040, 3);
    scene.add(ambient);

    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(10, 10, 100);
    scene.add(light)

    //renderer setup 
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);

    container.appendChild(renderer.domElement);

    //load model
    let loader = new THREE.GLTFLoader;
    loader.load('./3d/scene.gltf', function(gltf) {
        scene.add(gltf.scene);
        cloth = gltf.scene.children[0];
        animate();
    });
}

function animate() {
    requestAnimationFrame(animate);
    cloth.rotation.z += 0.01;
    renderer.render(scene, camera);
}


function onWindowResize() {
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix;
    renderer.setSize(container.clientWidth, container.clientHeight);
}

window.addEventListener('resize', onWindowResize);
init();