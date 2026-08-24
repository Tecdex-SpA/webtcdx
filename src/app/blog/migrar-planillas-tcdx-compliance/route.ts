export function GET(request: Request) {
  const destination = new URL("/blog/migrar-planillas-a-plataforma-iso", request.url);
  return Response.redirect(destination, 301);
}

export function HEAD(request: Request) {
  const destination = new URL("/blog/migrar-planillas-a-plataforma-iso", request.url);
  return Response.redirect(destination, 301);
}
