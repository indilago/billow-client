
export type EntitlementsObject = {[resourceId: string]: Entitlement}

export interface Entitlement {
    value: number
    cumulative: boolean
}

export interface Product {
    productId: string
    name: string
    description?: string
    createdAt: Date
    entitlements: Map<string, Entitlement>
}

export type GetProductOutput = {
    product: Product
} | null

export interface CreateProductInput {
    name: string
    description?: string
    entitlements: EntitlementsObject
}

export interface CreateProductOutput {
    productId: string
}

export interface UpdateProductInput {
    productId: string
    name?: string
    description?: string
    entitlements?: EntitlementsObject
    addEntitlements?: EntitlementsObject
    removeEntitlements?: string[]
}

export interface UpdateProductOutput {
    product: Product
}

export type DeleteProductOutput = { productId: string } | null

export interface ListProductsOutput {
    products: Product[]
}
