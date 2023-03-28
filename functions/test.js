export async function onRequestPost(context) {
  const { request } = context
  const url = new URL(request.url)
  const size = request.body.get('file')
  return new Response('输出' + size)
}
