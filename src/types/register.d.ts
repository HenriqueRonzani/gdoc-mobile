export type RegisterParams = {
    type: string
    name: string
    cpf_cnpj: string
    email: string
    telephone: string
    birthday: string
    genre: string
    address: Address,
    password: string
    secondary_name: string
    secondary_cpf: string
}

export type Address = {
    street: string
    number: string
    neighborhood: string
    city: string
    complement: string
    state: string
    zip: string
}
