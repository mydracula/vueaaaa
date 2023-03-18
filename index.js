/*
 * https://github.com/netnr/workers
 *
 * 2019-12-16
 * netnr
 *
 */

//public_repo 填写你的 TOKEN
const YOUR_TOKEN = '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'
//Allowed Repos 仓库白名单
const YOUR_REPOS = ['mydracula/image']
//受限制的文件格式
const LIMIT_EXT = ['.exe']
//最大文件 MB
const MAX_SIZE = 50

addEventListener('fetch', (event) => {
  event.respondWith(handleRequest(event.request))
})

/**
 * Respond to the request
 * @param {Request} request
 */
async function handleRequest(request) {
  //返回对象
  let outBody,
    outStatus = 204,
    outHeaders = new Headers({
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, PUT, PATCH, POST, DELETE',
      'Access-Control-Allow-Headers': '*',
      'Content-Type': 'application/json'
    }),
    reqHeaders = new Headers(request.headers)

  let sp = new URL(request.url).searchParams

  //仓库
  or = sp.get('or') || ''
  //文件名
  filename = (sp.get('name') || '').trim().replace(/\//g, '')
  //自定义路径及名称
  pathname = (sp.get('pathname') || '').trim()
  //格式
  ext = '.' + filename.split('.')[1]
  //（UTC + 08:00）北京时间
  let now = new Date(Date.now() + 8 * 3600 * 1000).toISOString().replace('Z', '')

  //路径及名称
  if (pathname == '') {
    // pathname = now.replace(/-/g, '').replace('T', '').replace(/:/g, '').replace('.', '') + Math.random().toString().slice(-1)
    pathname = now.replace(/[-T.]/g, '').substr(0, 8)
  }

  uuid = uuidv4()

  //完整链接
  let uri = `https://api.github.com/repos/${or}/contents/${pathname}/${uuid}${ext}`

  //调整头
  reqHeaders.set('Authorization', `token ${YOUR_TOKEN}`)
  reqHeaders.set('Content-Type', 'application/json')
  reqHeaders.set('User-Agent', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/29.0.1521.3 Safari/537.36')

  const formData = await request.formData()
  const file = formData.get('file')

  const content = await file.arrayBuffer()

  console.log(content, 'contentcontent')

  let res = await fetch(uri, {
    method: 'PUT',
    body: JSON.stringify({
      accept: 'application/vnd.github.v3+jso',
      message: 'init',
      content: content
    }),
    headers: reqHeaders
  })

  if (res.status == 201) {
    let rj = await res.json()
    console.log(rj, '=>>')
    outBody = JSON.stringify({
      '7ED': `https://raw.githubusercontents.co/${or}/master/${pathname}/${uuid}${ext}`,
      JsDelivr: `https://gcore.jsdelivr.net/gh/${or}@master/${pathname}/${uuid}${ext}`
    })
    outStatus = 200
  } else {
    outBody = res.body
    outStatus = res.status
  }
  return new Response(outBody, {
    status: outStatus,
    headers: outHeaders
  })
}

// try {
//   //接收
//   let tip = [],
//     or,
//     uuid,
//     filename,
//     pathname,
//     ext,
//     file,
//     content

//   if (request.method == 'POST') {
//     //参数
//     let sp = new URL(request.url).searchParams

//     //仓库
//     or = sp.get('or') || ''
//     //文件名
//     filename = (sp.get('name') || '').trim().replace(/\//g, '')
//     //自定义路径及名称
//     pathname = (sp.get('pathname') || '').trim()
//     //格式
//     ext = '.' + filename.split('.')[1]

//     //文件binary转为base64编码
//     // let buffer = await request.arrayBuffer()
//     // content = await arrayBufferToBase64(buffer, ext)

//     if (!YOUR_REPOS.includes(or)) {
//       tip.push('仅允许的仓库白名单：' + YOUR_REPOS.join())
//     }
//     if (filename.length < 3) {
//       tip.push('参数name文件名无效')
//     }
//     if (ext == '' || LIMIT_EXT.includes(ext) || !ext.includes('.')) {
//       tip.push('文件格式错误或受限制的文件格式：' + LIMIT_EXT.join())
//     }
//     if (buffer.byteLength > MAX_SIZE * 1024 * 1024) {
//       tip.push('最大文件限制 ' + MAX_SIZE + ' MB')
//     }
//   } else {
//     tip.push('基于 Token 授权上传（可限制格式的）文件到（白名单）GitHub仓库')
//   }

//   //需要忽略的请求
//   if (tip.length) {
//     outBody = JSON.stringify(tip)
//     outStatus = 200
//   } else {
//     //（UTC + 08:00）北京时间
//     let now = new Date(Date.now() + 8 * 3600 * 1000).toISOString().replace('Z', '')

//     //路径及名称
//     if (pathname == '') {
//       // pathname = now.replace(/-/g, '').replace('T', '').replace(/:/g, '').replace('.', '') + Math.random().toString().slice(-1)
//       pathname = now.replace(/[-T.]/g, '').substr(0, 8)
//     }

//     uuid = uuidv4()

//     //完整链接
//     let uri = `https://api.github.com/repos/${or}/contents/${pathname}/${uuid}${ext}`

//     //调整头
//     reqHeaders.set('Authorization', `token ${YOUR_TOKEN}`)
//     reqHeaders.set('Content-Type', 'application/json')
//     reqHeaders.set('User-Agent', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/29.0.1521.3 Safari/537.36')

//     //发起 fetch
//     let res = await fetch(uri, {
//       method: 'PUT',
//       body: JSON.stringify({
//         accept: 'application/vnd.github.v3+jso',
//         message: 'init',
//         content: content || file
//       }),
//       headers: reqHeaders
//     })

//     //成功
//     if (res.status == 201) {
//       let rj = await res.json()

//       console.log(rj, '=>>')
//       outBody = JSON.stringify({
//         '7ED': `https://raw.githubusercontents.co/${or}/master/${pathname}/${uuid}${ext}`,
//         JsDelivr: `https://gcore.jsdelivr.net/gh/${or}@master/${pathname}/${uuid}${ext}`
//       })
//       // outBody = JSON.stringify(rj['content'])
//       outStatus = 200
//     } else {
//       outBody = res.body
//       outStatus = res.status
//     }
//   }
// } catch (err) {
//   outBody = JSON.stringify(err.stack) || err
// }

/**
 * buffer转成base64
 */
// async function arrayBufferToBase64(buffer, ext) {
//   var binary = ''
//   var bytes = new Uint8Array(buffer)
//   for (var len = bytes.byteLength, i = 0; i < len; i++) {
//     binary += String.fromCharCode(bytes[i])
//   }

//   const mimeTypes = {
//     '3gp': 'video/3gpp',
//     avi: 'video/x-msvideo',
//     bmp: 'image/bmp',
//     css: 'text/css',
//     csv: 'text/csv',
//     doc: 'application/msword',
//     docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
//     eot: 'application/vnd.ms-fontobject',
//     gif: 'image/gif',
//     htm: 'text/html',
//     html: 'text/html',
//     ico: 'image/x-icon',
//     ics: 'text/calendar',
//     jpeg: 'image/jpeg',
//     jpg: 'image/jpeg',
//     js: 'application/javascript',
//     json: 'application/json',
//     mid: 'audio/midi',
//     midi: 'audio/midi',
//     mov: 'video/quicktime',
//     mp3: 'audio/mpeg',
//     mp4: 'video/mp4',
//     mpeg: 'video/mpeg',
//     mpg: 'video/mpeg',
//     odp: 'application/vnd.oasis.opendocument.presentation',
//     ods: 'application/vnd.oasis.opendocument.spreadsheet',
//     odt: 'application/vnd.oasis.opendocument.text',
//     oga: 'audio/ogg',
//     ogv: 'video/ogg',
//     otf: 'font/otf',
//     pdf: 'application/pdf',
//     png: 'image/png',
//     ppt: 'application/vnd.ms-powerpoint',
//     pptx: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
//     rar: 'application/x-rar-compressed',
//     rtf: 'application/rtf',
//     svg: 'image/svg+xml',
//     swf: 'application/x-shockwave-flash',
//     tar: 'application/x-tar',
//     tif: 'image/tiff',
//     tiff: 'image/tiff',
//     ttf: 'font/ttf',
//     txt: 'text/plain',
//     wav: 'audio/wav',
//     webm: 'video/webm',
//     webp: 'image/webp',
//     woff: 'font/woff',
//     woff2: 'font/woff2',
//     xls: 'application/vnd.ms-excel',
//     xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
//     xml: 'application/xml',
//     zip: 'application/zip'
//   }

//   const mime = mimeTypes[ext.split('.')[1]] || 'application/octet-stream'

//   return 'data:' + mime + ';base64,' + btoa(binary)
// }
