export type GetBook = {
    id:number;
}

export type UpdateBook = {
    id:number,
    name?: string,
    author?: string | null,
    year?: string | null,
    score?: number,
    status?: boolean,
    user_id?: number | null,
    createdAt?:Date,
    updatedAt?:Date
}