// --- 管理者設定 ---
// 生徒の利用データをGoogleスプレッドシートに収集する場合は、ここに取得したGASのウェブアプリURLを貼り付けてください。
const ADMIN_GAS_WEBHOOK_URL = 'https://script.google.com/macros/s/AKfycbzkpe2wVgivuC1n0QAbTwPLs_bHo1dsJJh8HPznnbmdRRSI-nZPhkK5TMD9em_8VIYjAA/exec'; // 例: 'https://script.google.com/macros/s/.../exec'

// --- 新規: API中継用のGASウェブアプリURL ---
// ここに上記で作成した backend_GAS.gs のデプロイURLを貼り付けます
const GAS_API_URL = 'https://script.google.com/macros/s/AKfycbwb_yTz-EBvgQOwSlc1iZfyPCB36vnG_eWQaucqqk5Nj0UCu7cjX14w9WSYLx2Kvvwo/exec';

// --- TeX Sauce Maker 連携用URL ---
// Clear Maker2から見たTeX Sauce Makerの相対パス
const TEX_SAUCE_MAKER_URL = '../TeX Sauce Maker/index.html';

const README_CONTENT = `# Clear Maker 3

**AIを活用した答案添削・解説作成支援ツール**

Clear Maker 3は、Google Gemini Proモデルを活用して、生徒の答案画像と、問題・模範解答の画像またはソースを元に、高度な添削と解説を自動生成するWebアプリケーションです。

## 主な機能

*   **画像解析**: 問題、模範解答、生徒の答案の画像をアップロードして解析。
*   **ソース入力**: 問題・模範解答はLaTeX、Markdown、HTML、プレーンテキストも利用可能。
*   **AI添削**: 東大・京大レベルの基準で、記述の論理性や計算過程を細かくチェック。
*   **添削画像へのペンマーク描画**: 生徒の答案画像上に、修正ポイントを直接🖊️マークで指し示す機能。
*   **クリップボード貼り付け**: スクリーンショットを\`Ctrl+V\`で直接貼り付け可能（ホバー判定機能付き）。
*   **PDF対応**: PDFファイルを自動で画像に変換して読み込み。
*   **数式対応**: LaTeX形式の数式を美しくレンダリング（KaTeX使用）。
*   **編集機能**: 生成された解説をその場で編集・保存可能。
*   **PWA対応**: アプリとしてインストールして使用可能。オフラインキャッシュ対応。
*   **プライバシー重視**: APIキーはローカルストレージに保存され、サーバーには送信されません。

## 更新履歴 (Changelog)

### v3.1.8 (2026-10-12)
*   **[修正] 丸数字の表示を改善**:
    *   回答本文と添削画像内コメントで、丸数字を囲むLaTeXのtext命令を取り除き、①〜⑳をそのまま表示するようにしました。

### v3.1.7 (2026-09-21)
*   **[改善] 添削画像内コメントのKaTeX表示に対応**:
    *   AI生成コメントの \`$...$\` で囲まれた数式をKaTeXで描画し、答案画像へ高精細に合成するようにしました。
    *   通常文は従来の軽量描画を維持し、数式の描画に失敗した場合も元の文字列を表示するフォールバックを追加しました。
    *   マーカー生成指示を行内数式と正しいJSONエスケープに統一しました。

### v3.1.6 (2026-09-20)
*   **[デザイン] PWA・ファビコン用アイコンの刷新（チェックマーク＋「3」）**:
    *   Clear Maker 3 を象徴するチェックマークと数字の「3」を組み合わせた高精細アプリアイコン（\`icon-192.png\`, \`icon-512.png\`）を新規作成・適用。
    *   ブラウザタブのファビコン（favicon）およびPWAインストール時のホーム画面アイコン・タスクバーアイコンを新デザインに刷新。
    *   キャッシュ更新用バージョンクエリ（\`?v=3.1.6\`）を一括更新。

### v3.1.5 (2026-09-20)
*   **[新機能] PWAインストール機能の強化とワンクリック起動に対応**:
    *   ヘッダーに「📲 アプリをインストール」ボタンを追加（PWA対応環境で自動表示）。
    *   PWAマニフェスト（\`manifest.json\`）を最新規格に最適化し、デュアルアイコン（any / maskable）に対応。
    *   ローカル環境から1クリックでPWAとして起動・インストールできる \`アプリを起動.bat\` を追加。

### v3.1.4 (2026-09-20)
*   **[改善] 答案画像の表示幅を左カラム全幅（100%）に完全拡大**:
    *   画像の高さ制限（\`max-height\`）を完全撤廃し、縦向き（A4/ノート等）の答案画像でも左カラムの横幅いっぱいに大きく表示されるようにしました。
    *   カードの外枠線や背景・余白スタイルを排し、答案の手書き文字や添削ペンマークの視認性を最大限に高めました。
    *   スタイルシートのキャッシュ自動更新に対応し、最新の表示デザインが確実に即時反映されるようにしました。

### v3.1.3 (2026-09-20)
*   **[修正] アプリ起動時に画面が停止する不具合の修正**:
    *   埋め込みREADME内の記号エスケープ不備による構文エラー（SyntaxError）を解消しました。
    *   イベントリスナーの初期化構造を最適化し、起動時の安定性を向上させました。

### v3.1.2 (2026-09-20)
*   **[改善] 縦型答案画像の表示幅の最大化とカード余白の最適化**:
    *   縦向きの答案画像でも左カラムの横幅をフルに活用できるようにレイアウトを最適化しました。
    *   画像の無駄な余白を削減し、マーカーバッジの視認性をさらに向上させました。

### v3.1.1 (2026-09-20)
*   **[改善] 満点・良好な答案へのGoodポイント（褒めマーク）出力機能を追加**:
    *   生徒の答案にミスがない（満点・S評価）場合や素晴らしい解法がある場合でも、AIが1〜2箇所のGoodポイント（緑色の \`✨ P1 ◎\` や \`✨ GOOD\` マーク）を必ず画像上に描画するようにプロンプトを強化しました。

### v3.1.0 (2026-09-20)
*   **[新機能] 左右2カラム（分割表示）レイアウトの導入**:
    *   PC・タブレット横画面で添削結果を表示する際、左側に大きく添削画像、右側にテキスト解説を並べて表示するレイアウトに対応しました。
    *   画像の表示サイズ上限を撤廃し、答案の詳細や赤ペンマークが大きく見やすくなりました。
    *   画面幅が狭い場合（スマートフォン等）は自動的に従来の縦並び表示に切り替わります。
*   **[改善] 「画像として保存」の横長対応**:
    *   添削結果の保存時も左右2カラムの比率を維持したまま、横幅にゆとりを持たせた高精細画像としてエクスポートされるように強化しました。

### v3.0.1 (2026-09-20)
*   **[改善] 添削マークのデザイン刷新と具体的修正案への特化**:
    *   添削画像上に表示するマークを「ポインター＋引き出し線＋エレガントなカードUI」へと刷新し、オシャレで視認性の高いデザインに変更しました。
    *   AIによる指摘内容を、20文字以内の端的な「具体的修正案（赤ペン指導メッセージ）」として表示するように強化しました。
    *   設定で添削マーク描画がONの場合、「画像を引用」にチェックがなくても生徒画像を自動表示するようにしました。

### v3.0.0 (2026-09-20)
*   **[新機能] 添削画像への修正マーク（赤ペン機能）の描画機能を追加**:
    *   AIが生徒の答案画像を分析し、間違いや指摘箇所にペンマーク（🖊️）と評価ポイント番号（Point 1〜6）を直接描画する機能を追加しました。
    *   設定画面（⚙️）から本機能のON/OFFを切り替え可能です。
*   **[変更] アプリケーション名を「Clear Maker 3」へリニューアル**:
    *   UIおよびPWA設定（マニフェスト、キャッシュ等）をClear Maker 3仕様に更新しました。

### v2.4.7 (2026-08-31)
*   **[修正] 丸数字マクロが赤字の未定義コマンドとして表示される問題を修正**:
    *   KaTeXへ\\maruichi～\\marushiを登録し、AIがマクロをそのまま返した場合も①～④として表示するようにしました。

### v2.4.6 (2026-08-31)
*   **[改善] 数学プロンプトの丸数字マクロ対応を追加**:
    *   \\maruichi～\\marushiを、それぞれ\\text{①}～\\text{④}として扱うようにしました。

### v2.4.5 (2026-08-31)
*   **[修正] v2.4.4でアプリが起動しない問題を修正**:
    *   配布用JavaScriptの生成時に関数名の変換が一部欠落し、起動処理が停止する問題を修正しました。

### v2.4.4 (2026-08-30)
*   **[修正] GASログ用の分析データが回答欄に表示される問題を修正**:
    *   AIが分析データの区切り記号を省略した場合でも、送信用JSONを回答表示から除外するようにしました。
    *   自動再検証の「他の回答」表示にも同じ除外処理を適用しました。

### v2.4.3 (2026-08-19)
*   **[変更] 利用モデルの更新**:
    *   Gemini 3 Flash、Gemini 3.7 Flash、Gemini 3.1 Proから選択できるようにしました。
    *   既定モデルをGemini 3 Flashに変更しました。

### v2.4.2 (2026-08-07)
*   **[修正] 起動時に画面操作が停止する問題を修正**:
    *   埋め込みREADME内の記号がJavaScriptとして誤解釈される問題を修正しました。

### v2.4.1 (2026-08-07)
*   **[修正] PWA更新直後に画面操作が停止する問題を修正**:
    *   古いHTMLと新しいJavaScriptが一時的に混在しても、アプリの初期化が停止しないようにしました。

### v2.4.0 (2026-08-07)
*   **[新機能] 問題・模範解答のソース入力に対応**:
    *   LaTeX、Markdown、HTML、プレーンテキストを入力欄へ直接貼り付けて解析できます。
    *   \`.tex\`、\`.txt\`、\`.md\`、\`.html\`ファイルの選択・ドラッグ＆ドロップにも対応しました。
    *   ソースだけでの解析、画像との併用のどちらも可能です。ソースがある場合は画像より優先して参照します。
    *   問題ソースがある場合、ログ記録用の追加OCRを省略してAPI使用量を抑えます。
### v2.3.4 (2026-08-03)
*   **[改善] 積分・総和記号の表示を統一**:
    *   解説内では行内数式・独立数式を問わず、積分記号と総和記号を常に displaystyle で出力するよう生成指示を更新しました。

### v2.3.3 (2026-07-17)
*   **[改善] 解説内のベクトル表記を統一**:
    *   ベクトルを文字の大小にかかわらず \overrightarrow{} で出力するよう、解答・解説生成用テンプレートを更新しました。

### v2.3.2 (2026-07-04)
*   **[改善] TikZ関数グラフを関数式から描画**:
    *   座標点を列挙して結ぶ方式をやめ、\`plot\`へ関数式・定義域・サンプル数を指定するよう生成指示を変更しました。
    *   不連続点では区間を分け、添削結果内でも滑らかな関数グラフとして出力できるようにしました。

### v2.3.1 (2026-06-10)
*   **[修正] モデル選択がGAS側に反映されない不具合を修正**:
    *   設定画面で選択したGeminiモデルを解析リクエストのpayloadに含めるようにしました。
    *   GAS側で通常解析時に受け取ったモデル名を使用し、未対応モデル名の場合は安全にデフォルトモデルへフォールバックするようにしました。
    *   Service Workerのキャッシュ名と\`app.js\`/\`sw.js\`のバージョンクエリを更新しました。

### v2.2.12 (2026-05-20)
*   **[修正] PNG保存時にキャッシュ済みTikZ図が崩れる不具合を修正**:
    *   PNG保存前に、iframe内SVGだけでなくキャッシュ復元されたinline SVGも一時的に独立したIMGへ変換するようにしました。
    *   html2canvasがinline SVGの座標や表示位置を誤って解釈し、白い余白や崩れた図になる問題を回避しました。

### v2.2.11 (2026-05-14)
*   **[修正] 復元したTikZ図が画面上部に重なって表示される不具合を修正**:
    *   キャッシュ済みSVGを直接復元する際、TikZJax由来の位置指定をリセットして通常の本文フロー内に表示するようにしました。
    *   SVGを専用ラッパー内に収め、図表コンテナの位置に安定して表示されるようにしました。

### v2.2.10 (2026-05-14)
*   **[修正] GitHub Pages/PWAで編集後にTikZ図が白い背景だけになる不具合を追加修正**:
    *   初回に正常描画されたTikZのSVGを親画面側にキャッシュし、編集保存・キャンセル後はTikZJaxの再実行に頼らずSVGを直接復元するようにしました。
    *   GitHub Pages/PWA環境で外部TikZJaxの再読み込みやiframe内再描画が不安定な場合でも、既に表示済みの図を保持できるようにしました。

### v2.2.9 (2026-05-14)
*   **[修正] GitHub Pages/PWAでTikZコンテナだけ白く残る不具合を修正**:
    *   iframe内でTikZコードを配置してからTikZJaxを読み込む順序に変更し、GitHub Pages上で外部JSの読み込みタイミングによりSVG化が空振りする問題を回避しました。
    *   TikZJaxのURLに描画ごとのキャッシュバスターを付け、PWA環境でも再描画時に確実に処理が走るようにしました。

### v2.2.8 (2026-05-14)
*   **[修正] GitHub Pages/PWAで古いapp.jsが復元される問題を修正**:
    *   Service Workerのキャッシュ参照でクエリ文字列を無視しないようにし、\`app.js?v=...\` が古いキャッシュへフォールバックしないようにしました。
    *   GitHub Pages上でPWA起動した場合でも、修正済みの配布JSが確実に読み込まれるようにしました。

### v2.2.7 (2026-05-03)
*   **[修正] 編集キャンセル後にスクロールするとTikZ図表が表示されない不具合を修正**:
    *   編集画面で非表示になっていた既存のTikZ iframeをそのまま再利用せず、プレビューへ戻った後にMarkdownから再描画するようにしました。
    *   隠れた状態で生成されたiframeの描画・サイズ計算がスクロール操作で不安定になる問題を回避しました。

### v2.2.6 (2026-04-29)
*   **[修正] PWA版で編集保存後にTikZ図表が消える不具合を追加修正**:
    *   編集保存時の図表保持処理が\`window.tikzBlocks\`だけに依存していたため、PWA環境で描画状態が失われた場合に図表コードを復元できない問題を修正しました。
    *   保存前のMarkdown本文からTikZブロックを直接抽出するフォールバックを追加し、表示状態に依存せず図表を保持するようにしました。

### v2.2.5 (2026-04-29)
*   **[修正] PWA版で編集保存後にTikZ図表が消える不具合の反映漏れを修正**:
    *   Service Workerのキャッシュ名と\`app.js\`/\`sw.js\`のバージョンクエリを更新し、インストール済みPWAが古い\`app.js\`を使い続けないようにしました。
    *   ローカルで解消済みだった「添削後に文章を修正して確定すると図表が表示されなくなる」修正が、PWA環境にも確実に反映されるようにしました。

### v2.2.4 (2026-04-28)
*   **[修正] 編集保存後に図表が表示されなくなる不具合を修正**:
    *   解説生成時にTikZ図表が含まれている場合、文章修正後に保存しても直前に表示されていた図表ブロックを保持して再描画するようにしました。
    *   編集欄で本文だけを修正した場合でも、既存の図表が消えないよう保存処理を補強しました。

### v2.2.3 (2026-04-06)
*   **[修正] TikZのベクトル画像が消えるバグを修正**:
    *   ベクトル記号を含むTikZコードの抽出時に誤って数式置換がかかりコンパイル違反になるバグを修正しました。
    *   プレビュー編集時にiframeがキャッシュされて図形が再描画されない問題を修正しました。

### v2.2.2 (2026-03-25)
*   **[修正] 編集画面の保存時にTikZ画像が消えるバグを完全修正**:
    *   編集画面から保存して戻る際、描画領域が裏側（非表示）の状態でTikZのサイズ計算が走ってしまい縦横0ピクセルになる問題を、表示順序を入れ替えることで修正しました。

### v2.2.1 (2026-03-17)
*   **[修正] TikZ図のレンダリング不具合（消失）を修正**:
    *   ボールド記法（\`**\`）の影響でTikZ図（グラフ等）が表示されなくなる問題を修正しました。
    *   プレビュー画面の編集ボタン（✏️）から文章を編集・保存した際に、TikZ図が消えてしまう問題を根本的に解消しました。

### v2.2.0 (2026-03-08)
*   **[追加] 生徒解答の連続バッチ処理**:
    *   複数の生徒解答画像を一括ドロップし、「前の生徒 / 次の生徒」ボタンで1人ずつ切り替えて処理できるようになりました。
*   **[追加] 「➕ 前とまとめる」ボタン**:
    *   複数ページにわたる解答を1人分のグループにまとめる機能を追加しました。
*   **[追加] サムネイル拡大プレビュー**:
    *   サムネイル画像にホバーすると、画面中央にオーバーレイで拡大表示されます。

### v2.1.10 (2026-03-05)
*   **[追加] APIモデルの更新**:
    *   選択可能なGeminiモデルに \`gemini-3.1-flash-lite-preview\` を追加しました。

### v2.1.9 (2026-03-03)
*   **[修正] アクセスエラー時のメッセージ改善**:
    *   GAS APIへ接続できない場合（CORSエラー等の \`Failed to fetch\`）に、より詳細な対処法（アクセス権限の設定確認等）を画面に表示するよう修正し、問題解決をサポートします。

### v2.1.8 (2026-03-03)
*   **[修正] TikZ画像保存時に解説文が消える不具合を修正**: 画像化プロセス (\`html2canvas\`) においてSVG周辺のレイアウトが崩れてテキストが描画されなくなる問題を、SVGを完全に独立した画像 (Base64) に変換してからキャプチャするようにして解決しました。

### v2.1.7 (2026-03-03)
*   **[修正] TikZ画像の描画ズレを修正**: 画像キャプチャ時にグラフが上にズレて見切れてしまう問題（html2canvasの座標計算エラー）を、SVGのスタイルを直接変更せずラッパーで囲むようにして解決しました。

### v2.1.6 (2026-03-03)
*   **[修正] TikZグラフが画像保存時に真っ白になる不具合を修正**: 画像化プロセス (\`html2canvas\`) がiframe内のTikZグラフをキャプチャできない問題に対応し、保存の直前にSVGを直接埋め込む処理を追加しました。

### v2.1.5 (2026-03-03)
*   **[修正] PWA環境での「Failed to fetch」エラーを解消**: Service WorkerがPOSTリクエストを不用意にキャッシュしようとして発生していた通信エラー（APIへの接続失敗）を修正しました。

### v2.1.4 (2026-03-03)
*   **[改善] PWAアイコンの修正**:
    *   タスクバー表示時に四隅に白い残像が出る問題を修正。アイコンを角丸なしの正方形デザインに変更しました。

### v2.1.3 (2026-03-03)
*   **[修正] TikZ描画がGAS経由で動作しない不具合を修正**:
    *   TikZJaxが非ASCII文字（日本語コメント等）を処理できない問題を特定し、クライアント側で日本語コメントを自動除去するサニタイズ処理を追加しました。
    *   システムプロンプトにコメント行を含む日本語使用禁止を明記しました。

### v2.1.2 (2026-03-03)
*   **[新機能] 裏モード（模範解答例モード）の追加**:
    *   問題画像のみ（生徒の解答なし）で実行すると、添削ではなく模範解答例を生成する裏モードが自動発動します。

### v2.1.1 (2026-03-01)
*   **[修正] 複数TikZ描画のバグ修正**:
    *   画面内に複数のTikZブロックが存在した場合に、2つ目以降がレンダリングされない不具合を修正しました。独立したiframe環境を割り当てることで安定性を向上しています。

### v2.1.0 (2026-03-01)
*   **[新機能] TikZの描画に対応**:
    *   TikZコード（\`\\begin{tikzpicture}...\\end{tikzpicture}\`）を図形として画面上にレンダリングできるようになりました。
    *   編集モードでの再描画にも対応し、KaTeXの数式と混在して利用可能です。

### v2.0.0 (2026-02-28)
*   **[システム] セキュリティの大幅向上 (GASバックエンド移行)**:
    *   APIキーとシステムプロンプトの送信をGoogle Apps Script (GAS) 経由に変更しました。
    *   フロントエンドから直接Gemini APIを叩かず、プロンプトを隠蔽することで堅牢な設計になりました。

### v1.6.0 (2026-02-22)
*   **[システム] データ自動収集機能の追加**:
    *   管理者が指定したURLに利用結果を自動送信する機能（環境設定）をソースコード統合。

### v1.5.20 (2026-02-20)
*   **[修正] プロンプトエクスポート機能の修正**:
    *   PWA環境等でバックアップ（JSONファイル）がダウンロードできない問題を修正しました。

### v1.5.19 (2026-02-20)
*   **[追加] APIモデルの更新**:
    *   選択可能なGeminiモデルに \`gemini-3.1-pro-preview\` を追加し、デフォルトモデルとして設定しました。

### v1.5.18 (2026-02-19)
*   **[ドキュメント] 利用モデルに関する注意書きの追加**:
    *   Gemini無料版ユーザー向けに、利用推奨モデル (gemini-3-flash-preview, gemini-2.5-flash) を明記しました。

### v1.5.17 (2026-02-23)
*   **[修正] 画像表示の改善**:
    *   結果に引用される画像が歪んで表示される（縦横比が崩れる）問題を修正。
    *   編集モードで保存した際に、引用設定（チェックボックス）が無視される問題を修正。

### v1.5.16 (2026-02-23)
*   **[修正] キャッシュ更新の問題**:
    *   アプリが新しいバージョンに更新されない問題を修正。
    *   主要なファイル（HTML, JS, CSS）の取得戦略を「ネットワーク優先」に変更し、常に最新版を確認するようにしました。

### v1.5.14 (2026-02-22)
*   **[新機能] 画像引用設定の追加**:
    *   問題・模範解答・生徒解答の各画像について、生成結果に元の画像を引用するかどうかを選択できるチェックボックスを追加しました。

### v1.5.13 (2026-02-17)
*   **[変更] モデル選択肢の更新**:
    *   選択可能なGeminiモデルを最新のものに更新 (gemini-3.1-pro-preview, gemini-3-pro-preview, gemini-3-flash-preview, gemini-2.5-pro, gemini-2.5-flash)。

### v1.5.11 (2026-02-13)
*   **[修正] PWA更新の不具合**:
    *   Mac (Safari/Chrome) でアプリが更新されない問題を修正。
    *   Service Worker更新時に自動的にページをリロードする処理を追加。

### v1.5.9 (2026-02-12)
*   **[改善] 生成画像の表示レイアウト変更**:
    *   従来の「高さ固定・横スクロール」から、「横幅基準・グリッド表示」に変更しました。
    *   ウィンドウ幅に合わせて自動的に列数が調整され、横長の画像も縮小されずに大きく表示されます。

### v1.5.8 (2026-02-12)
*   **[修正] マニュアル表示の不具合**:
    *   \`README.md\` が表示されない問題を修正。
    *   モーダルのクラス名が誤っていた不具合を修正 (\`modal-overlay\` -> \`modal\`)。
    *   キャッシュの問題により古いファイルが読み込まれ続ける現象を解決。
*   **[改善] キャッシュ戦略の見直し**: Service Workerの更新ロジックを最適化。

### v1.5.3 (2026-02-12)
*   **[新機能] クリップボード貼り付け機能の実装**:
    *   ドロップゾーン（問題・模範解答・生徒解答）の上で貼り付け操作を行うと、自動的にそのゾーンに画像が追加されます。
    *   ゾーン外で貼り付けた場合は、振り分け先を選択するモーダルが表示されます。
*   **[改善] コードの安全性向上**:
    *   \`app.src.js\`（ソースコード）と\`app.js\`（実行用コード）を分離。
    *   \`app.js\`に対して難読化処理を適用。
*   **[修正] バージョン表記の更新**: ヘッダーのバージョン番号をv1.5.3に更新。

### v1.5.2
*   **レイアウト変更**: UIの使いやすさを向上させるためのレイアウト調整。
*   **プロンプト改善**: 数式出力の精度向上など。

## APIキーの取得方法

このアプリを使用するには、Google Gemini APIキーが必要です。以下の手順で無料で取得できます。

**※ gemini無料版ユーザーは利用するモデルを gemini-3-flash-preview, gemini-2.5-flash のいずれかに変更してご利用ください。**

1.  [Google AI Studio](https://aistudio.google.com/app/apikey) にアクセスします。
2.  Googleアカウントでログインします。
3.  「**Create API key**」ボタンをクリックします。
4.  「**Create API key in new project**」（または既存のプロジェクトを選択）をクリックします。
5.  生成されたAPIキーをコピーし、Clear Maker2の設定画面（右上の⚙️）に入力してください。

## 使い方

1.  右上の設定ボタン（⚙️）からGemini APIキーを設定します。
2.  「問題」「模範解答」「生徒の答案」の各エリアに画像をドラッグ＆ドロップ、またはクリップボードから貼り付けます。
3.  「✨ 解析を実行」ボタンをクリックすると、AIが添削と解説を生成します。
4.  生成された結果はコピーしたり、画像として保存したりできます。

## 開発者向け情報

*   **\`app.src.js\`**: 開発用のソースコード（未圧縮・未難読化）。編集はこちらを行ってください。
*   **\`app.js\`**: 本番用の実行コード（難読化済み）。\`app.src.js\`から生成されます。
*   **\`gas_template.gs\`**: GAS連携用のスクリプトです。
`;

