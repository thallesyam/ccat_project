import Checkout from "./application/Checkout"
import GetOrdersByCpf from "./application/GetOrdersByCpf"
import Preview from "./application/Preview"
import { SimulateFreight } from "./application/SimulateFreight"
import Coupon from "./domain/entity/Coupon"
import Item from "./domain/entity/Item"
import OrderController from "./infra/controller/OrderController"
import PgPromiseAdapter from "./infra/database/PgPromiseAdapter"
import MemoryRepositoryFactory from "./infra/factory/memory-repository-factory"
import ExpressAdapter from "./infra/http/ExpressAdapter"
import CouponRepositoryMemory from "./infra/repository/CouponRepositoryMemory"
import { CouponRepositoryDatabase } from "./infra/repository/database/CouponRepositoryDatabase"
import ItemRepositoryDatabase from "./infra/repository/database/ItemRepositoryDatabase"
import ItemRepositoryMemory from "./infra/repository/ItemRepositoryMemory"
import OrderRepositoryMemory from "./infra/repository/OrderRepositoryMemory"

// const itemRepository = new ItemRepositoryMemory()
// itemRepository.save(new Item(1, 1000, 'Guitarra'))
// itemRepository.save(new Item(2, 6000, 'Amplificador'))
// itemRepository.save(new Item(3, 20, 'Cordas'))

// const couponRepository = new CouponRepositoryDatabase(connection) 
// couponRepository.save(new Coupon('VALE20', 20))

const connection = new PgPromiseAdapter()
const itemRepository = new ItemRepositoryDatabase(connection)
const orderRepository = new OrderRepositoryMemory()
const couponRepository = new CouponRepositoryMemory()
const repositoryFactory = new MemoryRepositoryFactory()

couponRepository.save(new Coupon('VALE20', 20))
const preview = new Preview(itemRepository, couponRepository)
const checkout = new Checkout(repositoryFactory)
const getOrderByCpf = new GetOrdersByCpf(orderRepository)
const simulateFreight = new SimulateFreight(itemRepository)

const httpServer = new ExpressAdapter()
new OrderController(httpServer, preview, checkout, getOrderByCpf, simulateFreight)
httpServer.listen(3000)