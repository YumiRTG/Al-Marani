const svg = (content: string) => `data:image/svg+xml;utf8,${encodeURIComponent(content)}`;

const palette = ['#0d9488', '#0284c7', '#7c3aed', '#d97706', '#16a34a', '#dc2626'];
const light = ['#ccfbf1', '#e0f2fe', '#ede9fe', '#fef3c7', '#dcfce7', '#fee2e2'];

function esc(value: string) {
  return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

export function heroVisual(number: number, title: string, subtitle: string) {
  return svg(`<svg xmlns="http://www.w3.org/2000/svg" width="1400" height="800" viewBox="0 0 1400 800">
    <defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#0f766e"/><stop offset=".52" stop-color="#0284c7"/><stop offset="1" stop-color="#7c3aed"/></linearGradient></defs>
    <rect width="1400" height="800" rx="48" fill="url(#g)"/>
    <circle cx="1180" cy="120" r="250" fill="#fff" opacity=".09"/><circle cx="155" cy="715" r="300" fill="#fff" opacity=".07"/>
    <rect x="100" y="105" width="210" height="76" rx="30" fill="#fff" opacity=".18"/><text x="205" y="155" text-anchor="middle" font-family="Arial" font-size="30" font-weight="700" fill="white">Lernfeld ${number}</text>
    <text x="100" y="315" font-family="Arial" font-size="64" font-weight="700" fill="white">${esc(title)}</text>
    <text x="100" y="385" font-family="Arial" font-size="30" fill="#e0f2fe">${esc(subtitle)}</text>
    <g transform="translate(930 350)"><circle cx="145" cy="145" r="135" fill="#fff" opacity=".16"/><path d="M75 145H215M145 75V215" stroke="white" stroke-width="30" stroke-linecap="round"/><circle cx="145" cy="145" r="58" fill="none" stroke="#ccfbf1" stroke-width="12"/></g>
    <text x="100" y="690" font-family="Arial" font-size="25" fill="#dbeafe">MFA Lerncampus · Wissen verstehen · anwenden · überprüfen</text>
  </svg>`);
}

export function processVisual(title: string, steps: Array<{ title: string; text: string }>, footer = '') {
  const w = 1200;
  const n = Math.max(1, steps.length);
  const gap = 24;
  const margin = 54;
  const boxW = (w - margin * 2 - gap * (n - 1)) / n;
  const boxes = steps.map((step, i) => {
    const x = margin + i * (boxW + gap);
    const c = palette[i % palette.length];
    const bg = light[i % light.length];
    const arrow = i < n - 1 ? `<path d="M${x + boxW + 4} 300H${x + boxW + gap - 6}" stroke="#64748b" stroke-width="5"/><polygon points="${x + boxW + gap - 6},300 ${x + boxW + gap - 22},291 ${x + boxW + gap - 22},309" fill="#64748b"/>` : '';
    return `<rect x="${x}" y="155" width="${boxW}" height="290" rx="26" fill="${bg}" stroke="${c}" stroke-width="4"/><circle cx="${x + boxW / 2}" cy="220" r="34" fill="${c}"/><text x="${x + boxW / 2}" y="231" text-anchor="middle" font-family="Arial" font-size="25" font-weight="700" fill="white">${i + 1}</text><text x="${x + boxW / 2}" y="292" text-anchor="middle" font-family="Arial" font-size="22" font-weight="700" fill="#0f172a">${esc(step.title)}</text><foreignObject x="${x + 18}" y="325" width="${boxW - 36}" height="100"><div xmlns="http://www.w3.org/1999/xhtml" style="font-family:Arial;font-size:18px;line-height:1.45;color:#475569;text-align:center">${esc(step.text)}</div></foreignObject>${arrow}`;
  }).join('');
  return svg(`<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="620" viewBox="0 0 1200 620"><rect width="1200" height="620" rx="36" fill="#f8fafc"/><text x="600" y="65" text-anchor="middle" font-family="Arial" font-size="34" font-weight="700" fill="#0f172a">${esc(title)}</text>${boxes}${footer ? `<rect x="150" y="500" width="900" height="72" rx="20" fill="#0f172a"/><text x="600" y="545" text-anchor="middle" font-family="Arial" font-size="22" font-weight="700" fill="white">${esc(footer)}</text>` : ''}</svg>`);
}

export function compareVisual(title: string, columns: Array<{ title: string; lines: string[] }>) {
  const w = 1200;
  const n = columns.length;
  const gap = 28;
  const margin = 60;
  const boxW = (w - margin * 2 - gap * (n - 1)) / n;
  const boxes = columns.map((col, i) => {
    const x = margin + i * (boxW + gap);
    const c = palette[i % palette.length];
    const bg = light[i % light.length];
    const lines = col.lines.map((line, j) => `<text x="${x + 28}" y="${270 + j * 48}" font-family="Arial" font-size="19" fill="#334155">• ${esc(line)}</text>`).join('');
    return `<rect x="${x}" y="135" width="${boxW}" height="395" rx="28" fill="white" stroke="${c}" stroke-width="4"/><rect x="${x}" y="135" width="${boxW}" height="92" rx="28" fill="${bg}"/><rect x="${x}" y="199" width="${boxW}" height="28" fill="${bg}"/><text x="${x + boxW / 2}" y="190" text-anchor="middle" font-family="Arial" font-size="25" font-weight="700" fill="${c}">${esc(col.title)}</text>${lines}`;
  }).join('');
  return svg(`<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="600" viewBox="0 0 1200 600"><rect width="1200" height="600" rx="36" fill="#f8fafc"/><text x="600" y="65" text-anchor="middle" font-family="Arial" font-size="34" font-weight="700" fill="#0f172a">${esc(title)}</text>${boxes}</svg>`);
}

export function cycleVisual(title: string, items: Array<{ title: string; text: string }>) {
  const centerX = 600, centerY = 350, radius = 220;
  const nodes = items.map((item, i) => {
    const angle = -Math.PI / 2 + i * (2 * Math.PI / items.length);
    const x = centerX + Math.cos(angle) * radius;
    const y = centerY + Math.sin(angle) * radius;
    const c = palette[i % palette.length];
    const bg = light[i % light.length];
    return `<circle cx="${x}" cy="${y}" r="92" fill="${bg}" stroke="${c}" stroke-width="4"/><text x="${x}" y="${y - 10}" text-anchor="middle" font-family="Arial" font-size="22" font-weight="700" fill="${c}">${esc(item.title)}</text><foreignObject x="${x - 72}" y="${y + 12}" width="144" height="55"><div xmlns="http://www.w3.org/1999/xhtml" style="font-family:Arial;font-size:15px;line-height:1.3;color:#475569;text-align:center">${esc(item.text)}</div></foreignObject>`;
  }).join('');
  return svg(`<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="720" viewBox="0 0 1200 720"><rect width="1200" height="720" rx="36" fill="#f8fafc"/><text x="600" y="60" text-anchor="middle" font-family="Arial" font-size="34" font-weight="700" fill="#0f172a">${esc(title)}</text><circle cx="600" cy="350" r="135" fill="#0f172a"/><text x="600" y="342" text-anchor="middle" font-family="Arial" font-size="27" font-weight="700" fill="white">Zusammenhang</text><text x="600" y="382" text-anchor="middle" font-family="Arial" font-size="19" fill="#cbd5e1">alles greift ineinander</text>${nodes}</svg>`);
}