// DOM Elements
const elements = {
    dropOverlay: document.getElementById('drop-overlay'),
    settingsModal: document.getElementById('settings-modal'),
    openSettingsBtn: document.getElementById('open-settings'),
    closeSettingsBtn: document.getElementById('close-settings'),
    saveSettingsBtn: document.getElementById('save-settings'),
    apiKeyInput: document.getElementById('api-key'),
    modelSelect: document.getElementById('model-select'),
    subjectSelect: document.getElementById('subject-select'),
    userPrompt: document.getElementById('user-prompt'),
    fileStatus: document.getElementById('file-status'),
    responseArea: document.getElementById('response-area'),
    loadingIndicator: document.getElementById('loading-indicator'),
    generateBtn: document.getElementById('generate-btn'),
    copyBtn: document.getElementById('copy-btn'),
    screenshotBtn: document.getElementById('screenshot-btn'),
    themeToggleBtn: document.getElementById('theme-toggle'),
    pwaInstallBtn: document.getElementById('pwa-install-btn'),
    editBtn: document.getElementById('edit-btn'),
    responseEditor: document.getElementById('response-editor'),
    editActions: document.getElementById('edit-actions'),
    saveEditBtn: document.getElementById('save-edit-btn'),
    cancelEditBtn: document.getElementById('cancel-edit-btn'),
    // Paste Modal
    pasteModal: document.getElementById('paste-modal'),
    closePasteBtn: document.getElementById('close-paste-modal'),
    pasteOptions: document.querySelectorAll('.paste-option-btn'),
    // Confidence and Retry
    showConfidenceCheck: document.getElementById('show-confidence'),
    autoRetryCheck: document.getElementById('auto-retry'),
    enableMarkersCheck: document.getElementById('enable-markers'),
    verifyContainer: document.getElementById('verify-container'),
    verifyBadge: document.getElementById('verify-badge'),
    verifyWarning: document.getElementById('verify-warning'),
    altResponseBtn: document.getElementById('alt-response-btn'),
    // Drop Zones (Dynamic access via helpers preferred, but listing for clarity)
    dropZones: {
        question: document.getElementById('drop-zone-question'),
        model: document.getElementById('drop-zone-model'),
        student: document.getElementById('drop-zone-student')
    },
    inputs: {
        question: document.getElementById('file-input-question'),
        model: document.getElementById('file-input-model'),
        student: document.getElementById('file-input-student')
    },
    sources: {
        question: document.getElementById('source-question'),
        model: document.getElementById('source-model')
    },
    thumbs: {
        question: document.getElementById('thumbnails-question'),
        model: document.getElementById('thumbnails-model'),
        student: document.getElementById('thumbnails-student')
    },
    // Include Checkboxes
    includeChecks: {
        question: document.getElementById('include-question'),
        model: document.getElementById('include-model'),
        student: document.getElementById('include-student')
    },
    // Version Tag
    versionTag: document.querySelector('.version-tag'),
    // TeX Sauce Maker 連携モーダル
    texConfirmModal: document.getElementById('tex-confirm-modal'),
    texConfirmOkBtn: document.getElementById('tex-confirm-ok'),
    texConfirmCancelBtn: document.getElementById('tex-confirm-cancel'),
    closeTexConfirmBtn: document.getElementById('close-tex-confirm'),
    // 生徒ナビゲーション
    studentNav: document.getElementById('student-nav'),
    prevStudentBtn: document.getElementById('prev-student'),
    nextStudentBtn: document.getElementById('next-student'),
    studentCounter: document.getElementById('student-counter'),
    mergeStudentBtn: document.getElementById('merge-student'),
    // 画像拡大プレビュー
    imgPreviewOverlay: document.getElementById('img-preview-overlay'),
    imgPreviewLarge: document.getElementById('img-preview-large')
};

