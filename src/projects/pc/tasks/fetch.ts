/**
 * fetch: wrapper qing request function
 * @param options {Object}
 */
import config from '@/config'

interface fetchOptions {
    url: string
    method: string
    headers?: object
    data?: object
    [key: string]: any
}

export default function fetch (options: fetchOptions): Promise<any> {
    return new Promise((resolve, reject) => {
        qing.call('request', {
            ...options,
            headers: {
                'Cloudoffice-Version': config.version,
                ...options.headers
            },
            success: res => resolve(res),
            error: err => reject(err)
        })
    })
}
