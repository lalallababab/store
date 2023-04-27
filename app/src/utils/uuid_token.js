import {v4 as uuidv4} from 'uuid';
export const getUUID = ()=>{
//    先从本地存储获取uuid
    let uuid_token = localStorage.getItem('UUIDTOKEN');
//    没有 则生成
    if(!uuid_token){
        uuid_token = uuidv4();
        localStorage.setItem('UUIDTOKEN',uuid_token);
    }
    //一定是有返回值的
    return uuid_token;
}
