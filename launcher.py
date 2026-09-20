import http.server
import socketserver
import webbrowser
import os
import sys

# プロジェクトディレクトリへ移動
os.chdir(os.path.dirname(os.path.abspath(__file__)))

# 使用可能なポートを探索 (8080〜8099)
PORT = 8080
httpd = None
for p in range(8080, 8100):
    try:
        handler = http.server.SimpleHTTPRequestHandler
        httpd = socketserver.TCPServer(("", p), handler)
        PORT = p
        break
    except OSError:
        continue

if not httpd:
    print("エラー: 利用可能なポートが見つかりませんでした。")
    input("何かキーを押して終了してください...")
    sys.exit(1)

url = f"http://localhost:{PORT}/index.html"
print("=" * 60)
print("  Clear Maker 3 - PWA ローカルサーバー起動中")
print(f"  URL: {url}")
print("=" * 60)
print("  【PWAとしてインストールする方法】")
print("  1. 開いたブラウザのアドレスバー右端にある [インストール (⊕)] アイコン、")
print("     または画面ヘッダー右上の [📲] ボタンをクリックします。")
print("  2. 「インストール」を選択すると、独立したデスクトップアプリとして登録されます。")
print("=" * 60)
print("  ※ サーバーを終了するには、この画面を閉じるか Ctrl+C を押してください。")
print("=" * 60)

# ブラウザを自動起動
webbrowser.open(url)

try:
    httpd.serve_forever()
except KeyboardInterrupt:
    print("\nサーバーを停止しました。")
