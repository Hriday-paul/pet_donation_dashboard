export type IUser = {
    "first_name": string,
    "last_name": string,
    "gender": string,
    "email": string,
    "role": string,
    "location": string,
    "isDeleted": boolean,
    "isVerified": boolean,
    "isActive": boolean,
    "_id": string,
    "createdAt": "2025-07-06T06:40:09.654Z",
    "updatedAt": "2025-07-06T06:40:09.654Z",
    "__v": 0
}

export type TService = {
    "_id": string,
    "name": string,
    "icon": string,
    "isActive": boolean,
}

export type TSubService = {
    "_id": string,
    "web_name": string,
    "web_link": string,
    "web_img": string,
    "pet_type": string,
    "description": string,
    "location": string,
    "pet_category": string,
    "service": string,
    "serviceName": string,
}

export interface IMeta {
    "page": number,
    "limit": number,
    "total": number,
    "totalPage": number
}