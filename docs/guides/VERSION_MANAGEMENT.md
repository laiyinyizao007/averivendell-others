# Clinerules & Workflows 版本管理

## 📋 版本控制方案

### 版本号格式

采用语义化版本号（Semantic Versioning）：`MAJOR.MINOR.PATCH`

```
1.0.0
│ │ │
│ │ └─ PATCH: 修复 bug、小改动
│ └─── MINOR: 新增功能、向后兼容
└───── MAJOR: 重大变更、不兼容的修改
```

### 当前版本

**系统版本**: `1.0.0`  
**发布日期**: 2025-11-09  
**状态**: Stable

---

## 📦 组件版本清单

### Global Rules (待迁移)

| 组件 | 版本 | 更新日期 | 状态 |
|------|------|---------|------|
| memory-framework.mdc | 1.0.0 | 2025-11-09 | 规划中 |
| plan.mdc | 1.0.0 | 2025-11-09 | 规划中 |
| implement.mdc | 1.0.0 | 2025-11-09 | 规划中 |
| debug.mdc | 1.0.0 | 2025-11-09 | 规划中 |
| rules.mdc | 1.0.0 | 2025-11-09 | 规划中 |
| global-lessons-learned.mdc | 1.0.0 | 2025-11-09 | 规划中 |
| global-tools-registry.mdc | 1.0.0 | 2025-11-09 | 规划中 |

### Workspace Rules (.cursor/rules)

| 组件 | 版本 | 更新日期 | 状态 |
|------|------|---------|------|
| memory.mdc | 1.0.0 | 2025-11-09 | ✅ Active |
| plan.mdc | 1.0.0 | 2025-11-09 | ✅ Active |
| implement.mdc | 1.0.0 | 2025-11-09 | ✅ Active |
| debug.mdc | 1.0.0 | 2025-11-09 | ✅ Active |
| rules.mdc | 1.0.0 | 2025-11-09 | ✅ Active |
| lessons-learned.mdc | 1.0.0 | 2025-11-09 | ✅ Active |
| error-documentation.mdc | 1.0.0 | 2025-11-09 | ✅ Active |
| architecture-understanding.mdc | 1.0.0 | 2025-11-09 | ✅ Active |
| directory-structure.mdc | 1.0.0 | 2025-11-09 | ✅ Active |

### Workspace Workflows

| 组件 | 版本 | 更新日期 | 状态 |
|------|------|---------|------|
| save.md | 1.0.0 | 2025-11-09 | ✅ Active |

### 项目工具

| 组件 | 版本 | 更新日期 | 状态 |
|------|------|---------|------|
| tools/_registry.mdc | 1.0.0 | 2025-11-09 | ✅ Active |
| tools/rules-engine.mdc | 1.0.0 | 2025-11-09 | ✅ Active |
| tools/vibe-coding.mdc | 1.0.0 | 2025-11-09 | ✅ Active |

### 系统文档

| 组件 | 版本 | 更新日期 | 状态 |
|------|------|---------|------|
| CLINERULES_CONNECTION_MECHANISM.md | 1.0.0 | 2025-11-09 | ✅ Active |
| SYSTEM_OPTIMIZATION_PLAN.md | 1.0.0 | 2025-11-09 | ✅ Active |
| WORKFLOWS_SETUP.md | 1.0.0 | 2025-11-09 | ✅ Active |
| WORKFLOWS_TROUBLESHOOTING.md | 1.0.0 | 2025-11-09 | ✅ Active |

---

## 🔄 版本更新策略

### MAJOR 版本更新 (X.0.0)

触发条件：
- 重大架构调整
- 不兼容的 API 变更
- 工作流程根本性改变
- 需要用户手动迁移

示例：
- 从 .clinerules 迁移到 Global Rules
- 改变 MDC 引用语法
- 重构 memory system

### MINOR 版本更新 (1.X.0)

触发条件：
- 新增规则文件
- 新增工作流
- 新增工具支持
- 功能增强（向后兼容）

