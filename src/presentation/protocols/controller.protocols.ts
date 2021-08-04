import { HttpRequest, HttpResponse } from '@protocols'

export interface Controller {
  run: (httpReq: HttpRequest) => HttpResponse
}
