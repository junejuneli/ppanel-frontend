from pathlib import Path
import xml.etree.ElementTree as ET
root = Path('apps/user/dist')
urls = [e.text for e in ET.parse(root / 'sitemap.xml').findall('.//{*}loc')]
assert urls == ['https://goodvpn.app/', 'https://goodvpn.app/guides/en/', 'https://goodvpn.app/guides/zh/']
for url in urls:
    p = root / url.removeprefix('https://goodvpn.app/') / 'index.html'
    text = p.read_text()
    assert '<h1>' in text and 'rel="canonical"' in text and 'name="description"' in text
assert 'Sitemap: https://goodvpn.app/sitemap.xml' in (root / 'robots.txt').read_text()
for app in ('user', 'admin'):
    assert (Path('apps') / app / 'dist/index.html').is_file()
print('Built entrypoints, public guides, sitemap and SEO tags verified')
