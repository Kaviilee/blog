const path = require('path');
const fs = require('fs');
const { exec } = require('child_process');
// const colors = require('colors')

const name = process.argv[2]

const DRAFTSDIR = path.resolve(__dirname, '..', 'source', '_drafts');

if (name) {
  exec(`hexo publish post ${name}`)
} else {
  fs.readdir(DRAFTSDIR, (err, files) => {
    if (err) {
      throw err
    }

    if (files.length) {
      files.forEach(file => {
        // console.log(file)
        const filename = file.split('.')[0]
        const cmdStr = `hexo publish post ${filename}`

        exec(cmdStr, (err, stdout) => {
          if (err) {
            console.error(err);s
            console.warn(new Date(), '发布失败')
          } else {
            console.log(stdout);
            console.warn(new Date(), '发布成功')
          }
        })
      })
    } else {
      console.log('\x1b[31m%s\x1b[0m', 'Directory _drafts does not have file');
    }
  })
}


