export async function onRequestPost(context) {
  const { request } = context
  try {
    const file = request.body.get('file')
    return new Response('输出' + file.size)
  } catch (error) {
    return new Response(error)
  }
}
