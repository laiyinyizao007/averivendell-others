# Cline Workflows 故障排查指南

## 问题：工作流文件存在但界面不显示

### 当前状态
- ✅ 工作流文件已创建：`~/.vscode-server/data/User/globalStorage/saoudrizwan.claude-dev/workflows/save.md`
- ✅ 文件大小：106 行
- ❌ Cline 界面的 Workflows 面板中不显示

### 可能的原因和解决方案

#### 1. ⚠️ 文件格式问题（最可能）

**问题诊断**：
```bash
# 检查文件第一行
head -1 ~/.vscode-server/data/User/globalStorage/saoudrizwan.claude-dev/workflows/save.md
```

**常见问题**：
- Cline workflows 文件的**第一行必须是一个 Markdown 标题**（`# 标题`）
- 当前文件第一行是描述文本，不是标题

**解决方法**：
```bash
# 修复文件格式 - 在文件开头添加标题
sed -i '1i# 保存并提交工作流\n' ~/.vscode-server/data/User/globalStorage/saoudrizwan.claude-dev/workflows/save.md
```

或者手动编辑文件，确保第一行是：
```markdown
# 保存并提交工作流
```

#### 2. 🔄 VSCode/Cline 缓存问题

**解决方法 A**：重新加载窗口
1. 按 `Ctrl+Shift+P` (或 `Cmd+Shift+P`)
2. 输入 "Reload Window"
3. 选择 "Developer: Reload Window"

**解决方法 B**：重启 VSCode
```bash
# 在 WSL 中完全关闭 VSCode
pkill -f "vscode-server"
# 然后重新打开 VSCode
```

**解决方法 C**：重新加载 Cline 扩展
1. 打开 VSCode 扩展面板
2. 找到 Cline 扩展
3. 点击 "Reload" 或 "Restart"

#### 3. 📁 工作区 vs 全局工作流

Cline 支持两种工作流：

**Global Workflows（全局）**：
- 位置：`~/.vscode-server/data/User/globalStorage/saoudrizwan.claude-dev/workflows/`
- 在所有项目中可用
- 你的 `save.md` 在这里 ✅

**Workspace Workflows（工作区）**：
- 位置：`<项目根目录>/.cline/workflows/`
- 仅在特定项目中可用

**检查方法**：
```bash
# 检查是否有工作区工作流目录
ls -la /home/averyubuntu/projects/.cline/workflows/ 2>/dev/null || echo "无工作区工作流"
```

**解决方案**：尝试同时创建工作区工作流：
```bash
mkdir -p /home/averyubuntu/projects/.cline/workflows/
cp ~/.vscode-server/data/User/globalStorage/saoudrizwan.claude-dev/workflows/save.md \
   /home/averyubuntu/projects/.cline/workflows/
```

#### 4. 🐛 Cline 版本问题

**检查 Cline 版本**：
1. 打开 VSCode 扩展面板
2. 找到 "Cline" 扩展
3. 查看版本号

**已知问题**：
- 某些早期版本的 Cline 在 WSL 环境下可能无法正确读取 workflows
- 建议更新到最新版本

**更新方法**：
1. 在扩展面板中点击 Cline
2. 如果有更新，点击 "Update" 按钮

#### 5. 🔍 权限问题

**检查文件权限**：
```bash
ls -la ~/.vscode-server/data/User/globalStorage/saoudrizwan.claude-dev/workflows/save.md
```

**修复权限**：
```bash
chmod 644 ~/.vscode-server/data/User/globalStorage/saoudrizwan.claude-dev/workflows/save.md
```

### 完整排查流程

按照以下顺序尝试：

```bash
# 步骤 1: 检查文件第一行
echo "=== 检查文件格式 ==="
head -3 ~/.vscode-server/data/User/globalStorage/saoudrizwan.claude-dev/workflows/save.md

# 步骤 2: 检查权限
echo "=== 检查文件权限 ==="
ls -la ~/.vscode-server/data/User/globalStorage/saoudrizwan.claude-dev/workflows/

# 步骤 3: 列出所有工作流文件
echo "=== 所有工作流文件 ==="
find ~/.vscode-server/data/User/globalStorage/saoudrizwan.claude-dev/workflows/ -name "*.md" -type f

# 步骤 4: 检查文件内容前10行
echo "=== 文件内容（前10行）==="
head -10 ~/.vscode-server/data/User/globalStorage/saoudrizwan.claude-dev/workflows/save.md
```

### 临时测试方案

创建一个简单的测试工作流：

```bash
cat > ~/.vscode-server/data/User/globalStorage/saoudrizwan.claude-dev/workflows/test.md << 'EOF'
# 测试工作流

这是一个简单的测试工作流。

## 步骤 1: 打个招呼

说 "你好！"

## 步骤 2: 完成

工作流结束。
EOF
```

