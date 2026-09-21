import { useState } from 'react'
// import './index.css'

function App() {
  const [count, setCount] = useState(0)

  const products = [
    { id: 1, category: "3C 科技", title: "AI 降噪智慧耳機", desc: "搭載最新 AI 動態降噪晶片，完美隔絕噪音。", price: 3990 },
    { id: 2, category: "智慧家電", title: "AI 智慧掃地機器人", desc: "自動建圖、光學避障，最聰明的居家清潔助手。", price: 12800 },
    { id: 3, category: "生活配件", title: "智慧健康偵測手環", desc: "24小時心率、睡眠監測，超長續航力兩星期。", price: 1490 }
  ]

  const handleAddToCart = () => {
    setCount(count + 1)
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 antialiased font-sans">
      {/* 導覽列 (Navbar) */}
      <nav className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex-shrink-0 flex items-center">
              <span className="text-2xl font-black text-blue-600 tracking-wider">🛒 SmartCart</span>
              <span className="ml-2 px-2 py-0.5 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">AI Powered</span>
            </div>
            <div class="flex items-center space-x-6">
              <button className="relative p-2 text-gray-600 hover:text-blue-600 transition">
                <span className="text-lg font-medium">🛒 購物車</span>
                <span className="absolute -top-1 -right-3 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-white bg-red-500 rounded-full">
                  {count}
                </span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* 商品展示區 */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-2xl font-bold mb-6 text-left">今日推薦商品</h2>
        
        {/* 商品卡片外層容器，設定 grid 網格排版 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* 迴圈生成商品 */}
          {products.map((item) => {
            return (
              <div key={item.id} className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 flex flex-col justify-between text-left">
                <div className="p-6">
                  <div className="text-xs font-semibold text-blue-600 uppercase tracking-wide">{item.category}</div>
                  <h3 className="block mt-1 text-lg leading-tight font-medium text-black">{item.title}</h3>
                  <p className="mt-2 text-gray-500 text-sm">{item.desc}</p>
                </div>
                
                <div className="p-6 pt-0 flex items-center justify-between">
                  <span className="text-xl font-bold text-gray-900">${item.price.toLocaleString()}</span>
                  <button 
                    onClick={handleAddToCart}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700 transition"
                  >
                    加入購物車
                  </button>
                </div>
              </div>
            )
          })}

        </div>
      </main>
    </div>
  )
}

export default App
