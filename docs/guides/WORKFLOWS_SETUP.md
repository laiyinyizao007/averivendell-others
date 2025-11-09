# Cline Workflows 设置指南

## 什么是 Workflows？

Workflows 允许你定义一系列步骤来指导 Cline 完成重复性任务，比如部署服务、提交 PR 等。

## 快速开始

### 1. Workflows 位置

Workflows 文件保存在 **Cline Rules 旁边的目录**：

```
~/.vscode-server/data/User/globalStorage/saoudrizwan.claude-dev/
├── settings/
│   └── cline_mcp_settings.json
└── workflows/          # 这里存放工作流文件
    ├── pr-review.md
    ├── deploy.md
    └── ...
```

### 2. 创建 Workflow

创建一个 markdown 文件，包含清晰的步骤指令：

**示例：简单的Git提交工作流**

创建文件：`~/.vscode-server/data/User/globalStorage/saoudrizwan.claude-dev/workflows/git-commit.md`

```markdown
# Git 提交工作流

请按照以下步骤执行 Git 提交：

1. 检查当前状态：
   ```bash
   git status
   ```

2. 添加所有修改：
   ```bash
   git add -A
   ```

3. 询问用户提交信息：
   使用 `ask_followup_question` 工具询问用户想要的提交消息

4. 执行提交：
   ```bash
   git commit -m "<用户提供的消息>"
   ```

5. 推送到远程：
   ```bash
   git push origin main
   ```
```

### 3. 使用 Workflow

在 Cline 聊天中输入：

```
/git-commit.md
```

就会触发这个工作流！

## 高级功能

### 可以使用的工具

Workflows 中可以使用：

1. **Cline 内置工具**：
   - `ask_followup_question` - 询问用户
   - `read_file` - 读取文件
   - `search_files` - 搜索文件
   - `new_task` - 创建新任务

2. **命令行工具**（如果已安装）：
   - `gh` - GitHub CLI
   - `docker` - Docker
   - `npm`, `node` - Node.js工具
   - 任何其他CLI工具

3. **MCP 工具**（如果已配置）：
   - Slack
   - WhatsApp
   - 等等

### 工作流示例：PR Review

创建文件：`workflows/pr-review.md`

```markdown
# GitHub PR Review Process

你可以使用 `gh` 命令。我已经为你认证了。请检查我要求你审查的 PR。

## 步骤

1. 获取 PR 信息：
   ```bash
   gh pr view <PR-number> --json title,body,comments
   ```

2. 获取 PR diff：
   ```bash
   gh pr diff <PR-number>
   ```

3. 识别修改的文件：
   ```bash
   gh pr view <PR-number> --json files
   ```

4. 检查原始文件：
   ```xml
   <read_file>
   <path>path/to/file</path>
   </read_file>
   ```

5. 分析变更并提供审查意见
```

### 参数化工作流

在工作流中使用 `ask_followup_question` 来获取参数：

```markdown
# 部署工作流

1. 询问部署环境：
   使用 ask_followup_question 询问："部署到哪个环境？(dev/staging/prod)"

2. 根据环境执行不同的部署命令

3. 验证部署结果
```

## 实用工作流示例

### 1. 自动化测试工作流

`workflows/run-tests.md`:

```markdown
# 运行测试工作流

1. 安装依赖（如果需要）：
   ```bash
   npm install
   ```

2. 运行测试：
   ```bash
   npm test
   ```

3. 如果测试失败，分析错误并建议修复
```

### 2. 代码审查工作流

`workflows/code-review.md`:

```markdown
# 代码审查工作流

1. 使用 `search_files` 查找最近修改的文件

2. 对每个文件进行审查：
   - 检查代码质量
   - 查找潜在问题
   - 建议改进

3. 生成审查报告
```

### 3. 文档更新工作流

`workflows/update-docs.md`:

```markdown
# 文档更新工作流

1. 询问要更新的文档类型

2. 检查相关代码文件

3. 更新对应的文档

4. 验证文档准确性
```

## 最佳实践

1. **清晰的步骤**：每个步骤都应该明确、可执行
2. **使用工具标记**：用 XML 标签标记 Cline 工具调用
3. **包含错误处理**：考虑可能的失败情况
4. **参数化**：使用 `ask_followup_question` 让工作流更灵活
5. **文档化**：在工作流中解释每个步骤的目的

## 调试工作流

如果工作流不按预期工作：

1. 检查文件名是否正确（包括 `.md` 扩展名）
2. 确保文件在正确的目录
3. 检查 markdown 格式是否正确
4. 测试每个步骤是否可以单独执行

## 常见问题

**Q: Workflows 保存在哪里？**

A: `~/.vscode-server/data/User/globalStorage/saoudrizwan.claude-dev/workflows/`

**Q: 可以有子目录吗？**

A: 是的，你可以组织工作流到子目录，调用时包含路径：`/subdir/workflow.md`

**Q: 如何列出所有工作流？**

A: 在 Cline 界面中，输入 `/` 会显示可用的工作流列表

**Q: 可以在工作流中调用其他工作流吗？**

A: 可以，在工作流中提及另一个工作流即可

## 下一步

1. 创建你的第一个工作流
2. 在 Cline 中测试它
3. 根据需要调整和优化
4. 创建更多自动化你日常任务的工作流

---

**提示**：从简单的工作流开始，然后逐渐增加复杂性。最有用的工作流通常是那些自动化你经常重复的任务。

---

**文档版本**: 1.0.0  
**创建日期**: 2025-11-09  
**最后更新**: 2025-11-09  
**状态**: Stable
