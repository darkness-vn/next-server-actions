import product from "@/utils/models/product"
import databaseLinking from "@/utils/mongodb"
import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"

interface RequestContext {
    params: { id: string }
}

databaseLinking().then()

export async function DELETE(request: NextRequest, ctx: RequestContext) {

    await product.findByIdAndDelete(ctx.params.id)

    return NextResponse.json({ data: "getter" })
}
