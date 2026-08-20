import { useEffect, useRef } from 'react';
import { SkeletonPageV3 } from './SkeletonPageV3';

interface Props { onBack: () => void; }
type Crop = [number, number, number, number];
type Point = [number, number];
interface Fix {
  crop: Crop;
  sourceW: number;
  sourceH: number;
  points: Point[];
  image?: string;
  hide?: number[];
  hideLegend?: number[];
  badges?: string[];
  note?: string;
}

const CARPAL = 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/Carpal_bones.svg/960px-Carpal_bones.svg.png';
const FOOT = 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/202110_Dorsal_view_of_bones_of_right_foot.svg/960px-202110_Dorsal_view_of_bones_of_right_foot.svg.png';

const fixes: Record<string, Fix> = {
  'Hirnschädel – Vorderseite': { crop:[430,35,300,325], sourceW:1280, sourceH:2599, points:[[560,120],[505,95],[470,205],[500,205],[560,205]] },
  'Hirnschädel – Rückseite': { crop:[320,20,320,260], sourceW:960, sourceH:2256, points:[[520,105],[480,165],[555,195]] },
  'Gesichtsschädel': { crop:[455,155,235,205], sourceW:1280, sourceH:2599, points:[[560,220],[535,280],[560,335],[645,250],[535,215],[560,248],[560,265]] },
  'Halswirbelsäule': { crop:[465,345,190,190], sourceW:1280, sourceH:2599, points:[[560,370],[560,400],[560,455]] },
  'Brustkorb': { crop:[330,490,540,430], sourceW:1280, sourceH:2599, points:[[560,665],[430,690],[560,850]], hide:[2], hideLegend:[2], note:'Brustbein und Rippen sind hier direkt markiert. Die Brustwirbel lernst du in der Rückansicht darunter, weil sie dort eindeutig sichtbar sind.' },
  'Wirbelsäule von hinten': { crop:[380,250,200,850], sourceW:960, sourceH:2256, points:[[480,320],[480,580],[480,830],[480,1000],[480,1060]] },
  'Schultergürtel': { crop:[260,475,640,190], sourceW:1280, sourceH:2599, points:[[430,505],[800,560]] },
  'Oberarm': { crop:[190,555,150,410], sourceW:1280, sourceH:2599, points:[[285,760]] },
  'Unterarm': { crop:[165,930,145,350], sourceW:1280, sourceH:2599, points:[[190,1100],[250,1100]], note:'Radius liegt auf der Daumenseite, Ulna auf der Kleinfingerseite. Beide Marker sitzen jetzt direkt auf dem jeweiligen Knochenschaft.' },
  'Handwurzel': { crop:[0,0,960,814], sourceW:960, sourceH:814, points:[], image:CARPAL, hide:[0,1,2,3,4,5,6,7], badges:['A','B','C','D','E','F','G','H'], note:'Für die Handwurzel verwenden wir eine eigene anatomische Detailgrafik. Die Buchstaben A–H stehen direkt im Bild und gehören in derselben Reihenfolge zur Legende.' },
  'Mittelhand und Finger': { crop:[165,1350,130,215], sourceW:1280, sourceH:2599, points:[[235,1405],[235,1465],[235,1505],[235,1540]] },
  'Becken': { crop:[400,1030,360,300], sourceW:1280, sourceH:2599, points:[[465,1110],[470,1290],[555,1270],[560,1180]] },
  'Oberschenkel': { crop:[400,1280,140,500], sourceW:1280, sourceH:2599, points:[[465,1530]] },
  'Knie': { crop:[430,1740,150,255], sourceW:1280, sourceH:2599, points:[[500,1785],[500,1850],[500,1940]] },
  'Unterschenkel': { crop:[395,1880,155,520], sourceW:1280, sourceH:2599, points:[[500,2140],[425,2140]], note:'Nur ein Unterschenkel ist vergrößert. Die 1 sitzt auf der Tibia, die 2 auf der deutlich schlankeren Fibula.' },
  'Fußwurzel – rechter Fuß': { crop:[300,470,380,430], sourceW:960, sourceH:960, image:FOOT, points:[[460,720],[510,835],[430,600],[555,610],[385,535],[455,520],[505,540]], note:'Hier wird eine eigene dorsale Ansicht des rechten Fußes verwendet. Dadurch lassen sich die sieben Fußwurzelknochen deutlich sauberer voneinander unterscheiden.' },
  'Mittelfuß – rechter Fuß': { crop:[300,240,400,400], sourceW:960, sourceH:960, image:FOOT, points:[[365,410],[440,410],[500,420],[555,440],[610,470]] },
  'Zehen – rechter Fuß': { crop:[300,20,400,330], sourceW:960, sourceH:960, image:FOOT, points:[[500,300],[535,195],[545,95]], note:'Die drei Marker zeigen beispielhaft die Lage von Grund-, Mittel- und Endphalangen. Der große Zeh besitzt keine Mittelphalanx.' },
  'Ferse und hinterer Fuß': { crop:[340,620,330,330], sourceW:960, sourceH:960, image:FOOT, points:[[460,720],[510,835]] },
};

