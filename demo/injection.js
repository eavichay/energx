import { Component } from '../dist/index.js'
import showAsCode from './show-component-code.js';

class InjectedDemoClass {
  get [Symbol.toStringTag] () {
    return this.constructor.name;
  }
}

const template = `
<style>
    label {
        color: darkgrey;
        font-style: italic;
        width: 15rem;
        display: inline-block;
        text-align: right;
    }

    label:after {
        content: ' (type ' attr(type) '):';
        margin-right: 1rem;
    }
    
</style>

<style>@import url(https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css);</style>

<label type="string">propString</label><span>{{propString}}</span> <br/>
<label type="function">propFunction</label><span>{{propFunction}}</span> <br/>
<label type="class">propClass</label><span>{{propClass}}</span> <br/>
<hr/>`;

class DemoDependencyInjectionComponent extends Component {

  get useShadow () { return true }

  get template () {
    return template;
  }

  static get injections () {
    return {
      propString: 'I am a string',
      propFunction: () => 'abcd',
      propClass: InjectedDemoClass
    }
  }
}

Slim.tag('x-x', DemoDependencyInjectionComponent);

showAsCode(DemoDependencyInjectionComponent, document.querySelector('.container'));