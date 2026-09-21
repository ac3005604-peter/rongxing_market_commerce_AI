// 💡 1-3 新觀念：Props。組件就像 Java 的 Method，可以透過參數（Props）接收外部傳進來的資料
function Navbar({ cartCount }) {
  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-shrink-0 flex items-center">
            <span className="text-2xl font-black text-blue-600 tracking-wider">🛒 SmartCart</span>
            <span className="ml-2 px-2 py-0.5 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">AI Powered</span>
          </div>
          <div className="flex items-center space-x-6">
            <button className="relative p-2 text-gray-600 hover:text-blue-600 transition">
              <span className="text-lg font-medium">🛒 購物車</span>
              {/* 這裡的資料是由外部的 App.jsx 傳進來的 */}
              <span className="absolute -top-1 -right-3 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-white bg-red-500 rounded-full">
                {cartCount}
              </span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar