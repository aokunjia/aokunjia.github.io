const STORAGE_KEY = 'jiaAokunHomepageData';
const DEFAULTS = {
  name: '贾奥坤', headline: '环境工程硕士研究生 · 共价有机多孔材料与环境治理',
  summary: '聚焦共价有机框架（COFs）及功能聚合物的设计合成、污染物吸附与作用机理研究，具备材料制备、结构表征、性能评价和数据分析的完整科研训练。',
  email: '15515105034@163.com', phone: '155 1510 5034', qq: '2598044648', wechat: 'k2598044648',
  jobDirection: '央国企技术岗', workLocation: '北京',
  wechatPosts: '800+', wechatFollowers: '9500+', wechatViews: '43w+'
};
const form = document.querySelector('#content-form');
const toast = document.querySelector('.toast');
let content;
try { content = { ...DEFAULTS, ...JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}') }; } catch { content = DEFAULTS; }
Object.entries(content).forEach(([key, value]) => { if (form.elements[key]) form.elements[key].value = value; });

function formData() { return Object.fromEntries(new FormData(form).entries()); }
function showToast(message) { toast.textContent = message; toast.classList.add('show'); setTimeout(() => toast.classList.remove('show'), 2200); }
form.addEventListener('submit', (event) => {
  event.preventDefault(); localStorage.setItem(STORAGE_KEY, JSON.stringify(formData()));
  window.location.href = 'index.html';
});
document.querySelector('#download-data').addEventListener('click', () => {
  const data = JSON.stringify(formData(), null, 2);
  const link = document.createElement('a');
  link.href = URL.createObjectURL(new Blob([data], { type: 'application/json' }));
  link.download = '主页更新内容.json'; link.click(); URL.revokeObjectURL(link.href);
  showToast('更新文件已下载');
});
document.querySelector('#reset-data').addEventListener('click', () => {
  if (!confirm('确定恢复为网站默认内容吗？')) return;
  localStorage.removeItem(STORAGE_KEY);
  Object.entries(DEFAULTS).forEach(([key, value]) => { if (form.elements[key]) form.elements[key].value = value; });
  showToast('已恢复默认内容');
});
