
export interface Subscription {
    accountId: string
    planId: string
    createdAt: Date
    expiresAt?: Date
    stripeSubscriptionId?: string
}

export interface PutSubscriptionInput {
    accountId: string
    planId: string
    expiresAt?: Date
    stripeSubscriptionId?: string
}

export interface PutSubscriptionOutput {
    subscription: Subscription
}

export interface ListSubscriptionsByPlanInput {
    planId: string
    limit?: number
}

export interface ListSubscriptionsByAccountInput {
    accountId: string
    limit?: number
}

export interface ListSubscriptionsOutput {
    subscriptions: Subscription[]
}


export interface GetSubscriptionInput {
    accountId: string
    planId: string
}

export interface GetSubscriptionOutput {
    subscription: Subscription
}

export interface DeleteSubscriptionInput {
    accountId: string
    planId: string
}

export interface DeleteSubscriptionOutput {
    accountId: string
    planId: string
}
