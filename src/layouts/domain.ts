import { siteConfig } from '../config'
const officialSites = siteConfig.domain
const warnLink = siteConfig.warnLink

// 域名检测功能
function checkDomain() {
    try {
        const currentUrl = window.location.href;
        const currentDomain = window.location.hostname;
        
        const officialDomains = officialSites.map(site => {
            try {
                return new URL(site).hostname;
            } catch (e) {
                return null;
            }
        }).filter(domain => domain !== null);
        
        const isOfficialDomain = officialDomains.includes(currentDomain);
        const isLocalDev = currentDomain === 'localhost' || currentDomain === '127.0.0.1';
        
        if (!isOfficialDomain && !isLocalDev) {
            const currentUrl = encodeURIComponent(window.location.href);
            window.location.href = `${warnLink}/?url=${currentUrl}`;
        }
    } catch (error) {
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', checkDomain);
} else {
    checkDomain();
}