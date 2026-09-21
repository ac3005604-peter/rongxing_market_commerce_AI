import { useState } from 'react'
import Navbar from './components/Navbar'        // 👈 引入導覽列組件
import ProductCard from './components/ProductCard' // 👈 引入商品卡片組件


function App() {
  // 💡 2-1 核心改變：將購物車狀態從「數字」升級為「陣列」
  // 陣列結構會長這樣：[{ id: 1, title: '...', price: 3990, quantity: 2 }]
  const [cart, setCart] = useState([])

  const products = [
    { id: 1, category: "3C 科技", title: "AI 降噪智慧耳機", desc: "搭載最新 AI 動態降噪晶片，完美隔絕噪音。", price: 3990 },
    { id: 2, category: "智慧家電", title: "AI 智慧掃地機器人", desc: "自動建圖、光學避障，最聰明的居家清潔助手。", price: 12800 },
    { id: 3, category: "生活配件", title: "智慧健康偵測手環", desc: "24小時心率、睡眠監測，超長續航力兩星期。", price: 1490 }
  ]

  // 💡 2-1 核心邏輯：處理加入購物車的商務邏輯
  const handleAddToCart = (product) => {
    // 1. 檢查購物車內是否已經有這件商品 (類似 Java 的 List.stream().filter().findFirst())
    const isExist = cart.find(item => item.id === product.id)

    if (isExist) {
      // 2. 情況 B：如果商品已存在，用 .map 複製新陣列，並把該商品的數量 + 1
      const newCart = cart.map(item => 
        item.id === product.id 
          ? { ...item, quantity: item.quantity + 1 } 
          : item
      )
      setCart(newCart)
    } else {
      // 3. 情況 A：如果商品不存在，把商品資訊加上 quantity: 1，並塞進購物車陣列
      // ...cart 代表複製原本購物車的所有內容，後面補上新物件
      setCart([...cart, { ...product, quantity: 1 }])
    }
  }

  // 💡 2-1 衍生計算：利用現有的 cart 陣列，即時算出總數量 (類似 Java 的 stream.mapToInt().sum())
  // totalAccumulator 是累加器，item 是目前的購物車項目
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0)

  // 💡 2-1 衍生計算：即時算出購物車總金額
  const totalPrice = cart.reduce((total, item) => total + (item.price * item.quantity), 0)

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 antialiased font-sans">
      {/* 導覽列：我們把算好的「總數量」傳過去 */}
      <Navbar cartCount={totalItems} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-2xl font-bold mb-6 text-left">今日推薦商品</h2>
        
        {/* 商品列表 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {products.map((item) => (
            <ProductCard 
              key={item.id} 
              item={item} 
              // 💡 注意：這裡改傳整個 item 物件過去，這樣 Function 才知道點的是哪一隻商品！
              onAddToCart={() => handleAddToCart(item)} 
            />
          ))}
        </div>

        {/* 💡 2-1 新增畫面：即時清單與明細展示 (後台資料可視化) */}
        <div className="bg-white rounded-xl shadow-md p-6 max-w-md mx-auto text-left border border-gray-100">
          <h3 className="text-xl font-bold mb-4 border-b pb-2 flex items-center justify-between">
            <span>🛒 購物車明細清單</span>
            <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">Debug 模式</span>
          </h3>
          
          {cart.length === 0 ? (
            <p className="text-gray-400 text-sm text-center py-4">購物車空空如也，快去挑選商品吧！</p>
          ) : (
            <div>
              {/* 渲染購物車內已選購的清單 */}
              <div className="space-y-3 mb-4">
                {cart.map(item => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-gray-600">{item.title} <strong className="text-blue-600">x{item.quantity}</strong></span>
                    <span className="font-medium text-gray-900">${(item.price * item.quantity).toLocaleString()}</span>
                  </div>
                ))}
              </div>
              
              {/* 總結帳金額 */}
              <div className="border-t pt-4 flex justify-between items-center">
                <span className="font-bold text-gray-700">預估結帳總金額：</span>
                <span className="text-2xl font-black text-red-500">${totalPrice.toLocaleString()}</span>
              </div>
            </div>
          )}
        </div>

      </main>
    </div>
  )
}

export default App