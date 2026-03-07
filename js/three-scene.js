// ================================================
// مشهد Three.js - كرة متوهجة (محدث)
// ================================================

// استيراد المكتبات باستخدام import map
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/OrbitControls.js';

export function initThreeScene() {
    const canvas = document.getElementById('three-canvas');
    if (!canvas) return;

    // تنظيف canvas من أي محتوى سابق
    while (canvas.firstChild) {
        canvas.removeChild(canvas.firstChild);
    }

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x030614);

    // حساب الحجم المناسب
    const aspectRatio = window.innerWidth / window.innerHeight;
    const cameraDistance = aspectRatio < 1 ? 10 : 8;

    const camera = new THREE.PerspectiveCamera(45, aspectRatio, 0.1, 1000);
    camera.position.set(0, 1, cameraDistance);

    const renderer = new THREE.WebGLRenderer({ 
        antialias: true, 
        alpha: true,
        powerPreference: "high-performance"
    });
    
    const pixelRatio = Math.min(window.devicePixelRatio, 2);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(pixelRatio);
    
    renderer.domElement.style.position = 'absolute';
    renderer.domElement.style.top = '0';
    renderer.domElement.style.left = '0';
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    renderer.domElement.style.pointerEvents = 'none';
    renderer.domElement.style.opacity = '0.85';
    
    canvas.appendChild(renderer.domElement);

    // ========== الإضاءة ==========
    const ambientLight = new THREE.AmbientLight(0x404060, 0.6);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.7);
    directionalLight.position.set(2, 3, 4);
    scene.add(directionalLight);

    // إضاءة نيون متحركة
    const cyanLight = new THREE.PointLight(0x00eaff, 1.5, 12);
    cyanLight.position.set(2, 1, 3);
    scene.add(cyanLight);

    const purpleLight = new THREE.PointLight(0x6a5cff, 1.2, 12);
    purpleLight.position.set(-2, -1, 3);
    scene.add(purpleLight);

    // ========== إنشاء النجوم في الخلفية ==========
    function createStarField() {
        const starsCount = 800;
        const starsGeometry = new THREE.BufferGeometry();
        const starsPositions = new Float32Array(starsCount * 3);
        const starsColors = new Float32Array(starsCount * 3);

        for (let i = 0; i < starsCount; i++) {
            const radius = 40 + Math.random() * 80;
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos((Math.random() * 2) - 1);
            
            const x = radius * Math.sin(phi) * Math.cos(theta);
            const y = radius * Math.sin(phi) * Math.sin(theta);
            const z = radius * Math.cos(phi);
            
            starsPositions[i * 3] = x;
            starsPositions[i * 3 + 1] = y;
            starsPositions[i * 3 + 2] = z;
            
            const colorVal = 0.5 + Math.random() * 0.5;
            starsColors[i * 3] = colorVal;
            starsColors[i * 3 + 1] = colorVal * (0.7 + Math.random() * 0.3);
            starsColors[i * 3 + 2] = 1.0;
        }

        starsGeometry.setAttribute('position', new THREE.BufferAttribute(starsPositions, 3));
        starsGeometry.setAttribute('color', new THREE.BufferAttribute(starsColors, 3));

        const starsMaterial = new THREE.PointsMaterial({
            size: 0.1,
            vertexColors: true,
            transparent: true,
            opacity: 0.6,
            blending: THREE.AdditiveBlending
        });

        return new THREE.Points(starsGeometry, starsMaterial);
    }

    const stars = createStarField();
    scene.add(stars);

    // ========== إنشاء الكرة المتوهجة ==========
    const sphereGeometry = new THREE.SphereGeometry(1.4, 64, 64);
    
    const sphereMaterial = new THREE.ShaderMaterial({
        uniforms: {
            time: { value: 0 },
            glowColor: { value: new THREE.Color(0x00eaff) },
            pulseSpeed: { value: 0.5 }
        },
        vertexShader: `
            varying vec3 vNormal;
            varying vec3 vViewPosition;
            
            void main() {
                vNormal = normalize(normalMatrix * normal);
                vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
                vViewPosition = -mvPosition.xyz;
                gl_Position = projectionMatrix * mvPosition;
            }
        `,
        fragmentShader: `
            uniform float time;
            uniform vec3 glowColor;
            uniform float pulseSpeed;
            
            varying vec3 vNormal;
            varying vec3 vViewPosition;
            
            void main() {
                vec3 normal = normalize(vNormal);
                vec3 viewDir = normalize(vViewPosition);
                
                float pulse = sin(time * pulseSpeed) * 0.15 + 0.85;
                float fresnel = dot(viewDir, normal);
                fresnel = pow(1.0 - fresnel, 2.0);
                
                vec3 baseColor = vec3(0.15, 0.2, 0.3);
                vec3 glow = glowColor * pulse * (fresnel * 1.2 + 0.4);
                vec3 finalColor = baseColor + glow;
                
                float alpha = 0.65 + fresnel * 0.35;
                
                gl_FragColor = vec4(finalColor, alpha);
            }
        `,
        transparent: true,
        side: THREE.DoubleSide,
        blending: THREE.AdditiveBlending
    });

    const earth = new THREE.Mesh(sphereGeometry, sphereMaterial);
    scene.add(earth);

    // طبقة Wireframe
    const wireframeMaterial = new THREE.MeshBasicMaterial({
        color: 0x00eaff,
        wireframe: true,
        transparent: true,
        opacity: 0.1
    });
    const wireframeSphere = new THREE.Mesh(sphereGeometry, wireframeMaterial);
    wireframeSphere.scale.set(1.02, 1.02, 1.02);
    scene.add(wireframeSphere);

    // ========== الحلقات المحيطة ==========
    function createGlowingRing(radius, color) {
        const ringGeometry = new THREE.TorusGeometry(radius, 0.015, 16, 100);
        const ringMaterial = new THREE.MeshBasicMaterial({ 
            color: color, 
            transparent: true, 
            opacity: 0.2 
        });
        return new THREE.Mesh(ringGeometry, ringMaterial);
    }

    const ring1 = createGlowingRing(1.9, 0x00eaff);
    ring1.rotation.x = Math.PI / 2;
    ring1.rotation.z = 0.3;
    scene.add(ring1);

    const ring2 = createGlowingRing(2.2, 0x6a5cff);
    ring2.rotation.x = Math.PI / 2;
    ring2.rotation.z = -0.2;
    scene.add(ring2);

    // ========== نقاط البيانات ==========
    function createDataPoints() {
        const count = 150;
        const geometry = new THREE.BufferGeometry();
        const positions = new Float32Array(count * 3);

        for (let i = 0; i < count; i++) {
            const radius = 1.7 + Math.random() * 1.1;
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos((Math.random() * 2) - 1);
            
            const x = radius * Math.sin(phi) * Math.cos(theta);
            const y = radius * Math.sin(phi) * Math.sin(theta);
            const z = radius * Math.cos(phi);
            
            positions[i * 3] = x;
            positions[i * 3 + 1] = y;
            positions[i * 3 + 2] = z;
        }

        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

        const material = new THREE.PointsMaterial({
            size: 0.04,
            color: 0x00eaff,
            transparent: true,
            opacity: 0.2,
            blending: THREE.AdditiveBlending
        });

        return new THREE.Points(geometry, material);
    }

    const dataPoints = createDataPoints();
    scene.add(dataPoints);

    // ========== التحكم ==========
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = false;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.3;
    controls.enableZoom = false;
    controls.enablePan = false;
    controls.enableRotate = false;

    // ========== حلقة التحريك ==========
    function animate() {
        requestAnimationFrame(animate);

        controls.update();

        earth.rotation.y += 0.0003;
        wireframeSphere.rotation.y += 0.0002;
        dataPoints.rotation.y += 0.0002;
        stars.rotation.y += 0.00005;
        ring1.rotation.z += 0.0001;
        ring2.rotation.z -= 0.0001;

        renderer.render(scene, camera);
    }

    animate();

    // ========== معالجة تغيير حجم النافذة ==========
    window.addEventListener('resize', onWindowResize, false);

    function onWindowResize() {
        const width = window.innerWidth;
        const height = window.innerHeight;
        
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);
    }

    return { scene, camera, renderer, controls };
}