// State
let state = {
    currentSubject: 'other',
    currentMarkdown: '', // Added for edit mode
    hoveredZone: null, // Track valid drop zone under mouse
    pendingPasteFiles: [], // Store files waiting for zone selection
    theme: 'dark', // 'dark' or 'light'
    apiKey: '',
    model: 'gemini-3.1-pro-preview',
    // New File State
    files: {
        question: [],
        model: [],
        student: []
    },
    sources: {
        question: '',
        model: ''
    },
    isGenerationFinished: false, // Flag for auto-clear
    // 生徒バッチ処理
    studentFilesQueue: [],    // グループの配列: [[img1, img2], [img3], ...]
    currentStudentIndex: 0    // 現在表示中のグループインデックス
};

// Initialization
function init() {
    loadSettings();
    setupEventListeners();
    // Update version tag on load
    if (elements.versionTag) {
        elements.versionTag.textContent = 'v3.1.8';
    }
}

function loadSettings() {
    state.apiKey = localStorage.getItem('gemini_api_key') || '';
    state.model = localStorage.getItem('gemini_model') || 'gemini-3.1-pro-preview';
    state.currentSubject = localStorage.getItem('current_subject') || 'other';

    // Load Theme
    state.theme = localStorage.getItem('theme') || 'dark';
    applyTheme(state.theme);


    // Fill Settings Form
    elements.apiKeyInput.value = state.apiKey;
    elements.modelSelect.value = state.model;
    elements.subjectSelect.value = state.currentSubject;

    // Load Include Checkbox States
    elements.includeChecks.question.checked = localStorage.getItem('include_question') !== 'false';
    elements.includeChecks.model.checked = localStorage.getItem('include_model') !== 'false';
    elements.includeChecks.student.checked = localStorage.getItem('include_student') !== 'false';

    // Load Confidence and Retry Checkbox States
    elements.showConfidenceCheck.checked = localStorage.getItem('show_confidence') === 'true';
    elements.autoRetryCheck.checked = localStorage.getItem('auto_retry') === 'true';
    elements.enableMarkersCheck.checked = localStorage.getItem('enable_markers') === 'true';
}

function applyTheme(theme) {
    document.body.setAttribute('data-theme', theme);
    elements.themeToggleBtn.textContent = theme === 'dark' ? '🌙' : '☀️';
    state.theme = theme;
    localStorage.setItem('theme', theme);
}

function toggleTheme() {
    const newTheme = state.theme === 'dark' ? 'light' : 'dark';
    applyTheme(newTheme);
}

function saveSettings() {
    const key = elements.apiKeyInput.value.trim();
    const model = elements.modelSelect.value;

    if (!key) {
        alert('API Keyを入力してください');
        return;
    }

    state.apiKey = key;
    state.model = model;

    localStorage.setItem('gemini_api_key', key);
    localStorage.setItem('gemini_model', model);

    toggleModal(elements.settingsModal, false);
}

// PWA Install Prompt Handling
let deferredPrompt = null;
window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    if (elements.pwaInstallBtn) {
        elements.pwaInstallBtn.classList.remove('hidden');
    }
});

window.addEventListener('appinstalled', () => {
    deferredPrompt = null;
    if (elements.pwaInstallBtn) {
        elements.pwaInstallBtn.classList.add('hidden');
    }
    console.log('Clear Maker 3 installed successfully');
});

// Event Listeners
function setupEventListeners() {
    // PWA Install Button
    if (elements.pwaInstallBtn) {
        elements.pwaInstallBtn.addEventListener('click', async () => {
            if (deferredPrompt) {
                deferredPrompt.prompt();
                const { outcome } = await deferredPrompt.userChoice;
                if (outcome === 'accepted') {
                    console.log('User accepted PWA installation');
                }
                deferredPrompt = null;
                elements.pwaInstallBtn.classList.add('hidden');
            } else {
                alert('アプリをインストールするには、ブラウザのアドレスバー右側にある「インストール」アイコン（またはメニューの「アプリ」＞「このサイトをアプリとしてインストール」）をクリックしてください。');
            }
        });
    }

    // Drop Zone Setup
    ['question', 'model', 'student'].forEach(type => setupDropZone(type));

    // 問題・模範解答のソース入力
    ['question', 'model'].forEach(type => {
        const sourceInput = elements.sources[type];
        if (!sourceInput) return; // 古いindex.htmlがキャッシュされている場合も初期化を継続
        sourceInput.addEventListener('input', (e) => {
            state.sources[type] = e.target.value;
            state.isGenerationFinished = false;
            updateFileStatus();
        });
    });

    // Global Drag & Drop Prevention (Prevents browser from opening file on miss-drop)
    window.addEventListener('dragover', (e) => e.preventDefault());
    window.addEventListener('drop', (e) => e.preventDefault());

    // Generate Button
    elements.generateBtn.addEventListener('click', executeGeneration);

    // Paste Event
    window.addEventListener('paste', handlePaste);

    // Paste Modal Buttons
    elements.closePasteBtn.addEventListener('click', () => toggleModal(elements.pasteModal, false));
    elements.pasteOptions.forEach(btn => {
        btn.addEventListener('click', () => {
            const target = btn.getAttribute('data-target');
            if (state.pendingPasteFiles.length > 0) {
                processFiles(state.pendingPasteFiles, target);
                state.pendingPasteFiles = [];
            }
            toggleModal(elements.pasteModal, false);
        });
    });

    // Copy & Edit Buttons
    elements.copyBtn.addEventListener('click', copyResponse);
    elements.screenshotBtn.addEventListener('click', saveAsImage);
    elements.editBtn.addEventListener('click', () => toggleEditMode(true));
    elements.saveEditBtn.addEventListener('click', saveEdit);
    elements.cancelEditBtn.addEventListener('click', cancelEdit);

    // Settings Modal
    elements.openSettingsBtn.addEventListener('click', () => toggleModal(elements.settingsModal, true));
    elements.closeSettingsBtn.addEventListener('click', () => toggleModal(elements.settingsModal, false));
    elements.saveSettingsBtn.addEventListener('click', saveSettings);

    // Readme Modal
    document.getElementById('open-readme-btn').addEventListener('click', openReadme);
    document.getElementById('close-readme-btn').addEventListener('click', () => document.getElementById('readme-modal').classList.add('hidden'));

    // Subject Change
    elements.subjectSelect.addEventListener('change', (e) => {
        state.currentSubject = e.target.value;
        localStorage.setItem('current_subject', e.target.value);
    });

    // Theme Toggle
    elements.themeToggleBtn.addEventListener('click', toggleTheme);

    // Quote Checkbox Persistence
    elements.includeChecks.question.addEventListener('change', (e) => localStorage.setItem('include_question', e.target.checked));
    elements.includeChecks.model.addEventListener('change', (e) => localStorage.setItem('include_model', e.target.checked));
    elements.includeChecks.student.addEventListener('change', (e) => localStorage.setItem('include_student', e.target.checked));

    // Confidence and Retry Checkbox Persistence
    elements.showConfidenceCheck.addEventListener('change', (e) => localStorage.setItem('show_confidence', e.target.checked));
    elements.autoRetryCheck.addEventListener('change', (e) => localStorage.setItem('auto_retry', e.target.checked));
    elements.enableMarkersCheck.addEventListener('change', (e) => localStorage.setItem('enable_markers', e.target.checked));

    // TeX Sauce Maker 連携モーダル
    elements.closeTexConfirmBtn.addEventListener('click', () => toggleModal(elements.texConfirmModal, false));
    elements.texConfirmCancelBtn.addEventListener('click', () => toggleModal(elements.texConfirmModal, false));
    elements.texConfirmOkBtn.addEventListener('click', () => {
        toggleModal(elements.texConfirmModal, false);
        openTexSauceMaker();
    });

    // 生徒ナビゲーション
    elements.prevStudentBtn.addEventListener('click', () => navigateStudent(-1));
    elements.nextStudentBtn.addEventListener('click', () => navigateStudent(1));
    elements.mergeStudentBtn.addEventListener('click', mergeWithPrevious);

    // 画像拡大プレビュー: オーバーレイクリックで閉じる
    elements.imgPreviewOverlay.addEventListener('click', hidePreview);
}

function setupDropZone(type) {
    const zone = elements.dropZones[type];
    const input = elements.inputs[type];
    const container = document.querySelector(`.drop-zone-group[data-type="${type}"]`);
    const clearBtn = container.querySelector('.clear-zone-btn');

    if (!zone || !input) return;

    // Click to select
    zone.addEventListener('click', () => input.click());

    // File Input Change
    input.addEventListener('change', (e) => handleFileSelect(e, type));

    // Drag Over
    zone.addEventListener('dragover', (e) => {
        e.preventDefault();
        container.classList.add('active');
    });

    // Drag Leave
    zone.addEventListener('dragleave', (e) => {
        e.preventDefault();
        container.classList.remove('active');
    });

    // Drop
    zone.addEventListener('drop', (e) => {
        e.preventDefault();
        container.classList.remove('active');
        handleDrop(e, type);
    });

    // Hover Detection for Paste
    container.addEventListener('mouseenter', () => {
        state.hoveredZone = type;
    });
    container.addEventListener('mouseleave', () => {
        if (state.hoveredZone === type) {
            state.hoveredZone = null;
        }
    });

    // Clear Button
    if (clearBtn) {
        clearBtn.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent triggering zone click
            clearZone(type);
        });
    }
}

function clearZone(type) {
    state.files[type] = [];
    if (state.sources[type] !== undefined) {
        state.sources[type] = '';
        if (elements.sources[type]) elements.sources[type].value = '';
    }
    // 生徒ゾーンの場合、バッチキューもリセット
    if (type === 'student') {
        state.studentFilesQueue = [];
        state.currentStudentIndex = 0;
        updateStudentCounter();
    }
    renderThumbnails(type);
    updateFileStatus();
    // Clear input value so same file can be selected again if needed
    elements.inputs[type].value = '';
}

function toggleModal(modal, show) {
    if (show) modal.classList.remove('hidden');
    else modal.classList.add('hidden');
}

async function handleDrop(e, type) {
    const files = e.dataTransfer.files;
    if (files.length > 0) processFiles(files, type);
}

