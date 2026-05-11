/**
 * =================================================================
 * EDT AIO 导航 - 适用于 Cloudflare Pages 的最终 Worker 代码
 * =================================================================
 */

// --- 1. 主页的静态数据 (已为你完整填充) ---
const mainNavData = [
  { "category": "快捷入口", "id": "quick-start", "items": [ { "name": "Cloudflare 管理面板", "desc": "Workers/Pages, 域名托管, R2存储, 安全防护等", "url": "https://dash.cloudflare.com/" }, { "name": "一键部署 EDT", "desc": "6秒全自动搭建魔法，支持多脚本/多账号", "url": "https://autocf.pages.dev/" } ] },
  { "category": "EDT 混淆脚本", "id": "scripts", "items": [ { "name": "CMLiu 2.1 (已混淆)", "desc": "autocf-workers.pages.dev/workers/cm/2.1/_worker.js", "url": "https://autocf-workers.pages.dev/workers/cm/2.1/_worker.js" }, { "name": "Joey 2.9.6 (已混淆)", "desc": "autocf-workers.pages.dev/workers/bj/2.9.6/_worker.js", "url": "https://autocf-workers.pages.dev/workers/bj/2.9.6/_worker.js" }, { "name": "BPB 4.1.3 (已混淆)", "desc": "autocf-workers.pages.dev/workers/bpb/4.1.3/_worker.js", "url": "https://autocf-workers.pages.dev/workers/bpb/4.1.3/_worker.js" }, { "name": "3K 2.0.0 (已混淆)", "desc": "autocf-workers.pages.dev/workers/3k/2.0.0/_worker.js", "url": "https://autocf-workers.pages.dev/workers/3k/2.0.0/_worker.js" } ] },
  { "category": "EDT 封神榜", "id": "legends", "items": [ { "name": "zizifn - EDT鼻祖", "desc": "第一个系统性在Workers环境中实现VLESS，适合底层研究", "url": "https://github.com/zizifn/edgetunnel" }, { "name": "3Kmfi6HP - 炼金术士", "desc": "第一个对原始代码进行了深度重构，适合底层研究", "url": "https://github.com/3Kmfi6HP/EDtunnel" }, { "name": "YGKKK - 布道者", "desc": "第一个通过手把手教程和脚本广泛普及EDT", "url": "https://github.com/yonggekkk/Cloudflare-vless-trojan" }, { "name": "BPB - 变革者", "desc": "第一个将配置项做成可视化图形界面面板", "url": "https://github.com/bia-pain-bache/BPB-Worker-Panel" }, { "name": "CMLiu - 六边形战士", "desc": "第一个将EDT衍生功能插件化集成化，一站式体验推荐", "url": "https://github.com/cmliu/edgetunnel" }, { "name": "Joey - 极客先锋", "desc": "第一个发布Snippets脚本和整合多个新特性", "url": "https://github.com/byjoey/cfnew" } ] },
  { "category": "教程", "id": "tutorials", "items": [ { "name": "科技共享", "desc": "0基础1分钟搭建Cloudflare永久免费节点", "url": "https://www.youtube.com/@kejigongxiang" }, { "name": "Joey blog", "desc": "Cloudflare免费节点搭建全攻略", "url": "https://youtu.be/aXBxfEXT6Gk" }, { "name": "YGKKK Q&A", "desc": "CF节点系列视频问答", "url": "https://youtube.com/playlist?list=PLMgly2AulGG-MQqCT3HFKJs7VI6h3MEN_" }, { "name": "Bulianglin", "desc": "获取反代IP优选方法（这是高手）", "url": "https://bulianglin.com/archives/newcdn.html" }, { "name": "CMLiu 2.0", "desc": "2.0全新版本，就是这么简单", "url": "https://blog.cmliussss.com/p/edt2/" } ] },
  { "category": "优选域名", "id": "domains", "items": [ { "name": "精选合集 (全量)", "desc": "/domain/all.txt", "url": "/domain/all.txt" }, { "name": "精选合集 (迷你)", "desc": "/domain/mini.txt", "url": "/domain/mini.txt" }, { "name": "VPS789 (TOP 20)", "desc": "7*24小时监测，每半小时更新", "url": "/vps789/top20.txt" }, { "name": "IRCF 伊朗团队", "desc": "/ircf/all.txt", "url": "/ircf/all.txt" } ] },
  { "category": "优选IP", "id": "ips", "items": [ { "name": "Gslege (带测速)", "desc": "早中晚更新，分地区", "url": "/gslege/Cfxyz.txt" }, { "name": "Xinyitang (IPv4)", "desc": "每半小时更新", "url": "/xinyitang3/ipv4.txt" }, { "name": "WeTest (三网)", "desc": "每半小时更新", "url": "/wetest/ipv4.txt" }, { "name": "vvHan (三网)", "desc": "每小时更新", "url": "/vvhan/ipv4.txt" }, { "name": "JZ (联通)", "desc": "每半小时更新", "url": "https://raw.githubusercontent.com/HandsomeMJZ/cfip/main/best_ips.txt" }, { "name": "CM (随机优选)", "desc": "每秒更新，数量可自定义", "url": "https://090227.pages.dev/bestcf?isp=all&ips=20" }, { "name": "MingYu (单IP)", "desc": "每半小时更新", "url": "/mingyu/ipv4-onlyip.txt" }, { "name": "ZhiXuan (单IP)", "desc": "每半小时更新", "url": "/zhixuanwang/ipv4-onlyip.txt" } ] },
  { "category": "优选工具", "id": "optimization-tools", "items": [ { "name": "CloudflareST (XIU2)", "desc": "强大且全面的测速工具，推荐", "url": "https://github.com/XIU2/CloudflareSpeedTest" }, { "name": "yx-tools (byJoey)", "desc": "易上手，基于CloudflareST", "url": "https://github.com/byJoey/yx-tools/releases" }, { "name": "CFnat-GUI (CMLiu)", "desc": "Windows图形界面", "url": "https://github.com/cmliu/CFnat-Windows-GUI" }, { "name": "在线优选", "desc": "可自定义网段，准度一般", "url": "https://zxyx.pages.dev/" } ] },
  { "category": "CIDR 网段", "id": "cidr", "items": [ { "name": "高爆段 (示例)", "desc": "建议自己扫描", "url": "/CIDR/success.txt" }, { "name": "合集段", "desc": "用于优选，条件苛刻", "url": "/CIDR/all.txt" }, { "name": "低延迟段", "desc": "针对低延迟优化", "url": "/CIDR/low-latency.txt" }, { "name": "高带宽段", "desc": "针对高带宽优化", "url": "/CIDR/high-bandwidth.txt" }, { "name": "CIDR to IP 转换", "desc": "在线工具", "url": "/tools/cidr2ip/" }, { "name": "Colo 位置查询", "desc": "二/三字码查询", "url": "/tools/colo/" } ] },
  { "category": "ProxyIP 搜索", "id": "proxyip", "items": [ { "name": "ProxyIP 合集", "desc": "CMLiussss 等大佬维护", "url": "https://proxyip.cmliussss.net/" }, { "name": "Xgonce/ProxyIP", "desc": "每6小时更新 result.csv", "url": "https://raw.githubusercontent.com/xgonce/Cloudflare_IP/main/result.csv" }, { "name": "FOFA 搜索", "desc": "网络空间测绘，搜索优选节点", "url": "https://fofa.info" }, { "name": "Shodan 搜索", "desc": "边缘节点搜索工具", "url": "https://www.shodan.io/" } ] },
  { "category": "测速 & 检测", "id": "speed-test", "items": [ { "name": "SpeedTest (Ookla)", "desc": "全球最流行的测速网站", "url": "https://www.speedtest.net/zh-Hant" }, { "name": "Fast.com (Netflix)", "desc": "测试到Netflix服务器的速度", "url": "https://fast.com/" }, { "name": "BrowserLeaks", "desc": "全面的浏览器指纹和IP泄露检测", "url": "https://browserleaks.com/" }, { "name": "Cloudflare Trace", "desc": "官方 trace 工具，查看你的连接信息", "url": "https://cloudflare.com/cdn-cgi/trace" }, { "name": "204 连通性测试", "desc": "返回 HTTP 204 用于测试网络真链接", "url": "/tools/204/" } ] },
  { "category": "规则集 & 订阅", "id": "rules-subscription", "items": [ { "name": "Loyalsoldier 规则", "desc": "Clash/V2ray/Surge 常用规则集", "url": "https://github.com/Loyalsoldier/v2ray-rules-dat" }, { "name": "ACL4SSR 规则", "desc": "规则鼻祖，功能最全推荐", "url": "https://github.com/ACL4SSR/ACL4SSR" }, { "name": "肥羊订阅转换", "desc": "sub.v1.mk 订阅转换工具", "url": "https://sub.v1.mk/" }, { "name": "SubConverter", "desc": "强大的开源自建订阅转换后端", "url": "https://github.com/tindy2013/subconverter" } ] },
  { "category": "全平台客户端", "id": "clients", "items": [ { "name": "v2rayN (Win)", "desc": "Windows 传统 WPF 客户端", "url": "https://github.com/2dust/v2rayN/releases" }, { "name": "Clash Verge Rev (Win/Mac)", "desc": "Win/Mac 现代版客户端", "url": "https://github.com/clash-verge-rev/clash-verge-rev/releases" }, { "name": "NekoBox (Android)", "desc": "安卓端全能工具箱", "url": "https://github.com/MatsuriDayo/NekoBoxForAndroid/releases" }, { "name": "Shadowrocket (iOS)", "desc": "iOS 小火箭（需外区账号）", "url": "https://apps.apple.com/us/app/id932747118" }, { "name": "Hiddify (全平台)", "desc": "跨平台全能工具，支持 VLESS", "url": "https://github.com/hiddify/hiddify-next/releases" } ] },
  { "category": "Cloudflare 官方", "id": "cf-official", "items": [ { "name": "WARP 官方", "desc": "one.one.one.one 官方下载", "url": "https://one.one.one.one/zh-Hans/" }, { "name": "流量雷达", "desc": "全球网络流量与攻击趋势报告", "url": "https://radar.cloudflare.com/zh-cn" }, { "name": "服务状态", "desc": "查看Cloudflare全球服务状态", "url": "https://www.cloudflarestatus.com/" }, { "name": "学习中心", "desc": "学习网络知识，了解工作原理", "url": "https://www.cloudflare.com/zh-cn/learning/" } ] }
];

