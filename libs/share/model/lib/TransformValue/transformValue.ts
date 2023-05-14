
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
export const resulToGateWay = <Data>(message: string, payload?: Data, filedsDelete?: Array<keyof Data>) => {
    if (payload === null || payload ===undefined) {
        const result = {
            message,
            payload: []
        }
        return result
    }
    const result = {
        message,
        payload: fromDataEntity(payload, filedsDelete as Array<string>)
    }
    return result
}
export interface ResultToApiGateWay<data> {
    message: string,
    payload?: data
}

