type InvokerOptions = RequestInit

async function invoker(url: string, options?: InvokerOptions, tags?:string[]) {
    const res = await fetch(url, {...options, ...(!!tags && { next: { tags } })})
    const data = await res.json()
    return data
}

export default invoker