然后：
1. 重新加载 VSCode 窗口
2. 检查 Workflows 面板是否显示 "test.md"
3. 如果显示，说明是 save.md 的格式问题
4. 如果不显示，说明是 Cline 配置或版本问题

### 正确的工作流文件格式示例

```markdown
# 工作流标题（必须是第一行，以 # 开头）

工作流的简要描述。

## 步骤 1: 第一步标题

步骤描述和指令。

可以包含：
- 要使用的工具
- 工具参数
- 预期行为

## 步骤 2: 第二步标题

继续后续步骤...

## 注意事项

任何额外的说明。
```

### 快速修复命令

如果上述方法都不行，执行以下命令重新创建一个正确格式的文件：

```bash
# 备份原文件
cp ~/.vscode-server/data/User/globalStorage/saoudrizwan.claude-dev/workflows/save.md \
   ~/.vscode-server/data/User/globalStorage/saoudrizwan.claude-dev/workflows/save.md.backup

# 创建新的正确格式文件
cat > ~/.vscode-server/data/User/globalStorage/saoudrizwan.claude-dev/workflows/save.md << 'EOF'
# 保存并提交工作流

这个工作流帮助你自动保存文件并创建 Git 提交，提交信息会包含用户的原始请求和代码修改总结。

## 步骤 1: 检查 Git 状态

使用 `cvcV5flJSjZ8qIXrpKYFEk0mcp0git_status` 工具检查当前工作树状态。

参数：
- repo_path: "/home/averyubuntu/projects"

## 步骤 2: 查看未暂存的修改

使用 `cvcV5flJSjZ8qIXrpKYFEk0mcp0git_diff_unstaged` 工具查看所有未暂存的修改内容。

参数：
- repo_path: "/home/averyubuntu/projects"
- context_lines: 3

## 步骤 3: 总结修改内容

基于步骤 2 的 diff 输出，生成修改总结，包括：
- 修改了哪些文件
- 主要改动内容
- 实现了什么功能或修复了什么问题

## 步骤 4: 构建提交信息

根据以下格式构建提交信息：

\`\`\`
[用户请求] <用户的原始请求内容>

代码修改总结:
- 文件变更: <列出修改的文件>
- 主要改动: <描述关键改动>
- 实现功能: <说明实现的功能或修复>

完成时间: <ISO 8601 格式时间戳>
\`\`\`

## 步骤 5: 添加文件到暂存区

使用 `cvcV5flJSjZ8qIXrpKYFEk0mcp0git_add` 工具添加所有修改的文件。

参数：
- repo_path: "/home/averyubuntu/projects"
- files: ["."]

## 步骤 6: 创建提交

使用 `cvcV5flJSjZ8qIXrpKYFEk0mcp0git_commit` 工具创建提交。

参数：
- repo_path: "/home/averyubuntu/projects"
- message: <步骤 4 构建的提交信息>

## 步骤 7: 询问是否推送

使用 `ask_followup_question` 询问用户是否要推送到远程仓库。

如果用户回答"是"或"yes"，执行步骤 8。

## 步骤 8: 推送到远程仓库（可选）

使用 `execute_command` 执行推送命令：

\`\`\`bash
cd /home/averyubuntu/projects && git push origin main
\`\`\`

## 使用说明

1. **启动工作流**: 在聊天中输入 `/save` 或 `/save.md`
2. **提供上下文**: 确保在请求中说明你做了什么修改
3. **确认**: 工作流会询问是否推送，根据需要选择

## 示例用法

\`\`\`
用户: 我修复了 Telegram Bot 的日志问题，现在使用 RotatingLogger。/save
\`\`\`

## 注意事项

- 确保在项目根目录 `/home/averyubuntu/projects` 中
- 确保有需要提交的修改
- 提交信息会自动包含时间戳
- 可以选择是否推送到远程仓库
EOF

# 重新加载 VSCode
echo "文件已重新创建，请重新加载 VSCode 窗口（Ctrl+Shift+P -> Reload Window）"
```

### 联系支持

如果以上所有方法都无法解决，可以：

1. **查看 Cline 日志**：
   - VSCode → Help → Toggle Developer Tools
   - Console 标签页
   - 搜索 "workflow" 相关错误

2. **在 Cline GitHub 提 Issue**：
   - https://github.com/cline/cline/issues
   - 提供：
     - Cline 版本
     - VSCode 版本
     - 操作系统（WSL Ubuntu）
     - 工作流文件内容
     - 截图

3. **Cline Discord**：
   - 加入 Cline 的 Discord 社区
   - 在 #support 频道求助

### 总结

**最可能的原因**：文件格式问题 - 第一行缺少 `# 标题`

**推荐解决步骤**：
1. 运行"快速修复命令"重新创建文件
2. 重新加载 VSCode 窗口
3. 检查 Workflows 面板
4. 如果仍不显示，查看开发者工具日志

---

**最后更新**: 2025-11-09  
**适用于**: Cline in WSL Ubuntu environment