function handlePaste(e) {
    const items = e.clipboardData.items;
    const files = [];

    for (let i = 0; i < items.length; i++) {
        if (items[i].type.indexOf('image') !== -1) {
            const file = items[i].getAsFile();
            if (file) files.push(file);
        }
    }

    if (files.length > 0) {
        e.preventDefault(); // Prevent default paste behavior (e.g. into textarea)

        // If hovering over a valid zone, paste there
        if (state.hoveredZone) {
            processFiles(files, state.hoveredZone);
        } else {
            // Otherwise, show modal to select target
            state.pendingPasteFiles = files;
            toggleModal(elements.pasteModal, true);
        }
    }
}

function handleFileSelect(e, type) {
    const files = e.target.files;
    if (files.length > 0) processFiles(files, type);
}

async function processFiles(fileList, type) {
    const files = Array.from(fileList);
    if (files.length === 0) return;

    // Auto-clear if generation was just finished
    if (state.isGenerationFinished) {
        // Clear all files
        state.files.question = [];
        state.files.model = [];
        state.files.student = [];
        state.sources.question = '';
        state.sources.model = '';
        if (elements.sources.question) elements.sources.question.value = '';
        if (elements.sources.model) elements.sources.model.value = '';
        state.studentFilesQueue = [];
        state.currentStudentIndex = 0;
        renderThumbnails('question');
        renderThumbnails('model');
        renderThumbnails('student');
        updateStudentCounter();
        state.isGenerationFinished = false; // Reset flag
    }

    // Validate type again
    if (!type || !state.files[type]) {
        alert(`内部エラー: 不明なファイルカテゴリです (${type})`);
        return;
    }

    elements.generateBtn.disabled = true;

    try {
        const promises = files.map(file => {
            return readFile(file).catch(err => {
                console.error(`Skipped file ${file.name}:`, err);
                return null;
            });
        });

        const results = (await Promise.all(promises)).filter(r => r !== null);
        const validImages = results
            .filter(r => r.kind === 'images')
            .flatMap(r => r.items);
        const sourceFiles = results.filter(r => r.kind === 'source');

        if (type === 'student' && sourceFiles.length > 0) {
            alert('ソースファイルは問題または模範解答の欄へ追加してください。');
        }

        if (validImages.length === 0 && (sourceFiles.length === 0 || type === 'student')) {
            alert('ファイルの読み込みに失敗しました。');
        } else {
            if (type !== 'student' && sourceFiles.length > 0) {
                const importedSource = sourceFiles
                    .map(file => `% ${file.name}\n${file.text}`)
                    .join('\n\n');
                state.sources[type] = [state.sources[type].trim(), importedSource]
                    .filter(Boolean)
                    .join('\n\n');
                if (elements.sources[type]) elements.sources[type].value = state.sources[type];
            }

            // 生徒ゾーンの場合、各画像を独立グループとしてバッチキューに追加
            if (type === 'student' && validImages.length > 0) {
                validImages.forEach(img => state.studentFilesQueue.push([img]));
                state.currentStudentIndex = 0;
                state.files.student = [...state.studentFilesQueue[0]];
                updateStudentCounter();
            } else if (type !== 'student') {
                state.files[type] = [...state.files[type], ...validImages];
            }
            renderThumbnails(type);
        }

        updateFileStatus();
        elements.generateBtn.disabled = !hasAnyInput();
        elements.generateBtn.innerHTML = '✨ 解析を実行';

    } catch (err) {
        console.error(err);
        alert('予期せぬエラーが発生しました: ' + err.message);
        elements.generateBtn.disabled = !hasAnyInput();
    }
}

function renderThumbnails(type) {
    const container = elements.thumbs[type];
    container.innerHTML = '';
    const files = state.files[type];

    if (files.length === 0) {
        container.classList.add('hidden');
        return;
    }

    container.classList.remove('hidden');
    files.forEach((imgData, index) => {
        const wrapper = document.createElement('div');
        wrapper.className = 'thumbnail-wrapper';
        wrapper.style.position = 'relative';
        wrapper.style.display = 'inline-block';

        const img = document.createElement('img');
        img.src = `data:${imgData.mimeType};base64,${imgData.data}`;
        
        const removeBtn = document.createElement('button');
        removeBtn.className = 'remove-btn';
        removeBtn.innerHTML = '&times;';
        removeBtn.title = '削除';
        removeBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            removeFile(type, index);
            hidePreview();
        });

        // オーバーレイ拡大プレビュー
        img.addEventListener('mouseenter', () => showPreview(imgData));
        wrapper.addEventListener('mouseleave', hidePreview);

        wrapper.appendChild(img);
        wrapper.appendChild(removeBtn);
        container.appendChild(wrapper);
    });
}

function removeFile(type, index) {
    state.files[type].splice(index, 1);
    renderThumbnails(type);
    updateFileStatus();
}

function hasAnyInput() {
    const imageCount = state.files.question.length + state.files.model.length + state.files.student.length;
    return imageCount > 0 || Boolean(state.sources.question.trim()) || Boolean(state.sources.model.trim());
}

function updateFileStatus() {
    const total = state.files.question.length + state.files.model.length + state.files.student.length;
    const sourceLabels = [];
    if (state.sources.question.trim()) sourceLabels.push('問題ソース');
    if (state.sources.model.trim()) sourceLabels.push('模範ソース');
    const sourceStatus = sourceLabels.length > 0 ? ` / ${sourceLabels.join('・')}あり` : '';
    elements.fileStatus.textContent = `画像: ${total}枚 (問:${state.files.question.length}, 模範:${state.files.model.length}, 生徒:${state.files.student.length})${sourceStatus}`;
    elements.generateBtn.disabled = !hasAnyInput();
}

// --- 生徒ナビゲーション（バッチ処理） ---
function navigateStudent(direction) {
    const queue = state.studentFilesQueue;
    if (queue.length <= 1) return;

    const newIndex = state.currentStudentIndex + direction;
    if (newIndex < 0 || newIndex >= queue.length) return;

    state.currentStudentIndex = newIndex;

    // 表示中の生徒画像を切り替え（グループ内の全画像）
    state.files.student = [...queue[newIndex]];
    renderThumbnails('student');
    updateStudentCounter();

    // AI返答エリアをリセット
    elements.responseArea.innerHTML = '<div class="placeholder-text">ここにAIの回答が表示されます</div>';
    elements.editBtn.classList.add('hidden');
    elements.copyBtn.classList.add('hidden');
    elements.screenshotBtn.classList.add('hidden');
    state.currentMarkdown = '';
}

function mergeWithPrevious() {
    const idx = state.currentStudentIndex;
    if (idx <= 0) return;

    // 現在のグループを前のグループに結合
    const currentGroup = state.studentFilesQueue.splice(idx, 1)[0];
    state.studentFilesQueue[idx - 1].push(...currentGroup);

    // 前のグループに移動して表示
    state.currentStudentIndex = idx - 1;
    state.files.student = [...state.studentFilesQueue[idx - 1]];
    renderThumbnails('student');
    updateStudentCounter();
}

function updateStudentCounter() {
    const queue = state.studentFilesQueue;
    if (queue.length <= 1) {
        elements.studentNav.classList.add('hidden');
        return;
    }
    elements.studentNav.classList.remove('hidden');
    const group = queue[state.currentStudentIndex];
    const groupLabel = group.length > 1 ? `（${group.length}枚組）` : '';
    elements.studentCounter.textContent = `${state.currentStudentIndex + 1} / ${queue.length} 人目${groupLabel}`;
    // ボタンの有効/無効を切り替え
    elements.prevStudentBtn.disabled = (state.currentStudentIndex === 0);
    elements.nextStudentBtn.disabled = (state.currentStudentIndex === queue.length - 1);
    elements.mergeStudentBtn.disabled = (state.currentStudentIndex === 0);
}

// --- 画像拡大プレビュー ---
function showPreview(imgData) {
    elements.imgPreviewLarge.src = `data:${imgData.mimeType};base64,${imgData.data}`;
    elements.imgPreviewOverlay.classList.remove('hidden');
    // requestAnimationFrameでactiveクラスを付与（CSS transitionのため）
    requestAnimationFrame(() => {
        elements.imgPreviewOverlay.classList.add('active');
    });
}

function hidePreview() {
    elements.imgPreviewOverlay.classList.remove('active');
    // transitionが終わってから非表示にする
    setTimeout(() => {
        if (!elements.imgPreviewOverlay.classList.contains('active')) {
            elements.imgPreviewOverlay.classList.add('hidden');
            elements.imgPreviewLarge.src = '';
        }
    }, 200);
}

async function executeGeneration() {
    if (!hasAnyInput()) {
        alert('画像または問題・模範解答のソースを入力してください');
        return;
    }

    if (!state.apiKey) {
        alert('まずは右上の設定ボタン(⚙️)からAPIキーを設定してください。');
        toggleModal(elements.settingsModal, true);
        return;
    }

    if (!elements.userPrompt.value.trim()) {
        // Warning removed as per user request
    }

    setLoading(true);
    elements.generateBtn.disabled = true;

    try {
        await analyzeContent();
    } catch (err) {
        console.error(err);
        renderOutput(`### エラーが発生しました\n\`\`\`\n${err.message}\n\`\`\``);
    } finally {
        setLoading(false);
        elements.generateBtn.disabled = !hasAnyInput();
    }
}

async function analyzeContent() {
    // 必須チェック（APIキーと入力データ）
    if (!state.apiKey) {
        throw new Error('APIキーが設定されていません。');
    }

    // --- 裏モード（模範解答例モード）判定 ---
    // 問題画像または問題ソースがあり、生徒の解答がない場合に発動
    const hasQuestion = state.files.question.length > 0 || Boolean(state.sources.question.trim());
    const isModelAnswerMode = hasQuestion && state.files.student.length === 0;

    // 自動再検証用の定数
    const CONFIDENCE_RETRY_THRESHOLD = 90;

    // 確信度を出力させるための隠しプロンプトを追加
    let finalPrompt = elements.userPrompt.value;
    finalPrompt += "\n\n【重要】生徒番号・学籍番号・氏名は、出力のどこにも含めないでください。特に末尾へ生徒番号を付記しないでください。";
    finalPrompt += "\n\n【重要】自身の解答に対する絶対的な自信度を、出力の最後に必ず「【確信度：〇〇%】」という形式で出力してください（〇〇は0〜100の整数）。";

    // GASへ送信するデータをまとめる
    const payload = {
        apiKey: state.apiKey, // 生徒が入力したAPIキー
        subject: state.currentSubject,
        userPrompt: finalPrompt,
        images: {
            question: state.files.question,
            model: state.files.model,
            student: state.files.student
        },
        sources: {
            question: state.sources.question,
            model: state.sources.model
        },
        model: state.model,
        isOcrRequest: false, // 通常の解説リクエスト
        isModelAnswerMode: isModelAnswerMode, // 裏モードフラグ
        enableMarkers: elements.enableMarkersCheck.checked // 添削画像への描画フラグ
    };

    // 再検証UIをリセット
    resetVerifyUI();

    try {
        // --- 1回目の生成 ---
        const text = await callGAS(payload);
        
        // 確信度の抽出
        let confidenceScore = extractConfidence(text);
        console.log('[確信度] 1回目抽出結果:', confidenceScore);

        // --- 低確信度リトライ判定 ---
        let finalText = text;
        let retryConfidence = null;
        let retryText = null;
        let verifyResult = null; // null=リトライなし, 'match', 'mismatch', 'uncertain'

        if (elements.autoRetryCheck.checked 
            && typeof confidenceScore === 'number' 
            && confidenceScore < CONFIDENCE_RETRY_THRESHOLD) {
            console.log(`[再検証] 確信度${confidenceScore}% < ${CONFIDENCE_RETRY_THRESHOLD}% → 再生成を実行`);
            
            // 再検証中の表示（スピナーテキストを更新）
            const spinnerSpan = elements.loadingIndicator.querySelector('span');
            const originalSpinnerText = spinnerSpan.textContent;
            spinnerSpan.textContent = `確信度${confidenceScore}% → 再検証中...`;
            
            try {
                retryText = await callGAS(payload);
                retryConfidence = extractConfidence(retryText);
                console.log('[確信度] 2回目抽出結果:', retryConfidence);

                // 解答の比較
                verifyResult = compareAnswers(text, retryText);
                console.log('[再検証] 比較結果:', verifyResult);

                if (verifyResult === 'match') {
                    // 一致 → 1回目をそのまま使用
                    finalText = text;
                } else {
                    // 不一致 or 判定不能 → 確信度が高い方を表示
                    if (typeof retryConfidence === 'number' && retryConfidence > (confidenceScore || 0)) {
                        finalText = retryText;
                    } else {
                        finalText = text;
                    }
                }
            } catch (retryErr) {
                // リトライ失敗時は1回目の結果をそのまま使う
                console.error('[再検証] リトライ失敗:', retryErr);
                finalText = text;
                verifyResult = null;
            }
            spinnerSpan.textContent = originalSpinnerText;
        }

        // TikZデバッグログ用に元のテキストを利用
        const tikzDebugRegex = /(?:```(?:tikz|latex)\s*\n)?(\\begin\{tikzpicture\}[\s\S]*?\\end\{tikzpicture\})(?:\n*```)?/g;
        const tikzDebugMatches = [];
        let dm;
        while ((dm = tikzDebugRegex.exec(text)) !== null) {
            tikzDebugMatches.push(dm[1]);
        }
        if (tikzDebugMatches.length > 0) {
            console.log(`[TikZ Debug] ${tikzDebugMatches.length}個のTikZブロックを検出`);
            tikzDebugMatches.forEach((block, idx) => {
                console.log(`[TikZ Debug] ブロック${idx + 1}:`, block.substring(0, 200));
            });
        } else {
            // TikZが期待されるのに見つからない場合の診断
            if (text.includes('tikzpicture') || text.includes('begin{tikz')) {
                console.warn('[TikZ Debug] テキストにtikzpictureの文字列が含まれていますが、正規表現でマッチしませんでした');
                console.warn('[TikZ Debug] テキストの最初の500文字:', text.substring(0, 500));
            }
        }

        // GASログ用の分析データを抽出し、画面表示からは除去する。
        // モデルが区切り記号を省略して末尾にJSONだけ返した場合にも対応する。
        const separatedAnalysis = separateAnalysisData(finalText);
        const analysisData = separatedAnalysis.analysisData;
        let textWithoutAnalysis = separatedAnalysis.displayText;

        // マーカーデータを抽出
        const separatedMarkers = separateMarkersData(textWithoutAnalysis);
        const markers = separatedMarkers.markers;
        const displayText = stripConfidenceText(separatedMarkers.displayText).trim();

        // 画像の引用表示用（チェックボックス判定）
        const allImages = [];
        if (elements.includeChecks.question.checked) allImages.push(...state.files.question);
        if (elements.includeChecks.model.checked) allImages.push(...state.files.model);
        const shouldIncludeStudent = elements.includeChecks.student.checked || (elements.enableMarkersCheck && elements.enableMarkersCheck.checked);
        if (shouldIncludeStudent) {
            state.files.student.forEach((file, index) => {
                const fileWithMarkers = { ...file, markers: markers.filter(m => m.image_index === index) };
                allImages.push(fileWithMarkers);
            });
        }

        // 結果を画面にレンダリング
        renderOutput(displayText, allImages);

        // --- 再検証バッジ/バナーの表示 ---
        if (verifyResult !== null) {
            const altText = (finalText === text) ? retryText : text;
            const altConfidence = (finalText === text) ? retryConfidence : confidenceScore;
            showVerifyUI(verifyResult, altText, altConfidence, allImages);
        }

        // --- ログ収集 (OCR) の処理 ---
        let questionText = state.sources.question.trim();
        try {
            if (!questionText && state.files.question.length > 0) {
                // 同じGASにOCRリクエストとして送信
                const ocrPayload = { ...payload, isOcrRequest: true };
                const qRes = await fetch(GAS_API_URL, {
                    method: 'POST',
                    headers: { ['Content-Type']: 'text/plain;charset=utf-8' },
                    body: JSON.stringify(ocrPayload)
                });
                const qData = await qRes.json();
                if (!qData.error && qData.candidates) {
                    questionText = qData.candidates[0].content.parts[0].text;
                }
            }
        } catch (e) {
            console.error("OCRエラー:", e);
        }

        // スプレッドシートへログ送信（ログには表示中のテキストの確信度を使用）
        const logConfidence = (finalText === text) ? confidenceScore : retryConfidence;
        sendToGAS(finalText, questionText, logConfidence, analysisData);

    } catch (err) {
        throw err;
    } finally {
        let statusMsg = isModelAnswerMode ? '📝 模範解答例モード - 解析完了' : '解析完了';
        // 確信度スコアがあればステータス表示に追加（設定ONの場合のみ）
        if (typeof confidenceScore === 'number' && elements.showConfidenceCheck.checked) {
            statusMsg += ` (AI確信度: ${confidenceScore}%)`;
        }
        elements.fileStatus.textContent = statusMsg;
        state.isGenerationFinished = true;

        // --- 裏モード時: TeX Sauce Maker連携の確認ダイアログ ---
        if (isModelAnswerMode) {
            toggleModal(elements.texConfirmModal, true);
        }
    }
}

