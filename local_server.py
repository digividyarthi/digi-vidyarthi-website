import http.server
import socketserver
import os

PORT = 8000

class ExtensionlessHandler(http.server.SimpleHTTPRequestHandler):
    def translate_path(self, path):
        # Default translation to get the actual file path
        root = os.getcwd()
        
        # Remove query parameters for local file checking
        path_without_query = path.split('?')[0]
        
        # Strip leading slash
        rel_path = path_without_query.lstrip('/')
        
        # Absolute path on local filesystem
        full_path = os.path.join(root, rel_path)
        
        # Blog permalinks: /blog/<slug> -> blog-post.html
        parts = [p for p in rel_path.split('/') if p]
        if len(parts) == 2 and parts[0] == 'blog':
            ext = os.path.splitext(parts[1])[1].lower()
            if ext in ['.css', '.js', '.webp', '.png', '.jpg', '.jpeg', '.svg', '.json', '.ico', '.woff2', '.ttf']:
                asset_path = os.path.join(root, parts[1])
                if os.path.exists(asset_path):
                    return asset_path
            elif not parts[1].endswith('.html'):
                return os.path.join(root, 'blog-post.html')

        # If it doesn't exist, try adding .html (simulating .htaccess rule)
        if not os.path.exists(full_path) and not full_path.endswith('.html'):
            if os.path.exists(full_path + '.html'):
                return full_path + '.html'
        
        # Return the original translation by the parent class
        return super().translate_path(path)

    def end_headers(self):
        self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
        self.send_header('Pragma', 'no-cache')
        self.send_header('Expires', '0')
        super().end_headers()

with socketserver.TCPServer(("", PORT), ExtensionlessHandler) as httpd:
    print(f"Serving at port {PORT} (http://localhost:{PORT})")
    print("This server automatically resolves extensionless URLs (like /about) to .html files.")
    print("Press Ctrl+C to stop.")
    httpd.serve_forever()
