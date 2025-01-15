export type GetUser = {
    id:number;
}

export type BookUserName = {
    name:string
}

export type UserBook = {
    past:BookUserName[],
    present:BookUserName[]
}

export type UpdateUser = {
    id:number,
    name?: string,
    books?:any,
    createdAt?:Date,
    updatedAt?:Date
}