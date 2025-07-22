module.exports = {
  types: [
    { value: 'feat',     name: 'feat:     新功能' },
    { value: 'fix',      name: 'fix:      修 bug' },
    { value: 'docs',     name: 'docs:     文件更新' },
    { value: 'style',    name: 'style:    格式（排版、空白、逗號等等）' },
    { value: 'refactor', name: 'refactor: 重構（不是修 bug 或加新功能）' },
    { value: 'perf',     name: 'perf:     性能優化' },
    { value: 'test',     name: 'test:     增加測試' },
    { value: 'chore',    name: 'chore:    架構建設、工具設定等' }
  ],
  scopes: [
    { name: 'html' },
    { name: 'css' },
    { name: 'js' },
    { name: 'config' }
  ],
  messages: {
    type: '選擇本次 commit 類型:',
    scope: '選擇影響範圍（可選）:',
    customScope: '自訂範圍:',
    subject: '簡短描述（必填）:',
    body: '詳細說明（選填）:',
    breaking: '有重大變更嗎？（選填）:',
    footer: '關閉的 issue（選填）例如：#31, #34:',
    confirmCommit: '確定送出上述 commit 嗎？'
  },
  allowCustomScopes: true,
  allowBreakingChanges: ['feat', 'fix'],
  subjectLimit: 72
};