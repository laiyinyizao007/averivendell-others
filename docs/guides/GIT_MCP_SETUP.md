# Git MCP Server 安装与配置指南

## 概述

Git MCP Server 是官方的 Model Context Protocol 服务器，为 AI 助手提供 Git 仓库操作能力。本文档记录了在 Cline 中安装和配置 Git MCP Server 的完整过程。

## 安装信息

- **安装日期**: 2025-11-09
- **包名**: `mcp-server-git`
- **版本**: 2025.9.25
- **安装方式**: pip3
- **仓库**: https://github.com/modelcontextprotocol/servers/tree/main/src/git

## 系统要求

- Python 3.10+
- pip3
- Git

## 安装步骤

### 1. 安装 pip3（如果未安装）

```bash
sudo apt install -y python3-pip
```

### 2. 安装 mcp-server-git

```bash
pip3 install mcp-server-git
```

安装完成后，可执行文件位于：`/home/averyubuntu/.local/bin/mcp-server-git`

### 3. 验证安装

```bash
/home/averyubuntu/.local/bin/mcp-server-git --help
```

应该看到类似输出：
```
Usage: mcp-server-git [OPTIONS]

  MCP Git Server - Git functionality for MCP

Options:
  -r, --repository PATH  Git repository path
  -v, --verbose
  --help                 Show this message and exit.
```

## Cline 配置

### 配置文件位置

```
/home/averyubuntu/.vscode-server/data/User/globalStorage/saoudrizwan.claude-dev/settings/cline_mcp_settings.json
```

### 备份文件

配置前已创建备份：
```
/home/averyubuntu/.vscode-server/data/User/globalStorage/saoudrizwan.claude-dev/settings/cline_mcp_settings.json.backup
```

### Git MCP 配置

在 `cline_mcp_settings.json` 中添加了以下配置：

```json
{
  "mcpServers": {
    "git": {
      "autoApprove": [
        "git_status",
        "git_diff_unstaged",
        "git_diff_staged",
        "git_diff",
        "git_commit",
        "git_add",
        "git_reset",
        "git_log",
        "git_create_branch",
        "git_checkout",
        "git_show",
        "git_branch"
      ],
      "disabled": false,
      "timeout": 60,
      "type": "stdio",
      "command": "python3",
      "args": [
        "-m",
        "mcp_server_git",
        "--repository",
        "/home/averyubuntu/projects"
      ],
      "env": {
        "PATH": "/home/averyubuntu/.local/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin"
      }
    }
  }
}
```

## 可用工具

Git MCP Server 提供以下工具：

### 1. `git_status`
- **功能**: 显示工作树状态
- **输入**: `repo_path` (字符串) - Git 仓库路径
- **返回**: 当前工作目录状态的文本输出

### 2. `git_diff_unstaged`
- **功能**: 显示未暂存的更改
- **输入**:
  - `repo_path` (字符串) - Git 仓库路径
  - `context_lines` (数字，可选) - 上下文行数（默认: 3）
- **返回**: 未暂存更改的 diff 输出

### 3. `git_diff_staged`
- **功能**: 显示已暂存的更改
- **输入**:
  - `repo_path` (字符串) - Git 仓库路径
  - `context_lines` (数字，可选) - 上下文行数（默认: 3）
- **返回**: 已暂存更改的 diff 输出

### 4. `git_diff`
- **功能**: 显示分支或提交之间的差异
- **输入**:
  - `repo_path` (字符串) - Git 仓库路径
  - `target` (字符串) - 要比较的目标分支或提交
  - `context_lines` (数字，可选) - 上下文行数（默认: 3）
- **返回**: 当前状态与目标的 diff 输出

### 5. `git_commit`
- **功能**: 记录更改到仓库
- **输入**:
  - `repo_path` (字符串) - Git 仓库路径
  - `message` (字符串) - 提交消息
- **返回**: 确认信息和新提交哈希

### 6. `git_add`
- **功能**: 添加文件内容到暂存区
- **输入**:
  - `repo_path` (字符串) - Git 仓库路径
  - `files` (字符串数组) - 要暂存的文件路径数组
- **返回**: 暂存文件的确认信息

### 7. `git_reset`
- **功能**: 取消所有已暂存的更改
- **输入**: `repo_path` (字符串) - Git 仓库路径
- **返回**: 重置操作的确认信息

### 8. `git_log`
- **功能**: 显示提交日志（可选日期过滤）
- **输入**:
  - `repo_path` (字符串) - Git 仓库路径
  - `max_count` (数字，可选) - 最多显示的提交数（默认: 10）
  - `start_timestamp` (字符串，可选) - 开始时间戳
  - `end_timestamp` (字符串，可选) - 结束时间戳
