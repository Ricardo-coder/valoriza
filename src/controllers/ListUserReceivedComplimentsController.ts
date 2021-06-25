import { Request, Response } from 'express'
import { ListUserReceivedComplimentsService } from '../services/ListUserReceivedComplimentsService'

export class ListUserReceivedComplimentsController {
  async handle (request: Request, response: Response) {
    const listUserReceivedComplimentsService = new ListUserReceivedComplimentsService()
    const { user_id } = request

    const compliments = await listUserReceivedComplimentsService.execute(user_id)

    return response.json(compliments)
  }
}