示例：
- 添加新的调试规则
- 创建新的部署工作流
- 集成新的 MCP 工具

### PATCH 版本更新 (1.0.X)

触发条件：
- Bug 修复
- 文档更新
- 性能优化
- 小改进

示例：
- 修复规则加载问题
- 更新文档链接
- 优化加载性能

---

## 📝 版本变更记录

### v1.0.0 (2025-11-09) - Initial Release

#### 新增功能
- ✅ 建立完整的 Clinerules 系统
- ✅ 创建 Memory Files 框架
- ✅ 实现 PLAN/ACT MODE 工作流
- ✅ 建立工具注册表系统
- ✅ 创建连接机制文档
- ✅ 设计系统优化方案

#### 核心组件
- Memory System (7个核心文件)
- Rules System (9个规则文件)
- Workflows System (1个工作流)
- Tools Registry (3个工具)
- Documentation (4份指南)

#### 已知问题
- Global Rules 尚未迁移
- 缺少智能加载系统
- 工具注册表需手动维护

#### 下一版本计划 (v1.1.0)
- [ ] 完成 Global Rules 迁移
- [ ] 创建 CLI 管理工具
- [ ] 实现自动化脚本
- [ ] 添加更多工作流模板

---

## 🏷️ 文件版本标记规范

### Rules 文件版本标记

在每个 `.mdc` 文件的 frontmatter 中添加版本信息：

```yaml
---
description: 规则描述
globs: 
alwaysApply: true
version: 1.0.0
updated: 2025-11-09
changelog: |
  v1.0.0 (2025-11-09): Initial version
---
```

### Workflows 文件版本标记

在每个工作流文件的开头添加版本信息：

```markdown
# Workflow Name

**版本**: 1.0.0  
**更新日期**: 2025-11-09  
**状态**: Stable

## 变更记录

### v1.0.0 (2025-11-09)
- Initial version
```

### 文档版本标记

在文档末尾添加版本信息：

```markdown
---

**文档版本**: 1.0.0  
**创建日期**: 2025-11-09  
**最后更新**: 2025-11-09  
**状态**: Stable
```

---

## 🔍 版本兼容性矩阵

### Rules 版本兼容性

| Rules Version | Cline Version | Cursor Version | 状态 |
|---------------|---------------|----------------|------|
| 1.0.0 | ≥ 3.0.0 | ≥ 0.40.0 | ✅ 支持 |
| 0.9.x | ≥ 2.5.0 | ≥ 0.35.0 | ⚠️ 部分支持 |

### Workflows 版本兼容性

| Workflows Version | Cline Version | 状态 |
|-------------------|---------------|------|
| 1.0.0 | ≥ 3.0.0 | ✅ 支持 |

---

## 📦 版本发布流程

### 1. 准备发布

```bash
# 1. 更新版本号
# 编辑 VERSION_MANAGEMENT.md

# 2. 更新所有文件的版本标记
# 运行版本更新脚本（待开发）
# ./scripts/update-versions.sh 1.1.0

# 3. 更新变更日志
# 编辑 CHANGELOG.md
```

### 2. 验证和测试

```bash
# 1. 验证规则文件
# cline-cli rules:validate

# 2. 测试工作流
# cline-cli workflows:test

# 3. 检查文档链接
# cline-cli docs:check-links
```

### 3. 创建版本标签

```bash
# 1. 提交所有更改
git add .
git commit -m "chore: bump version to 1.1.0"

# 2. 创建版本标签
git tag -a v1.1.0 -m "Release version 1.1.0"

# 3. 推送到远程
git push origin main --tags
```

### 4. 发布公告

在项目 README 和文档中更新版本信息。

---

## 🛠️ 版本管理工具

### 版本更新脚本

`/home/averyubuntu/Cline/scripts/update-versions.sh`:

