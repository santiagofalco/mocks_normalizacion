import mongoose from "mongoose";
import { schema } from "normalizr";
import DB from "../index.js";

const collection = 'messages'

const authorSchema = mongoose.Schema({
    id: String,
    name: String,
    lastname: String,
    age: Number,
    alias: String,
    avatar: String
})

const messageSchema = mongoose.Schema({
    id: Number,
    text: String,
    hour: String,
    author: authorSchema,
})

const authorSchemaNormalizr = new schema.Entity('author')

const messageSchemaNormalizr = new schema.Entity('message', {
    author: authorSchemaNormalizr
})

const chatSchemaNormalizr = new schema.Entity('chat', {
    messages:[messageSchemaNormalizr]
})

export default class MessagePersistanceService extends DB {
    constructor() {
        super(collection, messageSchema, chatSchemaNormalizr)
    }
}

