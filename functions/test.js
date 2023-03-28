export async function onRequestPost(context) {
  const { request } = context
  try {
    const file = request.body
    return new Response('输出' + JSON.stringify(file))
  } catch (error) {
    return new Response(error)
  }
}
