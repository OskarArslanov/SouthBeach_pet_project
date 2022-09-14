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
    types: IType[],
    description: string,
    availableAmount: string,
    hourPrice: string,
    dayPrice: string,
    weekPrice: string,
    monthPrice: string
}

export interface IType {
    name: string,
    description: string,
}
