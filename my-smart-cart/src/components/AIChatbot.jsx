import { useState } from 'react'
import 'dotenv/config';//讀金鑰

const HF_TOKEN = process.env.AI_API_KEY;


function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false) // 💡 新增：控制 AI 載入中的狀態
  const [messages, setMessages] = useState([
    { sender: 'ai', text: '您好！我是 SmartCart 的 AI 智能助理，有什麼我可以幫您的嗎？（例如：我想找 3000 元左右的商品）' }
  ])

  // // 💡 3-2 核心：呼叫免費開源 AI 模型的函式
  // const fetchAIResponse = async (userText) => {
  //   try {
  //     setIsLoading(true)
      
  //     // 呼叫 Hugging Face 提供的免費 Llama 3 運算通道
  //     const response = await fetch(
    // "https://huggingface.co",
        // "/api-hf/api/...",
        // "/api-hf/api/models/gpt2",
        // "/api-hf/models/openai-community/gpt2", // 💡 拿掉原本多寫的 /api
        
  //       "https://huggingface.co",
  //       {
  //         headers: { "Content-Type": "application/json" },
  //         method: "POST",
  //         body: JSON.stringify({ 
  //           inputs: `<|begin_of_text|><|start_header_id|>system<|end_header_id|>
  //           你是 SmartCart 電商網站的繁體中文客服助理。請用親切、簡短的口吻回答。
  //           目前商城有三件商品：
  //           1. AI 降噪智慧耳機 ($3,990)
  //           2. AI 智慧掃地機器人 ($12,800)
  //           3. 智慧健康偵測手環 ($1,490)
  //           請根據使用者的提問進行回答與導購推薦。<|eot_id|><|start_header_id|>user<|end_header_id|>${userText}<|eot_id|><|start_header_id|>assistant<|end_header_id|>` 
  //         }),
  //       }
  //     )
      
  //     const result = await response.json()
      
  //     // 解析 AI 回傳的純文字內容
  //     let aiText = result[0]?.generated_text || "不好意思，我的大腦開小差了，請再試一次！"
  //     // 清理掉模型自帶的 Prompt 標籤
  //     aiText = aiText.split("<|start_header_id|>assistant<|end_header_id|>").pop().replace("<|eot_id|>", "").trim()

  //     setMessages(prev => [...prev, { sender: 'ai', text: aiText }])
  //   } catch (error) {
  //     console.error(error)
  //     setMessages(prev => [...prev, { sender: 'ai', text: "連線超時，AI 正在維護中，請稍後再試！" }])
  //   } finally {
  //     setIsLoading(false)
  //   }
  // }

    // 💡 3-2 核心：呼叫免費開源 AI 模型的函式 (加上免費的 Token 驗證)
  const fetchAIResponse = async (userText) => {
    try {
      setIsLoading(true)
      
   

      /*  查詢 Hugging Face 可用的模型清單，這段程式碼可以先註解掉，等你確認連通後再刪掉    
        fetch("/api-hf/models", {
        headers: { "Authorization": `Bearer ${HF_TOKEN}` }
        })
        .then(res => res.json())
        .then(data => console.log("📊 當前可用的模型清單：", data));
      */

      const response = await fetch(
        "/api-hf/chat/completions", // 💡 改用標準的對話路徑
          { // 💡 加上 Authorization header，AI 就不會再對你連線超時了！
          headers: { 
            "Content-Type": "application/json",
            "Authorization": `Bearer ${HF_TOKEN}` 
          },
          method: "POST",
          body: JSON.stringify({ // 💡 傳入你想使用的模型名稱與對話內容
            model: "deepseek-ai/DeepSeek-R1:fastest", 
            messages: [
              { role: "user", 
                content: userText } // 放入使用者輸入的訊息
            ]
          }),  
        }
      )
      
// /*
// ====== 💡 這裡加入印出檢查，不用管畫面呈現，先在控制台看有沒有連通 ======
console.log("原始 Response 物件:", response);

if (response.ok) {
  const data = await response.json();
  console.log("✅ 連通成功！Hugging Face 回傳的完整資料：", data);
  console.log("🤖 AI 的回覆內容：", data.choices[0].message.content);


  let aiText = data.choices[0].message.content;
      // 清理掉模型自帶的 Prompt 標籤
      if (aiText.includes("<|start_header_id|>assistant<|end_header_id|>")) {
        aiText = aiText.split("<|start_header_id|>assistant<|end_header_id|>").pop().replace("<|eot_id|>", "").trim()
      }

      setMessages(prev => [...prev, { sender: 'ai', text: aiText }])



} else {
  const errorText = await response.text();
  console.error(`❌ 連通失敗，狀態碼：${response.status}，錯誤原因：`, errorText);
}
// */



      // const result = await response.json()
      
      // 解析 AI 回傳的純文字內容
      // let aiText = result?.[0]?.generated_text || result?.generated_text || "不好意思，我的大腦開小差了，請再試一次！"
      // let aiText = response.choices[0].messages.content;
    

      // 清理掉模型自帶的 Prompt 標籤
      // if (aiText.includes("<|start_header_id|>assistant<|end_header_id|>")) {
        // aiText = aiText.split("<|start_header_id|>assistant<|end_header_id|>").pop().replace("<|eot_id|>", "").trim()
      // }

      // setMessages(prev => [...prev, { sender: 'ai', text: aiText }])
    } catch (error) {
      console.error(error)
      setMessages(prev => [...prev, { sender: 'ai', text: "連線超時，AI 正在維護中，請稍後再試！" }])
    } finally {
      setIsLoading(false)
    }
  }




  const handleSend = (e) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage = { sender: 'user', text: input }
    setMessages(prev => [...prev, userMessage])
    const currentInput = input
    setInput('')

    // 💡 觸發真實的 AI 請求
    fetchAIResponse(currentInput)
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans">
      {!isOpen && (
        <button 
          onClick={() => setIsOpen(true)}
          className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-all flex items-center justify-center cursor-pointer animate-bounce"
        >
          <span className="text-2xl">🤖</span>
          <span className="ml-2 font-bold text-sm pr-1">AI 客服</span>
        </button>
      )}

      {isOpen && (
        <div className="bg-white w-80 md:w-96 h-[450px] rounded-2xl shadow-2xl border border-gray-100 flex flex-col overflow-hidden transition-all">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-3 flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <span className="text-xl">🤖</span>
              <div>
                <h4 className="font-bold text-sm text-left">SmartCart AI 導購助理</h4>
                <p className="text-[10px] text-blue-100 text-left">真實開源 AI 運作中</p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-white hover:text-gray-200 text-xl cursor-pointer">✕</button>
          </div>

          <div className="flex-1 p-4 overflow-y-auto bg-gray-50 space-y-3">
            {messages.map((msg, index) => (
              <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[75%] rounded-2xl px-3 py-2 text-sm text-left shadow-sm ${
                  msg.sender === 'user' ? 'bg-blue-600 text-white rounded-br-none' : 'bg-white text-gray-800 rounded-bl-none border border-gray-100'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            
            {/* 💡 新增：AI 正在思考時的動態「...」點點點提示 */}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white text-gray-400 rounded-2xl rounded-bl-none px-3 py-2 text-sm border border-gray-100 shadow-sm animate-pulse">
                  AI 正在思考中...
                </div>
              </div>
            )}
          </div>

          <form onSubmit={handleSend} className="p-3 bg-white border-t flex space-x-2">
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={isLoading}
              placeholder={isLoading ? "AI 正在回覆中..." : "請輸入您的問題..."}
              className="flex-1 bg-gray-100 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition disabled:opacity-50"
            />
            <button 
              type="submit"
              disabled={isLoading}
              className="bg-blue-600 text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-blue-700 transition cursor-pointer disabled:bg-gray-400"
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