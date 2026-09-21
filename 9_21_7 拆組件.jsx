import { useState } from 'react'
import Navbar from './components/Navbar'        // 👈 引入導覽列組件
import ProductCard from './components/ProductCard' // 👈 引入商品卡片組件

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
      {/* 💡 乾淨無瑕！直接使用 Navbar 組件，並把狀態當成參數傳過去 */}
      <Navbar cartCount={count} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-2xl font-bold mb-6 text-left">今日推薦商品</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* 💡 迴圈現在變得超優雅：每個 item 都丟給 ProductCard 組件去畫 */}
          {products.map((item) => (
            <ProductCard 
              key={item.id} 
              item={item} 
              onAddToCart={handleAddToCart} 
            />
          ))}
        </div>
      </main>
    </div>
  )
}

export default App