function isAnalysisData(value) {
    return value !== null
        && typeof value === 'object'
        && !Array.isArray(value)
        && Object.prototype.hasOwnProperty.call(value, 'major_category')
        && Object.prototype.hasOwnProperty.call(value, 'minor_category')
        && Object.prototype.hasOwnProperty.call(value, 'detail')
        && Object.prototype.hasOwnProperty.call(value, 'progress_score');
}

function parseAnalysisJson(jsonText, logError = false) {
    try {
        const parsed = JSON.parse(jsonText);
        return isAnalysisData(parsed) ? parsed : null;
    } catch (e) {
        if (logError) console.warn('ANALYSIS JSON parse error:', e);
        return null;
    }
}

function separateAnalysisData(markdown) {
    const source = String(markdown || '');
    let analysisData = null;
    let displayText = source.replace(
        /---ANALYSIS_START---[\s\S]*?---ANALYSIS_END---/g,
        block => {
            const jsonMatch = block.match(/\{[\s\S]*\}/);
            if (!analysisData && jsonMatch) {
                analysisData = parseAnalysisJson(jsonMatch[0], true);
            }
            return '';
        }
    );

    if (!analysisData) {
        // 区切り記号が消え、末尾のJSONだけが残った応答を救済する。
        // 末尾から「改行 + {」を順に試し、所定の4キーを持つJSONだけを除去する。
        const trimmed = displayText.trimEnd();
        let objectStart = trimmed.lastIndexOf('\n{');
        if (objectStart === -1 && trimmed.startsWith('{')) objectStart = -1;
        while (objectStart !== -1) {
            const jsonStart = objectStart + 1;
            const candidate = trimmed.slice(jsonStart).trim().replace(/\n?(?:\x60){3}\s*$/i, '').trim();
            const parsed = parseAnalysisJson(candidate);
            if (parsed) {
                analysisData = parsed;
                displayText = trimmed.slice(0, objectStart).replace(/\n?(?:\x60){3}(?:json)?\s*$/i, '');
                break;
            }
            objectStart = trimmed.lastIndexOf('\n{', objectStart - 1);
        }

        if (!analysisData && trimmed.startsWith('{')) {
            const candidate = trimmed.replace(/\n?(?:\x60){3}\s*$/i, '').trim();
            const parsed = parseAnalysisJson(candidate);
            if (parsed) {
                analysisData = parsed;
                displayText = '';
            }
        }
    }

    return { displayText: displayText.trim(), analysisData };
}

function separateMarkersData(markdown) {
    const source = String(markdown || '');
    let markers = [];
    let displayText = source.replace(
        /---MARKERS_START---([\s\S]*?)---MARKERS_END---/g,
        (match, jsonStr) => {
            try {
                const parsed = JSON.parse(jsonStr);
                if (Array.isArray(parsed)) {
                    markers = markers.concat(parsed);
                }
            } catch (e) {
                console.warn('MARKERS JSON parse error:', e);
            }
            return '';
        }
    );
    return { displayText: displayText.trim(), markers };
}

async function sendToGAS(markdown, questionText = "", confidenceScore = null, analysisData = null) {
    if (!ADMIN_GAS_WEBHOOK_URL) return;

    try {
        const payload = {
            timestamp: new Date().toISOString(),
            subject: state.currentSubject,
            model: state.model,
            systemPrompt: "GAS管理へ移行済み",
            userPrompt: elements.userPrompt.value,
            aiResponse: markdown,
            questionText: questionText,
            confidenceScore: (confidenceScore !== null) ? confidenceScore + '%' : null,
            analysisData: analysisData ? JSON.stringify(analysisData) : null
        };

        console.log('GASへデータを送信中...', payload);
        await fetch(ADMIN_GAS_WEBHOOK_URL, {
            method: 'POST',
            mode: 'no-cors',
            headers: {
                ['Content-Type']: 'text/plain;charset=utf-8',
            },
            body: JSON.stringify(payload)
        });

        console.log('GASへデータを送信しました');
    } catch (err) {
        console.error('GAS送信エラー:', err);
    }
}

function normalizeCircledNumbers(text) {
    return String(text || '').replace(/\\text\s*\{\s*([①-⑳])\s*\}/g, '$1');
}

