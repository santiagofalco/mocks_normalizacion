class MessageService {

    constructor(repository) {
        this.repository = repository
    }

    getAllMessages = async () => {
        try {
            let messages = await this.repository.getAllMessages()
            return messages
        } catch (err) {
            console.error('Error' + err)
            throw err
        }
    }

    post = async (data) => {
        try {
            const doc = {
                id: new Date().getTime(),
                text: data.message,
                author: {
                    id: data.author.id,
                    name: data.author.name,
                    lastname: data.author.lastname,
                    age: data.author.age,
                    alias: data.author.alias,
                    avatar: data.author.avatar,

                },
                hour: data.hour,
            }
            let response = await this.repository.create(doc)
            return response
        } catch (err) {
            console.error('Error' + err)
            throw err
        }
    }

}

export default MessageService