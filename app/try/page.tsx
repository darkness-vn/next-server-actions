import axios from "axios"
import { revalidateTag } from "next/cache"
import Product from './product'

export default async function Home() {

    const res = await fetch(`http://localhost:3000/api/products`, {
        next: { tags: ["products"] }
    })

    const products = await res.json()

    const handleAdd = async (e: FormData) => {
        "use server"
        const name = e.get("name")?.toString()
        const description = e.get("description")?.toString()
        const price = e.get("price")?.toString()
        const stock = e.get("stock")?.toString()
        const category = e.get("category")?.toString()
        if (!name || !description || !price || !stock || !category) return

        const newProduct = { name, description, price, stock, category }

        await fetch("http://localhost:3000/api/products", {
            method: "POST",
            body: JSON.stringify(newProduct),
            headers: {
                "Content-Type": "application/json"
            },
            next: { tags: ["products"] }
        })

        return revalidateTag("products")
    }

    return (
        <main className="p-24">

            <form action={handleAdd} className="flex min-h-screen items-center justify-between">
                <div className="flex flex-col space-y-2 p-3 rounded-lg bg-red-500">
                    <input type="text" placeholder='Ten san pham' name="name" className="bg-gray-700 rounded-lg py-1 px-3" />
                    <input type="text" placeholder='Mo ta ve san pham' name="description" className="bg-gray-700 rounded-lg py-1 px-3" />
                    <input type="text" placeholder='Gia san pham' name="price" className="bg-gray-700 rounded-lg py-1 px-3" />
                    <input type="text" placeholder='So luong' name="stock" className="bg-gray-700 rounded-lg py-1 px-3" />
                    <select placeholder='Chung loai' name="category" className="bg-gray-700 rounded-lg py-1 px-3">
                        <option value="do-gia-dung">Đồ gia dụng</option>
                        <option value="may-anh">Máy ảnh</option>
                        <option value="laptop">Laptop</option>
                        <option value="dien-thoai">Điện thoại</option>
                        <option value="phu-kien">Phụ kiện</option>
                    </select>
                    <button className="bg-dark-2 w-full py-1 text-white rounded-lg bg-green-600">Tạo sản phẩm</button>
                </div>


                <div className="grid grid-cols-4 gap-3">
                    {(products.data || []).map((item: any) => <Product key={item._id} item={item} />)}
                </div>
            </form>

        </main>
    )
}
