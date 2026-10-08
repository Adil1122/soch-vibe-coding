with open('/tmp/apply_now.html') as f:
    html = f.read()

import re
pos = html.find('<form')
end_pos = html.find('</form>', pos)
form_html = html[pos:end_pos+7]

groups = re.findall(r'<div[^>]*class=[\'"][^\'"]*ff-el-group[^\'"]*[\'"][^>]*>(.*?)</div>\s*(?=(?:<div[^>]*class=[\'"][^\'"]*ff-el-group|<button|</form))', form_html, re.DOTALL)

print('--- FORM SECTIONS & FIELDS ---')
# Let's find all labels and inputs
for m in re.finditer(r'<label[^>]*>(.*?)</label>.*?<(input|select|textarea)[^>]*name=[\'"]([^\'"]+)[\'"][^>]*>', form_html, re.DOTALL):
    label = re.sub(r'<[^>]+>', '', m.group(1)).strip()
    tag = m.group(2)
    name = m.group(3)
    print(f'Field: label="{label}", tag={tag}, name="{name}"')

# Also print select options
for s in re.finditer(r'<label[^>]*>(.*?)</label>.*?<select[^>]*name=[\'"]([^\'"]+)[\'"][^>]*>(.*?)</select>', form_html, re.DOTALL):
    label = re.sub(r'<[^>]+>', '', s.group(1)).strip()
    print(f'Select: {label}')
    options = re.findall(r'<option[^>]*value=[\'"]([^\'"]*)[\'"][^>]*>(.*?)</option>', s.group(3))
    for v, t in options:
        print(f'   value="{v}" text="{t.strip()}"')

# Print button
btn = re.search(r'<button[^>]*>(.*?)</button>', form_html, re.DOTALL)
if btn:
    print('Button text:', re.sub(r'<[^>]+>', '', btn.group(1)).strip())