function renderOutput(markdown, imageParts = null) {
    markdown = normalizeCircledNumbers(markdown);
    // Placeholder strategy:
    // 1. Extract all TikZ blocks and replace with placeholders
    // 2. Extract all Math blocks and replace with placeholders
    // 3. Parse Markdown
    // 4. Restore Math and TikZ blocks

    window.tikzSvgCache = window.tikzSvgCache || {};
    window.tikzRenderMap = window.tikzRenderMap || {};

    const normalizeCachedTikZSvg = (svgString) => {
        const wrapper = document.createElement('div');
        wrapper.innerHTML = svgString || '';
        const svg = wrapper.querySelector('svg');
        if (svg) {
            svg.style.position = 'static';
            svg.style.inset = 'auto';
            svg.style.left = 'auto';
            svg.style.top = 'auto';
            svg.style.transform = 'none';
            svg.style.display = 'block';
            svg.style.margin = '0 auto';
            svg.style.maxWidth = '100%';
            svg.style.height = 'auto';
            svg.style.overflow = 'visible';
        }
        return wrapper.innerHTML;
    };

    const TIKZ_PLACEHOLDER_PREFIX = 'TIKZPLACEHOLDER';
    const tikzBlocks = [];
    // TikZJaxは非ASCII文字（日本語）を処理できないため、コメント内の日本語を自動除去
    const sanitizeTikZ = (code) => {
        return code.split('\n').map(line => {
            // コメント部分（%以降）に非ASCII文字が含まれている場合、コメント部分のみ除去
            const commentIdx = line.indexOf('%');
            if (commentIdx >= 0 && /[^\x00-\x7F]/.test(line.substring(commentIdx))) {
                return line.substring(0, commentIdx).trimEnd();
            }
            return line;
        }).filter(line => line.trim() !== '' || line === '').join('\n');
    };
    const storeTikZ = (match) => {
        const placeholder = `${TIKZ_PLACEHOLDER_PREFIX}${tikzBlocks.length}`;
        tikzBlocks.push(sanitizeTikZ(match));
        // marked.jsの処理において、他のインライン要素（ボールド等）と干渉しないよう
        // プレースホルダーの前後に空行を追加して独立したブロック（段落）として強制する
        return `\n\n${placeholder}\n\n`;
    };

    // AIが末尾に付記した生徒番号・学籍番号を画面表示前に除去する。
    markdown = markdown.replace(/\s*(?:[【\[]\s*)?(?:生徒番号|学籍番号)\s*[：:]\s*[^\n】\]]+(?:\s*[】\]])?\s*$/u, '');

    let processedMarkdown = markdown;

    // Detect \begin{tikzpicture}...\end{tikzpicture}
    processedMarkdown = processedMarkdown.replace(
        /(?:```(?:tikz|latex)\s*\n)?(\\begin\{tikzpicture\}[\s\S]*?\\end\{tikzpicture\})(?:\n*```)?/g,
        (match, tikzCode) => storeTikZ(tikzCode)
    );

    // AIが \mathbf{} を使った場合に \boldsymbol{} へ自動置換（フォールバック）
    // ※TikZブロック内の数式を破壊しないよう、TikZの抽出後に実行
    processedMarkdown = processedMarkdown.replace(/\\mathbf\{/g, '\\boldsymbol{');
    processedMarkdown = processedMarkdown.replace(/\\bm\{/g, '\\boldsymbol{');

    // Use alphanumeric placeholder to avoid Markdown formatting issues
    // Use delimiters to avoid partial matching (e.g. PLACEHOLDER1 matching PLACEHOLDER10)
    const PLACEHOLDER_PREFIX = 'MATHPLACEHOLDER';
    const mathBlocks = [];

    // Helper for local storage with prefix
    const STORAGE_PREFIX = 'clear_maker_';
    const storeMath = (match) => {
        const placeholder = `${PLACEHOLDER_PREFIX}${mathBlocks.length}`;
        mathBlocks.push(match);
        return placeholder;
    };

    // Detect $$...$$
    processedMarkdown = processedMarkdown.replace(
        /\$\$([\s\S]*?)\$\$/g,
        (match) => storeMath(match)
    );

    // Detect \[...\]
    processedMarkdown = processedMarkdown.replace(
        /\\\[([\s\S]*?)\\\]/g,
        (match) => storeMath(match)
    );

    // Detect \(...\)
    processedMarkdown = processedMarkdown.replace(
        /\\\(([\s\S]*?)\\\)/g,
        (match) => storeMath(match)
    );

    // Detect $...$ (Inline, be careful not to match simple currency)
    // We assume $...$ with no spaces around $ 
    // or simply $...$ but non-greedy.
    // Simplified regex: $(not $)...$
    processedMarkdown = processedMarkdown.replace(
        /\$([^$\n]+?)\$/g,
        (match) => storeMath(match)
    );

    // Detect standalone environments: \begin{env}...\end{env}
    // We treat them as Display Math ($$...$$)
    // IMPORTANT: This must come LAST to avoid wrapping environments that were already captured by $$...$$ above
    processedMarkdown = processedMarkdown.replace(
        /(\\begin\{([a-z]+)\*?\}([\s\S]*?)\\end\{\2\*?\})/g,
        (match) => {
            return storeMath(`$$${match}$$`);
        }
    );

    // フォールバック: AIが --- を出力した場合、Markdownの水平線/Setext見出し化を防止
    processedMarkdown = processedMarkdown.replace(/^-{3,}\s*$/gm, '');

    let html = marked.parse(processedMarkdown, { breaks: true });

    // Restore Math blocks
    // IMPORTANT: Process in reverse order to avoid prefix matching issues (e.g. matching 1 inside 10)
    for (let i = mathBlocks.length - 1; i >= 0; i--) {
        const math = mathBlocks[i];
        const placeholder = `${PLACEHOLDER_PREFIX}${i}`;
        // Use global regex replacement for robustness
        const regex = new RegExp(placeholder, 'g');
        html = html.replace(regex, () => math);
    }

    // Restore TikZ blocks using an iframe to ensure TikZJax processes it correctly
    // Since TikZJax relies heavily on document load events, injecting an iframe is the most robust way
    for (let i = tikzBlocks.length - 1; i >= 0; i--) {
        const tikzCode = tikzBlocks[i];
        const placeholder = `${TIKZ_PLACEHOLDER_PREFIX}${i}`;
        // 独立したブロックとしてMarkdownパースされた際、<p>で囲まれるケースを許容して置換する
        const regex = new RegExp(`(?:<p>)?\\s*${placeholder}\\s*(?:<\\/p>)?`, 'g');

        // キャッシュによる再描画失敗を回避するため一意なIDを発行
        const uniqueId = `${Date.now()}_${i}`;
        window.tikzRenderMap[uniqueId] = tikzCode;

        const cachedSvg = window.tikzSvgCache[tikzCode];
        if (cachedSvg) {
            const tikzHtml = `<div class="tikz-container" style="text-align: center; margin: 1.5em 0; overflow-x: auto; background-color: #ffffff; padding: 1em; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
<div class="tikz-svg-cache" style="position: static; display: block; width: 100%; overflow-x: auto;">${normalizeCachedTikZSvg(cachedSvg)}</div>
</div>`;
            html = html.replace(regex, () => tikzHtml);
            continue;
        }

        const iframeContent = `<!DOCTYPE html><html><head>
<link rel="stylesheet" type="text/css" href="https://tikzjax.com/v1/fonts.css">
<style>
    body { margin: 0; padding: 10px; text-align: center; }
    svg { overflow: visible !important; }
</style>
</head><body>
<script type="text/tikz">${tikzCode}<\/script>
<script src="https://tikzjax.com/v1/tikzjax.js?v=${uniqueId}"><\/script>
<script>
// Auto-resize iframe to fit the SVG once rendered
const observer = new MutationObserver((mutations) => {
    const svg = document.querySelector('svg');
    if (svg) {
        observer.disconnect();
        // Use SVG width/height attributes (most accurate for TikZJax output)
        let width = 0, height = 0;
        const svgW = svg.getAttribute('width');
        const svgH = svg.getAttribute('height');
        if (svgW && svgH) {
            // Parse pt values to px (1pt = 1.333px)
            width = parseFloat(svgW) * (svgW.includes('pt') ? 1.333 : 1);
            height = parseFloat(svgH) * (svgH.includes('pt') ? 1.333 : 1);
        }
        if (width < 10 || height < 10) {
            const rect = svg.getBoundingClientRect();
            width = rect.width;
            height = rect.height;
        }
        // グラフが無限大に発散した場合にiframeが巨大にならないよう上限を設定
        const MAX_TIKZ_HEIGHT = 600;
        const MAX_TIKZ_WIDTH = 800;
        if (height > MAX_TIKZ_HEIGHT) {
            // SVGをクリップするためにviewBoxを設定
            const viewBoxW = parseFloat(svgW) || width;
            const viewBoxH = parseFloat(svgH) || height;
            svg.setAttribute('viewBox', '0 0 ' + viewBoxW + ' ' + viewBoxH);
            svg.setAttribute('width', Math.min(width, MAX_TIKZ_WIDTH));
            svg.setAttribute('height', MAX_TIKZ_HEIGHT);
            svg.style.overflow = 'hidden';
            height = MAX_TIKZ_HEIGHT;
            width = Math.min(width, MAX_TIKZ_WIDTH);
        }
        window.parent.postMessage({
            type: 'tikz-rendered',
            id: '${uniqueId}',
            width: width + 20,
            height: height + 20,
            svg: svg.outerHTML
        }, '*');
    }
});
observer.observe(document.body, { childList: true, subtree: true });
<\/script>
</body></html>`;

        const escapedIframeContent = iframeContent
            .replace(new RegExp('&', 'g'), '&amp;')
            .replace(new RegExp('<', 'g'), '&lt;')
            .replace(new RegExp('>', 'g'), '&gt;')
            .replace(new RegExp('"', 'g'), '&quot;')
            .replace(new RegExp("'", 'g'), '&#39;');

        const tikzHtml = `<div class="tikz-container" style="text-align: center; margin: 1.5em 0; overflow-x: auto; background-color: #ffffff; padding: 1em; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
<iframe id="tikz-iframe-${uniqueId}" srcdoc="${escapedIframeContent}" style="border: none; width: 100%; height: 100px; max-width: 100%; max-height: 620px; overflow: hidden; background-color: transparent;" scrolling="no"></iframe>
</div>`;
        html = html.replace(regex, () => tikzHtml);
    }
    
    // Save TikZ blocks to window to retain state for TeX Sauce Maker even after saving edits
    window.tikzBlocks = [...tikzBlocks];

    if (imageParts && Array.isArray(imageParts) && imageParts.length > 0) {
        let imgsHtml = '<div class="response-images-column">';
        imageParts.forEach(part => {
            const imgSrc = `data:${part.mimeType};base64,${part.data}`;
            const markersAttr = part.markers && part.markers.length > 0 ? ` data-markers='${JSON.stringify(part.markers).replace(/'/g, "&#39;")}'` : '';
            imgsHtml += `<div class="response-image-card"><img src="${imgSrc}" class="response-preview-image marked-image-candidate" alt="Uploaded Content"${markersAttr}></div>`;
        });
        imgsHtml += '</div>';

        html = `<div class="response-split-layout">${imgsHtml}<div class="response-text-column">${html}</div></div>`;
    }

    elements.responseArea.innerHTML = html;
    elements.editBtn.classList.remove('hidden');
    elements.copyBtn.classList.remove('hidden');
    elements.screenshotBtn.classList.remove('hidden');

    // マーカー描画処理 (非同期)
    const candidateImages = elements.responseArea.querySelectorAll('.marked-image-candidate[data-markers]');
    candidateImages.forEach(imgEl => {
        const markersStr = imgEl.getAttribute('data-markers');
        if (markersStr) {
            try {
                const markers = JSON.parse(markersStr);
                drawMarkersOnImage(imgEl, markers);
            } catch (e) {
                console.error("Marker drawing error", e);
            }
        }
    });

    // Save current markdown for editing
    state.currentMarkdown = markdown;

    // Render Math with KaTeX
    if (window.renderMathInElement) {
        renderMathInElement(elements.responseArea, {
            delimiters: [
                { left: '$$', right: '$$', display: true },
                { left: '\\[', right: '\\]', display: true },
                { left: '$', right: '$', display: false },
                { left: '\\(', right: '\\)', display: false }
            ],
            throwOnError: false,
            macros: {
                ['\\bm']: '\\boldsymbol',
                ['\\maruichi']: '\\text{①}',
                ['\\maruni']: '\\text{②}',
                ['\\marusan']: '\\text{③}',
                ['\\marushi']: '\\text{④}'
            }
        });
    }

    // Setup message listener for iframe resizing if not already added
    if (!window._tikzResizeListenerAdded) {
        window.addEventListener('message', (event) => {
            if (event.data && (event.data.type === 'tikz-resize' || event.data.type === 'tikz-rendered')) {
                const iframe = document.getElementById(`tikz-iframe-${event.data.id}`);
                if (iframe) {
                    // グラフ発散時の上限制御
                    const maxH = 620;
                    const clampedWidth = Math.min(event.data.width, 820);
                    const clampedHeight = Math.min(event.data.height, maxH);
                    iframe.style.width = clampedWidth + 'px';
                    iframe.style.height = clampedHeight + 'px';
                }
                if (event.data.type === 'tikz-rendered' && event.data.svg) {
                    const tikzCode = window.tikzRenderMap && window.tikzRenderMap[event.data.id];
                    if (tikzCode) {
                        window.tikzSvgCache = window.tikzSvgCache || {};
                        window.tikzSvgCache[tikzCode] = normalizeCachedTikZSvg(event.data.svg);
                    }
                }
            }
        });
        window._tikzResizeListenerAdded = true;
    }
}

function markerDescriptionHasMath(text) {
    let delimiterCount = 0;
    let escaped = false;
    for (const char of String(text || '')) {
        if (char === '\\' && !escaped) {
            escaped = true;
            continue;
        }
        if (char === '$' && !escaped) delimiterCount += 1;
        escaped = false;
    }
    return delimiterCount >= 2;
}

async function renderMarkerMathDescription(description, fontSize) {
    description = normalizeCircledNumbers(description);
    if (!markerDescriptionHasMath(description) || !window.renderMathInElement || !window.html2canvas) {
        return null;
    }

    const renderHost = document.createElement('span');
    renderHost.style.cssText = [
        'position:fixed',
        'left:-10000px',
        'top:0',
        'display:inline-block',
        'white-space:nowrap',
        'padding:0',
        'margin:0',
        'color:#1e293b',
        `font:600 ${fontSize}px -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif`,
        'line-height:1.2',
        'background:transparent'
    ].join(';');
    // AI生成文をHTMLとして解釈させず、KaTeXの区切り記号だけを処理する。
    renderHost.textContent = String(description || '');
    document.body.appendChild(renderHost);

    try {
        renderMathInElement(renderHost, {
            delimiters: [{ left: '$', right: '$', display: false }],
            throwOnError: false,
            trust: false,
            strict: 'warn',
            macros: {
                ['\\bm']: '\\boldsymbol',
                ['\\maruichi']: '\\text{①}',
                ['\\maruni']: '\\text{②}',
                ['\\marusan']: '\\text{③}',
                ['\\marushi']: '\\text{④}'
            }
        });
        if (document.fonts && document.fonts.ready) await document.fonts.ready;

        const bounds = renderHost.getBoundingClientRect();
        if (!bounds.width || !bounds.height) return null;

        const bitmap = await html2canvas(renderHost, {
            backgroundColor: null,
            logging: false,
            scale: 2,
            useCORS: true
        });
        return { canvas: bitmap, width: bounds.width, height: bounds.height };
    } catch (error) {
        console.warn('Marker KaTeX rendering failed; using plain text instead.', error);
        return null;
    } finally {
        renderHost.remove();
    }
}

function drawMarkersOnImage(imgEl, markers) {
    const originalSrc = imgEl.src;
    const img = new Image();
    img.onload = async () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);
        
        for (const marker of markers) {
            const xmin = typeof marker.xmin === 'number' ? marker.xmin : 0;
            const ymin = typeof marker.ymin === 'number' ? marker.ymin : 0;
            const xmax = typeof marker.xmax === 'number' ? marker.xmax : 1000;
            const ymax = typeof marker.ymax === 'number' ? marker.ymax : 1000;

            const x = (xmin / 1000) * canvas.width;
            const y = (ymin / 1000) * canvas.height;
            const w = ((xmax - xmin) / 1000) * canvas.width;
            const h = ((ymax - ymin) / 1000) * canvas.height;
            
            // Check for valid dimensions
            if (w <= 0 || h <= 0) continue;

            const isCheck = marker.type === 'check';
            const themeColor = isCheck ? '#059669' : '#dc2626'; // Emerald green or Rose red
            const lightColor = isCheck ? '#ecfdf5' : '#fef2f2';
            const badgeTag = isCheck ? (marker.point ? `P${marker.point} ◎` : 'GOOD') : (marker.point ? `P${marker.point}` : 'FIX');
            const desc = normalizeCircledNumbers(marker.description);

            // Dynamic font sizing based on image resolution (ensure comfortable readability)
            const scale = Math.max(1.3, canvas.width / 750);
            const tagFontSize = Math.round(13 * scale);
            const textFontSize = Math.round(15 * scale);
            const padX = Math.round(12 * scale);
            const padY = Math.round(8 * scale);
            const radius = Math.round(10 * scale);

            // Measure texts
            ctx.font = `bold ${tagFontSize}px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`;
            const tagWidth = ctx.measureText(badgeTag).width + Math.round(12 * scale);

            ctx.font = `600 ${textFontSize}px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`;
            const renderedDesc = desc ? await renderMarkerMathDescription(desc, textFontSize) : null;
            const descWidth = renderedDesc ? renderedDesc.width : (desc ? ctx.measureText(desc).width : 0);
            const descHeight = renderedDesc ? renderedDesc.height : textFontSize * 1.2;

            const iconWidth = Math.round(22 * scale);
            const totalWidth = iconWidth + tagWidth + (desc ? descWidth + Math.round(14 * scale) : 0) + padX * 2;
            const totalHeight = Math.max(Math.round(34 * scale), Math.ceil(descHeight + padY * 2));

            // Positioning: anchor to (x, y), keep within canvas boundaries
            let bx = Math.max(8 * scale, Math.min(x, canvas.width - totalWidth - 8 * scale));
            let by = Math.max(totalHeight + 12 * scale, Math.min(y, canvas.height - 8 * scale));
            const cardY = by - totalHeight - Math.round(6 * scale);

            // 1. Draw target pointer dot & subtle line to the exact spot
            ctx.save();
            ctx.strokeStyle = themeColor;
            ctx.lineWidth = Math.max(1.5, 2 * scale);
            ctx.beginPath();
            ctx.arc(x, y, 3.5 * scale, 0, 2 * Math.PI);
            ctx.fillStyle = themeColor;
            ctx.fill();

            // Subtle connecting line from target to badge
            ctx.beginPath();
            ctx.setLineDash([3 * scale, 3 * scale]);
            ctx.moveTo(x, y);
            ctx.lineTo(bx + totalWidth / 2, cardY + totalHeight);
            ctx.stroke();
            ctx.setLineDash([]);
            ctx.restore();

            // 2. Draw card shadow
            ctx.save();
            ctx.shadowColor = 'rgba(15, 23, 42, 0.2)';
            ctx.shadowBlur = 10 * scale;
            ctx.shadowOffsetY = 3 * scale;

            // Draw card background
            ctx.fillStyle = '#ffffff';
            ctx.beginPath();
            if (ctx.roundRect) {
                ctx.roundRect(bx, cardY, totalWidth, totalHeight, radius);
            } else {
                ctx.rect(bx, cardY, totalWidth, totalHeight);
            }
            ctx.fill();
            ctx.restore();

            // 3. Draw card border
            ctx.save();
            ctx.strokeStyle = themeColor;
            ctx.lineWidth = Math.max(1, 1.5 * scale);
            ctx.beginPath();
            if (ctx.roundRect) {
                ctx.roundRect(bx, cardY, totalWidth, totalHeight, radius);
            } else {
                ctx.rect(bx, cardY, totalWidth, totalHeight);
            }
            ctx.stroke();

            // 4. Draw Pen Icon / Emoji
            const curX = bx + padX;
            const curY = cardY + totalHeight / 2;
            ctx.font = `${Math.round(14 * scale)}px sans-serif`;
            ctx.textAlign = 'left';
            ctx.textBaseline = 'middle';
            ctx.fillText(isCheck ? '✨' : '🖊️', curX, curY);

            // 5. Draw Tag Pill (e.g. "P3")
            const tagX = curX + iconWidth;
            const tagH = Math.round(18 * scale);
            const tagY = curY - tagH / 2;

            ctx.fillStyle = themeColor;
            ctx.beginPath();
            if (ctx.roundRect) {
                ctx.roundRect(tagX, tagY, tagWidth, tagH, Math.round(4 * scale));
            } else {
                ctx.rect(tagX, tagY, tagWidth, tagH);
            }
            ctx.fill();

            // Tag text inside pill
            ctx.fillStyle = '#ffffff';
            ctx.font = `bold ${tagFontSize}px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(badgeTag, tagX + tagWidth / 2, curY);

            // 6. Draw Description text (具体的修正案)
            if (desc) {
                const textX = tagX + tagWidth + Math.round(8 * scale);
                if (renderedDesc) {
                    ctx.drawImage(
                        renderedDesc.canvas,
                        textX,
                        curY - renderedDesc.height / 2,
                        renderedDesc.width,
                        renderedDesc.height
                    );
                } else {
                    ctx.fillStyle = '#1e293b'; // Slate 800 for high readability & clean design
                    ctx.font = `600 ${textFontSize}px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`;
                    ctx.textAlign = 'left';
                    ctx.textBaseline = 'middle';
                    ctx.fillText(desc, textX, curY);
                }
            }
            ctx.restore();
        }
        
        imgEl.src = canvas.toDataURL('image/jpeg', 0.95);
    };
    img.src = originalSrc;
}

async function readFile(file) {
    const extension = file.name.includes('.') ? file.name.split('.').pop().toLowerCase() : '';
    const sourceExtensions = ['tex', 'txt', 'md', 'markdown', 'html', 'htm'];
    const isSource = file.type.startsWith('text/') || sourceExtensions.includes(extension);

    if (isSource) {
        const MAX_SOURCE_BYTES = 1024 * 1024;
        if (file.size > MAX_SOURCE_BYTES) {
            throw new Error('ソースファイルは1MB以下にしてください。');
        }
        return { kind: 'source', name: file.name, text: await file.text() };
    }

    if (file.type.startsWith('image/')) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (e) => {
                // Remove prefix: data:image/png;base64,
                const base64 = e.target.result.split(',')[1];
                // Return as array for consistency with PDF multi-page
                resolve({ kind: 'images', items: [{ mimeType: file.type, data: base64 }] });
            };
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    } else if (file.type === 'application/pdf') {
        const arrayBuffer = await file.arrayBuffer();
        return { kind: 'images', items: await convertPdfToImage(arrayBuffer) };
    } else {
        throw new Error('対応していないファイル形式です（画像、PDF、TeX、TXT、Markdown、HTMLのみ）');
    }
}

async function convertPdfToImage(arrayBuffer) {
    if (typeof pdfjsLib === 'undefined') {
        throw new Error('PDF解析ライブラリ (pdfjsLib) が読み込まれていません。ページをリロードしてみてください。');
    }

    try {
        // Load PDF
        const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
        const pdf = await loadingTask.promise;

        const maxPages = pdf.numPages;
        const images = [];

        // Limit pages to avoid browser crash on huge PDFs
        const MAX_PAGES_TO_PROCESS = 10;
        const pagesToProcess = Math.min(maxPages, MAX_PAGES_TO_PROCESS);

        if (maxPages > MAX_PAGES_TO_PROCESS) {
            console.warn(`PDF has ${maxPages} pages. Only first ${MAX_PAGES_TO_PROCESS} will be processed.`);
            // Optional: alert user
        }

        for (let pageNum = 1; pageNum <= pagesToProcess; pageNum++) {
            const page = await pdf.getPage(pageNum);

            // Set scale for quality
            const viewport = page.getViewport({ scale: 2.0 });

            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d');
            canvas.height = viewport.height;
            canvas.width = viewport.width;

            const renderContext = {
                canvasContext: context,
                viewport: viewport
            };

            // Fill with white background
            context.fillStyle = '#FFFFFF';
            context.fillRect(0, 0, canvas.width, canvas.height);

            await page.render(renderContext).promise;

            // Convert to base64 jpeg
            const dataUrl = canvas.toDataURL('image/jpeg', 0.95);
            images.push({
                mimeType: 'image/jpeg',
                data: dataUrl.split(',')[1]
            });
        }

        return images;
    } catch (err) {
        console.error('PDF Conversion Error:', err);
        throw new Error('PDFの変換中にエラーが発生しました: ' + err.message);
    }
}
function copyResponse() {
    // Get text content, excluding the hidden elements if any, but specifically targeting response text
    // Simple approach: clone, remove image, get text
    const clone = elements.responseArea.cloneNode(true);
    const images = clone.getElementsByTagName('img');
    while (images.length > 0) {
        images[0].remove();
    }
    const hr = clone.getElementsByTagName('hr');
    while (hr.length > 0) {
        hr[0].remove();
    }

    const text = clone.innerText.trim();

    navigator.clipboard.writeText(text).then(() => {
        const originalText = elements.copyBtn.textContent;
        elements.copyBtn.textContent = '✅';
        setTimeout(() => {
            elements.copyBtn.textContent = originalText;
        }, 2000);
    }).catch(err => {
        console.error('Copy failed', err);
        alert('コピーに失敗しました');
    });
}

function setLoading(isLoading) {
    if (isLoading) {
        elements.loadingIndicator.classList.remove('hidden');
        elements.responseArea.style.opacity = '0.3';
        elements.copyBtn.classList.add('hidden');
        elements.screenshotBtn.classList.add('hidden');
    } else {
        elements.loadingIndicator.classList.add('hidden');
        elements.responseArea.style.opacity = '1';
    }
}

function saveAsImage() {
    const target = elements.responseArea;
    const originalBg = target.style.background;

    // Set background explicit for Screenshot (Dark Theme)
    const dataTheme = document.body.getAttribute('data-theme');
    const bgHex = dataTheme === 'light' ? '#f8fafc' : '#0f172a';
    const captureBg = dataTheme === 'light' ? '#f1f5f9' : '#1e293b';

    target.style.background = bgHex; // Match body bg or darker panel

    // Ensure padding
    const originalPadding = target.style.padding;
    target.style.padding = '24px';

    // --- TikZ iframe を一時的に画像 (IMGタグ) に変換して埋め込む ---
    // html2canvasのSVG座標ズレや描画崩れを防ぐため、完全に独立した画像として扱う
    const iframes = target.querySelectorAll('iframe[id^="tikz-iframe-"]');
    const iframeReplacements = [];
    const inlineSvgReplacements = [];

    iframes.forEach(iframe => {
        try {
            const svgDoc = iframe.contentDocument || iframe.contentWindow.document;
            const svgElement = svgDoc.querySelector('svg');
            if (svgElement) {
                const width = iframe.style.width || '100%';
                const height = iframe.style.height || 'auto';

                const svgString = new XMLSerializer().serializeToString(svgElement);
                const encodedData = btoa(unescape(encodeURIComponent(svgString)));

                const img = document.createElement('img');
                img.src = 'data:image/svg+xml;base64,' + encodedData;
                img.style.width = width;
                img.style.height = height;
                img.style.display = 'block';
                img.style.margin = '0 auto';

                const parent = iframe.parentNode;
                const originalOverflow = parent.style.overflowX;
                parent.style.overflowX = 'visible'; // SVGが見切れるのを防ぐ

                parent.insertBefore(img, iframe);
                iframe.style.display = 'none';

                iframeReplacements.push({
                    iframe: iframe,
                    img: img,
                    parent: parent,
                    originalOverflow: originalOverflow
                });
            }
        } catch (e) {
            console.warn('[TikZ Capture] Cannot access iframe content', e);
        }
    });

    target.querySelectorAll('.tikz-svg-cache svg').forEach(svgElement => {
        try {
            const rect = svgElement.getBoundingClientRect();
            const width = rect.width || parseFloat(svgElement.getAttribute('width')) || 300;
            const height = rect.height || parseFloat(svgElement.getAttribute('height')) || 200;
            const svgClone = svgElement.cloneNode(true);
            svgClone.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
            svgClone.setAttribute('width', width);
            svgClone.setAttribute('height', height);
            svgClone.style.position = 'static';
            svgClone.style.display = 'block';
            svgClone.style.margin = '0 auto';

            const svgString = new XMLSerializer().serializeToString(svgClone);
            const encodedData = btoa(unescape(encodeURIComponent(svgString)));

            const img = document.createElement('img');
            img.src = 'data:image/svg+xml;base64,' + encodedData;
            img.style.width = width + 'px';
            img.style.height = height + 'px';
            img.style.display = 'block';
            img.style.margin = '0 auto';

            svgElement.parentNode.insertBefore(img, svgElement);
            svgElement.style.display = 'none';

            inlineSvgReplacements.push({
                svg: svgElement,
                img: img
            });
        } catch (e) {
            console.warn('[TikZ Capture] Cannot convert cached SVG', e);
        }
    });

    // 一時的にキャプチャ用幅を設定して横並びを安定化
    const originalWidth = target.style.width;
    const originalMaxWidth = target.style.maxWidth;
    const isSplit = target.querySelector('.response-split-layout') !== null;
    if (isSplit) {
        target.style.width = '1400px';
        target.style.maxWidth = '1400px';
    }

    html2canvas(target, {
        useCORS: true,
        scale: 2, // High resolution
        backgroundColor: captureBg, // Force background color
        logging: false,
        windowWidth: isSplit ? 1500 : undefined
    }).then(canvas => {
        // --- 元に戻す ---
        if (isSplit) {
            target.style.width = originalWidth;
            target.style.maxWidth = originalMaxWidth;
        }
        iframeReplacements.forEach(replacement => {
            replacement.img.remove();
            replacement.iframe.style.display = ''; // Restore original display
            replacement.parent.style.overflowX = replacement.originalOverflow;
        });
        inlineSvgReplacements.forEach(replacement => {
            replacement.img.remove();
            replacement.svg.style.display = '';
        });

        // Revert style
        target.style.background = originalBg;
        target.style.padding = originalPadding;

        const link = document.createElement('a');
        link.download = `clear_maker_response_${Date.now()}.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();
    }).catch(err => {
        // --- エラー時も元に戻す ---
        if (isSplit) {
            target.style.width = originalWidth;
            target.style.maxWidth = originalMaxWidth;
        }
        iframeReplacements.forEach(replacement => {
            replacement.img.remove();
            replacement.iframe.style.display = '';
            replacement.parent.style.overflowX = replacement.originalOverflow;
        });
        inlineSvgReplacements.forEach(replacement => {
            replacement.img.remove();
            replacement.svg.style.display = '';
        });

        console.error(err);
        target.style.background = originalBg;
        target.style.padding = originalPadding;
        alert('画像の保存に失敗しました');
    });
}

