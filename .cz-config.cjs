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
  useEmoji: false,
  scopes: ['html', 'css', 'js', 'config'],
  enableMultipleScopes: true,
  scopeEnumSeparator: ",",
  issuePrefixs: [
    { value: 'close', name: 'close: issue 關閉' },
    { value: 'fix', name: 'fix: issue 修正' },
    { value: 'resolve', name: 'resolve: issue 解決' },
    { value: 'ref', name: 'ref: issue 參考' }
  ],
  messages: {
    type: '請選擇本次提交的變更類型：',
    scope: '說明此變更所影響的範圍（可複選）：',
    customScope: '請輸入此變更所影響的範圍:',
    subject: '簡要描述這次的變更內容（必填）：',
    body: '提供較詳細的變更說明（選填），使用 "|" 換行:',
    breaking: '有列出任何重大變更（選填），使用 "|" 換行:',
    footerPrefixesSelect: "請選擇此次變更對應的 issue 類型（選填）",
    customFooterPrefix: "請輸入 issue 類型",
    footer: '列出與此次變更相關的 issue（選填）例如：#31, #34:',
    confirmCommit: '確定要提交以上內容嗎？'
  },
  breaklineNumber: 72,
  skipQuestions: ['breaking', 'footerPrefix', 'footer']
};