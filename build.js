const fs = require('fs');
const watch = require('node-watch');
const { execSync } = require('child_process');
const StaticServer = require('static-server');

const walker = function(dir, fn) {
  const files = fs.readdirSync(dir);
  files.forEach((file) => {
    if (fs.statSync(dir + '/' + file).isDirectory()) {
      walker(dir + '/' + file + '/', fn);
    } else {
      if (file.endsWith('.js')) {
        console.log('testing file: ' + dir + file);
        fn(dir + '/' + file);
      }
    }
  });
};

const run = () => {
  execSync('npm run compile', { stdio: [0, 1, 2] });
  walker('./dist', (filePath) => {
    let content = fs.readFileSync(filePath).toString('utf-8');
    let wasModified = false;
    const regex = /^[import|export]{1}(?:["'\s]*(?:[\w*{}\n, ]+)[from]?\s*)?[\"|\'\s]*(.*)[\"|\']/gm;
    let match;
    while ((match = regex.exec(content)) !== null) {
      if (match.index === regex.lastIndex) {
        regex.lastIndex++;
      }
      const importPath = match[1];
      const libName = match[1];
      let replacement;
      if (importPath.endsWith('.ts')) {
        replacement = importPath.slice(0, libName.lastIndexOf('.ts')) + '.js'
      } else if (!importPath.endsWith('.js')) {
        replacement = importPath + '.js';
      }
      console.log('\tFound statement:', libName, '>', replacement);
      content = content.replace(match[1], replacement);
      wasModified = true;
    }
    if (wasModified) {
      console.log(content);
      fs.writeFileSync(filePath, content);
    } else {
      console.log('(Unmodified)')
    }
  });
};

watch('./src', { recursive: true }, () => {
  run();
});

run();

const server = new StaticServer({
  rootPath: './',
  port: '8080',
  cors: '*',
  followSymlink: true
});

server.start(() => {
  console.log('server started');
});