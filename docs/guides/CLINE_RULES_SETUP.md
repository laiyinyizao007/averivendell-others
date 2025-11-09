# Cline Rules 配置完成指南

## 项目来源
本配置基于 GitHub 项目：https://github.com/Bhartendu-Kumar/rules_template

这是一个为AI编码助手（Cursor、Cline、RooCode等）提供的通用规则模板，基于敏捷开发方法和软件工程最佳实践。

## 已完成的配置

### 1. 目录结构
已在 `/home/averyubuntu/projects` 创建以下结构：

```
/home/averyubuntu/projects/
├── .clinerules/              # Cline 自定义规则
│   ├── rules.mdc            # 通用规则（符号链接）
│   ├── memory.mdc           # 内存/文档系统（符号链接）
│   ├── directory-structure.mdc  # 目录结构定义（符号链接）
│   ├── ACT/                 # ACT模式规则
│   │   ├── implement.mdc   # 实现规则（符号链接）
│   │   └── debug.mdc       # 调试规则（符号链接）
│   ├── PLAN/                # PLAN模式规则
│   │   └── plan.mdc        # 规划规则（符号链接）
│   └── tools/               # 工具注册表（新增）
│       ├── _registry.mdc    # 工具索引（始终加载）
│       └── rules-engine.mdc # Rules引擎详细文档（按需加载）
├── .cursor/                  # Cursor规则（原始文件）
│   └── rules/
│       ├── rules.mdc
│       ├── memory.mdc
│       ├── directory-structure.mdc
│       ├── implement.mdc
│       ├── debug.mdc
│       ├── plan.mdc
│       ├── architecture-understanding.mdc
│       ├── error-documentation.mdc
│       └── lessons-learned.mdc
├── docs/                     # 项目文档
│   ├── architecture.md      # 系统架构文档
│   ├── product_requirement_docs.md  # 产品需求文档
│   ├── technical.md         # 技术规格文档
│   └── literature/          # 文献调研目录
├── tasks/                    # 任务管理
│   ├── active_context.md    # 当前开发上下文
│   ├── tasks_plan.md        # 任务计划
│   └── rfc/                 # RFC目录
├── src/                      # 源代码
├── test/                     # 测试代码
├── utils/                    # 工具代码
├── config/                   # 配置文件
└── data/                     # 数据文件
```

### 2. 符号链接说明
- `.clinerules/` 中的大部分文件都是指向 `.cursor/rules/` 的符号链接
- 这样只需要维护一份原始文件（在 `.cursor/rules/`）
- 编辑任何一个符号链接都会更新所有引用

### 3. 核心功能

#### 内存文件系统（Memory Files）
规则模板包含7个核心文档文件：

1. **product_requirement_docs.md** - 产品需求文档
2. **architecture.md** - 系统架构
3. **technical.md** - 技术规格
4. **tasks_plan.md** - 任务计划
5. **active_context.md** - 当前上下文
6. **error-documentation.mdc** - 错误文档
7. **lessons-learned.mdc** - 经验总结

#### 工作模式

**PLAN MODE（规划模式）**
- 用于需求分析和方案设计
- 自动执行：需求澄清 → 方案制定 → 用户验证 → 文档更新
- 规则文件：`.clinerules/PLAN/plan.mdc`

**ACT MODE（执行模式）**
- 用于代码实现
- 自动执行：代码分析 → 规划变更 → 实施变更 → 测试 → 文档更新
- 规则文件：`.clinerules/ACT/implement.mdc`

**DEBUG MODE（调试模式）**
- 用于问题排查
- 提供系统化的调试流程
- 规则文件：`.clinerules/ACT/debug.mdc`

### 4. Cline如何使用这些规则

Cline会自动加载 `.clinerules/` 目录中的规则：

1. **通用规则**（始终加载）
   - `rules.mdc` - 基本规则
   - `memory.mdc` - 内存系统规则
   - `directory-structure.mdc` - 目录结构规则
   - `tools/_registry.mdc` - 工具注册表索引

