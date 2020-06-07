import axios, {AxiosError, AxiosInstance} from 'axios'
import {
    CreatePlanInput,
    CreatePlanOutput,
    DeletePlanOutput,
    GetPlanOutput,
    ListPlansInput,
    ListPlansOutput,
    UpdatePlanInput,
    UpdatePlanOutput
} from './plans'
import {
    CreateProductInput,
    CreateProductOutput,
    DeleteProductOutput,
    GetProductOutput,
    ListProductsOutput,
    UpdateProductInput,
    UpdateProductOutput
} from './products'
import {
    DeleteResourceOutput,
    GetResourceOutput,
    ListResourcesOutput,
    PutResourceInput,
    PutResourceOutput,
    UpdateResourceInput,
    UpdateResourceOutput
} from './resources'
import {
    DeleteSubscriptionInput, DeleteSubscriptionOutput,
    GetSubscriptionInput,
    GetSubscriptionOutput,
    ListSubscriptionsOutput,
    PutSubscriptionInput,
    PutSubscriptionOutput
} from './subscriptions'

export * from './resources'
export * from './products'
export * from './plans'
export * from './subscriptions'

export class BillowError extends Error {
    readonly code: string
    readonly httpStatus: number
    readonly inputErrors?: string[]
    readonly resource?: any

    constructor(errorResponse: any) {
        super(errorResponse.message)
        Object.assign(this, errorResponse)
    }
}

function handleError(err: Error): never {
    if ((err as AxiosError).isAxiosError) {
        const e = err as AxiosError
        const body = e.response.data
        if (body.isError) {
            err = new BillowError(body)
        }
    }
    throw err
}

function nullOnNotFound(err: AxiosError): never|null {
    if (err.response.status === 404) {
        return null
    }
    throw err
}

export default class BillowClient {
    private readonly http: AxiosInstance

    constructor(endpointUrl: string) {
        this.http = axios.create({
            baseURL: endpointUrl,
            responseType: 'json',
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }


    listPlans(input: ListPlansInput): Promise<ListPlansOutput> {
        return this.http.get<ListPlansOutput>('/plans',{params: input})
            .then(res => res.data)
            .catch(handleError)
    }
    getPlan(planId: string): Promise<GetPlanOutput|null> {
        return this.http.get<GetPlanOutput>(`/plans/${planId}`)
            .then(res => res.data)
            .catch(nullOnNotFound)
            .catch(handleError)
    }
    createPlan(input: CreatePlanInput): Promise<CreatePlanOutput> {
        return this.http.post<CreatePlanOutput>('/plans', input)
            .then(res => res.data)
            .catch(handleError)
    }
    deletePlan(planId: string): Promise<DeletePlanOutput> {
        return this.http.delete<DeletePlanOutput>(`/plans/${planId}`)
            .then(res => res.data)
            .catch(handleError)
    }
    updatePlan(input: UpdatePlanInput): Promise<UpdatePlanOutput> {
        return this.http.patch<GetPlanOutput>(`/plans/${input.planId}`, input)
            .then(res => res.data)
            .catch(handleError)
    }

    listProducts(): Promise<ListProductsOutput> {
        return this.http.get<ListProductsOutput>('/products')
            .then(res => res.data)
            .catch(handleError)
    }
    getProduct(productId: string): Promise<GetProductOutput|null> {
        return this.http.get<GetProductOutput>(`/products/${productId}`)
            .then(res => res.data)
            .catch(nullOnNotFound)
            .catch(handleError)
    }
    createProduct(input: CreateProductInput): Promise<CreateProductOutput> {
        return this.http.post<CreateProductOutput>('/products', input)
            .then(res => res.data)
            .catch(handleError)
    }
    deleteProduct(productId: string): Promise<DeleteProductOutput> {
        return this.http.delete<DeleteProductOutput>(`/products/${productId}`)
            .then(res => res.data)
            .catch(handleError)
    }
    updateProduct(input: UpdateProductInput): Promise<UpdateProductOutput> {
        return this.http.patch<UpdateProductOutput>(`/products/${input.productId}`, input)
            .then(res => res.data)
            .catch(handleError)
    }

    listResources(): Promise<ListResourcesOutput> {
        return this.http.get<ListResourcesOutput>('/resources')
            .then(res => res.data)
            .catch(handleError)
    }
    getResource(resourceId: string): Promise<GetResourceOutput|null> {
        return this.http.get<GetResourceOutput>(`/resources/${resourceId}`)
            .then(res => res.data)
            .catch(nullOnNotFound)
            .catch(handleError)
    }
    putResource(input: PutResourceInput): Promise<PutResourceOutput> {
        return this.http.put<PutResourceOutput>('/resources', input)
            .then(res => res.data)
            .catch(handleError)
    }
    updateResource(input: UpdateResourceInput): Promise<UpdateResourceOutput> {
        return this.http.patch<UpdateResourceOutput>(`/resources/${input.resourceId}`, input)
            .then(res => res.data)
            .catch(handleError)
    }
    deleteResource(resourceId: string): Promise<DeleteResourceOutput> {
        return this.http.delete<DeleteResourceOutput>(`/resources/${resourceId}`)
            .then(res => res.data)
            .catch(handleError)
    }

    listPlanSubscriptions(planId: string): Promise<ListSubscriptionsOutput> {
        return this.http.get<ListSubscriptionsOutput>(`/plans/${planId}/subscriptions`)
            .then(res => res.data)
            .catch(handleError)
    }
    getSubscription({accountId, planId}: GetSubscriptionInput): Promise<GetSubscriptionOutput|null> {
        return this.http.get<GetSubscriptionOutput>(`/accounts/${accountId}/subscriptions/${planId}`)
            .then(res => res.data)
            .catch(nullOnNotFound)
            .catch(handleError)
    }
    putSubscription(input: PutSubscriptionInput): Promise<PutSubscriptionOutput> {
        return this.http.put<PutSubscriptionOutput>(`/accounts/${input.accountId}/subscriptions/${input.planId}`, input)
            .then(res => res.data)
            .catch(handleError)
    }
    deleteSubscription({accountId, planId}: DeleteSubscriptionInput): Promise<DeleteSubscriptionOutput> {
        return this.http.delete<DeleteSubscriptionOutput>(`/accounts/${accountId}/subscriptions/${planId}`)
            .then(res => res.data)
            .catch(handleError)
    }
}
