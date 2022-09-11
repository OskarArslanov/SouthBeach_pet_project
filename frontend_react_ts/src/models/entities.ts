export interface IUser {
    id: number,
    firstname: string,
    lastname: string,
    parentname: string,
    phone: string,
}

export interface IUserProducts {
    products: IProduct[]
}

export interface IProduct {
    id: string
    name: string,
    types: string[],
    description: string,
    availableAmount: string,
    hourPrice: string,
    dayPrice: string,
    weekPrice: string,
    monthPrice: string
}
