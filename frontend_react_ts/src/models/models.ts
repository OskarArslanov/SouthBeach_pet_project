export interface IUser {
    username: string,
    firstname: string,
    lastname: string,
    parentname: string,
    phone: string,
    email: string
}

export interface IProduct {
    id: number
    name: string,
    types: [],
    description: string,
    availableAmount: number,
    dayPrice: number,
    weekPrice: number,
    monthPrice: number
}

export interface IUserInfo {
    id: number,
    firstname: string,
    lastname: string,
    parentname: string,
    phone: string,
    email: string,
    products: IProduct[]
}