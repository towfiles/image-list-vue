export default class ErrorLogger {

    static errorInstance = new ErrorLogger();

    static get getInstance() {
        return this.errorInstance;
    }

    constructor() {
        this._errors = [];
    }

    addError(error){
        this._errors.push(error);
    }

    getErrors(){
        return this._errors;
    }

}