// --- TeX Sauce Maker 連携 ---
// 出力エリアを画像化してTeX Sauce Makerに送信する
function openTexSauceMaker() {
    const target = elements.responseArea;
    const originalBg = target.style.background;

    // 背景色を明示的に設定（スクリーンショット用）
    const dataTheme = document.body.getAttribute('data-theme');
    const bgHex = dataTheme === 'light' ? '#f8fafc' : '#0f172a';
    const captureBg = dataTheme === 'light' ? '#f1f5f9' : '#1e293b';

    target.style.background = bgHex;
    const originalPadding = target.style.padding;
    target.style.padding = '24px';

    const iframes = target.querySelectorAll('iframe[id^="tikz-iframe-"]');
    const iframeReplacements = [];

    // --- 追加: 生のTikZコードを抽出してTeX Sauce Makerに送る準備 ---
    let extractedTikZ = [];
    if (window.tikzBlocks && window.tikzBlocks.length > 0) {
        extractedTikZ = [...window.tikzBlocks];
    } else {
        // フォールバック: 現在はiframeの中身から取得するのは困難なため、window.tikzBlocksに依存します
        // （renderOutput時に保存されている前提）
    }

    iframes.forEach(iframe => {
        try {
            const svgDoc = iframe.contentDocument || iframe.contentWindow.document;
            const svgElement = svgDoc.querySelector('svg');
            if (svgElement) {
                const width = iframe.style.width || '100%';
                const height = iframe.style.height || 'auto';

                const svgString = new XMLSerializer().serializeToString(svgElement);
                const encodedData = btoa(unescape(encodeURIComponent(svgString)));

                const img = document.createElement('img');
                img.src = 'data:image/svg+xml;base64,' + encodedData;
                img.style.width = width;
                img.style.height = height;
                img.style.display = 'block';
                img.style.margin = '0 auto';

                const parent = iframe.parentNode;
                const originalOverflow = parent.style.overflowX;
                parent.style.overflowX = 'visible';

                parent.insertBefore(img, iframe);
                iframe.style.display = 'none';

                iframeReplacements.push({
                    iframe: iframe,
                    img: img,
                    parent: parent,
                    originalOverflow: originalOverflow
                });
            }
        } catch (e) {
            console.warn('[TikZ Capture] Cannot access iframe content', e);
        }
    });

    html2canvas(target, {
        useCORS: true,
        scale: 2,
        backgroundColor: captureBg,
        logging: false
    }).then(canvas => {
        // --- 元に戻す ---
        iframeReplacements.forEach(replacement => {
            replacement.img.remove();
            replacement.iframe.style.display = '';
            replacement.parent.style.overflowX = replacement.originalOverflow;
        });

        // スタイルを元に戻す
        target.style.background = originalBg;
        target.style.padding = originalPadding;

        const dataUrl = canvas.toDataURL('image/png');

        // TeX Sauce Makerを新しいタブで開く
        const texWindow = window.open(TEX_SAUCE_MAKER_URL, '_blank');

        if (!texWindow) {
            alert('TeX Sauce Makerを開けませんでした。ポップアップがブロックされている可能性があります。');
            return;
        }

        // TeX Sauce Makerからの "ready" メッセージを待ってから画像を送信
        const messageHandler = (event) => {
            if (event.data && event.data.type === 'tex-sauce-maker-ready') {
                window.removeEventListener('message', messageHandler);
                // 画像データと生のTikZコードをpostMessageで送信
                texWindow.postMessage({
                    type: 'clear-maker-image',
                    imageDataUrl: dataUrl,
                    mimeType: 'image/png',
                    tikzCodeArray: extractedTikZ // 追加: TikZコード配列
                }, '*');
                console.log('[TeX連携] 画像データとTikZコードをTeX Sauce Makerに送信しました');
            }
        };
        window.addEventListener('message', messageHandler);

        // タイムアウト処理（30秒でリスナー解除）
        setTimeout(() => {
            window.removeEventListener('message', messageHandler);
        }, 30000);

    }).catch(err => {
        // --- エラー時も元に戻す ---
        iframeReplacements.forEach(replacement => {
            replacement.img.remove();
            replacement.iframe.style.display = '';
            replacement.parent.style.overflowX = replacement.originalOverflow;
        });

        console.error(err);
        target.style.background = originalBg;
        target.style.padding = originalPadding;
        alert('画像のキャプチャに失敗しました');
    });
}

