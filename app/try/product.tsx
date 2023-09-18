import invoker from "@/utils/invoker"
import { revalidateTag } from "next/cache"

const Product = ({ item }: any) => {
    return <div key={item._id} className='text-white px-2 py-1 rounded-lg bg-blue-600 w-52'>
        <p className='font-semibold'>{item.name}</p>
        <small>{item.description}</small>
        <p className='text-sm font-semibold'>{item.category}</p>
        <p className='text-sm font-semibold text-gray-300'>{item.price}đ</p>
        <button type="submit" formAction={async () => {
            "use server"
            await invoker(`http://localhost:3000/api/products/${item._id}`, {
                method: "DELETE"
            }, ["products"])
            return revalidateTag("products")
        }} className="px-2 bg-red-500 text-white">Remove</button>
    </div>
}

export default Product