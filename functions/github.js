//public_repo 填写你的 TOKEN
const YOUR_TOKEN = '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'

async function arrayBufferToBase64(buffer) {
  let binary = ''
  const bytes = new Uint8Array(buffer)
  const len = bytes.byteLength
  for (let i = 0; i < len; i += 1) {
    binary += String.fromCharCode(bytes[i])
  }
  return btoa(binary)
}

function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'
    .replace(/[xy]/g, function (c) {
      var r = (Math.random() * 16) | 0,
        v = c == 'x' ? r : (r & 0x3) | 0x8
      return v.toString(16)
    })
    .replace(/[-]/g, '')
}

export async function onRequestPost(context) {
  const { request } = context
  let outBody,
    outStatus = 204,
    outHeaders = new Headers({
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, PUT, PATCH, POST, DELETE',
      'Access-Control-Allow-Headers': '*',
      'Content-Type': 'application/json'
    }),
    reqHeaders = new Headers(request.headers)

  try {
    //接收
    let tip = [],
      or,
      uuid,
      pathname,
      filename,
      ext,
      file,
      content
    let sp = new URL(request.url).searchParams
    //仓库
    or = sp.get('or') || ''
    //文件名
    filename = (sp.get('name') || '').trim().replace(/\//g, '')
    //自定义路径及名称
    pathname = (sp.get('pathname') || '').trim()
    //格式
    ext = '.' + filename.split('.')[1]

    let buffer = await request.arrayBuffer()
    content = await arrayBufferToBase64(buffer)

    let now = new Date(Date.now() + 8 * 3600 * 1000).toISOString().replace('Z', '')
    //路径及名称
    if (pathname == '') {
      pathname = now.replace(/[-T.]/g, '').substr(0, 8)
    }

    uuid = uuidv4()

    //完整链接
    let uri = `https://api.github.com/repos/${or}/contents/${pathname}/${uuid}${ext}`

    //调整头
    reqHeaders.set('Authorization', 'token ' + YOUR_TOKEN)
    reqHeaders.set('Content-Type', 'application/json')

    //发起 fetch
    let res = await fetch(uri, {
      method: 'PUT',
      body: JSON.stringify({
        message: 'init',
        content: content || file
      }),
      headers: reqHeaders
    })

    //成功
    if (res.status == 201) {
      let rj = await res.json()
      outBody = JSON.stringify(rj['content'])
      outStatus = 200
    } else {
      outBody = uri
      outStatus = res.status
    }
  } catch (err) {
    console.log('错误了', err)
    outBody = JSON.stringify(err.stack) || err
    outStatus = 500
  }

  return new Response(outBody, {
    status: outStatus,
    headers: outHeaders
  })
}
