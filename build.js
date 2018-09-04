const fs = require('fs');

const walker = function(dir, fn) {
  const files = fs.readdirSync(dir);
  files.forEach((file) => {
    if (fs.statSync(dir + '/' + file).isDirectory()) {
      walker(dir + '/' + file + '/', fn);
    } else {
      if (file.endsWith('.js')) {
        // console.log('testing file: ' + dir + file);
        fn(dir + '/' + file);
      }
    }
  });
};

const run = () => {
  walker('./dist', (filePath) => {
    let content = fs.readFileSync(filePath).toString('utf-8');
    let wasModified = false;
    const regex = /^[import|export]{1}(?:["'\s]*(?:[\w*{}\n, ]+)[from]?\s*)?[\"|\'\s]*(.*)[\"|\']/gm;
    let match;
    while ((match = regex.exec(content)) !== null) {
      if (match.index === regex.lastIndex) {
        regex.lastIndex++;
      }
      let libName = match[1];

      if (!libName) continue;

      let replacement;

      if (!libName.startsWith('.')) {
        libName = '/node_modules/' + libName;
      }

      if (libName.endsWith('.ts')) {
        replacement = libName.slice(0, libName.lastIndexOf('.ts')) + '.js'
      } else if (!libName.endsWith('.js')) {
        replacement = libName + '.js';
      }
      // console.log('\tFound statement:', libName, '>', replacement);
      content = content.replace(match[1], replacement);
      wasModified = true;
    }
    if (wasModified) {
      // console.log(content);
      fs.writeFileSync(filePath, content);
    } else {
      // console.log('(Unmodified)')
    }
  });
  console.log('Conversion to .js complete');
};

console.log('Waiting for conversion...');
run();