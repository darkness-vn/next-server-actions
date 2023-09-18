import { Schema, model, connect, models } from "mongoose"
import { ObjectId } from "mongodb"

export interface IProduct {
    name: string,
    images?: { public_id: string, url: string, name: string }[],
    description: string,
    price: number,
    stock: number,
    category: string,
    // seller: any,
}

const productSchema = new Schema<IProduct>({
    name: { type: String, required: true },
    images: [{
        public_id: { type: String },
        name: { type: String },
        url: { type: String }
    }],
    description: { type: String },
    price: { type: Number },
    stock: { type: Number, required: true },
    category: {
        type: String,
        required: true,
        enum: {
            values: [
                "do-gia-dung",
                "may-anh",
                "laptop",
                "dien-thoai",
                "phu-kien",
            ]
        }
    },
    // seller: { type: ObjectId, required: true, ref: "users" }
}, { timestamps: true })

const product = models.Product || model<IProduct>('Product', productSchema)

export default product