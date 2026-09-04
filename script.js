const STORAGE_KEY = 'jiaAokunHomepageData';
const DEFAULTS = {
  name: '贾奥坤',
  headline: '环境工程硕士研究生 · 共价有机多孔材料与环境治理',
  summary: '聚焦共价有机框架（COFs）及功能聚合物的设计合成、污染物吸附与作用机理研究，具备材料制备、结构表征、性能评价和数据分析的完整科研训练。',
  aboutText: '华北电力大学（211）环境工程专业硕士研究生，本科毕业于河南财政金融学院环境科学专业。研究围绕多孔有机材料在污染控制、绿色化学品制备和战略资源回收领域的应用展开，注重实验规范、数据可靠性与机理分析。',
  contactHeading: '期待在技术岗位上创造长期价值',
  email: '15515105034@163.com',
  phone: '155 1510 5034',
  qq: '2598044648',
  wechat: 'k2598044648',
  jobDirection: '央国企技术岗',
  politicalStatus: '中共党员',
  workLocation: '北京',
  languageLevel: 'CET-6',
  wechatPosts: '800+',
  wechatFollowers: '9500+',
  wechatViews: '43w+'
};

function getContent() {
  try { return { ...DEFAULTS, ...JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}') }; }
  catch { return DEFAULTS; }
}

function applyContent() {
  const content = getContent();
  document.querySelectorAll('[data-field]').forEach((element) => {
    const value = content[element.dataset.field];
    if (value) element.textContent = value;
  });
  document.querySelectorAll('[data-copy-field]').forEach((element) => {
    element.dataset.copy = content[element.dataset.copyField] || '';
  });
}

applyContent();

const header = document.querySelector('.site-header');
const menuButton = document.querySelector('.menu-button');
const nav = document.querySelector('.main-nav');
window.addEventListener('scroll', () => header.classList.toggle('scrolled', window.scrollY > 16), { passive: true });
menuButton.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(isOpen));
});
nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
  nav.classList.remove('open'); menuButton.setAttribute('aria-expanded', 'false');
}));

const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
  if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); }
}), { threshold: 0.08 });
document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));

let activeModal = null;
let previousFocus = null;
function openModal(modal) {
  if (!modal) return;
  previousFocus = document.activeElement;
  activeModal = modal;
  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.classList.add('modal-open');
  modal.querySelector('.modal-close')?.focus();
}
function closeModal() {
  if (!activeModal) return;
  activeModal.classList.remove('open');
  activeModal.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('modal-open');
  previousFocus?.focus();
  activeModal = null;
}
document.querySelectorAll('[data-modal-target]').forEach((trigger) => {
  const launch = () => openModal(document.getElementById(trigger.dataset.modalTarget));
  trigger.addEventListener('click', launch);
  trigger.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); launch(); }
  });
});
document.querySelectorAll('[data-modal-close]').forEach((button) => button.addEventListener('click', closeModal));
document.addEventListener('keydown', (event) => { if (event.key === 'Escape') closeModal(); });

const toast = document.querySelector('.toast');
let toastTimer;
function showToast(message) {
  toast.textContent = message; toast.classList.add('show'); clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2200);
}
document.querySelectorAll('[data-copy]').forEach((button) => button.addEventListener('click', async () => {
  const label = button.dataset.copyLabel || '信息';
  try { await navigator.clipboard.writeText(button.dataset.copy); showToast(`${label}已复制`); }
  catch { showToast(`${label}：${button.dataset.copy}`); }
}));

document.querySelector('#year').textContent = new Date().getFullYear();
