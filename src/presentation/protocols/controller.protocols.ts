import { HttpRequest, HttpResponse } from './http.protocols'

export interface Controller {
  run: (httpReq: HttpRequest) => HttpResponse
}
