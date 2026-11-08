import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { BatteryPreset } from '../types/battery';

export const PRESETS: BatteryPreset[] = [
  {
    id: 'turbo-charge',
    name: '65W Fast Charge',
    description: 'PD 3.0 PPS handshake negotiated at 9.2V / 5.2A',
    percentage: 84,
    wattage: 47.8,
    voltageMv: 4280,
    currentMa: 5195,
    temperatureC: 33.2,
    healthPercent: 98.4,
    cycles: 138,
    protocol: 'USB-PD 3.0 PPS',
    state: 'charging',
    estimatedMinutes: 18,
  },
  {
    id: 'heavy-gaming',
    name: '3D Gaming Load',
    description: '120 FPS Ray-tracing workload discharging battery',
    percentage: 62,
    wattage: -14.2,
    voltageMv: 3840,
    currentMa: -3697,
    temperatureC: 41.5,
    healthPercent: 98.4,
    cycles: 138,
    protocol: 'Discharging (Anode Load)',
    state: 'discharging',
    estimatedMinutes: 134,
  },
  {
    id: 'idle-standby',
    name: 'Idle Deep Sleep',
    description: 'Sub-system power optimization with micro-amp drain',
    percentage: 91,
    wattage: -0.65,
    voltageMv: 4190,
    currentMa: -155,
    temperatureC: 26.8,
    healthPercent: 98.4,
    cycles: 138,
    protocol: 'Deep Sleep Mode',
    state: 'idle',
    estimatedMinutes: 2840,
  },
  {
    id: 'full-battery',
    name: 'Trickle Saturation',
    description: 'Constant Voltage (CV) saturation phase preserving cell health',
    percentage: 99,
    wattage: 3.2,
    voltageMv: 4345,
    currentMa: 736,
    temperatureC: 28.5,
    healthPercent: 98.4,
    cycles: 138,
    protocol: 'CV Trickle Phase',
    state: 'charging',
    estimatedMinutes: 8,
  },
];

interface Phone3DCanvasProps {
  activePresetId?: string;
  onPresetChange?: (preset: BatteryPreset) => void;
}

