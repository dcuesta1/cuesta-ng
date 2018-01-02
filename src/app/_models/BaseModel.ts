export class BaseModel {
    constructor(model :any = null) {
        for (let key of Object.keys(model)) {  
            this[key] = model[key];
        }
    }
}