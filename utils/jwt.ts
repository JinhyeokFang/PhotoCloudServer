import { encode, decode } from 'jwt-simple';

var encodeToken = function (data: object): string {
    return encode(data, "SECRET_KEY");
}

var decodeToken = function (token: string): any {
    try {
        let decoded = decode(token, "SECRET_KEY");
        return decoded;
    } catch {
        return null;
    }
}

var isVaildToken = function (token: any): boolean {
    let decodedToken = decodeToken(token);
    if (decodedToken == null)
        return false;
    if (decodedToken.time == undefined)
        return false;
    if (new Date().getTime() - decodedToken.time > 1000 * 60 * 60 * 24)
        return false;
    return true;
}

export { encodeToken, decodeToken, isVaildToken };