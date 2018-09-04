export default function (clazz, rootElement = document.body) {

  const code = clazz.toString().replace('\n', '\r\n');
  const template = clazz.prototype.template.replace(/[\u00A0-\u9999<>\&]/gim, function(i) {
    return '&#'+i.charCodeAt(0)+';';
  });

  const elementContent = `
    <h3>Template</h3>
    <pre>${template}</pre>
    <br/>
    <h3>Class code</h3>
    <pre>${code}</pre>
    </h3>
  `

  const codeElement = document.createElement('div');
  codeElement.innerHTML = elementContent;
  rootElement.appendChild(codeElement);
}