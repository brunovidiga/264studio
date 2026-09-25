import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function HeroSection() {
  const canvasRef = useRef(null);
  
  useEffect(() => {
    if (!canvasRef.current || typeof window === 'undefined') return;
    
    const canvas = canvasRef.current;
    
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x050507, 0.015);

    const camera = new THREE.PerspectiveCamera(60, window.innerWidth/window.innerHeight, 0.1, 1000);
    camera.position.set(0, 8, 20);

    const isMobile = window.innerWidth < 768;
    const smokeCount = isMobile ? 12 : 40;
    const particleCount = isMobile ? 200 : 600;

    const renderer = new THREE.WebGLRenderer({ 
      canvas, 
      antialias: !isMobile,
      alpha: true, 
      powerPreference: "high-performance" 
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(isMobile ? Math.min(window.devicePixelRatio, 1.5) : Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);

    /* ==========================================
       IMPROVED CINEMATIC BLACK HOLE
       ========================================== */
    const bhUniforms = {
      uTime: { value: 0 },
      uScroll: { value: 0 }
    };

    const bhMaterial = new THREE.ShaderMaterial({
      uniforms: bhUniforms,
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float uTime;
        uniform float uScroll;
        varying vec2 vUv;

        float hash(vec2 p) { return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453); }
        float noise(vec2 p) {
          vec2 i = floor(p);
          vec2 f = fract(p);
          vec2 u = f*f*(3.0-2.0*f);
          return mix(mix(hash(i + vec2(0.0,0.0)), hash(i + vec2(1.0,0.0)), u.x),
                     mix(hash(i + vec2(0.0,1.0)), hash(i + vec2(1.0,1.0)), u.x), u.y);
        }
        
        float fbm(vec2 p) {
          float v = 0.0;
          float a = 0.5;
          mat2 rot = mat2(cos(0.5), sin(0.5), -sin(0.5), cos(0.5));
          for (int i = 0; i < 6; i++) {
            v += a * noise(p);
            p = rot * p * 2.0;
            a *= 0.5;
          }
          return v;
        }

        void main() {
          vec2 uv = vUv * 2.0 - 1.0;
          float r = length(uv);

          // Absolute Event Horizon
          float coreRadius = 0.18;
          float core = smoothstep(coreRadius + 0.02, coreRadius, r);

          // Extreme Gravitational Lensing
          float warpFactor = 0.12 / (r + 0.01);
          vec2 warpedUv = uv + normalize(uv) * warpFactor;
          float warpedR = length(warpedUv);
          float warpedAngle = atan(warpedUv.y, warpedUv.x);

          float swirlSpeed = uTime * 0.08;
          float swirl = warpedAngle - warpedR * 2.5 + swirlSpeed;

          // High-Definition Accretion Disk
          vec2 noiseCoords = vec2(cos(swirl), sin(swirl)) * 1.8 - vec2(uTime * 0.02);
          float n1 = fbm(noiseCoords * 2.5);
          float n2 = fbm(noiseCoords * 5.0 + uTime * 0.04);

          float diskMask = smoothstep(0.9, coreRadius, r);
          float innerGlowMask = smoothstep(coreRadius + 0.3, coreRadius, r);

          float intensity = (n1 * 0.5 + 0.5) * diskMask;
          float highlight = (n2 * 0.5 + 0.5) * innerGlowMask * 2.0;

          // Cinematic Deep Indigo & Violet Palette
          vec3 deepSpace = vec3(0.01, 0.01, 0.02);
          vec3 darkViolet = vec3(0.52, 0.20, 0.15);
          vec3 plasmaBlue = vec3(0.98, 0.41, 0.32);
          vec3 coreWhite = vec3(0.9, 0.95, 1.0);

          vec3 color = mix(deepSpace, darkViolet, intensity * 1.5);
          color = mix(color, plasmaBlue, highlight * 0.9);
          color += coreWhite * pow(innerGlowMask, 4.0) * (0.3 + 0.7 * sin(swirlSpeed * 3.0 + warpedR * 15.0));

          // Pitch black core override
          color = mix(color, vec3(0.0), core);

          float alpha = (intensity + highlight) * diskMask;
          alpha = max(alpha, core);
          alpha *= smoothstep(1.0, 0.5, r);

          float scrollGlow = 1.0 + uScroll * 0.4;
          float pulse = 0.95 + 0.05 * sin(uTime * 0.5);

          gl_FragColor = vec4(color * scrollGlow * pulse, alpha);
        }
      `,
      transparent: true,
      depthWrite: false,
      blending: THREE.NormalBlending,
      fog: false
    });

    const bhGeo = new THREE.PlaneGeometry(180, 180);
    const bhMesh = new THREE.Mesh(bhGeo, bhMaterial);
    bhMesh.position.set(0, 12, -45); 
    bhMesh.renderOrder = -2;
    scene.add(bhMesh);

    /* ==========================================
       VOLUMETRIC FOG (Planes)
       ========================================== */
    const smokeCanvas = document.createElement('canvas');
    smokeCanvas.width = 512;
    smokeCanvas.height = 512;
    const ctx = smokeCanvas.getContext('2d');
    const grad = ctx.createRadialGradient(256, 256, 0, 256, 256, 256);
    grad.addColorStop(0, 'rgba(255, 255, 255, 0.2)');
    grad.addColorStop(0.5, 'rgba(128, 128, 128, 0.05)');
    grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 512, 512);
    const smokeTex = new THREE.CanvasTexture(smokeCanvas);

    const smokePlanes = [];
    const smokeGeo = new THREE.PlaneGeometry(100, 100);

    for (let i = 0; i < smokeCount; i++) {
      let color = new THREE.Color();
      let rand = Math.random();
      if(rand < 0.4) color.setHex(0x1a153a);      // violet plasma
      else if(rand < 0.7) color.setHex(0x0f2040); // deep ocean blue
      else color.setHex(0x050508);                // pitch shadow

      const smokeMat = new THREE.MeshBasicMaterial({
          map: smokeTex,
          color: color,
          transparent: true,
          opacity: Math.random() * 0.4 + 0.1,
          depthWrite: false,
          blending: THREE.NormalBlending
      });

      const plane = new THREE.Mesh(smokeGeo, smokeMat);
      plane.position.set(
          (Math.random() - 0.5) * 140,
          (Math.random() - 0.5) * 80 + 5,
          -10 - Math.random() * 30
      );
      plane.rotation.z = Math.random() * Math.PI * 2;
      plane.userData = {
          rotSpeed: (Math.random() - 0.5) * 0.001,
          driftX: (Math.random() - 0.5) * 0.01,
          driftY: (Math.random() - 0.5) * 0.005,
          baseOpacity: smokeMat.opacity,
          phaseOffset: Math.random() * Math.PI * 2,
          baseX: plane.position.x,
          baseY: plane.position.y
      };
      plane.renderOrder = -1;
      scene.add(plane);
      smokePlanes.push(plane);
    }

    /* ==========================================
       HORIZON GRID (Disabled on mobile)
       ========================================== */
    let gridPlane = null; 
    let gridMaterial = null;
    
    if (!isMobile) {
      const gridUniforms = {
        uColor: { value: new THREE.Color(0xffffff) },
        uOpacity: { value: 0.0 }
      };

      gridMaterial = new THREE.ShaderMaterial({
        uniforms: gridUniforms,
        vertexShader: `
          varying vec3 vWorldPosition;
          void main() {
            vec4 worldPosition = modelMatrix * vec4(position, 1.0);
            vWorldPosition = worldPosition.xyz;
            gl_Position = projectionMatrix * viewMatrix * worldPosition;
          }
        `,
        fragmentShader: `
          uniform vec3 uColor;
          uniform float uOpacity;
          varying vec3 vWorldPosition;

          void main() {
            vec2 coord = vWorldPosition.xz * 0.55;
            vec2 grid = abs(fract(coord - 0.5) - 0.5) / (fwidth(coord) * 1.6);
            float line = min(grid.x, grid.y);
            float alpha = max(0.0, 1.0 - line);

            float dist = length(vWorldPosition.xyz - cameraPosition);
            float fade = 1.0 - smoothstep(12.0, 70.0, dist);

            gl_FragColor = vec4(uColor, alpha * fade * uOpacity);
          }
        `,
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });

      const planeGeo = new THREE.PlaneGeometry(240, 240);
      planeGeo.rotateX(-Math.PI / 2);
      gridPlane = new THREE.Mesh(planeGeo, gridMaterial);
      gridPlane.position.y = -4;
      scene.add(gridPlane);
    }

    /* ==========================================
       PARTICLE FIELD
       ========================================== */
    const pGeo = new THREE.BufferGeometry();
    const pts = [];
    const vels =[];
    for(let i=0; i<particleCount; i++) {
      pts.push((Math.random()-.5)*150, (Math.random()-.5)*80 + 5, (Math.random()-.5)*100 - 15);
      vels.push(Math.random() * 0.01 + 0.005);
    }
    pGeo.setAttribute("position", new THREE.Float32BufferAttribute(pts, 3));
    pGeo.setAttribute("aSpeed", new THREE.Float32BufferAttribute(vels, 1));

    const pMat = new THREE.PointsMaterial({
      color: 0xc7d2fe, // brighter violet-white
      size: isMobile ? 0.04 : 0.02,
      transparent: true,
      opacity: 0.25,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });
    const glow = new THREE.Points(pGeo, pMat);
    scene.add(glow);

    /* ==========================================
       INTERACTION & PARALLAX
       ========================================== */
    let mouseX = 0, mouseY = 0;
    let targetX = 0, targetY = 0;

    const onMouseMove = (e) => {
      targetX = (e.clientX / window.innerWidth - 0.5);
      targetY = (e.clientY / window.innerHeight - 0.5);
    };
    window.addEventListener("mousemove", onMouseMove);

    let scrollP = 0, targetScrollP = 0;
    
    const onScroll = () => {
      const heroTrack = document.getElementById("hero-track");
      if (heroTrack) {
        const rect = heroTrack.getBoundingClientRect();
        // Calculate progress through the sticky track
        const maxScroll = rect.height - window.innerHeight;
        let progress = -rect.top / Math.max(1, maxScroll);
        targetScrollP = Math.min(1, Math.max(0, progress));
      } else {
        targetScrollP = Math.min(1, Math.max(0, window.scrollY / window.innerHeight));
      }
    };
    window.addEventListener("scroll", onScroll);

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", onResize);

    const clock = new THREE.Clock();
    let animationFrameId;

    function animate() {
      animationFrameId = requestAnimationFrame(animate);

      const elapsed = clock.getElapsedTime();
      bhUniforms.uTime.value = elapsed;
      
      mouseX += (targetX - mouseX) * 0.05;
      mouseY += (targetY - mouseY) * 0.05;

      if (!isMobile && gridMaterial) {
        const targetGridOpacity = 0.06 * (1.0 - scrollP);
        gridMaterial.uniforms.uOpacity.value += (targetGridOpacity - gridMaterial.uniforms.uOpacity.value) * 0.05;
      }

      scrollP += (targetScrollP - scrollP) * 0.04;
      bhUniforms.uScroll.value = scrollP;

      const baseZ = 20 - scrollP * 65; 
      const baseY = 8 - scrollP * 6;
      const baseX = scrollP * 2;

      camera.position.z += (baseZ - camera.position.z) * 0.06;
      camera.position.y += ((baseY - mouseY * 2.0) - camera.position.y) * 0.06;
      camera.position.x += ((baseX + mouseX * 3.0) - camera.position.x) * 0.06;

      const targetFov = 60 + scrollP * 45; 
      camera.fov += (targetFov - camera.fov) * 0.06;
      camera.updateProjectionMatrix();

      camera.lookAt(
        mouseX * 4.0, 
        bhMesh.position.y - 4 + scrollP * 12, 
        -20 - scrollP * 30
      );

      if (gridPlane) {
        gridPlane.position.x = camera.position.x;
        gridPlane.position.z = camera.position.z;
      }
      
      bhMesh.lookAt(camera.position);

      const heroContents = document.querySelectorAll('.hero-content');
      heroContents.forEach(el => {
        const scale = 1 + scrollP * 1.5;
        const opacity = 1 - scrollP * 2.5;
        el.style.transform = `scale(${scale}) translateY(${scrollP * -80}px)`;
        el.style.opacity = Math.max(0, opacity);
        el.style.pointerEvents = opacity <= 0 ? 'none' : 'auto';
      });

      let sceneMouseX = mouseX * 80;
      let sceneMouseY = -mouseY * 50 + 10;

      smokePlanes.forEach((plane) => {
        plane.userData.baseX += plane.userData.driftX;
        plane.userData.baseY += plane.userData.driftY;

        let dx = plane.position.x - sceneMouseX;
        let dy = plane.position.y - sceneMouseY;
        let dist = Math.sqrt(dx*dx + dy*dy);
        
        let repelX = 0, repelY = 0;
        if(dist < 30) {
          let force = (30 - dist) / 30;
          repelX = (dx/dist) * force * 5;
          repelY = (dy/dist) * force * 5;
          plane.rotation.z += force * 0.01;
        }

        plane.position.x += ((plane.userData.baseX + repelX) - plane.position.x) * 0.05;
        plane.position.y += ((plane.userData.baseY + repelY) - plane.position.y) * 0.05;
        plane.rotation.z += plane.userData.rotSpeed;

        const wave = Math.sin(plane.position.x * 0.02 + elapsed * 0.3 + plane.userData.phaseOffset);
        plane.material.opacity = plane.userData.baseOpacity + (wave * 0.1);

        if(plane.userData.baseX > 70) plane.userData.baseX = -70;
        if(plane.userData.baseX < -70) plane.userData.baseX = 70;
        if(plane.userData.baseY > 50) plane.userData.baseY = -10;
        if(plane.userData.baseY < -10) plane.userData.baseY = 50;
      });

      const positions = glow.geometry.attributes.position.array;
      const speeds = glow.geometry.attributes.aSpeed.array;
      
      for(let i=0; i<positions.length; i+=3) {
        let px = positions[i];
        let py = positions[i+1];
        let pz = positions[i+2];

        let dx = bhMesh.position.x - px;
        let dy = bhMesh.position.y - py;
        let dz = bhMesh.position.z - pz;
        let dist = Math.sqrt(dx*dx + dy*dy + dz*dz);

        let speed = speeds[i/3] * (1.0 + scrollP * 4.0); 

        positions[i] += (dx/dist) * speed;
        positions[i+1] += (dy/dist) * speed;
        positions[i+2] += (dz/dist) * speed;

        positions[i] -= (dz/dist) * speed * 2.0;
        positions[i+2] += (dx/dist) * speed * 2.0;

        if(dist < 5.0 || dist > 180.0) {
          let angle = Math.random() * Math.PI * 2;
          let r = 90 + Math.random() * 60;
          positions[i] = Math.cos(angle) * r;
          positions[i+1] = bhMesh.position.y + (Math.random() - 0.5) * 60;
          positions[i+2] = bhMesh.position.z + Math.sin(angle) * r;
        }
      }
      glow.geometry.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
    }

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
    };
  }, []);

  return (
    <>
      <style>{`
        @keyframes bgPan {
          0% { background-position: 0 0; }
          100% { background-position: 40px 40px; }
        }

        @keyframes blinkNode {
          0%, 100% { background: #27272a; }
          50% { background: #10b981; box-shadow: 0 0 10px #10b981; }
        }

        @keyframes nodeFloat1 {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }

        @keyframes nodeFloat2 {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
        }

        @keyframes dataFlow {
          0% { left: -10%; opacity: 0; }
          20%, 80% { opacity: 1; }
          100% { left: 110%; opacity: 0; }
        }

        .hero-webgl-threejs {
          position: absolute;
          inset: 0;
          z-index: 0;
          background: #050507;
        }

        .hero-webgl-threejs canvas {
          width: 100%;
          height: 100%;
          display: block;
        }

        .hero-fog {
          position: absolute;
          inset: 0;
          z-index: 1;
          background: radial-gradient(circle at 50% 50%, transparent 0%, rgba(5, 5, 7, 0.05) 40%, rgba(5, 5, 7, 0.95) 100%),
                      linear-gradient(to bottom, transparent 0%, rgba(5, 5, 7, 0.2) 60%, rgba(5, 5, 7, 1) 100%);
          pointer-events: none;
        }

        .hero-content {
          position: relative;
          z-index: 10;
          width: 100%;
          transition: transform 0.1s ease-out, opacity 0.1s ease-out;
        }

        .tactile-base {
          background: linear-gradient(180deg, #18181b 0%, #09090b 100%);
          box-shadow: inset 0 1px 1px 0 rgba(255, 255, 255, 0.1), inset 0 0 0 1px rgba(255, 255, 255, 0.03), 0 20px 40px -10px rgba(0, 0, 0, 0.8), 0 0 0 1px rgba(0, 0, 0, 1);
        }

        .tactile-glass {
          background: linear-gradient(135deg, rgba(39, 39, 42, 0.4) 0%, rgba(24, 24, 27, 0.6) 100%);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          box-shadow: inset 0 1px 1px rgba(255, 255, 255, 0.15), inset 0 0 0 1px rgba(255, 255, 255, 0.05), 0 10px 30px -5px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(0, 0, 0, 0.8);
        }

        .tactile-inset {
          background: #09090b;
          box-shadow: inset 0 2px 10px rgba(0, 0, 0, 0.8), inset 0 0 0 1px rgba(0, 0, 0, 1), 0 1px 1px rgba(255, 255, 255, 0.05);
        }
      `}</style>
      
      <div id="hero-track" className="relative w-full" style={{ height: '180vh' }}>
        <section id="hero" className="sticky top-0 h-screen w-full overflow-hidden flex flex-col relative items-center justify-center pt-24 pb-12">
          
          <div className="hero-webgl-threejs">
            <canvas ref={canvasRef} id="hero3D"></canvas>
          </div>
          <div className="hero-fog"></div>

          {/* HERO TEXT */}
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 hero-content text-center relative z-20 pt-36 sm:pt-40 md:pt-28" style={{ pointerEvents: 'auto' }}>
            <div className="inline-flex items-center gap-3 rounded-full px-4 py-2 text-xs text-[#b7ab98] mb-8 shadow-2xl tactile-glass border border-white/5">
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#cf6701] shadow-[0_0_8px_rgba(207,103,1,1)]"></span>
              O Futuro da Comunicação & Marketing
            </div>
          
            <h1 className="mx-auto max-w-5xl text-5xl sm:text-6xl lg:text-7xl tracking-tight text-[#b7ab98] leading-[1.1] drop-shadow-[0_10px_40px_rgba(0,0,0,0.7)] uppercase" style={{ fontFamily: "'Anton', sans-serif" }}>
              <span className="block font-normal">Um Studio Criativo</span>
              <span className="block mt-2 font-normal pb-2">que gera resultados</span>
            </h1>
          
            <p className="mx-auto mt-8 text-base sm:text-lg text-[#b7ab98]/80 max-w-2xl uppercase tracking-widest font-medium">
              Design e Tecnologia para transformar MARCAS
            </p>
          </div>

          {/* DASHBOARD */}
          <div className="sm:px-6 lg:px-8 w-full max-w-5xl mt-20 mx-auto hero-content relative" style={{ pointerEvents: 'auto' }}>
            <div className="relative w-full aspect-[16/9] md:aspect-[21/9] tactile-base rounded-3xl p-3 md:p-6 flex flex-col shadow-[0_40px_100px_-20px_rgba(0,0,0,1)]">
              <div className="flex-1 tactile-inset rounded-2xl p-1 relative overflow-hidden flex flex-col border border-zinc-800/50">
                {/* TOP BAR */}
                <div className="h-12 border-b border-zinc-900 bg-zinc-950/80 flex items-center justify-between px-4 backdrop-blur-md">
                  <div className="flex gap-2 items-center">
                    <div className="flex gap-1.5 mr-4">
                      <div className="w-3 h-3 rounded-full bg-zinc-800" style={{ animation: 'blinkNode 2s infinite' }}></div>
                      <div className="w-3 h-3 rounded-full bg-zinc-800" style={{ animation: 'blinkNode 2s infinite .4s' }}></div>
                      <div className="w-3 h-3 rounded-full bg-zinc-800" style={{ animation: 'blinkNode 2s infinite .8s' }}></div>
                    </div>
                    <div className="h-6 px-3 rounded-md tactile-inset flex items-center text-xs text-zinc-500 font-mono tracking-widest border border-zinc-900">
                      264.studio_engine
                    </div>
                  </div>
                </div>

                {/* UI CONTENT */}
                <div className="flex-1 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTAgNDBoNDBWMIgweiIgZmlsbD0ibm9uZSIvPjxwYXRoIGQ9Ik0wIDQwaDQwVjBIMHoiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAyKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9zdmc+')] relative flex items-center justify-center p-8 gap-8 overflow-hidden" style={{ animation: 'bgPan 15s linear infinite' }}>
                  <div style={{ animation: 'nodeFloat1 4s ease-in-out infinite' }}>
                    <div className="w-32 h-32 rounded-2xl tactile-base border-t border-zinc-700/50 flex items-center justify-center flex-col gap-2 shadow-2xl">
                      <div className="text-xs font-mono text-zinc-500 uppercase">Design System</div>
                    </div>
                  </div>

                  <div className="h-2 w-32 tactile-inset rounded-full relative overflow-hidden flex items-center px-1">
                    <div className="h-0.5 w-full bg-zinc-800 rounded-full"></div>
                    <div className="absolute left-0 h-0.5 w-1/3 bg-[#cf6701] rounded-full shadow-[0_0_10px_#cf6701]"></div>
                    <div className="absolute top-1/2 -translate-y-1/2 h-1 w-3 bg-white rounded-full shadow-[0_0_8px_#fff]" style={{ animation: 'dataFlow 1.5s linear infinite' }}></div>
                  </div>

                  <div style={{ animation: 'nodeFloat2 3.5s ease-in-out infinite .5s' }}>
                    <div className="w-24 h-24 rounded-2xl tactile-base border-t border-zinc-700/50 flex items-center justify-center flex-col gap-2 shadow-2xl">
                      <div className="text-xs font-mono text-zinc-500 uppercase">Brand XP</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </section>
      </div>
    </>
  );
}