- **返回**: 提交条目数组（包含哈希、作者、日期和消息）

### 9. `git_create_branch`
- **功能**: 创建新分支
- **输入**:
  - `repo_path` (字符串) - Git 仓库路径
  - `branch_name` (字符串) - 新分支名称
  - `base_branch` (字符串，可选) - 起始分支
- **返回**: 分支创建的确认信息

### 10. `git_checkout`
- **功能**: 切换分支
- **输入**:
  - `repo_path` (字符串) - Git 仓库路径
  - `branch_name` (字符串) - 要切换到的分支名称
- **返回**: 分支切换的确认信息

### 11. `git_show`
- **功能**: 显示提交的内容
- **输入**:
  - `repo_path` (字符串) - Git 仓库路径
  - `revision` (字符串) - 要显示的版本（提交哈希、分支名或标签）
- **返回**: 指定提交的内容

### 12. `git_branch`
- **功能**: 列出 Git 分支
- **输入**:
  - `repo_path` (字符串) - Git 仓库路径
  - `branch_type` (字符串) - 'local'、'remote' 或 'all'
  - `contains` (字符串，可选) - 分支应包含的提交 SHA
  - `not_contains` (字符串，可选) - 分支不应包含的提交 SHA
- **返回**: 分支列表

## 使用示例

配置完成后，在 Cline 中可以直接使用这些工具。例如：

```
请帮我查看当前仓库的状态
请显示未提交的更改
请创建一个新分支 feature/new-feature
请将所有更改添加到暂存区并提交
```

## 重启 Cline

**重要**: 配置完成后需要重启 Cline 才能加载新的 MCP 服务器。

### 重启方法：

1. 在 VS Code 中打开命令面板（Ctrl+Shift+P）
2. 输入 "Developer: Reload Window" 或 "重新加载窗口"
3. 或者直接重启 VS Code

## 验证安装

重启后，可以通过以下方式验证 Git MCP 是否正常工作：

1. 在 Cline 中发送消息："请帮我查看当前 Git 仓库的状态"
2. Cline 应该能够使用 `git_status` 工具并返回结果

## 故障排查

### 问题：找不到 mcp-server-git 命令

**解决方案**：
确保 `/home/averyubuntu/.local/bin` 在 PATH 中，或使用完整路径：
```bash
/home/averyubuntu/.local/bin/mcp-server-git
```

### 问题：Python 模块未找到

**解决方案**：
重新安装 mcp-server-git：
```bash
pip3 install --upgrade mcp-server-git
```

### 问题：权限错误

**解决方案**：
确保用户对 Git 仓库有读写权限：
```bash
ls -la /home/averyubuntu/projects
```

## 配置自定义仓库

如果要为不同的项目使用不同的配置，可以修改配置中的 `--repository` 参数：

```json
"args": [
  "-m",
  "mcp_server_git",
  "--repository",
  "/path/to/your/repository"
]
```

## 参考资源

- [官方 Git MCP Server 文档](https://github.com/modelcontextprotocol/servers/tree/main/src/git)
- [Model Context Protocol 规范](https://modelcontextprotocol.io/)
- [Cline MCP 配置指南](https://github.com/cline/cline/blob/main/docs/mcp.md)

## 更新日志

- **2025-11-09**: 初次安装和配置 Git MCP Server
  - 安装了 pip3
  - 安装了 mcp-server-git v2025.9.25
  - 配置到 Cline MCP settings
  - 创建了本文档

## 维护说明

### 更新 Git MCP Server

```bash
pip3 install --upgrade mcp-server-git
```

### 恢复配置备份

如果需要恢复之前的配置：
```bash
cp /home/averyubuntu/.vscode-server/data/User/globalStorage/saoudrizwan.claude-dev/settings/cline_mcp_settings.json.backup \
   /home/averyubuntu/.vscode-server/data/User/globalStorage/saoudrizwan.claude-dev/settings/cline_mcp_settings.json
```

## 注意事项

1. **自动批准**: 当前配置已将所有 Git 工具设置为自动批准，这意味着 Cline 可以自动执行 Git 操作而无需每次确认
2. **仓库路径**: 默认仓库路径设置为 `/home/averyubuntu/projects`，所有 Git 操作都在此目录下进行
3. **超时设置**: 命令超时设置为 60 秒，对于大型仓库可能需要调整

## 安全建议

- 定期检查 Cline 执行的 Git 操作
- 重要更改前先使用 `git_status` 查看当前状态
- 敏感操作（如 push）建议手动执行
- 定期备份重要代码

---

**文档版本**: 1.0  
**最后更新**: 2025-11-09  
**维护者**: AI Assistant
