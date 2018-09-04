import {tag, template, useShadow} from "slim-js/Decorators";
import {Component} from "../../lib/component";
import {Employee} from "../model/employee";
import sharedStyles from "../../lib/shared-styles";

@tag('employee-card')
@sharedStyles('https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.1.3/css/bootstrap.min.css')
@template(`
<style>
    :host {
        display: inline-block;
        width: 20rem;
        border: 1px solid black;
        border-radius: 0.5rem;
        font-size: 12px;
    }
    
    div {
        display: inline-flex;
        flex-direction: column;
    }
    
    #title {
        display: block;
        text-align: center;
        background: limegreen;
    }
    
    #content {
        flex-direction: row;
        padding: 0.5rem;
    }
    
    #title h3 {
        margin: 0;
    }
    
    img {
        border: 1px solid black;
        margin-right: 1rem;
        border-radius: 50%;
    }
</style>
<div id="title"><h3>{{data.name}}</h3></div>
<div id="content">
    <img bind:src="data.pictureUrl">
    <div id="details">
        <span>{{data.phone}}</span>
        <span>{{data.email}}</span>
        <span>{{data.address}}</span>
    </div>
    <div id="actions"></div>
</div>
`)
@useShadow(true)
class EmployeeCard extends Component {

  public data : Employee

}