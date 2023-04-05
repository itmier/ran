
export function querystring(data = {}): string {
    if (typeof data !== "object") {
        throw new TypeError("param must be object");
    }
    return Object.entries(data).reduce((searchParams, [name, value]) => value === undefined || value == null ? searchParams : (searchParams.append(decodeURIComponent(name), decodeURIComponent(value)), searchParams), new URLSearchParams()).toString();
}

export function randomString(len: number = 8): string {
    const chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
    const maxPos = chars.length;
    let pwd = '';
    for (let i = 0; i < len; i++) {
        pwd += chars.charAt(Math.floor(Math.random() * maxPos))
    }
    return `${Date.now()}-${pwd}`;
}

export function getCookie(name: string): string {
    const cookieList = window.document.cookie.match(
        new RegExp(`(^| )${name}(?:=([^;]*))?(;|$)`)
    );
    if (cookieList && cookieList[2]) return cookieList[2];
    return "";
}

export function createData(params: Record<string, unknown> = {}): Record<string, unknown> {
    return Object.assign({}, {
        id: randomString(),
        path: window.location.href,
        time: Date.now(),
        userAgent: window.navigator.userAgent,
        referrer: document.referrer,
        ip: window.returnCitySN || { cid: "", cip: "", cname: "" },
        userId: getCookie('chaxus_prod')
    }, params)
}

export const throttle = (fn: Function, wait: number = 300): Function => {
    let timer: NodeJS.Timeout | null = null;
    return function (this: unknown, ...args: unknown[]) {
        const context = this;
        if (!timer) {
            timer = setTimeout(() => {
                timer = null;
                fn.apply(context, args);
            }, wait);
        }
    };
};

export const Noop = ():void => {}

export function changeHumpToLowerCase(str: string): string {  // str ====> fullName
    const arr = str.split("");     // 将字符串用split拆为单个字母为元素的数组，fullName ====> ["f", "u", "l", "l", "N", "a", "m", "e"]
    const lowerCase = arr.map(val => {
        if (val.toUpperCase() === val) {     // 由此判断出，当前字符为大写字母
            return "_" + val.toLowerCase();   // 在大写字母前面加上下划线，并将该大写字母转为小写字母
        } else {
            return val;
        }
    });
    // 此时lowerCase =====>  ["f", "u", "l", "l", "_n", "a", "m", "e"]
    str = lowerCase.join(""); // 将数组元素连接起来，不用分隔符，这里必须用"" ,若省略的话，join方法会默认用逗号连接
    return str; // 此时，str ====> full_name
}

/**
 * 重写对象上面的某个属性
 *
 * @export
 * @param {IAnyObject} source 需要被重写的对象
 * @param {string} name 需要被重写对象的key
 * @param {(...args: any[]) => any} replacement 以原有的函数作为参数，执行并重写原有函数
 * @param {boolean} isForced 是否强制重写（可能原先没有该属性）
 */
export function replaceOld(source: any, name: string, replacement: (...args: unknown[]) => unknown, isForced?: boolean): void {
    if (typeof source === "undefined") return;
    if (name in source || isForced) {
        const original = source[name];
        const wrapped = replacement(original);
        if (typeof wrapped === 'function') {
            source[name] = wrapped;
        }
    }
}

export const isString = (obj: unknown): boolean => {
    return toString.call(obj) === '[object String]';
}

export type Hooks = (...args: unknown[]) => void
