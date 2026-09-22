import { useState } from 'react'

function App() {
  // 💡 這就是 React 最核心的 Hook 機制！
  // count 用來記錄目前的購物車數量，setCount 是改變這個數量的唯一方法
  const [count, setCount] = useState(0)

  // 💡 點擊「加入購物車」時觸發的 Function
  const handleAddToCart = () => {
    setCount(count + 1)
  }

  return (
    <div class="min-h-screen bg-gray-50 text-gray-800 antialiased font-sans">
      {/* 1. 現代化導覽列 (Navbar) */}
      <nav class="bg-white shadow-md sticky top-0 z-50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex justify-between h-16 items-center">
            {/* Logo */}
            <div class="flex-shrink-0 flex items-center">
              <span class="text-2xl font-black text-blue-600 tracking-wider">🛒 SmartCart</span>
              <span class="ml-2 px-2 py-0.5 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">AI Powered</span>
            </div>

            {/* 功能按鈕區 */}
            <div class="flex items-center space-x-6">
              <button class="relative p-2 text-gray-600 hover:text-blue-600 transition">
                <span class="text-lg font-medium">🛒 購物車</span>
                {/* 💡 這裡直接綁定 React 變數 {count}，數字會隨著點擊自動更新！ */}
                <span class="absolute -top-1 -right-3 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-white bg-red-500 rounded-full">
                  {count}
                </span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* 2. 商品展示區 */}
      <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 class="text-2xl font-bold mb-6">今日推薦商品</h2>
        
        {/* 商品卡片 */}
        <div class="max-w-sm bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
          <div class="p-6">
            <div class="text-xs font-semibold text-blue-600 uppercase tracking-wide">3C 科技</div>
            <h3 class="block mt-1 text-lg leading-tight font-medium text-black">AI 降噪智慧耳機</h3>
            <p class="mt-2 text-gray-500 text-sm">搭載最新 AI 動態降噪晶片，完美隔絕環境噪音，享受純淨音質。</p>
            <div class="mt-4 flex items-center justify-between">
              <span class="text-xl font-bold text-gray-900">$3,990</span>
              
              {/* 💡 這裡綁定 React 的點擊事件 onClick */}
              <button 
                onClick={handleAddToCart}
                class="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700 transition"
              >
                加入購物車
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default App