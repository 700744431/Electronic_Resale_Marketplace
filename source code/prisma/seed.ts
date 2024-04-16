import {PrismaClient, Role} from '@prisma/client'
import {createPasswordHash} from '~/utils/misc.server'

const db = new PrismaClient()

async function seed() {
	await db.user.deleteMany()
	await db.product.deleteMany()
	await db.productOrder.deleteMany()
	await db.order.deleteMany()
	await db.payment.deleteMany()
	await db.seller.deleteMany()
	await db.admin.deleteMany()

	await db.admin.create({
		data: {
			name: 'Admin',
			email: 'admin@app.com',
			password: await createPasswordHash('password'),
		},
	})

	await db.user.create({
		data: {
			name: 'User',
			email: 'user@app.com',
			password: await createPasswordHash('password'),
			role: Role.CUSTOMER,
			address: '123 Main St',
		},
	})

	await db.user.create({
		data: {
			name: 'Admin',
			email: 'admin@app.com',
			password: await createPasswordHash('password'),
			role: Role.ADMIN,
		},
	})

	await db.user.create({
		data: {
			name: 'Seller',
			email: 'seller@app.com',
			password: await createPasswordHash('password'),
			role: Role.SELLER,
		},
	})

	await db.seller.create({
		data: {
			name: 'Seller',
			email: 'seller@app.com',
			password: await createPasswordHash('password'),
		},
	})

	console.log(`Database has been seeded. 🌱`)
}

seed()
	.catch(e => {
		console.error(e)
		process.exit(1)
	})
	.finally(async () => {
		await db.$disconnect()
	})
