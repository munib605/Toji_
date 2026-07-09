/* eslint-disable no-console */
import { connectDB, disconnectDB } from '../config/db.js'
import env from '../config/env.js'
import User from '../models/User.model.js'
import About from '../models/About.model.js'
import ROLES from '../constants/roles.js'

async function seedAdmin() {
  if (!env.admin.email || !env.admin.password) {
    console.log('⚠️  ADMIN_EMAIL / ADMIN_PASSWORD not set — skipping admin seed.')
    return
  }

  const existing = await User.findOne({ email: env.admin.email.toLowerCase() })
  if (existing) {
    console.log(`ℹ️  Admin user already exists: ${existing.email}`)
    return
  }

  await User.create({
    fullName: env.admin.name,
    email: env.admin.email,
    password: env.admin.password,
    role: ROLES.ADMIN,
  })

  console.log(`✅ Admin user created: ${env.admin.email}`)
}

async function seedAbout() {
  const existing = await About.findOne({ singleton: 'about' })
  if (existing) {
    console.log('ℹ️  About document already exists — skipping.')
    return
  }

  await About.create({
    singleton: 'about',
    name: env.admin.name || 'Alex Rivera',
    shortBio: 'Full Stack Developer building modern, scalable digital experiences.',
    longBio:
      'A Junior Full Stack Developer with a passion for building products that feel effortless to use, spanning React/TypeScript on the frontend to Node.js/Express/MongoDB on the backend.',
    yearsOfExperience: 1,
    location: '',
    availability: 'available',
    socialLinks: [],
  })

  console.log('✅ About document seeded')
}

async function run() {
  await connectDB()
  await seedAdmin()
  await seedAbout()
  await disconnectDB()
  console.log('🌱 Seeding complete')
  process.exit(0)
}

run().catch((error) => {
  console.error('Seeding failed:', error)
  process.exit(1)
})
