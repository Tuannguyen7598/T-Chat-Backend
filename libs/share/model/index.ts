export * from './lib'
export * from './dbConnect'
export * from './type'
export const ConfigUserServer = {
    
}
export const ConfigApigateWay = {
    
}
export const ConfigSocketServer = {
    host: process.env.host ?? 'http://localhost',
    port: process.env.port ?? 3001
    
}