export default {
    async fetch(request, env) {
        const url = new URL(request.url);
        const pathname = url.pathname;

        // 路由1: 如果是主页，则动态生成HTML
        if (pathname === '/') {
            const html = generateMainPage(mainNavData);
            return new Response(html, { headers: { 'Content-Type': 'text/html;charset=UTF-8' } });
        }

        // 路由2: 如果是204测试路径，返回204
        if (pathname === '/tools/204/' || pathname === '/tools/204') {
            return new Response(null, { status: 204 });
        }

        // 路由3: 其他所有路径 (如 /CIDR_all.txt, /tools/cidr2ip/), 交给Cloudflare Pages的静态资源服务处理
        // env.ASSETS.fetch(request) 会自动在你的 /public 目录中寻找并返回匹配的文件。
        return env.ASSETS.fetch(request);
    }
};

// ... (下面的 generateMainPage 函数保持不变)
function generateMainPage(navData) {
    const html = `
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>EDT AIO 导航 - 搭建Cloudflare节点的第一站</title>
    <meta name="description" content="Cloudflare EDT 导航 - 优选IP, 优选域名, 免费节点必备工具站">
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        body { background: #0b0f1a; color: #e2e8f0; scroll-behavior: smooth; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; }
        .sidebar { background: #111827; border-right: 1px solid #1e293b; width: 240px; position: fixed; height: 100vh; padding: 2rem 1rem; overflow-y: auto; z-index: 100; }
        .main { margin-left: 240px; padding: 2rem 3rem; }
        .search-box { background: #1e293b; border: 1px solid #334155; border-radius: 12px; padding: 0.75rem 1.25rem; color: #fff; width: 100%; margin-bottom: 2.5rem; outline: none; transition: 0.3s; }
        .search-box:focus { border-color: #3b82f6; box-shadow: 0 0 15px rgba(59, 130, 246, 0.3); }
        .nav-card { background: #1e293b; border: 1px solid #334155; border-radius: 14px; padding: 1.25rem; transition: 0.25s; text-decoration: none !important; display: block; height: 100%; }
        .nav-card:hover { border-color: #3b82f6; transform: translateY(-4px); background: #24334a; box-shadow: 0 10px 20px -5px rgba(0, 0, 0, 0.5); }
        .card-title { color: #60a5fa; font-weight: bold; font-size: 1.05rem; display: flex; align-items: center; }
        .card-desc { color: #94a3b8; font-size: 0.85rem; margin-top: 0.6rem; line-height: 1.5; }
        .section-header { display: flex; align-items: center; margin: 3.5rem 0 1.5rem; font-size: 1.3rem; font-weight: 800; color: #fff; }
        .section-header::before { content: ""; width: 4px; height: 22px; background: #3b82f6; margin-right: 12px; border-radius: 4px; }
        @media (max-width: 1024px) { .sidebar { display: none; } .main { margin-left: 0; padding: 1.5rem; } }
    </style>
</head>
<body>
    <aside class="sidebar">
        <div class="text-blue-500 font-black italic text-2xl mb-10 px-4 tracking-tighter">EDT AIO</div>
        <div id="side-menu" class="space-y-1"></div>
    </aside>
    <main class="main">
        <input type="text" id="search" class="search-box" placeholder="搜索资源，如：优选、脚本、安卓...">
        <div id="main-content"></div>
        <footer class="mt-24 py-12 border-t border-slate-800 text-slate-500 text-center text-sm">
            <p>© 2024 自建版 EDT AIO 导航 | 本站内容均来自网络，完全免费使用</p>
        </footer>
    </main>
    <script>
        const data = ${JSON.stringify(navData)};
        const sideMenu = document.getElementById('side-menu');
        const mainContent = document.getElementById('main-content');
        const searchInput = document.getElementById('search');
        function render(filter = '') {
            sideMenu.innerHTML = '';
            mainContent.innerHTML = '';
            let hasVisibleItems = false;
            data.forEach(group => {
                const filteredItems = group.items.filter(item => 
                    item.name.toLowerCase().includes(filter.toLowerCase()) || 
                    item.desc.toLowerCase().includes(filter.toLowerCase())
                );
                if (filter && filteredItems.length === 0) return;
                hasVisibleItems = true;
                const menuLink = document.createElement('a');
                menuLink.href = '#' + group.id;
                menuLink.className = 'block px-4 py-2.5 text-sm text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl no-underline transition-all';
                menuLink.innerText = group.category;
                sideMenu.appendChild(menuLink);
                const section = document.createElement('section');
                section.id = group.id;
                let cardsHtml = '<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">';
                const itemsToRender = filter ? filteredItems : group.items;
                itemsToRender.forEach(item => {
                    let hostname = 'example.com';
                    try {
                      if (item.url.startsWith('http')) {
                        hostname = new URL(item.url).hostname;
                      }
                    } catch (e) {}
                    const iconUrl = \`https://www.google.com/s2/favicons?domain=\${hostname}&sz=32\`;
                    cardsHtml += \`
                        <a href="\${item.url}" target="_blank" class="nav-card">
                            <div class="card-title">
                                <img src="\${iconUrl}" class="w-4 h-4 mr-2 rounded-sm" loading="lazy" onerror="this.style.display='none'">
                                \${item.name}
                            </div>
                            <div class="card-desc">\${item.desc}</div>
                        </a>
                    \`;
                });
                cardsHtml += '</div>';
                section.innerHTML = '<div class="section-header">' + group.category + '</div>' + cardsHtml;
                mainContent.appendChild(section);
            });
            if (!hasVisibleItems && filter) {
                mainContent.innerHTML = '<p class="text-center text-slate-400">没有找到与 "' + filter + '" 相关的内容。</p>';
            }
        }
        searchInput.addEventListener('input', e => render(e.target.value));
        render();
    </script>
</body>
</html>`;
    return html;
}