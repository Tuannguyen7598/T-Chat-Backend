
export const fromDataEntity = <TDataEntity>(
    dataEntity: TDataEntity,
    keepCredentials: Array<string>) => {
    const result: Partial<TDataEntity> = {
        ...dataEntity,
    };
    keepCredentials.forEach(x => {
        delete result[x]
    })
    return result
};
export const resulToGateWay = (message: string, payload: any, filedsDelete: Array<string>) => {

    const resul = {
        message,
        payload: fromDataEntity(payload, filedsDelete)
    }
    return resul
}
export interface ResultToApiGateWay<data> {
    message: string,
    payload?: data
}

