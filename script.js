// ==============================
// THREE.JS
// ==============================

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

camera.position.set(0, 8, 10);


// Renderer
const renderer = new THREE.WebGLRenderer({
    antialias: true
});

renderer.setSize(
    window.innerWidth,
    window.innerHeight
);

renderer.setPixelRatio(
    Math.min(window.devicePixelRatio, 2)
);

document.body.appendChild(renderer.domElement);


// ==============================
// CAHAYA
// ==============================

const light = new THREE.DirectionalLight(
    0xffffff,
    1
);

light.position.set(5, 10, 5);

scene.add(light);

scene.add(
    new THREE.AmbientLight(
        0xffffff,
        0.5
    )
);


// ==============================
// TANAH
// ==============================

const tanahGeometry =
    new THREE.BoxGeometry(10, 0.5, 10);

const tanahMaterial =
    new THREE.MeshStandardMaterial({
        color: 0x8b5a2b
    });

const tanah =
    new THREE.Mesh(
        tanahGeometry,
        tanahMaterial
    );

tanah.position.y = -0.25;

scene.add(tanah);


// ==============================
// PLAYER
// ==============================

const playerGeometry =
    new THREE.BoxGeometry(1, 2, 1);

const playerMaterial =
    new THREE.MeshStandardMaterial({
        color: 0x2196f3
    });

const player =
    new THREE.Mesh(
        playerGeometry,
        playerMaterial
    );

player.position.y = 1;

scene.add(player);


// ==============================
// DATA GAME
// ==============================

let coin = 100;
let level = 1;
let jumlahPanen = 0;

let tanaman = [];


// ==============================
// MENANAM
// ==============================

function tanam() {

    if (coin < 10) {
        alert("Coin tidak cukup!");
        return;
    }

    coin -= 10;

    const geometry =
        new THREE.ConeGeometry(
            0.4,
            1,
            8
        );

    const material =
        new THREE.MeshStandardMaterial({
            color: 0x00aa00
        });

    const tanamanBaru =
        new THREE.Mesh(
            geometry,
            material
        );

    tanamanBaru.position.set(
        (Math.random() - 0.5) * 8,
        0.5,
        (Math.random() - 0.5) * 8
    );

    tanamanBaru.userData.siapPanen =
        false;

    scene.add(tanamanBaru);

    tanaman.push(tanamanBaru);

    updateUI();

    // Tanaman tumbuh
    setTimeout(() => {

        tanamanBaru.userData.siapPanen =
            true;

        tanamanBaru.scale.set(
            1.5,
            1.5,
            1.5
        );

    }, 5000);
}


// ==============================
// PANEN
// ==============================

function panen() {

    for (
        let i = tanaman.length - 1;
        i >= 0;
        i--
    ) {

        const t = tanaman[i];

        if (
            t.userData.siapPanen
        ) {

            scene.remove(t);

            tanaman.splice(i, 1);

            coin += 25;

            jumlahPanen++;

            level =
                Math.floor(
                    jumlahPanen / 5
                ) + 1;

            updateUI();
        }
    }
}


// ==============================
// UPDATE UI
// ==============================

function updateUI() {

    document.getElementById(
        "coin"
    ).textContent = coin;

    document.getElementById(
        "level"
    ).textContent = level;
}


// ==============================
// ANIMASI GAME
// ==============================

function animate() {

    requestAnimationFrame(
        animate
    );

    // Animasi tanaman
    tanaman.forEach(t => {

        t.rotation.y += 0.01;

    });

    renderer.render(
        scene,
        camera
    );
}

animate();


// ==============================
// RESPONSIVE
// ==============================

window.addEventListener(
    "resize",
    () => {

        camera.aspect =
            window.innerWidth /
            window.innerHeight;

        camera.updateProjectionMatrix();

        renderer.setSize(
            window.innerWidth,
            window.innerHeight
        );
    }
);
