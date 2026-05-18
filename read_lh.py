import json
with open('lighthouse_report.json', encoding='utf-8') as f:
    data = json.load(f)
for k, v in data['audits'].items():
    if v.get('score') is not None and v['score'] < 1:
        # Check if it has weight or if it's an opportunity
        if v.get('details', {}).get('type') == 'opportunity' or data['categories']['performance']['auditRefs']:
            print(f"{v['id']}: {v.get('displayValue', '')} (score: {v['score']})")