// Edit Mode Functions
function toggleEditMode(isEditing) {
    if (isEditing) {
        elements.responseArea.classList.add('editor-hidden');
        elements.responseEditor.classList.remove('hidden');

        elements.responseEditor.value = state.currentMarkdown || '';

        elements.editBtn.classList.add('hidden');
        elements.copyBtn.classList.add('hidden');
        elements.screenshotBtn.classList.add('hidden');
        elements.editActions.classList.remove('hidden');
    } else {
        elements.responseArea.classList.remove('editor-hidden');
        elements.responseEditor.classList.add('hidden');

        elements.editBtn.classList.remove('hidden');
        elements.copyBtn.classList.remove('hidden');
        elements.screenshotBtn.classList.remove('hidden');
        elements.editActions.classList.add('hidden');
    }
}

function hasTikZBlock(markdown) {
    return /\\begin\{tikzpicture\}[\s\S]*?\\end\{tikzpicture\}/.test(markdown || '');
}

function extractTikZBlocks(markdown) {
    const blocks = [];
    const regex = /(?:```(?:tikz|latex)\s*\n)?(\\begin\{tikzpicture\}[\s\S]*?\\end\{tikzpicture\})(?:\n*```)?/g;
    let match;
    while ((match = regex.exec(markdown || '')) !== null) {
        blocks.push(match[1]);
    }
    return blocks;
}

function getIncludedResponseImages() {
    const allImages = [];
    if (elements.includeChecks.question.checked) allImages.push(...state.files.question);
    if (elements.includeChecks.model.checked) allImages.push(...state.files.model);
    if (elements.includeChecks.student.checked || (elements.enableMarkersCheck && elements.enableMarkersCheck.checked)) allImages.push(...state.files.student);
    return allImages;
}

function appendPreservedTikZBlocks(markdown, tikzBlocks) {
    if (hasTikZBlock(markdown) || !Array.isArray(tikzBlocks) || tikzBlocks.length === 0) {
        return markdown;
    }
    return `${markdown.trimEnd()}\n\n${tikzBlocks.join('\n\n')}`;
}

function saveEdit() {
    const preservedTikZBlocks = hasTikZBlock(state.currentMarkdown)
        ? ((window.tikzBlocks && window.tikzBlocks.length > 0)
            ? [...window.tikzBlocks]
            : extractTikZBlocks(state.currentMarkdown))
        : [];
    const newMarkdown = appendPreservedTikZBlocks(elements.responseEditor.value, preservedTikZBlocks);
    state.currentMarkdown = newMarkdown;

    toggleEditMode(false);
    renderOutput(newMarkdown, getIncludedResponseImages());
}

function cancelEdit() {
    toggleEditMode(false);
    requestAnimationFrame(() => {
        renderOutput(state.currentMarkdown, getIncludedResponseImages());
    });
}

async function openReadme() {
    const modal = document.getElementById('readme-modal');
    const content = document.getElementById('readme-content');

    // Close settings modal first
    toggleModal(elements.settingsModal, false);

    // Show Readme Modal
    toggleModal(modal, true);

    content.innerHTML = '<p>読み込み中...</p>';

    try {
        console.log('v1.6.0: Loading embedded README...');


        // Use embedded content instead of fetch
        const text = README_CONTENT;

        // Parse Markdown using marked (already loaded)
        if (typeof marked === 'undefined') {
            throw new Error('Marked library is not loaded');
        }

        const html = marked.parse(text);

        content.innerHTML = html;

    } catch (err) {
        console.error('Failed to load README:', err);
        content.innerHTML = `<p style="color:red">読み込みに失敗しました。<br>${err.message}</p>`;
    }
}

// --- GAS API呼び出しの共通関数 ---
async function callGAS(payload) {
    const response = await fetch(GAS_API_URL, {
        method: 'POST',
        headers: { ['Content-Type']: 'text/plain;charset=utf-8' },
        body: JSON.stringify(payload)
    }).catch(err => {
        if (err.message && err.message.includes('Failed to fetch')) {
            throw new Error('通信エラーが発生しました。\n\nGASウェブアプリのURLが間違っているか、デプロイ設定の「アクセスできるユーザー」が「全員」になっていない可能性があります。\n⚙️設定から再度URLなどを確認してください。');
        }
        throw err;
    });

    let data;
    try {
        data = await response.json();
    } catch (jsonErr) {
        console.error('JSON Parse Error. The response might be HTML (GAS Error):', jsonErr);
        throw new Error('GASからの応答が不正です（JSON形式ではありません）。\n\nGoogle側のシステム障害、またはGASの実行時間超過（タイムアウト）の可能性があります。\nしばらく時間をおいてから再度お試しください。');
    }

    if (data.error) {
        throw new Error(data.error);
    }

    return data.candidates[0].content.parts[0].text;
}

// --- 確信度抽出 ---
function extractConfidence(text) {
    const match = text.match(/【確信度[:：]\s*(\d+)\s*[%％]?\s*】/);
    if (match) return parseInt(match[1], 10);
    const fallback = text.match(/確信度[:：]?\s*(\d+)\s*[%％]/);
    if (fallback) return parseInt(fallback[1], 10);
    const lineMatch = text.match(/確信度.*?[：:]?\s*(\d+)/);
    if (lineMatch) return parseInt(lineMatch[1], 10);
    return null;
}

// --- 確信度テキストの除去 ---
function stripConfidenceText(text) {
    if (!elements.showConfidenceCheck.checked) {
        // "確信度" という文字を含む行を、Markdown装飾や前後の不要な改行ごと丸ごと削除する
        text = text.replace(/\n*.*確信度.*\n*/g, '\n');
        text = text.trimEnd();
    }
    return text;
}

// --- 再検証UIの表示/リセット ---
function resetVerifyUI() {
    if (!elements.verifyContainer) return;
    elements.verifyContainer.classList.add('hidden');
    elements.verifyBadge.classList.add('hidden');
    elements.verifyWarning.classList.add('hidden');
    
    // 前回イベントリスナーを解除するためクローン置換
    if (elements.altResponseBtn) {
        const oldBtn = elements.altResponseBtn;
        const newBtn = oldBtn.cloneNode(true);
        oldBtn.parentNode.replaceChild(newBtn, oldBtn);
        elements.altResponseBtn = newBtn;
    }
}

function showVerifyUI(result, altText, altConfidence, allImages) {
    if (!elements.verifyContainer) return;
    elements.verifyContainer.classList.remove('hidden');

    if (result === 'match') {
        elements.verifyBadge.classList.remove('hidden');
        elements.verifyWarning.classList.add('hidden');
    } else {
        elements.verifyBadge.classList.add('hidden');
        elements.verifyWarning.classList.remove('hidden');
        
        const span = elements.verifyWarning.querySelector('span');
        if (result === 'uncertain') {
            span.textContent = '⚠️ 自動再検証の結果、解の一致を自動判定できませんでした';
        } else {
            span.textContent = '⚠️ 自動再検証の結果、回答に差異がありました（確信度が高い方を表示中）';
        }

        let showingAlt = false;
        const currentMarkdownBackup = state.currentMarkdown;
        elements.altResponseBtn.addEventListener('click', () => {
            showingAlt = !showingAlt;
            if (showingAlt) {
                const altDisplay = stripConfidenceText(separateAnalysisData(altText).displayText);
                renderOutput(altDisplay, allImages);
                elements.altResponseBtn.textContent = '元の回答に戻る';
            } else {
                renderOutput(currentMarkdownBackup, allImages);
                elements.altResponseBtn.textContent = '他の回答を表示';
            }
        });
    }
}

// --- 解の比較ロジック ---
function compareAnswers(text1, text2) {
    const answer1 = extractFinalAnswer(text1);
    const answer2 = extractFinalAnswer(text2);
    if (!answer1 || !answer2) return 'uncertain';
    return normalizeAnswer(answer1) === normalizeAnswer(answer2) ? 'match' : 'mismatch';
}

function extractFinalAnswer(text) {
    const bmMatches = [...text.matchAll(/\$\\bm\{([^}]+)\}\$/g)];
    if (bmMatches.length > 0) return bmMatches[bmMatches.length - 1][1];
    
    const boldMatches = [...text.matchAll(/\$\\boldsymbol\{([^}]+)\}\$/g)];
    if (boldMatches.length > 0) return boldMatches[boldMatches.length - 1][1];

    const answerPatterns = [
        /答え[：:]?\s*(.+?)(?:\n|$)/,
        /答[：:]\s*(.+?)(?:\n|$)/,
        /∴\s*(.+?)(?:\n|$)/,
        /よって[、，]?\s*(.+?)(?:\n|$)/,
        /したがって[、，]?\s*(.+?)(?:\n|$)/,
        /以上より[、，]?\s*(.+?)(?:\n|$)/
    ];

    const latterHalf = text.slice(Math.floor(text.length / 2));
    for (const pattern of answerPatterns) {
        const match = latterHalf.match(pattern);
        if (match && match[1].trim().length > 0) return match[1].trim();
    }
    return null;
}

function normalizeAnswer(answer) {
    return answer
        .replace(/\\bm\{/g, '')
        .replace(/\\boldsymbol\{/g, '')
        .replace(/\\mathrm\{/g, '')
        .replace(/\\text\{/g, '')
        .replace(/[{}]/g, '')
        .replace(/\\,/g, '')
        .replace(/\\;/g, '')
        .replace(/\\!/g, '')
        .replace(/\\quad/g, '')
        .replace(/\\qquad/g, '')
        .replace(/\$/g, '')
        .replace(/\s+/g, '')
        .trim();
}

// Start
init();
