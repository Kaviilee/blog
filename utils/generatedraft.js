const { exec } = require('child_process');

const filename = process.argv[2];

const cmdStr = `hexo new draft ${filename}`

exec(cmdStr, (err, stdout) => {
  if (err) {
    console.error(err);
    console.warn(new Date(), `创建 "${filename}" 失败`)
  } else {
    console.log(stdout);
    console.info('\x1b[32m%s\x1b[0m', `创建 "${filename}" 成功`)
  }
})
