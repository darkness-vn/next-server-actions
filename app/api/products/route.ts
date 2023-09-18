import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"
import databaseLinking from "@/utils/mongodb"
import product from "@/utils/models/product"

interface RequestContext {
    params: any
}

databaseLinking().then()

export async function GET(request: NextRequest, ctx: RequestContext) {
    console.log(`getter`)
    const data = await product.find()

    return NextResponse.json({ data })
}

export async function POST(request: NextRequest, ctx: RequestContext) {

    const { name, description, price, stock, category } = await request.json()

    await product.create({name, description, price, stock, category})

    return NextResponse.json({ message: "Created" }, { status: 200 })
}
