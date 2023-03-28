export async function onRequestPost(context) {
  const { request } = context
  try {
    const file = await request.formData()
    const t = file.get('file')
    return new Response('输出' + t.size)
  } catch (error) {
    return new Response(error)
  }
}