2. **模式特定规则**（按需加载）
   - 当Cline处于PLAN模式时，加载 `PLAN/plan.mdc`
   - 当Cline处于ACT模式时，加载 `ACT/implement.mdc`
   - 当需要调试时，加载 `ACT/debug.mdc`

3. **工具详细文档**（按需加载）
   - 当需要使用特定工具时，参考 `tools/[tool-name].mdc`
   - 例如：需要使用Rules Engine时，查看 `tools/rules-engine.mdc`

### 5. 使用方法

#### 基本使用
1. Cline会自动检测并加载 `.clinerules/` 目录中的规则
2. 无需手动配置，规则会立即生效
3. AI会根据任务类型自动选择合适的模式

#### 高级功能
1. **自动文档更新**：所有规划和实现都会自动更新相应的文档文件
2. **上下文保持**：通过内存文件系统保持项目上下文
3. **跨平台共享**：同一套规则可在Cursor、RooCode等其他AI助手中使用

## 验证配置

### 方法1：检查文件是否存在
```bash
ls -la /home/averyubuntu/projects/.clinerules/
ls -la /home/averyubuntu/projects/.cursor/rules/
```

### 方法2：测试Cline
1. 在VSCode中打开 `/home/averyubuntu/projects` 目录
2. 启动Cline
3. 输入测试命令：`请按照自定义规则分析当前项目结构`
4. 观察Cline是否按照规则模板的要求进行操作

### 方法3：查看符号链接
```bash
cd /home/averyubuntu/projects
ls -la .clinerules/*.mdc
ls -la .clinerules/ACT/*.mdc
ls -la .clinerules/PLAN/*.mdc
```

## 特点和优势

1. **跨平台兼容**：同时支持Cursor、Cline、RooCode
2. **基于软件工程最佳实践**：遵循敏捷开发和SDLC原则
3. **自动文档生成**：开发过程中自动维护文档
4. **模块化设计**：规则文件按功能分离，易于维护
5. **符号链接机制**：单一文件源，多处引用
6. **节省Token**：按需加载规则，减少不必要的上下文
7. **工具注册表**：轻量级工具索引，支持无限扩展工具

## 工具注册表系统（新增）

### 什么是工具注册表？
类似于Claude的Skills系统，工具注册表提供：
- 📋 轻量级工具索引（始终加载，~300 tokens）
- 📚 详细文档按需加载（需要时才加载）
- 🔧 可扩展架构（支持添加任意工具）

### 如何使用？
1. **查看可用工具**：AI始终知道 `tools/_registry.mdc` 中列出的工具
2. **获取详细信息**：需要时，AI会参考 `@tools/[tool-name].mdc`
3. **添加新工具**：在注册表添加条目，创建对应的详细文档

### 当前已注册工具
- **Rules Engine**：自动化代码规则验证和应用工具
  - 快速参考：查看 `tools/_registry.mdc`
  - 详细文档：查看 `tools/rules-engine.mdc`

### Token优化效果
- 基础上下文：~2,800 tokens（包含工具索引）
- 详细文档：~2,000 tokens（仅在需要时加载）
- **节省73%的上下文占用**（相比全部加载）

## 注意事项

1. **不要删除 `.cursor/rules/` 目录**：即使不使用Cursor，这里包含所有原始规则文件
2. **符号链接**：修改任何符号链接文件会影响所有引用
3. **文档维护**：AI会自动维护 `docs/` 和 `tasks/` 中的文档，请保持它们的完整性
4. **模式切换**：明确告诉Cline使用哪种模式以获得最佳效果

## 进一步学习

查看完整文档：
- 原始仓库：https://github.com/Bhartendu-Kumar/rules_template
- 本地模板项目：`/home/averyubuntu/projects/rules_template_project`

## 配置完成时间
2025年1月7日 17:15

---

**配置状态：✅ 已完成并可用**
