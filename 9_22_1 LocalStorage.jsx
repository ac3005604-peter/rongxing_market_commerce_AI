// 💡 2-2 核心改變：多引入 useEffect Hook
import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import ProductCard from './components/ProductCard'

function App() {
  // 💡 2-2 核心改變：初始化購物車時，優先從 LocalStorage 撈取舊資料
  // 如果有舊資料就用 JSON.parse 轉回陣列，沒有的話就預設給一個空陣列 []
  const [cart, setCart] = useState(() => {
    const localData = localStorage.getItem('smart_cart')
    return localData ? JSON.parse(localData) : []
  })

  const products = [
    { id: 1, category: "3C 科技", title: "AI 降噪智慧耳機", desc: "搭載最新 AI 動態降噪晶片，完美隔絕噪音。", price: 3990 },
    { id: 2, category: "智慧家電", title: "AI 智慧掃地機器人", desc: "自動建圖、光學避障，最聰明的居家清潔助手。", price: 12800 },
    { id: 3, category: "生活配件", title: "智慧健康偵測手環", desc: "24小時心率、睡眠監測，超長續航力兩星期。", price: 1490 }
  ]

  // 💡 2-2 新觀念：使用 useEffect 監聽變數
  // 當第二個參數的陣列裡放了 [cart]，代表「只要 cart 陣列有任何風吹草動，這段程式碼就會自動觸發！」
  useEffect(() => {
    // 將最新的購物車狀態轉成字串，並存入 LocalStorage 鎖定
    localStorage.setItem('smart_cart', JSON.stringify(cart))
  }, [cart])

  const handleAddToCart = (product) => {
    const isExist = cart.find(item => item.id === product.id)
    if (isExist) {
      const newCart = cart.map(item => 
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      )
      setCart(newCart)
    } else {
      setCart([...cart, { ...product, quantity: 1 }])
    }
  }

  // 💡 2-2 新增功能：清空購物車
  const handleClearCart = () => {
    if (window.confirm('確定要清空購物車嗎？')) {
      setCart([])
    }
  }

  const totalItems = cart.reduce((total, item) => total + item.quantity, 0)
  const totalPrice = cart.reduce((total, item) => total + (item.price * item.quantity), 0)

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 antialiased font-sans">
      <Navbar cartCount={totalItems} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-2xl font-bold mb-6 text-left">今日推薦商品</h2>
        
        {/* 商品列表 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {products.map((item) => (
            <ProductCard 
              key={item.id} 
              item={item} 
              onAddToCart={() => handleAddToCart(item)} 
            />
          ))}
        </div>

        {/* 購物車明細清單 */}
        <div className="bg-white rounded-xl shadow-md p-6 max-w-md mx-auto text-left border border-gray-100">
          <h3 className="text-xl font-bold mb-4 border-b pb-2 flex items-center justify-between">
            <span>🛒 購物車明細清單</span>
            {/* 💡 2-2 新增清空按鈕 */}
            {cart.length > 0 && (
              <button 
                onClick={handleClearCart}
                className="text-xs text-red-500 hover:text-red-700 font-medium transition"
              >
                🗑️ 清空全部
              </button>
            )}
          </h3>
          
          {cart.length === 0 ? (
            <p className="text-gray-400 text-sm text-center py-4">購物車空空如也，快去挑選商品吧！</p>
          ) : (
            <div>
              <div className="space-y-3 mb-4">
                {cart.map(item => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-gray-600">{item.title} <strong className="text-blue-600">x{item.quantity}</strong></span>
                    <span className="font-medium text-gray-900">${(item.price * item.quantity).toLocaleString()}</span>
                  </div>
                ))}
              </div>
              
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
