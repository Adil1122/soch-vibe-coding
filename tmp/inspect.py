import re

with open('scraped_site.html') as f:
    html = f.read()

# Find headings
pattern = r'<h([1-6])([^>]*)>(.*?)</h\1>'
for lvl, attrs, text in re.findall(pattern, html, re.DOTALL):
    clean = re.sub(r'<[^>]+>', '', text).strip()
    clean = ' '.join(clean.split())
    if clean:
        print(f"H{lvl}: {clean}")

print("\n--- Sections / Main Divs ---")
# Find all divs with elementor-element and class e-con-parent
pattern2 = r'class="[^"]*e-con-parent[^"]*"[^>]*>'
for m in re.finditer(pattern2, html):
    snippet = html[m.start():m.start()+250]
    print(snippet.replace('\n', ' '))
