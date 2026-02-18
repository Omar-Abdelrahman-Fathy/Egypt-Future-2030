// ================================================
// مشهد Three.js - النموذج ثلاثي الأبعاد (محسن للأداء والحجم)
// ================================================
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

export function initThreeScene() {
    const canvas = document.getElementById('three-canvas');
    if (!canvas) return;

    // تنظيف canvas من أي محتوى سابق
    while (canvas.firstChild) {
        canvas.removeChild(canvas.firstChild);
    }

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a0f1c);

    // حساب الحجم المناسب بناءً على viewport
    const aspectRatio = window.innerWidth / window.innerHeight;
    const cameraDistance = aspectRatio < 1 ? 9 : 7; // مسافة أكبر على الموبايل

    const camera = new THREE.PerspectiveCamera(45, aspectRatio, 0.1, 1000);
    camera.position.set(0, 1.5, cameraDistance);

    const renderer = new THREE.WebGLRenderer({ 
        antialias: true, 
        alpha: true,
        powerPreference: "high-performance"
    });
    
    // تعيين الحجم مع مراعاة DPI
    const pixelRatio = Math.min(window.devicePixelRatio, 2);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(pixelRatio);
    renderer.shadowMap.enabled = false;
    
    // التأكد من أن canvas لا يسبب overflow
    renderer.domElement.style.position = 'absolute';
    renderer.domElement.style.top = '0';
    renderer.domElement.style.left = '0';
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    renderer.domElement.style.pointerEvents = 'none'; // منع التفاعل مع الـ canvas
    
    canvas.appendChild(renderer.domElement);

    // الإضاءة
    const ambientLight = new THREE.AmbientLight(0x404060);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(2, 3, 4);
    scene.add(directionalLight);

    const neonLight = new THREE.PointLight(0x00eaff, 1.5, 12);
    neonLight.position.set(2, 1, 3);
    scene.add(neonLight);

    // الكرة الأرضية الرئيسية - تحسين الأداء بتقليل الـ segments للموبايل
    const sphereSegments = window.innerWidth < 768 ? 32 : 48;
    const sphereGeometry = new THREE.SphereGeometry(1.4, sphereSegments, sphereSegments);
    const sphereMaterial = new THREE.MeshPhongMaterial({
        color: 0x00eaff,
        emissive: 0x004466,
        wireframe: true,
        transparent: true,
        opacity: 0.5
    });
    const earth = new THREE.Mesh(sphereGeometry, sphereMaterial);
    scene.add(earth);

    // الكرة الداخلية
    const innerSphereGeometry = new THREE.SphereGeometry(1.1, 24, 24);
    const innerSphereMaterial = new THREE.MeshBasicMaterial({
        color: 0x226688,
        transparent: true,
        opacity: 0.15
    });
    const innerSphere = new THREE.Mesh(innerSphereGeometry, innerSphereMaterial);
    scene.add(innerSphere);

    // النقاط المحيطة - تقليل العدد للموبايل
    const pointsCount = window.innerWidth < 768 ? 100 : 200;
    const pointsGeometry = new THREE.BufferGeometry();
    const pointsPositions = new Float32Array(pointsCount * 3);

    for(let i = 0; i < pointsCount; i++) {
        const radius = 1.7;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        
        const x = radius * Math.sin(phi) * Math.cos(theta);
        const y = radius * Math.sin(phi) * Math.sin(theta);
        const z = radius * Math.cos(phi);
        
        pointsPositions[i * 3] = x;
        pointsPositions[i * 3 + 1] = y;
        pointsPositions[i * 3 + 2] = z;
    }

    pointsGeometry.setAttribute('position', new THREE.BufferAttribute(pointsPositions, 3));
    
    const pointsMaterial = new THREE.PointsMaterial({
        size: 0.04,
        color: 0x00eaff,
        transparent: true,
        blending: THREE.AdditiveBlending
    });

    const points = new THREE.Points(pointsGeometry, pointsMaterial);
    scene.add(points);

    // الحلقة
    const ringGeometry = new THREE.TorusGeometry(1.8, 0.02, 12, 80);
    const ringMaterial = new THREE.MeshStandardMaterial({
        color: 0x6a5cff,
        emissive: 0x331166,
        transparent: true,
        opacity: 0.3
    });
    
    const ring = new THREE.Mesh(ringGeometry, ringMaterial);
    ring.rotation.x = Math.PI / 2;
    ring.rotation.z = 0.5;
    scene.add(ring);

    // خطوط المدار - تقليل التعقيد للموبايل
    const orbitSegments = window.innerWidth < 768 ? 30 : 60;
    const orbitLinesGeometry = new THREE.BufferGeometry();
    const orbitPoints = [];
    
    for (let i = 0; i <= orbitSegments; i++) {
        const angle = (i / orbitSegments) * Math.PI * 2;
        const radius = 2.1;
        orbitPoints.push(
            Math.cos(angle) * radius,
            Math.sin(angle) * radius * 0.3,
            0
        );
    }
    
    orbitLinesGeometry.setAttribute('position', new THREE.Float32BufferAttribute(orbitPoints, 3));
    const orbitLinesMaterial = new THREE.LineBasicMaterial({ color: 0x00eaff, opacity: 0.15, transparent: true });
    const orbitLines = new THREE.LineLoop(orbitLinesGeometry, orbitLinesMaterial);
    orbitLines.rotation.x = 0.5;
    orbitLines.rotation.z = 0.3;
    scene.add(orbitLines);

    // الجسيمات البعيدة - تقليل العدد للموبايل
    const particlesCount = window.innerWidth < 768 ? 200 : 400;
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesPositions = new Float32Array(particlesCount * 3);

    for(let i = 0; i < particlesCount * 3; i += 3) {
        const r = 3 + Math.random() * 2;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        
        particlesPositions[i] = r * Math.sin(phi) * Math.cos(theta);
        particlesPositions[i + 1] = r * Math.sin(phi) * Math.sin(theta);
        particlesPositions[i + 2] = r * Math.cos(phi);
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(particlesPositions, 3));
    
    const particlesMaterial = new THREE.PointsMaterial({
        size: 0.02,
        color: 0x88aaff,
        transparent: true,
        opacity: 0.3,
        blending: THREE.AdditiveBlending
    });

    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);

    // النجوم - تقليل العدد للموبايل
    const starsCount = window.innerWidth < 768 ? 500 : 1000;
    const starsGeometry = new THREE.BufferGeometry();
    const starsPositions = new Float32Array(starsCount * 3);

    for(let i = 0; i < starsCount * 3; i += 3) {
        starsPositions[i] = (Math.random() - 0.5) * 150;
        starsPositions[i + 1] = (Math.random() - 0.5) * 150;
        starsPositions[i + 2] = (Math.random() - 0.5) * 150;
    }

    starsGeometry.setAttribute('position', new THREE.BufferAttribute(starsPositions, 3));
    
    const starsMaterial = new THREE.PointsMaterial({
        size: 0.08,
        color: 0xffffff,
        transparent: true,
        opacity: 0.6
    });

    const stars = new THREE.Points(starsGeometry, starsMaterial);
    scene.add(stars);

    // التحكم - تعطيل كل التفاعل
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = false;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 1.0;
    controls.enableZoom = false;
    controls.enablePan = false;
    controls.enableRotate = false;

    let clock = new THREE.Clock();

    function animate() {
        requestAnimationFrame(animate);

        const delta = clock.getDelta();
        const elapsedTime = performance.now() * 0.001;

        controls.update();

        // دوران بطيء للعناصر
        earth.rotation.y += 0.0005;
        innerSphere.rotation.y += 0.0003;
        points.rotation.y += 0.0008;
        ring.rotation.z += 0.0001;
        orbitLines.rotation.y += 0.00005;
        stars.rotation.y += 0.00002;
        particles.rotation.y += 0.0001;

        // نبض خفيف للكرة الداخلية
        const pulseScale = 1 + Math.sin(elapsedTime * 2) * 0.005;
        innerSphere.scale.set(pulseScale, pulseScale, pulseScale);

        renderer.render(scene, camera);
    }

    animate();

    window.addEventListener('resize', onWindowResize, false);

    function onWindowResize() {
        const width = window.innerWidth;
        const height = window.innerHeight;
        
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);
        
        // تعديل مسافة الكاميرا حسب نسبة العرض
        camera.position.z = width < 768 ? 9 : 7;
    }

    return { scene, camera, renderer, controls };
}