import dayjs from 'dayjs'
import { NextApiRequest, NextApiResponse } from 'next'
import { z } from 'zod'
import { prisma } from '../../../../lib/prisma'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'POST') {
    res.status(405).end()
  }

  const username = String(req.query.username)

  const user = await prisma.user.findUnique({
    where: {
      username,
    },
  })

  if (!user) {
    return res.status(400).json({
      message: 'User does not exist.',
    })
  }

  const createScheduleBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    notes: z.string(),
    date: z.string().datetime(),
  })

  const { name, email, notes, date } = createScheduleBodySchema.parse(req.body)

  const schedulingDate = dayjs(date).startOf('hour')

  if (schedulingDate.isBefore(new Date())) {
    return res.status(400).json({ message: 'Date is in the past' })
  }

  const conflictingScheduling = await prisma.scheduling.findFirst({
    where: {
      user_id: user.id,
      date: schedulingDate.toDate(),
    },
  })

  if (conflictingScheduling) {
    return res
      .status(400)
      .json({ message: 'There is another scheduling at same time.' })
  }

  await prisma.scheduling.create({
    data: {
      name,
      email,
      notes,
      date: schedulingDate.toDate(),
      user_id: user.id,
    },
  })

  return res.status(201).end()
}
