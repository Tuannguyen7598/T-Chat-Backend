
export const fromDataEntity = <TDataEntity>(
    dataEntity: TDataEntity,
    keepCredentials: Array<string>) => {
    const result: Partial<TDataEntity> = {
        ...dataEntity,
    };
    keepCredentials.forEach(x => {
        delete result[x as any]
    })
    delete result['_id']
    return result
};
export const resulToGateWay = <Data>(message: string, payload: Data, filedsDelete: Array<keyof Data>) => {

    const resul = {
        message,
        payload: fromDataEntity(payload, filedsDelete as Array<string>)
    }
    return resul
}
export interface ResultToApiGateWay<data> {
    message: string,
    payload?: data
}

