
export type Currency = 'CAD' | 'USD' | 'MXN'

export interface Plan {
    planId: string
    createdAt: Date
    productId: string
    name: string
    currency: Currency
    description?: string
    stripePlanId?: string
}

export type GetPlanOutput = {
    plan: Plan
} | null

export interface CreatePlanInput {
    name: string
    productId: string
    currency: Currency
    description?: string
    stripePlanId?: string
}

export interface CreatePlanOutput {
    plan: Plan
}

export interface UpdatePlanInput {
    planId: string
    name?: string
    productId?: string
    description?: string
    stripePlanId?: string
}

export interface UpdatePlanOutput {
    plan: Plan
}

export type DeletePlanOutput = { planId: string } | null

export interface ListPlansInput {
    productId?: string
    currency?: Currency
    effectiveDate?: Date
}

export interface ListPlansOutput {
    plans: Plan[]
}
