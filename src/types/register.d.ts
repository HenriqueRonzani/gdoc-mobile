export type RegisterParams = {
    type: string | null,
    name: string | null,
    cpf_cnpj: string | null,
    email: string | null,
    telephone: string | null,
    birthday: string | null,
    address: Address,
    password: string | null
}

export type Address = {
    street: string | null,
    number: string | null,
    neighborhood: string | null,
    city: string | null,
    complement: string | null,
    state: string | null,
    zip: string | null,
}
