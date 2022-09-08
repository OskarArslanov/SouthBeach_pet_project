export interface Range {
    min: number,
    max: number,
}
export interface ProductsParamRequest {
    name? : string,
    types?: string[],
    availableAmount? : number | undefined,
    hourPrice?: Range,
    dayPrice?: Range,
    weekPrice?: Range,
    monthPrice?: Range
}