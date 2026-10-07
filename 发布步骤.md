# 按 2homepage.pdf 发布个人主页

## 1. 准备文件（对应第 10 页）

本目录已经包含 index.html、样式、脚本、照片和中英文 Excel，可直接上传。
保留之前确认的设计、中英文切换、页码和模块编号。网站在线读取 Excel，新增工作表或模块后自动调整页面结构。

## 2. 仓库命名（对应第 11 页）

你的 GitHub 用户名为 amazing1monkey-sketch。
要得到教程中的个人主页根地址，创建公开仓库 amazing1monkey-sketch.github.io，或在原仓库 Settings → General → Repository name 中将仓库改为此名称。
发布完成后的预期地址：https://amazing1monkey-sketch.github.io/

也可继续使用现有 amazing1monkey.github.io 仓库，不改名也能发布；这种情况下属于项目网站，预期地址为：https://amazing1monkey-sketch.github.io/amazing1monkey.github.io/
以上是预期地址；请以 Settings → Pages 中部署成功后显示的地址为准。

## 3. 上传（对应第 12 页）

在仓库选择 Add file → Upload files。
上传本目录内所有文件和文件夹；不要把 ZIP 本身当网页上传，也不要把整个外层目录作为仓库里的子文件夹。
提交后，仓库根目录应直接显示 index.html，并同时存在 assets、content、vendor 三个文件夹。
提交信息可填写：上传个人主页。

Mac 中 .nojekyll 是隐藏文件，按 Command + Shift + . 可显示并上传。若网页上传时漏掉，也可在 GitHub 点击 Add file → Create new file，文件名填写 .nojekyll，内容留空并提交。
如仓库中留有旧版 .github/workflows/pages.yml，请删除旧文件并提交，避免旧部署工作流冲突。

## 4. 发布（对应第 13 页）

Settings → Pages → Build and deployment：
Source：Deploy from a branch
Branch：main
Folder：/(root)
有更改时点击 Save。若已显示正在从 main 分支构建且 Save 灰色，表示设置已保存。
等待部署完成后点击 Visit site，检查照片、中英文切换以及内容。
部署通常需要几分钟，GitHub 说明更新可能需要最多约 10 分钟。

## 5. 提交作业（对应第 2 页）

要求包含图片，并提交 URL。本网站已包含个人照片。
发布完成后，复制 Settings → Pages 中的 Visit site 地址作为作业 URL；不要提交仓库代码页面地址或本地文件地址。
本文件包本身不代表网站已经上线。

## 内容维护

详见“表格与网页对应说明.md”。修改后，将 Excel 和新增图片上传到同一仓库路径并提交。
本地预览：在本目录运行 python3 -m http.server 8765，然后浏览器打开 http://localhost:8765/。
直接双击 index.html 查看的是离线快照；如需更新该快照，可运行 python3 scripts/build.py。

官方参考：https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site
