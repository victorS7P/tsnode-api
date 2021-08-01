import { HttpRequest, HttpResponse } from './http.protocols'

export default interface Controller {
  run: (httpReq: HttpRequest) => HttpResponse
}
