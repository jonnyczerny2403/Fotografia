// Túnel 3D de fotografias: o scroll leva a câmera por um corredor de fotos.
import * as THREE from 'https://cdnjs.cloudflare.com/ajax/libs/three.js/0.160.0/three.module.min.js';

const hero = document.querySelector('.hero');
const canvas = document.querySelector('.hero__gl');
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

function webglOk() {
  try { const c = document.createElement('canvas'); return !!(c.getContext('webgl2') || c.getContext('webgl')); } catch { return false; }
}

if (hero && canvas && webglOk()) start();

function start() {
  const PHOTOS = ['p65','p129','p158','p231','p249','p292','p64','p43','p179','p325','p195','p110'];
  const SPACING = 7;
  const isPhone = innerWidth < 640;

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false, powerPreference: 'high-performance' });
  renderer.setPixelRatio(Math.min(devicePixelRatio, 1.75));
  renderer.setClearColor(0x0f0e0c, 1);
  renderer.outputColorSpace = THREE.SRGBColorSpace;

  const scene = new THREE.Scene();
  scene.fog = new THREE.Fog(0x0f0e0c, 6, 30);
  const camera = new THREE.PerspectiveCamera(isPhone ? 70 : 55, 1, 0.1, 100);
  camera.position.set(0, 0, 6);

  const loader = new THREE.TextureLoader();
  const uniformsShared = { uTime: { value: 0 }, uVel: { value: 0 } };

  const vert = `
    uniform float uVel; uniform float uTime;
    varying vec2 vUv; varying float vDepth;
    void main(){
      vUv = uv;
      vec3 p = position;
      // dobra a foto conforme a velocidade do scroll
      p.z += sin(uv.x * 3.14159) * uVel * 0.2;
      
      vec4 mv = modelViewMatrix * vec4(p, 1.0);
      vDepth = -mv.z;
      gl_Position = projectionMatrix * mv;
    }`;
  const frag = `
    uniform sampler2D uTex; uniform float uVel; uniform float uAspect; uniform float uImgAspect; uniform float uHover;
    varying vec2 vUv; varying float vDepth;
    vec2 cover(vec2 uv){
      vec2 s = vec2(1.0);
      if (uAspect > uImgAspect) s.y = uImgAspect / uAspect; else s.x = uAspect / uImgAspect;
      return (uv - 0.5) * s + 0.5;
    }
    void main(){
      vec2 uv = cover(vUv);
      float shift = uVel * 0.002;
      vec3 c;
      c.r = texture2D(uTex, uv + vec2(shift, 0.0)).r;
      c.g = texture2D(uTex, uv).g;
      c.b = texture2D(uTex, uv - vec2(shift, 0.0)).b;
      // longe: preto e branco; perto: cor
      float near = smoothstep(18.0, 5.0, vDepth);
      float g = dot(c, vec3(0.299, 0.587, 0.114));
      c = mix(vec3(g) * vec3(1.02, 0.98, 0.92), c, near);
      float fog = smoothstep(26.0, 8.0, vDepth);
      c = mix(vec3(0.059, 0.055, 0.047), c, fog);
      // cantos arredondados
      vec2 d = abs(vUv - 0.5) * 2.0;
      float r = 0.04;
      vec2 q = max(d - (1.0 - r), 0.0);
      float a = 1.0 - smoothstep(r - 0.01, r, length(q));
      gl_FragColor = vec4(c, a);
    }`;

  const meshes = [];
  const geo = new THREE.PlaneGeometry(1, 1, 24, 1);
  const spread = isPhone ? 1.1 : 3.1;
  PHOTOS.forEach((id, i) => {
    const k = isPhone ? 0.9 : 1.3; const w = (i % 3 === 1 ? 2.2 : 3.2) * k, h = (i % 3 === 1 ? 2.9 : 2.1) * k;
    const mat = new THREE.ShaderMaterial({
      uniforms: {
        uTex: { value: null }, uAspect: { value: w / h }, uImgAspect: { value: 1.5 }, uHover: { value: 0 },
        uVel: uniformsShared.uVel, uTime: uniformsShared.uTime,
      },
      vertexShader: vert, fragmentShader: frag, transparent: true,
    });
    loader.load(`assets/img/${id}-sm.webp`, (t) => {
      t.colorSpace = THREE.SRGBColorSpace;
      t.minFilter = THREE.LinearFilter;
      mat.uniforms.uTex.value = t;
      mat.uniforms.uImgAspect.value = t.image.width / t.image.height;
      loaded++;
      if (loaded === PHOTOS.length) hero.classList.add('gl-on');
    });
    const m = new THREE.Mesh(geo, mat);
    m.scale.set(w, h, 1);
    const ang = i * 2.399; // ângulo de ouro: espiral
    const side = [[1, .15], [-.05, -1.05], [.5, .9], [-.9, .6], [1, -.6], [-.35, -.95]][i % 6];
    m.position.set(side[0] * spread, side[1] * (isPhone ? 1.6 : 1.4) + (isPhone ? 2.1 : 0.5), -i * SPACING - 2);
    m.rotation.y = -side[0] * 0.28;
    m.rotation.z = Math.sin(ang) * 0.06;
    m.userData = { baseX: m.position.x, baseY: m.position.y, phase: Math.random() * 6.28 };
    scene.add(m);
    meshes.push(m);
  });
  let loaded = 0;

  // poeira de luz no túnel
  const dustGeo = new THREE.BufferGeometry();
  const N = 700, pos = new Float32Array(N * 3);
  for (let i = 0; i < N; i++) {
    pos[i * 3] = (Math.random() - .5) * 14;
    pos[i * 3 + 1] = (Math.random() - .5) * 9;
    pos[i * 3 + 2] = -Math.random() * PHOTOS.length * SPACING;
  }
  dustGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  const dust = new THREE.Points(dustGeo, new THREE.PointsMaterial({ color: 0xf0c07e, size: 0.035, transparent: true, opacity: .4, depthWrite: false }));
  scene.add(dust);

  const counter = document.querySelector('.hero__num');
  const content = document.querySelector('.hero__content');
  const mouse = { x: 0, y: 0, tx: 0, ty: 0 };
  addEventListener('pointermove', (e) => { mouse.tx = (e.clientX / innerWidth - .5); mouse.ty = (e.clientY / innerHeight - .5); }, { passive: true });

  function resize() {
    const w = canvas.clientWidth, h = canvas.clientHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / h; camera.updateProjectionMatrix();
  }
  addEventListener('resize', resize); resize();

  let visible = true;
  new IntersectionObserver(([e]) => { visible = e.isIntersecting; }).observe(hero);

  const endZ = -(PHOTOS.length - 1) * SPACING - 2 + 4.5;
  let camZ = 6, lastP = 0, vel = 0, t0 = performance.now();

  function progress() {
    const r = hero.getBoundingClientRect();
    const total = r.height - innerHeight;
    return Math.min(1, Math.max(0, -r.top / total));
  }

  function tick(now) {
    requestAnimationFrame(tick);
    if (!visible) return;
    const t = (now - t0) / 1000;
    const p = reduce ? 0 : progress();
    // um leve avanço automático no início para o túnel nunca parecer parado
    const targetZ = 6 + (endZ - 6) * p ;
    const prev = camZ;
    camZ += (targetZ - camZ) * 0.08;
    vel += ((prev - camZ) * 2.2 - vel) * 0.12;
    uniformsShared.uVel.value = Math.max(-1.2, Math.min(1.2, vel));
    uniformsShared.uTime.value = t;

    mouse.x += (mouse.tx - mouse.x) * .05; mouse.y += (mouse.ty - mouse.y) * .05;
    camera.position.set(mouse.x * .3, -mouse.y * .2, camZ);
    camera.rotation.set(0, 0, 0);

    meshes.forEach((m, i) => {
      const u = m.userData;
      m.position.x = u.baseX + Math.sin(t * .3 + u.phase) * .02;
      m.position.y = u.baseY + Math.cos(t * .25 + u.phase) * .02;
    });
    

    const idx = Math.min(PHOTOS.length, Math.max(1, Math.round((6 - camZ + 2) / SPACING)));
    if (counter) counter.textContent = String(idx).padStart(2, '0');
    if (content) {
      const f = Math.max(0, 1 - p * 5);
      content.style.opacity = f;
      content.style.transform = `translateY(${(1 - f) * -60}px)`;
      content.style.pointerEvents = f < .2 ? 'none' : '';
    }
    lastP = p;
    renderer.render(scene, camera);
  }
  requestAnimationFrame(tick);
  window.__tunnel = { meshes: meshes.length };
}
