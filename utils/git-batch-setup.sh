#!/bin/bash

# Git批量配置和推送脚本
# 用途：为所有项目初始化Git仓库并推送到GitHub

set -e

# 颜色输出
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

# GitHub用户名
GITHUB_USER="laiyinyizao007"

# 项目根目录
PROJECTS_ROOT="/home/averyubuntu/projects"

# 项目列表（本地目录名 -> GitHub仓库名）
declare -A PROJECTS=(
    ["api-connection-tester"]="averivendell-api-connection-tester"
    ["backup-manager"]="averivendell-backup-manager"
    ["cline-context-optimizer"]="averivendell-cline-context-optimizer"
    ["github-mcp-research"]="averivendell-github-mcp-research"
    ["linux-learning-project"]="averivendell-linux-learning-project"
    ["notion-api-research"]="averivendell-notion-api-research"
    ["rules"]="averivendell-rules"
    ["rules_template_project"]="averivendell-rules_template_project"
    ["telegram-AIworkHorse"]="averivendell-telegram-AIworkHorse"
    ["telegram-AnotherAvery_bot"]="averivendell-telegram-AnotherAvery_bot"
    ["telegram-botManagement"]="averivendell-telegram-botManagement"
    ["telegram-groupChat"]="averivendell-telegram-groupChat"
    ["vibe-coding"]="averivendell-vibe-coding"
    ["wsl-vscode-diagnostics"]="averivendell-wsl-vscode-diagnostics"
)

# 日志文件
LOG_FILE="$PROJECTS_ROOT/utils/git-setup-$(date +%Y%m%d-%H%M%S).log"

# 日志函数
log() {
    echo -e "${GREEN}[$(date '+%Y-%m-%d %H:%M:%S')]${NC} $1" | tee -a "$LOG_FILE"
}

error() {
    echo -e "${RED}[ERROR]${NC} $1" | tee -a "$LOG_FILE"
}

warn() {
    echo -e "${YELLOW}[WARN]${NC} $1" | tee -a "$LOG_FILE"
}

info() {
    echo -e "${BLUE}[INFO]${NC} $1" | tee -a "$LOG_FILE"
}

# 配置单个项目
setup_project() {
    local local_name=$1
    local repo_name=$2
    local project_dir="$PROJECTS_ROOT/$local_name"
    
    if [ ! -d "$project_dir" ]; then
        warn "项目目录不存在: $project_dir"
        return 1
    fi
    
    echo ""
    info "================================"
    info "配置项目: $local_name"
    info "GitHub仓库: $repo_name"
    info "================================"
    
    cd "$project_dir"
    
    # 1. 初始化Git（如果需要）
    if [ ! -d ".git" ]; then
        log "初始化Git仓库..."
        git init
        git branch -M main
    else
        info "Git仓库已存在"
    fi
    
    # 2. 配置remote
    if git remote | grep -q "origin"; then
        local current_url=$(git remote get-url origin)
        local expected_url="https://github.com/$GITHUB_USER/$repo_name.git"
        if [ "$current_url" != "$expected_url" ]; then
            warn "更新remote URL: $current_url -> $expected_url"
            git remote set-url origin "$expected_url"
        else
            info "Remote已正确配置"
        fi
    else
        log "添加remote origin..."
        git remote add origin "https://github.com/$GITHUB_USER/$repo_name.git"
    fi
    
    # 3. 添加所有文件
    log "添加文件到Git..."
    git add -A
    
    # 4. 检查是否有变更
    if git diff --cached --quiet; then
        info "没有需要提交的变更"
    else
        log "提交变更..."
        git commit -m "Initial commit: Setup project structure and documentation

- 初始化项目结构
- 添加核心功能代码
- 完善项目文档
- 配置开发环境

Date: $(date '+%Y-%m-%d %H:%M:%S')"
    fi
    
    # 5. 推送到GitHub
    log "推送到GitHub..."
    if git push -u origin main 2>&1 | tee -a "$LOG_FILE"; then
        log "✓ $local_name 推送成功！"
        return 0
    else
        error "✗ $local_name 推送失败"
        return 1
    fi
}

# 主函数
main() {
    log "======================================"
    log "Git批量配置和推送工具"
    log "======================================"
    log "日志文件: $LOG_FILE"
    log ""
    
    local success_count=0
    local fail_count=0
    local total_count=${#PROJECTS[@]}
    
    # 遍历所有项目
    for local_name in "${!PROJECTS[@]}"; do
        repo_name="${PROJECTS[$local_name]}"
        
        if setup_project "$local_name" "$repo_name"; then
            ((success_count++))
        else
            ((fail_count++))
        fi
    done
    
    # 总结
    echo ""
    log "======================================"
    log "批量配置完成！"
    log "总计: $total_count 个项目"
    log "成功: $success_count 个"
    log "失败: $fail_count 个"
    log "======================================"
    log "详细日志: $LOG_FILE"
}

# 运行主函数
main
