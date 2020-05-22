export type MeteringType = 'boolean' | 'maximum'

export interface Resource {
    resourceId: string
    name: string
    description?: string
    meteringType: MeteringType
    defaultValue: number
    createdAt: Date
}

export type GetResourceOutput = {
    resource: Resource
} | null

export interface PutResourceInput {
    resourceId?: string
    name: string
    description?: string
    meteringType: MeteringType
    defaultValue: number
}

export interface PutResourceOutput {
    resource: Resource
}

export interface UpdateResourceInput {
    resourceId: string
    name?: string
    description?: string
    meteringType?: MeteringType
    defaultValue?: number
}

export interface UpdateResourceOutput {
    resource: Resource
}

export type DeleteResourceOutput = { resourceId: string } | null

export interface ListResourcesOutput {
    resources: Resource[]
}
