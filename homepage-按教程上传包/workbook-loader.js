/* 分支发布模式：直接读取 Excel，无需构建服务。 */
window.SITE_DATA_READY = (async () => {
  if (location.protocol === 'file:') return;
  const get = async (path, binary = false) => {
    const response = await fetch(path, {cache: 'no-store'});
    if (!response.ok) throw new Error(`${path}: HTTP ${response.status}`);
    return binary ? response.arrayBuffer() : response.json();
  };
  try {
    const config = await get('site.config.json');
    const data = {languages: {}, names: {}};
    await Promise.all(['zh', 'en'].map(async lang => {
      const book = XLSX.read(await get(config.workbooks[lang], true), {type: 'array'});
      data.languages[lang] = book.SheetNames.map(title => {
        const sheet = book.Sheets[title];
        const columns = new Map();
        Object.keys(sheet).filter(key => /^[A-Z]+\d+$/.test(key)).forEach(key => {
          const cell = sheet[key];
          const value = String(XLSX.utils.format_cell(cell) || '').trim();
          if (!value) return;
          if (cell.f) throw new Error(`${title}!${key}: 请使用文本，勿使用公式`);
          const {r, c} = XLSX.utils.decode_cell(key);
          if (!columns.has(c)) columns.set(c, []);
          columns.get(c).push({r, value});
        });
        const modules = [...columns].sort((a,b) => a[0]-b[0]).map(([c, cells]) => {
          cells.sort((a,b) => a.r-b.r);
          if (cells[0].r !== 0) throw new Error(`${title}: 第 ${c+1} 列缺少模块名称`);
          return {title: cells[0].value, items: cells.slice(1).map(({value}) => {
            if (/\.(?:jpe?g|png|gif|webp|svg|avif)$/i.test(value)) {
              const path = value.replace(/\\/g, '/');
              if (/^(?:\/|[a-z]+:)/i.test(path) || path.split('/').includes('..')) throw new Error('图片请使用 assets 文件夹内的文件名');
              const src = path.includes('/') ? path : `assets/${path}`;
              return {type:'image', name:value, src:src.split('/').map(encodeURIComponent).join('/')};
            }
            return {type:'text', text:value.replace(/\\n/g, '\n')};
          })};
        });
        return {title, modules};
      });
      if (!data.languages[lang].length) throw new Error('Excel 中没有工作表');
      const first = data.languages[lang][0].modules.flatMap(module => module.items).find(item => item.type === 'text');
      data.names[lang] = first ? first.text.split(/[（(\n]/)[0].trim() : (lang === 'zh' ? '个人主页' : 'Personal website');
    }));
    window.SITE_DATA = data;
    document.documentElement.dataset.contentSource = 'excel';
  } catch (error) {
    console.error('Excel loading failed:', error);
    window.SITE_DATA_ERROR = error.message;
  }
})();
