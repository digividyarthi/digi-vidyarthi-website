import urllib.request
import json

url = 'https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=https://digividyarthi.com&strategy=mobile&category=performance&category=accessibility&category=best-practices&category=seo'
try:
    req = urllib.request.Request(url)
    with urllib.request.urlopen(req) as response:
        data = json.loads(response.read().decode())
        
    print('Performance Score:', data['lighthouseResult']['categories']['performance']['score'] * 100)
    print('Accessibility Score:', data['lighthouseResult']['categories']['accessibility']['score'] * 100)
    print('Best Practices Score:', data['lighthouseResult']['categories']['best-practices']['score'] * 100)
    print('SEO Score:', data['lighthouseResult']['categories']['seo']['score'] * 100)
    
    print('\nFailed Audits:')
    audits = data['lighthouseResult']['audits']
    for key, audit in audits.items():
        if audit.get('score') is not None and audit.get('score') < 1:
            if audit.get('weight', 0) > 0 or audit.get('scoreDisplayMode') == 'binary':
                print(f"- {audit['title']} (Score: {audit.get('score')})")
                if 'displayValue' in audit:
                    print(f"  Value: {audit['displayValue']}")
except Exception as e:
    print('Error:', e)
