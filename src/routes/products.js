import { Router } from 'express'
import Service from '../services/service.js'
import db from '../db/sqlite/dataBase.js'
import RepositoryWithFs from '../repository/products.js'
import Repository from '../repository/productsWithDb.js'
import faker from 'faker'


const router = Router()

const repositoryWithFs = new RepositoryWithFs('./products.json')
const repository = new Repository(db)

const service = new Service(repository, repositoryWithFs)

let io

faker.locale = 'es'

const {commerce,image} = faker

router.get('/', async (req, res) => {
    let productos = await service.getAll()
    res.render('products.pug', {
        message: 'Lista de productos',
        productos
    })
})

router.get('/api/productos-test', async(req, res) =>{
    let products = []
    for(let i=0; i<5; i++){
        products.push({
            producto: commerce.product(),
            price: commerce.price(),
            thumbnail: image.business(700,700,true)
        })
    }
    res.render('productos-test.pug', {
        message: 'Productos random',
        products
        
    })
})



router.post('/', async (req, res) => {
    const producto = req.body
    if (!producto.name) {
        return res.status(400).send({ status: 'error', error: 'No se envio un nombre de producto' })
    }
    if (!producto.price) {
        return res.status(400).send({ status: 'error', error: 'No se envio un precio de producto' })
    }
    if (!producto.thumbnail) {
        return res.status(400).send({ status: 'error', error: 'No se envio una url de producto' })
    } else {
        const idInsertado = await service.post(producto)
        io.emit('productList', producto)
        res.send({ status: 'success', message: `Producto añadido con id ${idInsertado}` })
    }
})

const getRouter = (socket) => {
    io = socket
    return router
}

export default getRouter