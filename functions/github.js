// const userName = 'mydracula'
// const repositoryName = 'image'
// const token = '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'

// const { v4: uuidv4 } = require('uuid')

// router.get('/github', (req, res) => {
//   res.send('看你吗看啊')
// })

// router.post('/github', (req, res, next) => {
//   var form = new formidable.IncomingForm()
//   form.parse(req, function (err, fields, files) {
//     const name = files?.file?.originalFilename
//     var sExtensionName = name.substring(name.lastIndexOf('.') + 1).toLowerCase()

//     fs.readFile(files.file.filepath, (err, data) => {
//       if (err) throw err
//       const base = data.toString('base64')
//       const uuid = uuidv4().replace(/-/g, '')
//       const date = new Date()
//       date.setMinutes(date.getMinutes() - date.getTimezoneOffset())
//       const time = date.toJSON().replace(/[-T]/g, '').substr(0, 8)
//       var headers = {
//         'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/29.0.1521.3 Safari/537.36',
//         Authorization: `token ${token}`,
//         'Content-Type': 'application/json'
//       }
//       var dataString = { accept: 'application/vnd.github.v3+jso', message: 'init', content: base }

//       var options = {
//         url: `https://api.github.com/repos/${userName}/${repositoryName}/contents/${time}/${uuid}/${uuid}.${sExtensionName}`,
//         method: 'PUT',
//         headers: headers,
//         body: JSON.stringify(dataString)
//       }

//       request(options, function (error, response, body) {
//         const isSucess = body?.indexOf('_links') != -1 && body?.indexOf('author') != -1
//         console.log(response.statusCode, body, isSucess)

//         if (!error && isSucess && response.statusCode == 201) {
//           res.json({
//             code: 200,
//             msg: '请求成功',
//             data: {
//               '7ED': `https://raw.githubusercontents.com/${userName}/${repositoryName}/master/${time}/${uuid}/${uuid}.${sExtensionName}`,
//               JsDelivr: `https://gcore.jsdelivr.net/gh/${userName}/${repositoryName}@master/${time}/${uuid}/${uuid}.${sExtensionName}`，
//             }
//           })
//         } else {
//           res.json({
//             code: 500,
//             msg: '请求异常',
//             data: null
//           })
//         }
//       })
//     })
//   })
// })

function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16).replace(/\s*/g, '-')
  })
}

const getGit = async (context) => {
  const { request } = context
  const userName = 'mydracula'
  const repositoryName = 'image'
  const token = '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'
  const date = new Date()
  date.setMinutes(date.getMinutes() - date.getTimezoneOffset())
  const time = date.toJSON().replace(/[-T]/g, '').substr(0, 8)
  const formData = await request.formData()
  const file = formData.get('file') // 获取上传文件对象
  const fileName = file.name // 获取上传文件名
  const sExtensionName = fileName.substring(fileName.lastIndexOf('.') + 1).toLowerCase()
  var options = {
    url: `https://api.github.com/repos/${userName}/${repositoryName}/contents/${time}/${uuidv4()}.${sExtensionName}`,
    method: 'PUT',
    headers: {
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/29.0.1521.3 Safari/537.36',
      Authorization: `token ${token}`,
      'Content-Type': 'application/json'
    }
    // body: request.body
  }
  return options
}

export async function onRequestPost(context) {
  // const { request } = context
  // const url = new URL(request.url)

  // github

  const { request } = context
  const userName = 'mydracula'
  const repositoryName = 'image'
  const token = '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'
  const date = new Date()
  date.setMinutes(date.getMinutes() - date.getTimezoneOffset())
  const time = date.toJSON().replace(/[-T]/g, '').substr(0, 8)
  const formData = await request.formData()
  const file = formData.get('file') // 获取上传文件对象
  const fileName = file.name // 获取上传文件名
  const sExtensionName = fileName.substring(fileName.lastIndexOf('.') + 1).toLowerCase()
  var options = {
    url: `https://api.github.com/repos/${userName}/${repositoryName}/contents/${time}/${uuidv4()}.${sExtensionName}`,
    method: 'PUT',
    headers: {
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/29.0.1521.3 Safari/537.36',
      Authorization: `token ${token}`,
      'Content-Type': 'application/json'
    }
    // body: request.body
  }

  // const response = fetch('https://telegra.ph/' + url.pathname, {
  //   method: 'PUT',
  //   headers: request.headers,
  //   body: request.body
  // })

  // const response = fetch('https://telegra.ph/' + url.pathname, {
  //   method: request.method,
  //   headers: request.headers,
  //   body: request.body
  // })

  return new Response(JSON.stringify(options), {
    headers: {
      'content-type': 'application/json;charset=UTF-8'
    }
  })
}
