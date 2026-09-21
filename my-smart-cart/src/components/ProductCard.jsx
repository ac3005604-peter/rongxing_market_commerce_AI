// 💡 Props 除了可以傳送基本資料(item)，也可以把點擊事件的 Function (onAddToCart) 像物件一樣傳進來！
function ProductCard({ item, onAddToCart }) {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 flex flex-col justify-between text-left">
      <div className="p-6">
        <div className="text-xs font-semibold text-blue-600 uppercase tracking-wide">{item.category}</div>
        <h3 className="block mt-1 text-lg leading-tight font-medium text-black">{item.title}</h3>
        <p className="mt-2 text-gray-500 text-sm">{item.desc}</p>
      </div>
      
      <div className="p-6 pt-0 flex items-center justify-between">
        <span className="text-xl font-bold text-gray-900">${item.price.toLocaleString()}</span>
        <button 
          onClick={onAddToCart}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700 transition"
        >
          加入購物車
        </button>
      </div>
    </div>
  )
}

export default ProductCard