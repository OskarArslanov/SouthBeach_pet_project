export interface IUser {
    id: number,
    firstname: string,
    lastname: string,
    parentname: string,
    phone: string,
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