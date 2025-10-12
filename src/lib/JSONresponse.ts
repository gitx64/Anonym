export function jsonRes(success: boolean, message: string, status: number, data?: any){
    return Response.json({
        success: success,
        message: message,
        ...(data && { data }) // Only include data if it exists
    }, {status: status})
}