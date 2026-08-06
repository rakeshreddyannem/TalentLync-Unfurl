import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function LandingBackground3D() {
  const mountRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
    camera.position.z = 30;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Floating 3D Wireframe Geometric Objects (Icosahedrons, Octahedrons, Cubes)
    const geomGroup = new THREE.Group();

    const geos = [
      new THREE.IcosahedronGeometry(1.5, 0),
      new THREE.OctahedronGeometry(1.2, 0),
      new THREE.TetrahedronGeometry(1.4, 0),
      new THREE.BoxGeometry(1.3, 1.3, 1.3)
    ];

    const mats = [
      new THREE.MeshBasicMaterial({ color: 0x368dff, wireframe: true, transparent: true, opacity: 0.22 }),
      new THREE.MeshBasicMaterial({ color: 0x00a962, wireframe: true, transparent: true, opacity: 0.22 }),
      new THREE.MeshBasicMaterial({ color: 0x8b5cf6, wireframe: true, transparent: true, opacity: 0.22 })
    ];

    for (let i = 0; i < 20; i++) {
      const geo = geos[i % geos.length];
      const mat = mats[i % mats.length];
      const mesh = new THREE.Mesh(geo, mat);

      mesh.position.set(
        (Math.random() - 0.5) * 50,
        (Math.random() - 0.5) * 40,
        (Math.random() - 0.5) * 25
      );

      const scale = 0.6 + Math.random() * 1.4;
      mesh.scale.set(scale, scale, scale);
      mesh.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0);

      geomGroup.add(mesh);
    }
    scene.add(geomGroup);

    // Full-Page Flowing Constellation Particle Grid
    const particleCount = 200;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 60;
      positions[i + 1] = (Math.random() - 0.5) * 50;
      positions[i + 2] = (Math.random() - 0.5) * 30;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0x38bdf8,
      size: 0.15,
      transparent: true,
      opacity: 0.35
    });

    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // Parallax tracking
    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (e) => {
      mouseX = (e.clientX / width - 0.5) * 2;
      mouseY = -(e.clientY / height - 0.5) * 2;
    };

    const handleScroll = () => {
      const scrollY = window.scrollY;
      camera.position.y = -scrollY * 0.01;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    // Animation Loop
    let animationFrameId;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      geomGroup.rotation.x += 0.0008;
      geomGroup.rotation.y += 0.0012;

      geomGroup.children.forEach((c, idx) => {
        c.rotation.x += 0.004 * (idx % 2 === 0 ? 1 : -1);
        c.rotation.y += 0.004;
      });

      particles.rotation.y += 0.0005;

      scene.rotation.y += (mouseX * 0.3 - scene.rotation.y) * 0.02;
      scene.rotation.x += (mouseY * 0.3 - scene.rotation.x) * 0.02;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div ref={mountRef} className="fixed inset-0 pointer-events-none z-0 opacity-70" />
  );
}
