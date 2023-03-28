export async function onRequestPost(context) {
  const { request } = context
  try {
    const file = await request.body
    const t = file.get('file')
    const buffer = await t.arrayBuffer()
    const content = await arrayBufferToBase64(buffer)
    return new Response('输出' + content)
  } catch (error) {
    return new Response(error)
  }
}

async function arrayBufferToBase64(buffer) {
  let binary = ''
  const bytes = new Uint8Array(buffer)
  const len = bytes.byteLength
  for (let i = 0; i < len; i += 1) {
    binary += String.fromCharCode(bytes[i])
  }
  return btoa(binary)
}
