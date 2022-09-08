import mongoose from 'mongoose'
import { normalize } from 'normalizr'



export default class DB {
    constructor(collection, schema, normalizerSchema) {
        mongoose.connect('mongodb+srv://santiagofalco:123asd@clustercursocoder.guulqh2.mongodb.net/messagesdb?retryWrites=true&w=majority', err => {
            if (err) {
                console.log(err)
            } else console.log('conectado a mongo atlas')
            
        })
        this._schema = normalizerSchema
        this.model = mongoose.model(collection, schema)
    }
    

    getAllMessages = async () => {
        let result = await this.model.find()
        const toNormalize = JSON.parse(JSON.stringify(result))
        const normalizado = normalize({id:'1', messages:toNormalize}, this._schema)
        console.log(JSON.stringify(normalizado, null, '\t'))
        return result
    }

    create = async (document) => {
        let result = await this.model.create(document)
        return result
    }

}