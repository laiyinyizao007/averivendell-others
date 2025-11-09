#!/usr/bin/env node

/**
 * Git自动管理工具
 * 功能：
 * 1. 批量推送所有项目到GitHub
 * 2. 自动检测文件变更
 * 3. 生成智能提交消息
 * 4. 自动提交和推送
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// 配置
const CONFIG = {
  githubUser: 'laiyinyizao007',
  projectsRoot: '/home/averyubuntu/projects',
  projects: {
    'api-connection-tester': 'averivendell-api-connection-tester',
    'backup-manager': 'averivendell-backup-manager',
    'cline-context-optimizer': 'averivendell-cline-context-optimizer',
    'github-mcp-research': 'averivendell-github-mcp-research',
    'linux-learning-project': 'averivendell-linux-learning-project',
    'notion-api-research': 'averivendell-notion-api-research',
    'rules': 'averivendell-rules',
    'rules_template_project': 'averivendell-rules_template_project',
    'telegram-AIworkHorse': 'averivendell-telegram-AIworkHorse',
    'telegram-AnotherAvery_bot': 'averivendell-telegram-AnotherAvery_bot',
    'telegram-botManagement': 'averivendell-telegram-botManagement',
    'telegram-groupChat': 'averivendell-telegram-groupChat',
    'vibe-coding': 'averivendell-vibe-coding',
    'wsl-vscode-diagnostics': 'averivendell-wsl-vscode-diagnostics'
  }
};

// 执行命令并返回输出
function exec(cmd, options = {}) {
  try {
    return execSync(cmd, { 
      encoding: 'utf-8', 
      stdio: options.silent ? 'pipe' : 'inherit',
      ...options 
    });
  } catch (error) {
    if (!options.ignoreError) {
      throw error;
    }
    return '';
  }
}

// 日志函数
function log(message, type = 'info') {
  const colors = {
    info: '\x1b[36m',
    success: '\x1b[32m',
    error: '\x1b[31m',
    warn: '\x1b[33m'
  };
  const reset = '\x1b[0m';
  console.log(`${colors[type]}[${type.toUpperCase()}]${reset} ${message}`);
}

// 检查目录是否存在
function dirExists(dir) {
  return fs.existsSync(dir) && fs.statSync(dir).isDirectory();
}

// 初始化Git仓库
function initGitRepo(projectPath) {
  const gitDir = path.join(projectPath, '.git');
  if (!fs.existsSync(gitDir)) {
    log('初始化Git仓库...', 'info');
    exec('git init', { cwd: projectPath });
    exec('git branch -M main', { cwd: projectPath, ignoreError: true });
    return true;
  }
  return false;
}

// 配置remote
function setupRemote(projectPath, repoName) {
  const remoteUrl = `https://github.com/${CONFIG.githubUser}/${repoName}.git`;
  
  try {
    const currentRemote = exec('git remote get-url origin', { 
      cwd: projectPath, 
      silent: true,
      ignoreError: true 
    }).trim();
    
    if (currentRemote && currentRemote !== remoteUrl) {
      log(`更新remote URL: ${currentRemote} -> ${remoteUrl}`, 'warn');
      exec(`git remote set-url origin ${remoteUrl}`, { cwd: projectPath });
    } else if (!currentRemote) {
      log('添加remote origin...', 'info');
      exec(`git remote add origin ${remoteUrl}`, { cwd: projectPath });
    }
  } catch (error) {
    log('添加remote origin...', 'info');
    exec(`git remote add origin ${remoteUrl}`, { cwd: projectPath, ignoreError: true });
  }
}

// 检查是否有变更
function hasChanges(projectPath) {
  const status = exec('git status --porcelain', { 
    cwd: projectPath, 
    silent: true 
  });
  return status.trim().length > 0;
}

// 提交变更
function commitChanges(projectPath, message) {
  exec('git add -A', { cwd: projectPath });
  
  if (hasChanges(projectPath)) {
    exec(`git commit -m "${message}"`, { cwd: projectPath });
    return true;
  }
  return false;
}

// 推送到GitHub
function pushToGitHub(projectPath) {
  try {
    exec('git push -u origin main', { cwd: projectPath });
    return true;
  } catch (error) {
    log(`推送失败: ${error.message}`, 'error');
    return false;
  }
}

// 处理单个项目
async function setupProject(localName, repoName) {
  const projectPath = path.join(CONFIG.projectsRoot, localName);
  
  console.log('\n' + '='.repeat(60));
  log(`配置项目: ${localName}`, 'info');
  log(`GitHub仓库: ${repoName}`, 'info');
  console.log('='.repeat(60));
  
  // 检查目录是否存在
  if (!dirExists(projectPath)) {
    log(`项目目录不存在: ${projectPath}`, 'warn');
    return { success: false, project: localName, reason: '目录不存在' };
  }
  
  try {
    // 初始化Git
    const isNewRepo = initGitRepo(projectPath);
    
    // 配置remote
    setupRemote(projectPath, repoName);
    
    // 准备提交消息
    const commitMessage = `Initial commit: Setup project structure and documentation

- 初始化项目结构
- 添加核心功能代码
- 完善项目文档
- 配置开发环境

Date: ${new Date().toISOString()}`;
    
    // 提交变更
    const hasCommit = commitChanges(projectPath, commitMessage);
    
    if (hasCommit || isNewRepo) {
      // 推送到GitHub
      log('推送到GitHub...', 'info');
      const pushed = pushToGitHub(projectPath);
      
      if (pushed) {
        log(`✓ ${localName} 推送成功！`, 'success');
        return { success: true, project: localName };
      } else {
        return { success: false, project: localName, reason: '推送失败' };
      }
    } else {
      log(`✓ ${localName} 已是最新状态`, 'success');
      // 尝试推送确保远程同步
      pushToGitHub(projectPath);
      return { success: true, project: localName };
    }
  } catch (error) {
    log(`✗ ${localName} 处理失败: ${error.message}`, 'error');
    return { success: false, project: localName, reason: error.message };
  }
}

// 批量推送所有项目
async function pushAll() {
  log('开始批量推送所有项目...', 'info');
  log(`项目数量: ${Object.keys(CONFIG.projects).length}`, 'info');
  
  const results = [];
  
  for (const [localName, repoName] of Object.entries(CONFIG.projects)) {
    const result = await setupProject(localName, repoName);
    results.push(result);
    
    // 添加延迟避免GitHub API限制
    await new Promise(resolve => setTimeout(resolve, 500));
  }
  
  // 统计结果
  const success = results.filter(r => r.success).length;
  const failed = results.filter(r => !r.success).length;
  
  console.log('\n' + '='.repeat(60));
  log('批量推送完成！', 'success');
  log(`总计: ${results.length} 个项目`, 'info');
  log(`成功: ${success} 个`, 'success');
  log(`失败: ${failed} 个`, failed > 0 ? 'error' : 'info');
  console.log('='.repeat(60));
  
  if (failed > 0) {
    console.log('\n失败的项目:');
    results.filter(r => !r.success).forEach(r => {
      log(`- ${r.project}: ${r.reason}`, 'error');
    });
  }
  
  return results;
}

// 主函数
async function main() {
  const command = process.argv[2] || 'push-all';
  
  switch (command) {
    case 'push-all':
      await pushAll();
      break;
    case 'help':
      console.log(`
Git自动管理工具

用法: node git-auto-manager.js [命令]

命令:
  push-all    批量推送所有项目到GitHub (默认)
  help        显示帮助信息
      `);
      break;
    default:
      log(`未知命令: ${command}`, 'error');
      log('使用 "help" 查看可用命令', 'info');
  }
}

// 运行
if (require.main === module) {
  main().catch(error => {
    log(`发生错误: ${error.message}`, 'error');
    process.exit(1);
  });
}

module.exports = { setupProject, pushAll };
