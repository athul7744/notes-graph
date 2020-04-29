class SimpleLogger {
    
    /**
     * logger variable
     */
    #logger = {};

    /**
     * @constructor
     */
    constructor(){
        this.path = 'logs';
        this.format = winston.format.printf(({ level, message, timestamp }) => {
            return `${timestamp} : ${level} - ${message}`;
        });
        this.#logger = winston.createLogger({
            format: winston.format.combine(
                winston.format.timestamp({format: 'YYYY-MM-DD HH:mm:ss'}),
                this.format
            ),
            transports: [
                new winston.transports.Console({
                }),
                new DailyRotateFile({
                    dirname: this.path,
                    filename: '%DATE%.log'
                })
            ]
        });
    }

    /**
     * Function to log to console and file
     * @param {String} level Level of error 
     * @param {String} info Error message
     */
    log(level,info){
        if(arguments.length == 1){
            this.#logger.info(arguments[0]);    
        }
        else{
            this.#logger.log(level,info);
        }
    }
}