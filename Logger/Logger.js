import winston from "winston";
import moment from 'moment';
import {resolve} from "path"
import { fileURLToPath } from "url";

const {format,transports,createLogger } = winston;
const {combine,timestamp,printf}=format;
export default (meta_url) =>{
    const root = resolve("../../");
    const file = fileURLToPath(new URL(meta_url));
    const file_path=file.replace(root,"");
    const customFormat=printf(({level,message,timestamp,stack})=>{
        return `${timestamp} [${level}] ${file_path} : ${stack|message}`
    });
    const Folder = new Date();
    const loggerInstance = createLogger({
        level : "info",
        format : combine(
            timestamp({format : "YYYY-MM-DD HH:mm:ss"}),
            format.splat(),
            format.errors({stack : true}),
            customFormat
        ),
        defaultMeta : {service : "user-service"},
        transports:[
            new transports.File({filename:`log/${moment(Folder).format('DD-MM-YYYY')}/error.log`,level:"error"}),
            new transports.File({filename:`log//${moment(Folder).format('DD-MM-YYYY')}/common.log`}),
            new transports.File({filename:"log/common.log"})
        ],
    });
    return loggerInstance;
}