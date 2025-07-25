#!/bin/bash
set -e  # 發生錯誤時立即終止腳本

DIST_DIR="dist"                  # build 出來的資料夾
DEPLOY_BRANCH="gh-pages"         # 部署目標分支
CURRENT_BRANCH=$(git symbolic-ref --short HEAD)  # 目前所在分支名稱
WORKTREE_DIR="deploy-gh-pages"   # 暫存 git worktree 目錄

if [ -z "${GITHUB_ACTIONS}" ]; then
  echo "🔧 目前是本地手動部署"
else
  echo "🤖 目前是在 GitHub Actions 中部署"
fi

echo "🚀 部署流程開始..."
echo "目前所在分支：${CURRENT_BRANCH}"

# 1. 檢查 dist 資料夾是否存在且非空，若無則執行 build
if [ ! -d "${DIST_DIR}" ] || [ -z "$(ls -A ${DIST_DIR})" ]; then
  echo "❌ 資料夾 ${DIST_DIR} 不存在或為空，先執行 npm run build"
  npm run build
  echo "✅ 資料夾 ${DIST_DIR} 建立完成"
fi

# 2. 移除已存在的 worktree（避免重複建立衝突）
if [ -d "${WORKTREE_DIR}" ]; then
  echo "🧹 移除已存在的 worktree：${WORKTREE_DIR}"
  git worktree remove -f ${WORKTREE_DIR}
fi

# 3. 檢查遠端 gh-pages 分支是否存在
REMOTE_EXISTS=$(git ls-remote --heads origin ${DEPLOY_BRANCH})

if [ -z "$REMOTE_EXISTS" ]; then
  echo "📁 遠端 ${DEPLOY_BRANCH} 不存在，建立本地 orphan 分支"

  # 建立 worktree 不綁定分支，並切換到 orphan gh-pages 分支（無歷史）
  git worktree add --detach ${WORKTREE_DIR}
  cd ${WORKTREE_DIR}

  # 設定 Git 身分，避免 Actions commit 失敗
  git config user.name "github-actions[bot]"
  git config user.email "github-actions[bot]@users.noreply.github.com"

  git checkout --orphan ${DEPLOY_BRANCH}
else
  echo "📥 遠端 ${DEPLOY_BRANCH} 存在，建立對應 worktree"

  # 確保本地有 gh-pages 分支可以 worktree
  git fetch origin ${DEPLOY_BRANCH}:${DEPLOY_BRANCH} || true

  git worktree add -B ${DEPLOY_BRANCH} ${WORKTREE_DIR} origin/${DEPLOY_BRANCH}
  cd ${WORKTREE_DIR}

  # 設定 Git 身分，避免 Actions commit 失敗
  git config user.name "github-actions[bot]"
  git config user.email "github-actions[bot]@users.noreply.github.com"
fi

# 4. 清空 worktree 目錄內容（保留 .git）
rm -rf *

# 5. 複製 dist 資料夾內容到 worktree
echo "📂 複製 ${DIST_DIR} 內容到 ${WORKTREE_DIR}"
cp -r ../${DIST_DIR}/* ./

# 若在 GitHub Actions 中執行，設定遠端 URL 為 token 模式
if [ -n "${GITHUB_ACTIONS}" ]; then
  git remote set-url origin "https://x-access-token:${GITHUB_TOKEN}@github.com/${GITHUB_REPOSITORY}.git"
fi

# 6. 新增變更並檢查是否有差異，有則提交並推送
git add -A
if git diff --cached --quiet; then
  echo "✅ 沒有變更內容，跳過推送。"
else
  git commit -m "Deploy: 更新網站內容 $(date '+%Y-%m-%d %H:%M:%S')"
  git push origin ${DEPLOY_BRANCH}
  echo "🚀 已成功推送至遠端 ${DEPLOY_BRANCH}"
fi

# 7. 返回原本目錄並移除 worktree
cd ..
git worktree remove ${WORKTREE_DIR}

# 8. 刪除本地 gh-pages 分支（不影響遠端）
if git show-ref --verify --quiet refs/heads/${DEPLOY_BRANCH}; then
  echo "🗑️ 刪除本地分支 ${DEPLOY_BRANCH}"
  git branch -D ${DEPLOY_BRANCH}
fi

echo "🏁 部署完成，已回到 ${CURRENT_BRANCH} 分支"
