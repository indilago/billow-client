import axios, {AxiosInstance} from 'axios'
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
    CreateProductOutput, DeleteProductOutput,
    GetProductOutput,
    ListProductsOutput,
    UpdateProductInput, UpdateProductOutput
} from './products'
import {
    DeleteResourceOutput, GetResourceOutput, ListResourcesOutput,
    PutResourceInput,
    PutResourceOutput,
    UpdateResourceInput,
    UpdateResourceOutput
} from './resources'


export default class BillowCatalogClient {
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
    }
    getPlan(planId: string): Promise<GetPlanOutput> {
        return this.http.get<GetPlanOutput>(`/plans/${planId}`)
            .then(res => res.data)
    }
    createPlan(input: CreatePlanInput): Promise<CreatePlanOutput> {
        return this.http.post<CreatePlanOutput>('/plans', input)
            .then(res => res.data)
    }
    deletePlan(planId: string): Promise<DeletePlanOutput> {
        return this.http.delete<DeletePlanOutput>(`/plans/${planId}`)
            .then(res => res.data)
    }
    updatePlan(input: UpdatePlanInput): Promise<UpdatePlanOutput> {
        return this.http.patch<GetPlanOutput>(`/plans/${input.planId}`, input)
            .then(res => res.data)
    }

    listProducts(): Promise<ListProductsOutput> {
        return this.http.get<ListProductsOutput>('/products')
            .then(res => res.data)
    }
    getProduct(productId: string): Promise<GetProductOutput> {
        return this.http.get<GetProductOutput>(`/products/${productId}`)
            .then(res => res.data)
    }
    createProduct(input: CreateProductInput): Promise<CreateProductOutput> {
        return this.http.post<CreateProductOutput>('/products', input)
            .then(res => res.data)
    }
    deleteProduct(productId: string): Promise<DeleteProductOutput> {
        return this.http.delete<DeleteProductOutput>(`/products/${productId}`)
            .then(res => res.data)
    }
    updateProduct(input: UpdateProductInput): Promise<UpdateProductOutput> {
        return this.http.patch<UpdateProductOutput>(`/products/${input.productId}`, input)
            .then(res => res.data)
    }

    listResources(): Promise<ListResourcesOutput> {
        return this.http.get<ListResourcesOutput>('/resources')
            .then(res => res.data)
    }
    getResource(resourceId: string): Promise<GetResourceOutput> {
        return this.http.get<GetResourceOutput>(`/resources/${resourceId}`)
            .then(res => res.data)
    }
    putResource(input: PutResourceInput): Promise<PutResourceOutput> {
        return this.http.put<PutResourceOutput>('/resources', input)
            .then(res => res.data)
    }
    updateResource(input: UpdateResourceInput): Promise<UpdateResourceOutput> {
        return this.http.patch<UpdateResourceOutput>(`/resources/${input.resourceId}`, input)
            .then(res => res.data)
    }
    deleteResource(resourceId: string): Promise<DeleteResourceOutput> {
        return this.http.delete<DeleteResourceOutput>(`/resources/${resourceId}`)
            .then(res => res.data)
    }
}