```bash
#!/bin/bash
# 批量更新所有组件的版本号

NEW_VERSION=$1
UPDATE_DATE=$(date -I)

if [ -z "$NEW_VERSION" ]; then
    echo "Usage: $0 <new-version>"
    exit 1
fi

echo "Updating to version: $NEW_VERSION"

# 更新 Rules 文件
find ~/.cursor/rules -name "*.mdc" -type f | while read -r file; do
    sed -i "s/^version: .*/version: $NEW_VERSION/" "$file"
    sed -i "s/^updated: .*/updated: $UPDATE_DATE/" "$file"
    echo "Updated: $file"
done

# 更新 Workflows 文件
find ~/workflows -name "*.md" -type f | while read -r file; do
    sed -i "s/\*\*版本\*\*: .*/\*\*版本\*\*: $NEW_VERSION/" "$file"
    sed -i "s/\*\*更新日期\*\*: .*/\*\*更新日期\*\*: $UPDATE_DATE/" "$file"
    echo "Updated: $file"
done

echo "Version update complete!"
```

### 版本检查脚本

`/home/averyubuntu/Cline/scripts/check-versions.sh`:

```bash
#!/bin/bash
# 检查所有组件的版本号

echo "=== Rules Versions ==="
find ~/.cursor/rules -name "*.mdc" -type f -exec grep -H "^version:" {} \;

echo ""
echo "=== Workflows Versions ==="
find ~/workflows -name "*.md" -type f -exec grep -H "**版本**:" {} \;

echo ""
echo "=== Documentation Versions ==="
find ~/docs -name "*.md" -type f -exec grep -H "**文档版本**:" {} \;
```

---

## 📋 版本迁移指南

### 从 0.x 迁移到 1.0.0

**重大变更**:
1. 引入版本控制系统
2. 标准化文件格式
3. 建立 Global/Workspace 分层

**迁移步骤**:

```bash
# 1. 备份现有配置
cp -r ~/.cursor/rules ~/.cursor/rules.backup

# 2. 添加版本信息到所有文件
# 运行迁移脚本
./scripts/migrate-to-v1.sh

# 3. 验证迁移结果
./scripts/check-versions.sh

# 4. 测试功能
# 在 Cline 中测试各项功能
```

---

## 🔐 版本锁定

### 锁定文件格式

创建 `.clinerules/version-lock.json`:

```json
{
  "version": "1.0.0",
  "locked": true,
  "components": {
    "rules": {
      "memory.mdc": "1.0.0",
      "plan.mdc": "1.0.0",
      "implement.mdc": "1.0.0"
    },
    "workflows": {
      "save.md": "1.0.0"
    },
    "tools": {
      "_registry.mdc": "1.0.0"
    }
  },
  "locked_at": "2025-11-09T20:35:00+08:00"
}
```

### 锁定和解锁

```bash
# 锁定当前版本
cline-cli version:lock

# 解锁（允许更新）
cline-cli version:unlock

# 检查锁定状态
cline-cli version:status
```

---

## 📊 版本统计

### 当前系统概况

```
总组件数: 21
├── Rules: 9
├── Workflows: 1
├── Tools: 3
└── Docs: 4

当前版本: 1.0.0
发布日期: 2025-11-09
稳定性: Stable
```

### 版本历史

| 版本 | 发布日期 | 组件数 | 状态 |
|------|---------|--------|------|
| 1.0.0 | 2025-11-09 | 21 | ✅ Current |

---

## 🚀 未来版本规划

### v1.1.0 (计划: 2025-11-23)

- [ ] Global Rules 迁移完成
- [ ] CLI 工具 v1.0
- [ ] 自动化脚本集
- [ ] 新增 3-5 个工作流模板

### v1.2.0 (计划: 2025-12-07)

- [ ] 智能加载系统
- [ ] 性能优化
- [ ] 监控和调试工具
- [ ] Web UI（探索性）

### v2.0.0 (计划: 2026-Q1)

- [ ] 完全重构为插件系统
- [ ] 可视化配置界面
- [ ] 多项目管理
- [ ] 云端同步

---

**文档版本**: 1.0.0  
**创建日期**: 2025-11-09  
**最后更新**: 2025-11-09  
**维护者**: AI Assistant  
**状态**: ✅ Active