export const Phone3DCanvas: React.FC<Phone3DCanvasProps> = ({
  activePresetId = 'turbo-charge',
  onPresetChange,
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [selectedPreset, setSelectedPreset] = useState<BatteryPreset>(
    PRESETS.find((p) => p.id === activePresetId) || PRESETS[0]
  );
  const [viewAngle, setViewAngle] = useState<'hero' | 'front' | 'side'>('hero');
  const [isHovered, setIsHovered] = useState(false);

  // References for Three.js scene
  const phoneGroupRef = useRef<THREE.Group | null>(null);
  const screenCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const screenTextureRef = useRef<THREE.CanvasTexture | null>(null);
  const targetRotationRef = useRef({ x: 0.12, y: -0.42 });
  const currentRotationRef = useRef({ x: 0.12, y: -0.42 });
  const isDraggingRef = useRef(false);
  const pointerStartRef = useRef({ x: 0, y: 0 });
  const baseRotationRef = useRef({ x: 0.12, y: -0.42 });

  // Update preset when prop changes
  useEffect(() => {
    const found = PRESETS.find((p) => p.id === activePresetId);
    if (found) setSelectedPreset(found);
  }, [activePresetId]);

  // Function to draw procedural high-DPI Wattmeter screen
  const drawScreen = useCallback((preset: BatteryPreset) => {
    const canvas = screenCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const w = canvas.width;
    const h = canvas.height;

    // Background: Deep obsidian
    ctx.fillStyle = '#06070a';
    ctx.fillRect(0, 0, w, h);

    // Subtle technical grid
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
    ctx.lineWidth = 1;
    const step = 40;
    for (let x = 0; x < w; x += step) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, h);
      ctx.stroke();
    }
    for (let y = 0; y < h; y += step) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(w, y);
      ctx.stroke();
    }

    // Status Bar
    ctx.fillStyle = '#94a3b8';
    ctx.font = '600 24px "JetBrains Mono", monospace';
    ctx.textAlign = 'left';
    ctx.fillText('09:41', 50, 70);

    ctx.textAlign = 'right';
    ctx.fillText('5G  100%', w - 50, 70);

    // Front Camera Punch-hole cutout visual indicator on screen
    ctx.fillStyle = '#030406';
    ctx.beginPath();
    ctx.arc(w / 2, 60, 18, 0, Math.PI * 2);
    ctx.fill();

    // Wattmeter App Header — Strictly typography only (no logo)
    ctx.textAlign = 'center';
    ctx.fillStyle = '#ffffff';
    ctx.font = '700 34px "Space Grotesk", sans-serif';
    ctx.fillText('WATTMETER', w / 2, 160);

    ctx.fillStyle = '#00ff66';
    ctx.font = '600 16px "JetBrains Mono", monospace';
    ctx.fillText('DIAGNOSTICS & TELEMETRY v2.4.0', w / 2, 195);

    // Central Battery Ring Dial
    const cx = w / 2;
    const cy = 460;
    const radius = 170;

    // Background track ring
    ctx.strokeStyle = '#181c24';
    ctx.lineWidth = 20;
    ctx.beginPath();
    ctx.arc(cx, cy, radius, 0, Math.PI * 2);
    ctx.stroke();

    // Dotted precision ticks
    const tickCount = 48;
    for (let i = 0; i < tickCount; i++) {
      const angle = (i / tickCount) * Math.PI * 2;
      const x1 = cx + Math.cos(angle) * (radius - 28);
      const y1 = cy + Math.sin(angle) * (radius - 28);
      const x2 = cx + Math.cos(angle) * (radius - 20);
      const y2 = cy + Math.sin(angle) * (radius - 20);
      ctx.strokeStyle = i % 4 === 0 ? 'rgba(0, 255, 102, 0.4)' : 'rgba(255, 255, 255, 0.12)';
      ctx.lineWidth = i % 4 === 0 ? 3 : 1.5;
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();
    }

    // Active progress arc in electric lime green
    const startAngle = -Math.PI / 2;
    const progressAngle = startAngle + (preset.percentage / 100) * Math.PI * 2;
    const isHot = preset.temperatureC > 40;
    const arcColor = isHot ? '#f59e0b' : '#00ff66';

    ctx.strokeStyle = arcColor;
    ctx.lineWidth = 22;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.arc(cx, cy, radius, startAngle, progressAngle);
    ctx.stroke();

    // Inner Percentage readout
    ctx.textAlign = 'center';
    ctx.fillStyle = '#ffffff';
    ctx.font = '800 96px "Space Grotesk", sans-serif';
    ctx.fillText(`${preset.percentage}%`, cx, cy + 25);

    // Wattage Readout
    const wattPrefix = preset.wattage > 0 ? '+' : '';
    ctx.fillStyle = arcColor;
    ctx.font = '700 32px "JetBrains Mono", monospace';
    ctx.fillText(`${wattPrefix}${preset.wattage.toFixed(1)} W`, cx, cy + 85);

    // State Badge
    ctx.fillStyle = 'rgba(255, 255, 255, 0.06)';
    const badgeWidth = 320;
    const badgeHeight = 44;
    ctx.fillRect(cx - badgeWidth / 2, cy + 125, badgeWidth, badgeHeight);
    ctx.strokeStyle = isHot ? 'rgba(245, 158, 11, 0.4)' : 'rgba(0, 255, 102, 0.3)';
    ctx.lineWidth = 1;
    ctx.strokeRect(cx - badgeWidth / 2, cy + 125, badgeWidth, badgeHeight);

    ctx.fillStyle = '#ffffff';
    ctx.font = '600 15px "JetBrains Mono", monospace';
    const stateText = preset.state === 'charging' ? `⚡ ${preset.protocol}` : `🔋 ${preset.protocol}`;
    ctx.fillText(stateText.toUpperCase(), cx, cy + 152);

    // Live Technical Telemetry Panels
    const startY = 740;
    const panelW = (w - 120) / 2;
    const panelH = 130;

    const drawTelemetryBox = (
      x: number,
      y: number,
      label: string,
      val: string,
      sub: string,
      accent = false
    ) => {
      ctx.fillStyle = '#0f1218';
      ctx.fillRect(x, y, panelW, panelH);
      ctx.strokeStyle = accent ? 'rgba(0, 255, 102, 0.25)' : 'rgba(255, 255, 255, 0.08)';
      ctx.lineWidth = 1.5;
      ctx.strokeRect(x, y, panelW, panelH);

      ctx.textAlign = 'left';
      ctx.fillStyle = '#64748b';
      ctx.font = '600 14px "JetBrains Mono", monospace';
      ctx.fillText(label, x + 20, y + 34);

      ctx.fillStyle = accent ? '#00ff66' : '#ffffff';
      ctx.font = '700 28px "Space Grotesk", sans-serif';
      ctx.fillText(val, x + 20, y + 78);

      ctx.fillStyle = '#94a3b8';
      ctx.font = '500 14px "JetBrains Mono", monospace';
      ctx.fillText(sub, x + 20, y + 108);
    };

    // Row 1: Voltage & Current
    drawTelemetryBox(50, startY, 'CELL VOLTAGE', `${preset.voltageMv} mV`, 'ADC Resolution ±1mV');
    drawTelemetryBox(
      50 + panelW + 20,
      startY,
      'CURRENT FLOW',
      `${preset.currentMa > 0 ? '+' : ''}${preset.currentMa} mA`,
      preset.currentMa > 0 ? 'Charging Flow' : 'Discharge Drain',
      true
    );

    // Row 2: Temperature & Health
    drawTelemetryBox(
      50,
      startY + panelH + 16,
      'TEMPERATURE',
      `${preset.temperatureC.toFixed(1)} °C`,
      isHot ? 'High Load Alert' : 'Optimal Anode Range'
    );
    drawTelemetryBox(
      50 + panelW + 20,
      startY + panelH + 16,
      'BATTERY HEALTH',
      `${preset.healthPercent}%`,
      `${preset.cycles} Full Cycles`,
      true
    );

    // Waveform / Curve Graph at bottom
    const graphY = startY + (panelH + 16) * 2;
    const graphH = 170;
    ctx.fillStyle = '#0a0d13';
    ctx.fillRect(50, graphY, w - 100, graphH);
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
    ctx.strokeRect(50, graphY, w - 100, graphH);

    ctx.fillStyle = '#64748b';
    ctx.font = '600 13px "JetBrains Mono", monospace';
    ctx.textAlign = 'left';
    ctx.fillText('REAL-TIME CHARGING / LOAD PROFILE (mA)', 68, graphY + 30);

    // Draw procedural waveform line
    ctx.beginPath();
    ctx.strokeStyle = arcColor;
    ctx.lineWidth = 3;
    const pts = 32;
    const gw = w - 140;
    for (let i = 0; i < pts; i++) {
      const gx = 70 + (i / (pts - 1)) * gw;
      const noise = Math.sin(i * 0.6 + preset.percentage) * 14 + Math.cos(i * 1.2) * 8;
      const baseHeight = graphY + 110 - (Math.abs(preset.wattage) / 65) * 50;
      const gy = baseHeight + noise;
      if (i === 0) ctx.moveTo(gx, gy);
      else ctx.lineTo(gx, gy);
    }
    ctx.stroke();

    // Bottom Navigation Bar placeholder
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(w / 2 - 80, h - 30, 160, 5);

    if (screenTextureRef.current) {
      screenTextureRef.current.needsUpdate = true;
    }
  }, []);

  // Update screen canvas when preset changes
  useEffect(() => {
    drawScreen(selectedPreset);
  }, [selectedPreset, drawScreen]);

  // Main Three.js Scene Setup
  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Detect software WebGL
    const isSoftwareGl = (() => {
      try {
        const gl = document.createElement('canvas').getContext('webgl2');
        if (!gl) return true;
        const ext = gl.getExtension('WEBGL_debug_renderer_info');
        const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
        const gpu = String(gl.getParameter(param));
        gl.getExtension('WEBGL_lose_context')?.loseContext();
        return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
      } catch {
        return true;
      }
    })();

    const width = container.clientWidth;
    const height = container.clientHeight;

    // 1. Scene & Camera
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x08090d, 0.05);

    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
    camera.position.set(0, 0, 8.8);

    // 2. Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: !isSoftwareGl,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    renderer.shadowMap.enabled = !isSoftwareGl;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    container.appendChild(renderer.domElement);

    // 3. Environment Map (PMREMGenerator with RoomEnvironment)
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    scene.environment = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;
    pmremGenerator.dispose();

    // 4. Lighting Rig (3-point studio lighting)
    const keyLight = new THREE.DirectionalLight(0xffffff, 2.8);
    keyLight.position.set(4, 6, 5);
    keyLight.castShadow = !isSoftwareGl;
    if (keyLight.castShadow) {
      keyLight.shadow.mapSize.width = 1024;
      keyLight.shadow.mapSize.height = 1024;
      keyLight.shadow.bias = -0.0005;
      keyLight.shadow.normalBias = 0.02;
    }
    scene.add(keyLight);

    // Green rim light for brand electric accent
    const rimGreen = new THREE.DirectionalLight(0x00ff66, 3.2);
    rimGreen.position.set(-5, -2, -3);
    scene.add(rimGreen);

    // Fill light with cool ambient
    const hemiLight = new THREE.HemisphereLight(0x1e293b, 0x08090d, 1.2);
    scene.add(hemiLight);

    // 5. Procedural Smartphone Construction (Group of 7+ detailed parts)
    const phoneGroup = new THREE.Group();
    phoneGroupRef.current = phoneGroup;
    scene.add(phoneGroup);

    // Phone dimensions
    const phoneW = 3.2;
    const phoneH = 6.6;
    const phoneD = 0.32;
    const cornerR = 0.34;

    // A. Main Titanium/Obsidian Chassis Body
    // Create rounded rectangular shape
    const shape = new THREE.Shape();
    const x = -phoneW / 2;
    const y = -phoneH / 2;
    const w = phoneW;
    const h = phoneH;
    const r = cornerR;

    shape.moveTo(x + r, y);
    shape.lineTo(x + w - r, y);
    shape.quadraticCurveTo(x + w, y, x + w, y + r);
    shape.lineTo(x + w, y + h - r);
    shape.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    shape.lineTo(x + r, y + h);
    shape.quadraticCurveTo(x, y + h, x, y + h - r);
    shape.lineTo(x, y + r);
    shape.quadraticCurveTo(x, y, x + r, y);

    const extrudeSettings = {
      depth: phoneD,
      bevelEnabled: true,
      bevelSegments: 6,
      steps: 1,
      bevelSize: 0.05,
      bevelThickness: 0.05,
    };

    const chassisGeo = new THREE.ExtrudeGeometry(shape, extrudeSettings);
    chassisGeo.center();

    // Dark brushed matte titanium chassis material
    const chassisMat = new THREE.MeshPhysicalMaterial({
      color: 0x111317,
      metalness: 0.88,
      roughness: 0.28,
      clearcoat: 0.3,
      clearcoatRoughness: 0.15,
    });
    const chassisMesh = new THREE.Mesh(chassisGeo, chassisMat);
    chassisMesh.castShadow = !isSoftwareGl;
    phoneGroup.add(chassisMesh);

    // B. Polished Side Frame Bevel Accent (Perimeter Band)
    const bandGeo = new THREE.ExtrudeGeometry(shape, {
      depth: phoneD * 0.9,
      bevelEnabled: true,
      bevelSegments: 4,
      bevelSize: 0.03,
      bevelThickness: 0.03,
    });
    bandGeo.center();
    const bandMat = new THREE.MeshStandardMaterial({
      color: 0x1f242d,
      metalness: 0.95,
      roughness: 0.12,
    });
    const bandMesh = new THREE.Mesh(bandGeo, bandMat);
    bandMesh.position.z = 0.01;
    phoneGroup.add(bandMesh);

    // C. Screen Canvas & Texture
    const screenCanvas = document.createElement('canvas');
    screenCanvas.width = 1024;
    screenCanvas.height = 2048;
    screenCanvasRef.current = screenCanvas;

    const screenTexture = new THREE.CanvasTexture(screenCanvas);
    screenTexture.colorSpace = THREE.SRGBColorSpace;
    screenTexture.anisotropy = renderer.capabilities.getMaxAnisotropy();
    screenTextureRef.current = screenTexture;

    // Draw initial state
    drawScreen(selectedPreset);

    // Front Screen Glass Plane
    const screenGeo = new THREE.PlaneGeometry(phoneW - 0.18, phoneH - 0.22);
    const screenMat = new THREE.MeshPhysicalMaterial({
      map: screenTexture,
      roughness: 0.08,
      metalness: 0.1,
      clearcoat: 1.0,
      clearcoatRoughness: 0.05,
    });
    const screenMesh = new THREE.Mesh(screenGeo, screenMat);
    screenMesh.position.z = phoneD / 2 + 0.055;
    phoneGroup.add(screenMesh);

    // D. Camera Island on Back
    const camIslandShape = new THREE.Shape();
    const ciW = 1.1;
    const ciH = 2.0;
    const ciR = 0.25;
    const ciX = -ciW / 2;
    const ciY = -ciH / 2;

    camIslandShape.moveTo(ciX + ciR, ciY);
    camIslandShape.lineTo(ciX + ciW - ciR, ciY);
    camIslandShape.quadraticCurveTo(ciX + ciW, ciY, ciX + ciW, ciY + ciR);
    camIslandShape.lineTo(ciX + ciW, ciY + ciH - ciR);
    camIslandShape.quadraticCurveTo(ciX + ciW, ciY + ciH, ciX + ciW - ciR, ciY + ciH);
    camIslandShape.lineTo(ciX + ciR, ciY + ciH);
    camIslandShape.quadraticCurveTo(ciX, ciY + ciH, ciX, ciY + ciH - ciR);
    camIslandShape.lineTo(ciX, ciY + ciR);
    camIslandShape.quadraticCurveTo(ciX, ciY, ciX + ciR, ciY);

    const camIslandGeo = new THREE.ExtrudeGeometry(camIslandShape, {
      depth: 0.14,
      bevelEnabled: true,
      bevelSegments: 4,
      bevelSize: 0.04,
      bevelThickness: 0.04,
    });
    camIslandGeo.center();

    const camIslandMat = new THREE.MeshPhysicalMaterial({
      color: 0x0a0c10,
      metalness: 0.9,
      roughness: 0.2,
      clearcoat: 0.8,
    });
    const camIslandMesh = new THREE.Mesh(camIslandGeo, camIslandMat);
    camIslandMesh.position.set(-phoneW / 2 + 0.85, phoneH / 2 - 1.3, -phoneD / 2 - 0.1);
    phoneGroup.add(camIslandMesh);

    // Dual Camera Lenses
    for (let i = 0; i < 2; i++) {
      const lensGeo = new THREE.CylinderGeometry(0.3, 0.3, 0.08, 32);
      const lensMat = new THREE.MeshPhysicalMaterial({
        color: 0x050608,
        metalness: 0.95,
        roughness: 0.05,
        clearcoat: 1.0,
      });
      const lensMesh = new THREE.Mesh(lensGeo, lensMat);
      lensMesh.rotation.x = Math.PI / 2;
      lensMesh.position.set(
        -phoneW / 2 + 0.85,
        phoneH / 2 - 0.8 - i * 0.8,
        -phoneD / 2 - 0.2
      );
      phoneGroup.add(lensMesh);
    }

    // E. Buttons & Ports
    // Volume button
    const volButtonGeo = new THREE.BoxGeometry(0.04, 0.7, 0.08);
    const buttonMat = new THREE.MeshStandardMaterial({ color: 0x242a35, metalness: 0.9, roughness: 0.2 });
    const volBtn = new THREE.Mesh(volButtonGeo, buttonMat);
    volBtn.position.set(-phoneW / 2 - 0.04, 0.8, 0);
    phoneGroup.add(volBtn);

    // Power button
    const pwrButtonGeo = new THREE.BoxGeometry(0.04, 0.5, 0.08);
    const pwrBtn = new THREE.Mesh(pwrButtonGeo, buttonMat);
    pwrBtn.position.set(phoneW / 2 + 0.04, 0.9, 0);
    phoneGroup.add(pwrBtn);

    // F. Contact Shadow Grounding Plane directly below phone
    const shadowGeo = new THREE.PlaneGeometry(4.8, 4.8);
    // Procedural radial alpha canvas for smooth contact shadow
    const shadowCanvas = document.createElement('canvas');
    shadowCanvas.width = 256;
    shadowCanvas.height = 256;
    const sctx = shadowCanvas.getContext('2d');
    if (sctx) {
      const grad = sctx.createRadialGradient(128, 128, 10, 128, 128, 120);
      grad.addColorStop(0, 'rgba(0, 0, 0, 0.85)');
      grad.addColorStop(0.5, 'rgba(0, 255, 102, 0.12)'); // subtle green ambient reflection
      grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      sctx.fillStyle = grad;
      sctx.fillRect(0, 0, 256, 256);
    }
    const shadowTexture = new THREE.CanvasTexture(shadowCanvas);
    const shadowMat = new THREE.MeshBasicMaterial({
      map: shadowTexture,
      transparent: true,
      depthWrite: false,
      opacity: 0.7,
    });
    const shadowMesh = new THREE.Mesh(shadowGeo, shadowMat);
    shadowMesh.rotation.x = -Math.PI / 2;
    shadowMesh.position.y = -3.8;
    scene.add(shadowMesh);

    // Pre-warm renderer
    if (!isSoftwareGl) {
      renderer.compile(scene, camera);
    }

    // 6. Interactive Mouse & Touch Drag Handlers
    const handlePointerDown = (e: MouseEvent | TouchEvent) => {
      isDraggingRef.current = true;
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      pointerStartRef.current = { x: clientX, y: clientY };
      baseRotationRef.current = {
        x: targetRotationRef.current.x,
        y: targetRotationRef.current.y,
      };
    };

    const handlePointerMove = (e: MouseEvent | TouchEvent) => {
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

      if (isDraggingRef.current) {
        const dx = clientX - pointerStartRef.current.x;
        const dy = clientY - pointerStartRef.current.y;
        targetRotationRef.current = {
          x: baseRotationRef.current.x + dy * 0.006,
          y: baseRotationRef.current.y + dx * 0.006,
        };
      } else {
        // Subtle Parallax on Hover when not dragging
        const rect = container.getBoundingClientRect();
        const nx = ((clientX - rect.left) / rect.width) * 2 - 1;
        const ny = -(((clientY - rect.top) / rect.height) * 2 - 1);
        if (viewAngle === 'hero') {
          targetRotationRef.current = {
            x: 0.12 - ny * 0.18,
            y: -0.42 + nx * 0.35,
          };
        }
      }
    };

    const handlePointerUp = () => {
      isDraggingRef.current = false;
    };

    const domEl = renderer.domElement;
    domEl.addEventListener('mousedown', handlePointerDown);
    window.addEventListener('mousemove', handlePointerMove);
    window.addEventListener('mouseup', handlePointerUp);

    domEl.addEventListener('touchstart', handlePointerDown, { passive: true });
    window.addEventListener('touchmove', handlePointerMove, { passive: true });
    window.addEventListener('touchend', handlePointerUp);

    // 7. Animation Loop with Exponential Damping
    let frameId = 0;
    let clock = new THREE.Clock();

    const tick = () => {
      const delta = clock.getDelta();

      // Exponential damping towards target rotation
      currentRotationRef.current.x = THREE.MathUtils.damp(
        currentRotationRef.current.x,
        targetRotationRef.current.x,
        8,
        delta
      );
      currentRotationRef.current.y = THREE.MathUtils.damp(
        currentRotationRef.current.y,
        targetRotationRef.current.y,
        8,
        delta
      );

      if (phoneGroupRef.current) {
        phoneGroupRef.current.rotation.x = currentRotationRef.current.x;
        phoneGroupRef.current.rotation.y = currentRotationRef.current.y;

        // Subtle organic hovering float
        const time = clock.getElapsedTime();
        phoneGroupRef.current.position.y = Math.sin(time * 1.5) * 0.08;
      }

      renderer.render(scene, camera);
      frameId = requestAnimationFrame(tick);
    };

    frameId = requestAnimationFrame(tick);

    // 8. Responsive Resize Observer
    const handleResize = () => {
      if (!container) return;
      const newW = container.clientWidth;
      const newH = container.clientHeight;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    };
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('resize', handleResize);
      domEl.removeEventListener('mousedown', handlePointerDown);
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('mouseup', handlePointerUp);
      domEl.removeEventListener('touchstart', handlePointerDown);
      window.removeEventListener('touchmove', handlePointerMove);
      window.removeEventListener('touchend', handlePointerUp);

      chassisGeo.dispose();
      chassisMat.dispose();
      bandGeo.dispose();
      bandMat.dispose();
      screenGeo.dispose();
      screenMat.dispose();
      screenTexture.dispose();
      camIslandGeo.dispose();
      camIslandMat.dispose();
      shadowGeo.dispose();
      shadowMat.dispose();
      shadowTexture.dispose();
      renderer.dispose();

      if (container.contains(domEl)) {
        container.removeChild(domEl);
      }
    };
  }, []);

  // Preset switch handler
  const handleSelectPreset = (preset: BatteryPreset) => {
    setSelectedPreset(preset);
    if (onPresetChange) onPresetChange(preset);
  };

  // Camera angle switch handler
  const handleAngleSwitch = (angle: 'hero' | 'front' | 'side') => {
    setViewAngle(angle);
    if (angle === 'hero') {
      targetRotationRef.current = { x: 0.12, y: -0.42 };
    } else if (angle === 'front') {
      targetRotationRef.current = { x: 0, y: 0 };
    } else if (angle === 'side') {
      targetRotationRef.current = { x: 0.05, y: -Math.PI / 2 + 0.2 };
    }
  };

  return (
    <div
      className="relative w-full h-[540px] sm:h-[620px] lg:h-[700px] select-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* 3D WebGL Canvas Container */}
      <div
        ref={mountRef}
        className="w-full h-full cursor-grab active:cursor-grabbing"
        title="Click and drag to rotate phone in 3D space"
      />

      {/* Floating Drag Hint Pill */}
      <div className="absolute top-4 left-6 pointer-events-none">
        <span className="inline-flex items-center gap-2 px-3 py-1 bg-black/60 border border-white/10 rounded-full text-[11px] font-mono uppercase tracking-wider text-neutral-400 backdrop-blur-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-[#00ff66]" />
          Interactive 3D • Drag to inspect
        </span>
      </div>

      {/* Camera View Angle Buttons (Top Right) */}
      <div className="absolute top-4 right-6 flex items-center gap-1.5 bg-black/60 border border-white/10 p-1 rounded-sm backdrop-blur-sm">
        <button
          onClick={() => handleAngleSwitch('hero')}
          className={`px-2.5 py-1 text-[11px] font-mono uppercase tracking-wider rounded-sm transition-colors ${
            viewAngle === 'hero' ? 'bg-[#00ff66] text-black font-semibold' : 'text-neutral-400 hover:text-white'
          }`}
        >
          Perspective
        </button>
        <button
          onClick={() => handleAngleSwitch('front')}
          className={`px-2.5 py-1 text-[11px] font-mono uppercase tracking-wider rounded-sm transition-colors ${
            viewAngle === 'front' ? 'bg-[#00ff66] text-black font-semibold' : 'text-neutral-400 hover:text-white'
          }`}
        >
          Display
        </button>
        <button
          onClick={() => handleAngleSwitch('side')}
          className={`px-2.5 py-1 text-[11px] font-mono uppercase tracking-wider rounded-sm transition-colors ${
            viewAngle === 'side' ? 'bg-[#00ff66] text-black font-semibold' : 'text-neutral-400 hover:text-white'
          }`}
        >
          Profile
        </button>
      </div>

      {/* Consolidated Ergonomic Bottom Dock (Following Three.js skill layout rules) */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-full max-w-[94%] sm:max-w-[620px] z-10">
        <div className="bg-[#0b0d13]/95 border border-white/10 p-2.5 rounded-sm shadow-[0_12px_40px_rgba(0,0,0,0.8)] backdrop-blur-md">
          <div className="flex items-center justify-between mb-2 px-2">
            <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-400">
              Live Hardware Simulation Preset:
            </span>
            <span className="text-[11px] font-mono text-[#00ff66]">
              {selectedPreset.wattage > 0 ? `+${selectedPreset.wattage}W Charging` : `${selectedPreset.wattage}W Drain`}
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
            {PRESETS.map((p) => {
              const active = p.id === selectedPreset.id;
              return (
                <button
                  key={p.id}
                  onClick={() => handleSelectPreset(p)}
                  className={`text-left px-3 py-2 rounded-sm border transition-all text-xs ${
                    active
                      ? 'bg-[#00ff66]/10 border-[#00ff66] text-white'
                      : 'bg-white/[0.02] border-white/5 text-neutral-400 hover:text-white hover:border-white/20'
                  }`}
                >
                  <div className="font-semibold tracking-tight truncate">{p.name}</div>
                  <div className="font-mono text-[10px] text-neutral-400 truncate mt-0.5">
                    {p.percentage}% • {p.wattage > 0 ? `+${p.wattage}W` : `${p.wattage}W`}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
