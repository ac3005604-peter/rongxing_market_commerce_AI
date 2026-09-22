import { useState } from 'react'

function AIChatbot() {
  // 💡 控制聊天視窗是「開啟」還是「關閉」的狀態
  const [isOpen, setIsOpen] = useState(false)
  // 💡 儲存使用者目前在輸入框打的字
  const [input, setInput] = useState('')
  // 💡 儲存聊天紀錄的陣列 (預設有一句 AI 的歡迎詞)
  const [messages, setMessages] = useState([
    { sender: 'ai', text: '您好！我是 SmartCart 的 AI 智能助理，有什麼我可以幫您的嗎？（例如：我想找3000元以下的耳機）' }
  ])

  // 傳送訊息的 Function
  const handleSend = (e) => {
    e.preventDefault()
    if (!input.trim()) return

    // 1. 先把使用者的訊息加進對話紀錄
    const userMessage = { sender: 'user', text: input }
    setMessages(prev => [...prev, userMessage])
    setInput('')

    // 2. 模擬 AI 正在思考的罐頭回覆 (我們下一節課會在這裡真正串接 OpenAI API！)
    setTimeout(() => {
      const aiReply = { sender: 'ai', text: `收到您的訊息！您說的是：「${input}」。這項 AI 智慧搜尋功能我們即將在 3-2 章節完全接通喔！` }
      setMessages(prev => [...prev, aiReply])
    }, 800)
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans">
      {/* 🟢 1. 右下角圓形 AI 啟動按鈕 */}
      {!isOpen && (
        <button 
          onClick={() => setIsOpen(true)}
          className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-all flex items-center justify-center cursor-pointer animate-bounce"
        >
          <span className="text-2xl">🤖</span>
          <span className="ml-2 font-bold text-sm pr-1">AI 客服</span>
        </button>
      )}

      {/* 🔵 2. 彈出的聊天視窗本體 */}
      {isOpen && (
        <div className="bg-white w-80 md:w-96 h-[450px] rounded-2xl shadow-2xl border border-gray-100 flex flex-col overflow-hidden transition-all">
          {/* 視窗頂部 Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-3 flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <span className="text-xl">🤖</span>
              <div>
                <h4 className="font-bold text-sm text-left">SmartCart AI 導購助理</h4>
                <p className="text-[10px] text-blue-100 text-left">在線即時分析商品中</p>
              </div>
            </div>
            {/* 關閉按鈕 */}
            <button onClick={() => setIsOpen(false)} className="text-white hover:text-gray-200 text-xl cursor-pointer">
              ✕
            </button>
          </div>

          {/* 視窗中部：對話紀錄滾動區 */}
          <div className="flex-1 p-4 overflow-y-auto bg-gray-50 space-y-3">
            {messages.map((msg, index) => (
              <div 
                key={index} 
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-[75%] rounded-2xl px-3 py-2 text-sm text-left shadow-sm ${
                  msg.sender === 'user' 
                    ? 'bg-blue-600 text-white rounded-br-none' 
                    : 'bg-white text-gray-800 rounded-bl-none border border-gray-100'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          {/* 視窗底部：輸入框區表單 */}
          <form onSubmit={handleSend} className="p-3 bg-white border-t flex space-x-2">
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="請輸入您的問題..."
              className="flex-1 bg-gray-100 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition"
            />
            <button 
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-blue-700 transition cursor-pointer"
            >
              發送
            </button>
          </form>
        </div>
      )}
    </div>
  )
}

export default AIChatbot