const backPoints: Point[] = [[480,165],[480,320],[340,500],[340,620],[480,600],[480,830],[480,1000],[480,1060],[755,620],[760,950],[820,950],[810,1120],[585,1380],[540,1810],[620,1810],[520,2170]];

function directChildren(el: Element, tag: string) {
  return Array.from(el.children).filter((x) => x.tagName.toLowerCase() === tag);
}

function applyRegion(article: HTMLElement, fix: Fix) {
  const svg = article.querySelector('svg[viewBox="0 0 820 680"]') as SVGSVGElement | null;
  if (!svg) return;
  const image = svg.querySelector('image') as SVGImageElement | null;
  if (!image) return;
  const [cropX,cropY,cropW,cropH] = fix.crop;
  const viewW=820, viewH=680, pad=24;
  const scale=Math.min((viewW-pad*2)/cropW,(viewH-pad*2)/cropH);
  const drawW=cropW*scale, drawH=cropH*scale;
  const cropLeft=(viewW-drawW)/2, cropTop=(viewH-drawH)/2;
  image.setAttribute('x', String(cropLeft-cropX*scale));
  image.setAttribute('y', String(cropTop-cropY*scale));
  image.setAttribute('width', String(fix.sourceW*scale));
  image.setAttribute('height', String(fix.sourceH*scale));
  if (fix.image) image.setAttribute('href', fix.image);

  const groups=directChildren(svg,'g') as SVGGElement[];
  groups.forEach((g,i)=>{
    if (fix.hide?.includes(i) || !fix.points[i]) { g.style.display='none'; return; }
    g.style.display='';
    const [sx,sy]=fix.points[i];
    const px=cropLeft+(sx-cropX)*scale, py=cropTop+(sy-cropY)*scale;
    const c=g.querySelector('circle'); const t=g.querySelector('text');
    c?.setAttribute('cx',String(px)); c?.setAttribute('cy',String(py));
    t?.setAttribute('x',String(px)); t?.setAttribute('y',String(py+6));
  });

  const layout=svg.parentElement;
  const legend=layout?.children[1] as HTMLElement | undefined;
  if (legend) Array.from(legend.children).forEach((card,i)=>{
    (card as HTMLElement).style.display=fix.hideLegend?.includes(i)?'none':'';
    const badge=card.querySelector('span');
    if (badge && fix.badges?.[i]) badge.textContent=fix.badges[i];
  });

  const h3=article.querySelector('h3');
  const p=h3?.nextElementSibling as HTMLElement | null;
  if (fix.note && p?.tagName.toLowerCase()==='p') p.textContent=fix.note;
}

function applyBack(root: HTMLElement) {
  const svg=Array.from(root.querySelectorAll('svg')).find((x)=>x.getAttribute('viewBox')==='0 0 720 920') as SVGSVGElement | undefined;
  if (!svg) return;
  const scale=Math.min(720/960,920/2256), x=(720-960*scale)/2, y=(920-2256*scale)/2;
  const groups=directChildren(svg,'g') as SVGGElement[];
  groups.forEach((g,i)=>{
    const p=backPoints[i]; if(!p) return;
    const px=x+p[0]*scale, py=y+p[1]*scale;
    const c=g.querySelector('circle'); const t=g.querySelector('text');
    c?.setAttribute('cx',String(px)); c?.setAttribute('cy',String(py));
    t?.setAttribute('x',String(px)); t?.setAttribute('y',String(py+5));
  });
}

function applyAll(root: HTMLElement) {
  for (const article of Array.from(root.querySelectorAll('article')) as HTMLElement[]) {
    const title=article.querySelector('h3')?.textContent?.trim();
    if (title && fixes[title]) applyRegion(article,fixes[title]);
  }
  applyBack(root);
}

export function SkeletonPageV4({ onBack }: Props) {
  const ref=useRef<HTMLDivElement>(null);
  useEffect(()=>{
    const root=ref.current; if(!root) return;
    const run=()=>requestAnimationFrame(()=>applyAll(root));
    run();
    const observer=new MutationObserver(run);
    observer.observe(root,{childList:true,subtree:true});
    window.addEventListener('resize',run);
    return ()=>{observer.disconnect();window.removeEventListener('resize',run);};
  },[]);
  return <div ref={ref}><SkeletonPageV3 onBack={onBack}/></div>;
}
