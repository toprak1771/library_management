export type GetUser = {
    id:number;
}

export type BookUserName = {
    name:string,
    score:number
}

export type BookUserNamePresent = {
    name:string,
}

export type UserBook = {
    past:BookUserName[],
    present:BookUserNamePresent[]
}

export type UpdateUser = {
    id:number,
    name?: string,
    books?:any,
    createdAt?:Date,
    updatedAt?:Date,
}