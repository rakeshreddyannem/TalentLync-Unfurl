import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function AuthBackground3D() {
  const mountRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
    camera.position.z = 20;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Floating 3D Wireframe Cubes in light blue/green
    const group = new THREE.Group();
    const cubeGeo = new THREE.BoxGeometry(2, 2, 2);
    const wireMat1 = new THREE.MeshBasicMaterial({ color: 0x368dff, wireframe: true, transparent: true, opacity: 0.25 });
    const wireMat2 = new THREE.MeshBasicMaterial({ color: 0x00a962, wireframe: true, transparent: true, opacity: 0.25 });

    for (let i = 0; i < 15; i++) {
      const mesh = new THREE.Mesh(cubeGeo, i % 2 === 0 ? wireMat1 : wireMat2);
      mesh.position.set(
        (Math.random() - 0.5) * 35,
        (Math.random() - 0.5) * 25,
        (Math.random() - 0.5) * 15
      );
      const scale = 0.5 + Math.random() * 1.5;
      mesh.scale.set(scale, scale, scale);
      mesh.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0);
      group.add(mesh);
    }
    scene.add(group);

    // Dynamic Floating Particle Grid
    const count = 150;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);

    for (let i = 0; i < count * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 40;
      positions[i + 1] = (Math.random() - 0.5) * 30;
      positions[i + 2] = (Math.random() - 0.5) * 20;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0x0284c7,
      size: 0.12,
      transparent: true,
      opacity: 0.35
    });

    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // Animation Loop
    let animationFrameId;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      group.rotation.x += 0.001;
      group.rotation.y += 0.0015;

      group.children.forEach((c, idx) => {
        c.rotation.x += 0.005 * (idx % 2 === 0 ? 1 : -1);
        c.rotation.y += 0.005;
      });

      particles.rotation.y += 0.0006;
      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div ref={mountRef} className="absolute inset-0 pointer-events-none opacity-60" />
  );
}
