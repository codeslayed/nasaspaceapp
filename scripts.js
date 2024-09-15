// Initialize scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('container').appendChild(renderer.domElement);

// Create celestial bodies
const createPlanet = (radius, color, position) => {
    const geometry = new THREE.SphereGeometry(radius, 32, 32);
    const material = new THREE.MeshBasicMaterial({ color });
    const planet = new THREE.Mesh(geometry, material);
    planet.position.set(position.x, position.y, position.z);
    return planet;
};

// Create Sun
const sun = createPlanet(1, 0xffff00, { x: 0, y: 0, z: 0 });
scene.add(sun);

// Create Earth
const earth = createPlanet(0.3, 0x0000ff, { x: 5, y: 0, z: 0 });
scene.add(earth);

// Create Near-Earth Asteroid
const asteroid = createPlanet(0.1, 0xaaaaaa, { x: 7, y: 0, z: 0 });
scene.add(asteroid);

// Set camera position
camera.position.z = 10;

// Animation loop
const animate = () => {
    requestAnimationFrame(animate);
    
    // Rotate Earth and Asteroid around the Sun
    earth.rotation.y += 0.01;
    asteroid.rotation.y += 0.02;

    // Update asteroid's position to simulate orbit
    asteroid.position.x = 7 * Math.cos(Date.now() * 0.001);
    asteroid.position.z = 7 * Math.sin(Date.now() * 0.001);

    renderer.render(scene, camera);
};

animate();

// Handle window resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});