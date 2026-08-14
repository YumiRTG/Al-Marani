const svg = (content: string) => `data:image/svg+xml;utf8,${encodeURIComponent(content)}`;

const palette = ['#0d9488', '#0284c7', '#7c3aed', '#d97706', '#16a34a', '#dc2626'];
const light = ['#ccfbf1', '#e0f2fe', '#ede9fe', '#fef3c7', '#dcfce7', '#fee2e2'];

function esc(value: string) {
  return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

export function heroVisual(number: number, title: string, subtitle: string) {
  const accent = palette[(number - 1) % palette.length];
  const accent2 = palette[(number + 1) % palette.length];
  return svg(`<svg xmlns="http://www.w3.org/2000/svg" width="1400" height="800" viewBox="0 0 1400 800">
    <title>Lernfeld ${number}: ${esc(title)} – ${esc(subtitle)}</title>
    <defs>
      <linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#0f172a"/><stop offset=".48" stop-color="${accent}"/><stop offset="1" stop-color="${accent2}"/></linearGradient>
      <linearGradient id="card" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#ffffff" stop-opacity=".94"/><stop offset="1" stop-color="#e2e8f0" stop-opacity=".78"/></linearGradient>
      <filter id="shadow"><feDropShadow dx="0" dy="18" stdDeviation="24" flood-color="#0f172a" flood-opacity=".24"/></filter>
    </defs>
    <rect width="1400" height="800" rx="48" fill="url(#g)"/>
    <circle cx="1190" cy="105" r="260" fill="#fff" opacity=".08"/>
    <circle cx="155" cy="720" r="320" fill="#fff" opacity=".06"/>
    <circle cx="745" cy="390" r="320" fill="#fff" opacity=".035"/>

    <g filter="url(#shadow)" transform="translate(145 150)">
      <rect x="0" y="0" width="470" height="500" rx="42" fill="url(#card)"/>
      <rect x="70" y="62" width="330" height="54" rx="20" fill="#cbd5e1" opacity=".75"/>
      <rect x="70" y="152" width="225" height="32" rx="14" fill="#94a3b8" opacity=".55"/>
      <rect x="70" y="212" width="320" height="32" rx="14" fill="#94a3b8" opacity=".45"/>
      <rect x="70" y="272" width="275" height="32" rx="14" fill="#94a3b8" opacity=".42"/>
      <rect x="70" y="348" width="145" height="82" rx="25" fill="${accent}" opacity=".9"/>
      <rect x="242" y="348" width="145" height="82" rx="25" fill="${accent2}" opacity=".82"/>
      <path d="M112 388h60M142 358v60" stroke="white" stroke-width="16" stroke-linecap="round"/>
      <path d="M270 392h28l16-30 23 56 18-31h28" stroke="white" stroke-width="10" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
    </g>

    <g transform="translate(735 135)">
      <circle cx="265" cy="265" r="225" fill="#fff" opacity=".13"/>
      <circle cx="265" cy="265" r="165" fill="#fff" opacity=".13"/>
      <path d="M265 125c-77 0-140 62-140 140s63 140 140 140 140-62 140-140-63-140-140-140Z" fill="#ffffff" opacity=".9"/>
      <path d="M265 170v190M170 265h190" stroke="${accent}" stroke-width="48" stroke-linecap="round"/>
      <circle cx="265" cy="265" r="62" fill="none" stroke="${accent2}" stroke-width="15" opacity=".9"/>
      <path d="M72 505c95-75 182-70 248-10 72 66 150 55 230-33" stroke="#fff" stroke-width="18" fill="none" stroke-linecap="round" opacity=".72"/>
      <circle cx="70" cy="505" r="17" fill="#fff"/><circle cx="550" cy="462" r="17" fill="#fff"/>
    </g>
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
