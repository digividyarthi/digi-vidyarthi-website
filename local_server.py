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
        
        # If it doesn't exist, try adding .html (simulating .htaccess rule)
        if not os.path.exists(full_path) and not full_path.endswith('.html'):
            if os.path.exists(full_path + '.html'):
                return full_path + '.html'
        
        # Return the original translation by the parent class
        return super().translate_path(path)

with socketserver.TCPServer(("", PORT), ExtensionlessHandler) as httpd:
    print(f"Serving at port {PORT} (http://localhost:{PORT})")
    print("This server automatically resolves extensionless URLs (like /about) to .html files.")
    print("Press Ctrl+C to stop.")
    httpd.serve_forever()
