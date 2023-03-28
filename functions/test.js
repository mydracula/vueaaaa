export async function onRequestPost(context) {
  const { request } = context
  const file = request.body.get('file')
  return new Response('输出' + file.size)
}
