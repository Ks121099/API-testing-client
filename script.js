import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios';
import prettyBytes from 'pretty-bytes';


const queryParamContainer=document.querySelector('[data-query-params]')
const requestContainer=document.querySelector('[data-headers]')
const keyValueTemplate=document.querySelector('[data-key-value-template]')
const responseContainer=document.querySelector('[data-response-headers]')

document.getElementById("data-add-query").addEventListener('click', function(){
    queryParamContainer.append(createKeyValuePair());
}) 

document.getElementById("data-add-headers-btn").addEventListener('click', function(){
    requestContainer.append(createKeyValuePair());
}) 

//Form handling
document.querySelector('[data-form]').addEventListener('submit', e=> {
    e.preventDefault()
    axios({
        url: document.getElementById('data-url').value,
        method: document.getElementById('data-method').value,
        params: keyValueToObject(queryParamContainer),
        headers: keyValueToObject(requestContainer)
    })
    .catch(e=> e.response)
    .then(function (response) {
  //     document.getElementById('response').value=response.data.id;
        document.getElementById('data-response-section').classList.remove('d-none')
        document.getElementById('data-status').textContent=response.status;
        document.getElementById('data-size').textContent=prettyBytes(JSON.stringify(response.data).length 
        +JSON.stringify(response.headers).length) 
         updateResponseHeaders(response.headers);
    })
})

function keyValueToObject(container){
    var x=container.querySelectorAll('[data-key-value-pair]')
    return [...x].reduce(function(data,pair)
    {
        const key=pair.querySelector('[data-key]').value
        const value=pair.querySelector('[data-value]').value
        if(key==='') 
            return data
        return {...data , [key]:value }
    }, {})
}
function createKeyValuePair(){
    const element =keyValueTemplate.content.cloneNode(true);    
    element.getElementById('data-remove-btn').addEventListener('click',function(e){
        e.target.closest('[data-key-value-pair]').remove();
    })
    return element;
}

function updateResponseHeaders(header)
{
    responseContainer.innerHTML= ""
    Object.entries(header).forEach(function([key,value]){
        const keyElement=document.createElement("div")
        keyElement.innerHTML=key
        responseContainer.append(keyElement)
        const valueElement=document.createElement("div")
        valueElement.textContent=value
        responseContainer.append(valueElement)
})
}

function endTime(response){
 response.customData=response.customData || {}

}
//https://jsonplaceholder.typicode.com/todos/1 for
