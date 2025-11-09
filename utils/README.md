# Git自动化管理工具集

本目录包含用于自动化Git操作的工具集，解决了多项目管理和自动提交推送的需求。

## 工具列表

### 1. git-auto-manager.js - 批量项目管理工具

**功能**：批量初始化、配置和推送所有项目到GitHub

**使用方法**：
```bash
# 批量推送所有项目
node /home/averyubuntu/projects/utils/git-auto-manager.js push-all

# 查看帮助
node /home/averyubuntu/projects/utils/git-auto-manager.js help
```

**特点**：
- ✅ 自动检测14个项目
- ✅ 初始化Git仓库
- ✅ 配置GitHub remote
- ✅ 智能提交和推送
- ✅ 详细的执行报告

### 2. 自动Git提交推送 - 使用MCP工具（推荐）⭐

> ⚠️ **重要更新**：不再使用`auto-git-commit.js`脚本（会导致terminal卡住）。
> 改为直接使用Git MCP和GitHub MCP工具。

**新方法**：在Cline中直接使用MCP工具链

**使用方法**：
```javascript
// 1. 检查状态
cvcV5flJSjZ8qIXrpKYFEk0mcp0git_status({ 
  repo_path: "/home/averyubuntu/projects" 
})

// 2. 添加文件
cvcV5flJSjZ8qIXrpKYFEk0mcp0git_add({ 
  repo_path: "/home/averyubuntu/projects",
  files: ["."] 
})

// 3. 提交
cvcV5flJSjZ8qIXrpKYFEk0mcp0git_commit({ 
  repo_path: "/home/averyubuntu/projects",
  message: "任务完成: [概括]\n\n用户消息:\n[原始消息]\n\n处理概括:\n[AI概括]"
})

// 4. 推送（暂时仍需execute_command）
execute_command("cd /home/averyubuntu/projects && git push origin main")
```

**优势**：
- ✅ 不会导致terminal卡住
- ✅ 任务能够正常完成
- ✅ MCP工具自动批准，无需交互
- ✅ 更好的错误处理
- ✅ 类型安全的参数

**详细文档**：参见 `.clinerules/auto-git-push.mdc`

---

### 2.1. auto-git-commit.js（已废弃）❌

> ⚠️ **已废弃**：此脚本使用`execSync`会导致任务pending，不再推荐使用。

<details>
<summary>点击查看旧方法（仅供参考）</summary>

**功能**：任务完成后自动记录用户消息、处理概括和文件变更，然后推送到GitHub

**使用方法**：
```bash
# ❌ 不推荐使用（会卡住）
node /home/averyubuntu/projects/utils/auto-git-commit.js \
  --message "用户原始消息" \
  --summary "AI处理概括"
```

**问题**：
- ❌ 使用`execSync`导致terminal卡住
- ❌ 任务无法complete，一直pending
- ❌ 需要手动中断

**解决方案**：使用上面的MCP工具方法。

</details>

**提交消息格式**：
```
任务完成: [处理概括]

用户消息:
[用户原始消息]

处理概括:
[AI生成的概括]

文件变更:
- file1.js
- file2.md
...

完成时间: [ISO时间戳]
```

## 解决的核心问题

### 问题1：Terminal成功执行卡住

**原因**：某些Git命令成功执行后没有输出，导致Cline等待反馈而卡住

**解决方案**：
在`auto-git-commit.js`的`exec`函数中，为每个命令添加备选输出：
```javascript
const result = execSync(cmd + ' || echo "DONE"', { ... });
```

并在关键步骤添加明确的echo：
```javascript
exec('git add -A && echo "Files added"');
exec('git commit -m "..." && echo "Commit created"');
exec('git push && echo "Push completed"');
```

这确保了：
- ✅ 命令总是有输出
- ✅ 不会因为等待反馈而卡住
- ✅ 可以追踪执行进度

### 问题2：多项目Git配置繁琐

**解决方案**：`git-auto-manager.js`实现一键批量配置和推送

### 问题3：手动提交信息不详细

**解决方案**：`auto-git-commit.js`自动生成包含用户消息、处理概括和文件变更的详细提交

## 工作流集成

### 方式1：任务完成后手动运行

```bash
# 完成任务后
cd /home/averyubuntu/projects/your-project
node /home/averyubuntu/projects/utils/auto-git-commit.js \
  --message "原始任务描述" \
  --summary "完成的工作概括"
```

### 方式2：创建快捷命令

在`~/.bashrc`或`~/.zshrc`中添加：
```bash
alias gitauto='node /home/averyubuntu/projects/utils/auto-git-commit.js'
```

使用：
```bash
gitauto --message "任务" --summary "完成的工作"
```

### 方式3：集成到工作流（未来扩展）

可以考虑：
- 创建VSCode任务
- 添加到Cline工作流钩子
- 创建Git post-commit钩子

## 项目覆盖范围

当前配置管理以下14个项目：

1. api-connection-tester ✅
2. backup-manager ✅
3. cline-context-optimizer ✅
4. github-mcp-research ✅
5. linux-learning-project ✅
6. notion-api-research ✅
7. rules ✅
8. rules_template_project ✅
9. telegram-AIworkHorse ✅
10. telegram-AnotherAvery_bot ✅
11. telegram-botManagement ✅
12. telegram-groupChat ✅
13. vibe-coding ✅
14. wsl-vscode-diagnostics ✅

所有项目已成功推送到GitHub！

## 日志文件

- **批量推送日志**：`utils/git-setup-[timestamp].log`
- **自动提交日志**：`utils/auto-commit-log.txt`

## 故障排查

### 问题：推送失败

**检查**：
1. GitHub认证状态：`gh auth status`
2. Remote配置：`git remote -v`
3. 网络连接

**解决**：
```bash
# 重新认证
gh auth login

# 检查remote
cd your-project
git remote -v
```

### 问题：No changes to commit

这是正常的，说明没有文件变更。工具会自动跳过。

### 问题：Terminal卡住

如果使用`auto-git-commit.js`仍然卡住：
1. 检查是否有大文件需要推送
2. 查看日志文件了解卡在哪一步
3. 尝试手动执行该步骤

## 未来改进

- [ ] 添加交互式提交消息编辑
- [ ] 支持分支管理
- [ ] 添加回滚功能
- [ ] 集成到CI/CD流程
- [ ] 支持提交消息模板
- [ ] 添加pre-commit验证

## 许可证

MIT License

## 作者

Created for averivendell's project automation workflow.

---

**最后更新**: 2025-01-09
**状态**: ✅ 所有14个项目已成功推送
