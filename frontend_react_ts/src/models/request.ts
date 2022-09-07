export interface ProductsParamRequest {
    name? : string,
    type?: string[],
    availableAmount? : number,
    hourPrice?: number[],
    dayPrice?: number[],
    weekPrice?: number[],
    monthPrice?: number[]
}