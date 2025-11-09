#!/usr/bin/env node

/**
 * 自动Git提交推送工具
 * 功能：任务完成后自动记录用户消息、处理概括和文件变更，然后推送到GitHub
 * 
 * 使用方法：
 * node auto-git-commit.js --message "用户原始消息" --summary "AI处理概括"
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// 配置
const CONFIG = {
  githubUser: 'laiyinyizao007',
  projectsRoot: '/home/averyubuntu/projects',
  logFile: path.join(__dirname, 'auto-commit-log.txt')
};

// 执行命令并确保有输出（解决terminal卡住问题）
function exec(cmd, options = {}) {
  try {
    // 添加 `|| echo "DONE"` 确保总有输出
    const result = execSync(cmd + ' || echo "DONE"', { 
      encoding: 'utf-8', 
      stdio: options.silent ? 'pipe' : 'inherit',
      ...options 
    });
    return result;
  } catch (error) {
    if (!options.ignoreError) {
      console.error(`命令执行失败: ${cmd}`);
      console.error(error.message);
    }
    return '';
  }
}

// 日志函数
function log(message, type = 'INFO') {
  const timestamp = new Date().toISOString();
  const logMessage = `[${timestamp}] [${type}] ${message}\n`;
  console.log(logMessage.trim());
  fs.appendFileSync(CONFIG.logFile, logMessage);
}

// 获取当前项目名称
function getCurrentProject() {
  const cwd = process.cwd();
  return path.basename(cwd);
}

// 获取文件变更列表
function getChangedFiles() {
  try {
    const status = exec('git status --porcelain', { silent: true });
    const files = status.split('\n')
      .filter(line => line.trim())
      .map(line => line.substring(3));
    return files;
  } catch (error) {
    return [];
  }
}

// 生成提交消息
function generateCommitMessage(userMessage, summary, changedFiles) {
  const timestamp = new Date().toISOString();
  
  let message = `任务完成: ${summary || '更新项目文件'}\n\n`;
  
  if (userMessage) {
    message += `用户消息:\n${userMessage}\n\n`;
  }
  
  if (summary) {
    message += `处理概括:\n${summary}\n\n`;
  }
  
  if (changedFiles.length > 0) {
    message += `文件变更:\n`;
    changedFiles.slice(0, 20).forEach(file => {
      message += `- ${file}\n`;
    });
    if (changedFiles.length > 20) {
      message += `... 还有 ${changedFiles.length - 20} 个文件\n`;
    }
    message += `\n`;
  }
  
  message += `完成时间: ${timestamp}`;
  
  return message;
}

// 检查是否在Git仓库中
function isGitRepo() {
  try {
    exec('git rev-parse --is-inside-work-tree', { silent: true, ignoreError: true });
    return true;
  } catch {
    return false;
  }
}

// 主函数
async function main() {
  const args = process.argv.slice(2);
  
  // 解析参数
  let userMessage = '';
  let summary = '';
  
  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--message' && args[i + 1]) {
      userMessage = args[i + 1];
      i++;
    } else if (args[i] === '--summary' && args[i + 1]) {
      summary = args[i + 1];
      i++;
    } else if (args[i] === '--help') {
      console.log(`
自动Git提交推送工具

用法: node auto-git-commit.js [选项]

选项:
  --message <text>    用户原始消息
  --summary <text>    AI处理概括
  --help              显示帮助信息

示例:
  node auto-git-commit.js --message "增加新功能" --summary "添加了用户认证模块"
      `);
      process.exit(0);
    }
  }
  
  const projectName = getCurrentProject();
  log(`开始处理项目: ${projectName}`);
  
  // 检查是否在Git仓库中
  if (!isGitRepo()) {
    log('当前目录不是Git仓库，跳过', 'WARN');
    return;
  }
  
  // 获取变更文件
  const changedFiles = getChangedFiles();
  
  if (changedFiles.length === 0) {
    log('没有文件变更，跳过提交', 'INFO');
    return;
  }
  
  log(`检测到 ${changedFiles.length} 个文件变更`);
  
  // 添加所有文件
  log('添加文件到Git...');
  exec('git add -A && echo "Files added"');
  
  // 生成提交消息
  const commitMessage = generateCommitMessage(userMessage, summary, changedFiles);
  
  // 创建提交
  log('创建提交...');
  const commitCmd = `git commit -m "${commitMessage.replace(/"/g, '\\"')}" && echo "Commit created"`;
  exec(commitCmd);
  
  // 推送到远程
  log('推送到GitHub...');
  exec('git push && echo "Push completed"');
  
  log('✓ 自动提交和推送完成!', 'SUCCESS');
}

// 运行
if (require.main === module) {
  main().catch(error => {
    log(`发生错误: ${error.message}`, 'ERROR');
    process.exit(1);
  });
}

module.exports = { generateCommitMessage, getChangedFiles };
