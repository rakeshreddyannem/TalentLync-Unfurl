import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

export default function TalentNetwork3D() {
  const mountRef = useRef(null);
  const [activeHoverNode, setActiveHoverNode] = useState(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    // 1. Scene Setup
    const scene = new THREE.Scene();

    // 2. Camera Setup
    const camera = new THREE.PerspectiveCamera(55, width / height, 0.1, 1000);
    camera.position.z = 26;

    // 3. Renderer Setup
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // 4. Lighting System
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.4);
    scene.add(ambientLight);

    const mainLight = new THREE.DirectionalLight(0xffffff, 1.8);
    mainLight.position.set(10, 20, 15);
    scene.add(mainLight);

    const blueLight = new THREE.PointLight(0x368dff, 4, 80);
    blueLight.position.set(-15, 10, 15);
    scene.add(blueLight);

    const greenLight = new THREE.PointLight(0x00a962, 4, 80);
    greenLight.position.set(15, -10, 15);
    scene.add(greenLight);

    // 5. Central Hub Node (Glowing Core)
    const hubGeo = new THREE.IcosahedronGeometry(1.6, 2);
    const hubMat = new THREE.MeshPhongMaterial({
      color: 0x368dff,
      emissive: 0x368dff,
      emissiveIntensity: 0.6,
      shininess: 100,
      wireframe: false
    });
    const hubMesh = new THREE.Mesh(hubGeo, hubMat);
    scene.add(hubMesh);

    // Hub Outer Aura Ring
    const auraGeo = new THREE.RingGeometry(2.2, 2.5, 48);
    const auraMat = new THREE.MeshBasicMaterial({
      color: 0x00a962,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.7
    });
    const auraRing = new THREE.Mesh(auraGeo, auraMat);
    auraRing.rotation.x = Math.PI / 3;
    hubMesh.add(auraRing);

    // 6. Candidate Network Nodes
    const nodeCount = 36;
    const nodesGroup = new THREE.Group();
    const nodePositions = [];
    const nodeSpheres = [];

    const sphereGeo = new THREE.SphereGeometry(0.55, 24, 24);
    const colors = [0x368dff, 0x00a962, 0x8b5cf6, 0x0284c7, 0xf43f5e, 0xd97706];

    for (let i = 0; i < nodeCount; i++) {
      const radius = 7 + Math.random() * 7;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos((Math.random() * 2) - 1);

      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);

      const pos = new THREE.Vector3(x, y, z);
      nodePositions.push(pos);

      const color = colors[i % colors.length];
      const mat = new THREE.MeshPhongMaterial({
        color: color,
        emissive: color,
        emissiveIntensity: 0.4,
        shininess: 100,
      });

      const mesh = new THREE.Mesh(sphereGeo, mat);
      const scale = 0.6 + Math.random() * 0.7;
      mesh.scale.set(scale, scale, scale);
      mesh.position.set(x, y, z);
      mesh.userData = { id: i, color: color, originalScale: scale };

      // Orbiting Skill Satellite Ring
      if (i % 2 === 0) {
        const satRingGeo = new THREE.RingGeometry(0.8, 0.95, 32);
        const satRingMat = new THREE.MeshBasicMaterial({
          color: color,
          side: THREE.DoubleSide,
          transparent: true,
          opacity: 0.65
        });
        const ring = new THREE.Mesh(satRingGeo, satRingMat);
        ring.rotation.x = Math.PI / 2;
        mesh.add(ring);
      }

      nodesGroup.add(mesh);
      nodeSpheres.push(mesh);
    }
    scene.add(nodesGroup);

    // 7. Network Lines connecting nodes & hub
    const lineMat = new THREE.LineBasicMaterial({
      color: 0x368dff,
      transparent: true,
      opacity: 0.4
    });

    const linesGroup = new THREE.Group();

    // Connect nodes to central hub
    nodePositions.forEach((pos, idx) => {
      if (idx % 3 === 0) {
        const lineGeo = new THREE.BufferGeometry().setFromPoints([
          new THREE.Vector3(0, 0, 0),
          pos
        ]);
        const line = new THREE.Line(lineGeo, lineMat);
        linesGroup.add(line);
      }
    });

    // Connect nearby nodes together
    for (let i = 0; i < nodePositions.length; i++) {
      for (let j = i + 1; j < nodePositions.length; j++) {
        const dist = nodePositions[i].distanceTo(nodePositions[j]);
        if (dist < 7.5) {
          const lineGeo = new THREE.BufferGeometry().setFromPoints([
            nodePositions[i],
            nodePositions[j]
          ]);
          const line = new THREE.Line(lineGeo, lineMat);
          linesGroup.add(line);
        }
      }
    }
    scene.add(linesGroup);

    // 8. Outer Constellation Cloud
    const cloudCount = 220;
    const cloudGeo = new THREE.BufferGeometry();
    const cloudPositions = new Float32Array(cloudCount * 3);

    for (let i = 0; i < cloudCount * 3; i += 3) {
      cloudPositions[i] = (Math.random() - 0.5) * 55;
      cloudPositions[i + 1] = (Math.random() - 0.5) * 55;
      cloudPositions[i + 2] = (Math.random() - 0.5) * 55;
    }

    cloudGeo.setAttribute('position', new THREE.BufferAttribute(cloudPositions, 3));
    const cloudMat = new THREE.PointsMaterial({
      color: 0x64748b,
      size: 0.16,
      transparent: true,
      opacity: 0.5
    });
    const cloudParticles = new THREE.Points(cloudGeo, cloudMat);
    scene.add(cloudParticles);

    // 9. Interactive Raycasting & Mouse Parallax
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      mouseX = ((e.clientX - rect.left) / width - 0.5) * 2;
      mouseY = -((e.clientY - rect.top) / height - 0.5) * 2;

      mouse.x = mouseX;
      mouse.y = mouseY;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(nodeSpheres);

      if (intersects.length > 0) {
        const hovered = intersects[0].object;
        setActiveHoverNode(`Node #${hovered.userData.id + 1}`);
        hovered.scale.set(1.4, 1.4, 1.4);
      } else {
        setActiveHoverNode(null);
        nodeSpheres.forEach(n => {
          n.scale.set(n.userData.originalScale, n.userData.originalScale, n.userData.originalScale);
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    // 10. Resize Listener
    const handleResize = () => {
      if (!container) return;
      const newW = container.clientWidth;
      const newH = container.clientHeight;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    };

    window.addEventListener('resize', handleResize);

    // 11. Animation Loop
    let animationFrameId;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      // Rotate core hub & aura ring
      hubMesh.rotation.y += 0.006;
      hubMesh.rotation.x += 0.003;
      auraRing.rotation.z += 0.015;

      // Rotate node network
      nodesGroup.rotation.y += 0.0025;
      nodesGroup.rotation.x += 0.001;
      linesGroup.rotation.y += 0.0025;
      linesGroup.rotation.x += 0.001;
      cloudParticles.rotation.y -= 0.0006;

      // Smooth mouse parallax
      targetX += (mouseX * 0.4 - targetX) * 0.05;
      targetY += (mouseY * 0.4 - targetY) * 0.05;
      scene.rotation.y = targetX;
      scene.rotation.x = targetY;

      // Animate node satellite rings
      nodeSpheres.forEach((node) => {
        if (node.children[0]) {
          node.children[0].rotation.z += 0.025;
        }
      });

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div className="relative w-full h-full min-h-[440px] lg:min-h-[560px]">
      {/* Three.js Canvas */}
      <div ref={mountRef} className="absolute inset-0 cursor-grab active:cursor-grabbing" />

      {/* Floating 3D Candidate Cards Overlay */}
      <div className="absolute top-6 left-4 sm:left-6 p-3.5 bg-white/90 backdrop-blur-md border border-slate-200 rounded-2xl shadow-xl animate-bounce duration-[4000ms] pointer-events-none hidden sm:flex items-center space-x-3">
        <img
          src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
          alt="Candidate"
          className="w-10 h-10 rounded-full object-cover border-2 border-[#368dff]"
        />
        <div>
          <div className="flex items-center space-x-1.5">
            <span className="font-bold text-xs text-slate-900">Alex Chen</span>
            <span className="px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-700 text-[10px] font-extrabold">98 Match</span>
          </div>
          <p className="text-[11px] text-slate-500 font-medium">Principal AI Systems Engineer</p>
        </div>
      </div>

      <div className="absolute bottom-8 right-4 sm:right-6 p-3.5 bg-white/90 backdrop-blur-md border border-slate-200 rounded-2xl shadow-xl animate-pulse duration-[3000ms] pointer-events-none hidden sm:flex items-center space-x-3">
        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-purple-500 to-indigo-500 flex items-center justify-center text-white font-bold text-xs shadow-md">
          JS
        </div>
        <div>
          <div className="flex items-center space-x-1.5">
            <span className="font-bold text-xs text-slate-900">Sophia Martinez</span>
            <span className="px-1.5 py-0.5 rounded bg-blue-100 text-blue-700 text-[10px] font-extrabold">Top 1%</span>
          </div>
          <p className="text-[11px] text-slate-500 font-medium">Full Stack Architect (Rust / React)</p>
        </div>
      </div>

      {activeHoverNode && (
        <div className="absolute bottom-4 left-4 px-3 py-1.5 rounded-xl bg-slate-900 text-white text-[11px] font-bold shadow-lg pointer-events-none animate-in fade-in duration-200">
          ✨ {activeHoverNode} Selected
        </div>
      )}
    </div>
  );
}
