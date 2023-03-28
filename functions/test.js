export async function onRequestPost(context) {
  const { request } = context
  try {
    const file = await request.formData()
    const t = file.get('file')
    const buffer = f.arrayBuffer()
    return new Response('输出' + buffer)
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
