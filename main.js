'use strict'



class editor{
    constructor(JSON) {
        this.json = JSON
        this.loadFlag = false
    }

    loadJSON() {
        let keyBlock = document.getElementById('keyList')
        let valueBlock = document.getElementById('valueList')

        document.getElementById('jsonList').classList.add('json-list--active')
        document.getElementById('jsonList').classList.remove('json-list--disable')

        if(document.getElementsByClassName('error')[0]) {
            document.getElementsByClassName('error')[0].remove()
        }

        document.getElementById('strJSON').disabled = 'true'

        
        Array.from(keyBlock.children).forEach((el) => {
            el.remove()
        })

        Array.from(valueBlock.children).forEach((el) => {
            el.remove()
        })

        this.json.forEach((element, i) => {
            let valuesArray = []
            
            for(let key in element) {
                valuesArray.push(element[key])                
            }

            keyBlock.appendChild(document.createElement('div')).classList.add('list-item')
            keyBlock.getElementsByTagName('div')[i].appendChild(document.createElement('input')).classList.add('value-list__item' )

            valueBlock.appendChild(document.createElement('div')).classList.add('list-item')
            valueBlock.getElementsByTagName('div')[i].appendChild(document.createElement('input')).classList.add('value-list__item' )

            keyBlock.children[i].draggable = "true"
            valueBlock.children[i].draggable = "true"

            keyBlock.getElementsByTagName('div')[i].getElementsByTagName('input')[0].value = `${valuesArray[0]}`
            valueBlock.getElementsByTagName('div')[i].getElementsByTagName('input')[0].value = `${valuesArray[1]}`
            
            let garbage = valueBlock.getElementsByTagName('div')[i].appendChild(document.createElement('svg'))

                garbage.classList.add('delete-button')
                garbage.id  = 'deleteBtn'
                garbage .innerHTML = '<svg id="garbage" viewBox="0 0 20 20"><path d="M14 7V17H6V7H14ZM12.7929 1.29289C12.6054 1.10536 12.351 1 12.0858 1H7.91421C7.649 1 7.39464 1.10536 7.20711 1.29289L6.5 2H4C3.44772 2 3 2.44772 3 3V3C3 3.55228 3.44772 4 4 4H16C16.5523 4 17 3.55228 17 3V3C17 2.44772 16.5523 2 16 2H13.5L12.7929 1.29289ZM16 6C16 5.44772 15.5523 5 15 5H5C4.44772 5 4 5.44772 4 6V17C4 18.1 4.9 19 6 19H14C15.1 19 16 18.1 16 17V6Z"></path></svg>'


        })

        dragHandlers()
    }

    downloadJSON() {
        let json = []
        let jsonKeys= []

        let keyBlock = Array.from(document.getElementById('keyList').children)
        let valueBlock = Array.from(document.getElementById('valueList').children)

        document.getElementById('strJSON').disabled = !'true'


        for(let key in this.json[0]) {
            jsonKeys.push(key)
        }
        
        keyBlock.forEach((el, i) => {
            json.push({})

            json[i][`${jsonKeys[0]}`] = el.getElementsByTagName('input')[0].value

        })
        valueBlock.forEach((el, i) => {
            
            json[i][`${jsonKeys[1]}`] = el.getElementsByTagName('input')[0].value
        })

        document.getElementById('strJSON').value = `${JSON.stringify(json)}`
    }


}

let JSONEditor = {}

document.getElementById('loadBtn').addEventListener('click', () => {

    let fileInput = document.getElementById('fileJSON')
    let strJSON = document.getElementById('strJSON')



    if(JSONEditor.loadFlag == true) {
        JSONEditor.downloadJSON()

        Array.from(document.getElementsByClassName('delete-button')).forEach(el => {
            el.removeEventListener('click', deleteHandler)
        })

        document.getElementById('addBtn').removeEventListener('click', addHandler)
    }

    if(fileInput.files.length && strJSON.value.length === 0 && !JSONEditor.loadFlag) {

        
        let file = document.getElementById('fileJSON').files[0]
        let reader = new FileReader();

        reader.readAsText(file)
        reader.onload = () => {
            let JSONFile = {} 

            try {
                JSONFile = JSON.parse(reader.result)

                JSONEditor = new editor(JSONFile)
                JSONEditor.loadJSON()
                Array.from(document.getElementsByClassName('delete-button')).forEach(el => {
                    el.addEventListener('click', deleteHandler)
                })
                document.getElementById('addBtn').addEventListener('click', addHandler)
                
            } catch {
                let alertErrorBlock = document.getElementById('inputBlock').appendChild(document.createElement('div'))
                
                    document.getElementsByClassName('error')[0].remove()
                

                alertErrorBlock.innerHTML = 'Something wrong in your JSON'
                alertErrorBlock.classList.add('error')
                JSONEditor.loadFlag = !JSONEditor.loadFlag
            }

            
        }

    } else if(!fileInput.files.length && strJSON.value.length >= 0 && !JSONEditor.loadFlag) {

        try{
            
            JSON.parse(strJSON.value).forEach(element => {

                for(let key in element) {
                }

            });
            
            JSONEditor = new editor(JSON.parse(strJSON.value))
            JSONEditor.loadJSON()
            Array.from(document.getElementsByClassName('delete-button')).forEach(el => {
                el.addEventListener('click', deleteHandler)
            })
            document.getElementById('addBtn').addEventListener('click', addHandler)
        } catch {
            
            let alertErrorBlock = document.getElementById('inputBlock').appendChild(document.createElement('div'))
            if(document.getElementsByClassName('error')[0]) {
                document.getElementsByClassName('error')[0].remove()
            }

            alertErrorBlock.classList.add('error')
            alertErrorBlock.innerHTML = 'Something wrong in your JSON'
            JSONEditor.loadFlag = !JSONEditor.loadFlag
        }
    }


    JSONEditor.loadFlag = !JSONEditor.loadFlag
})

function deleteHandler(e) {
    let keyList = [...document.getElementById('keyList').children]
    let valueList = [...document.getElementById('valueList').children]

    valueList.forEach((item, i) => {
        
        if(item === e.target.closest('.list-item')) {
            keyList[i].remove()
            item.remove()
        }
    })
}

function addHandler(e) {

    let keyItem = document.getElementById('keyList').appendChild(document.createElement('div'))
    let valueItem = document.getElementById('valueList').appendChild(document.createElement('div'))
    

    keyItem.classList.add('list-item')
    keyItem.appendChild(document.createElement('input')).classList.add('key-list__item')

    valueItem.classList.add('list-item')
    valueItem.appendChild(document.createElement('input')).classList.add('value-list__item')

    let garbage = valueItem.appendChild(document.createElement('svg'))
    garbage.classList.add('delete-button')
    garbage.id  = 'deleteBtn'
    garbage .innerHTML = '<svg id="garbage" viewBox="0 0 20 20"><path d="M14 7V17H6V7H14ZM12.7929 1.29289C12.6054 1.10536 12.351 1 12.0858 1H7.91421C7.649 1 7.39464 1.10536 7.20711 1.29289L6.5 2H4C3.44772 2 3 2.44772 3 3V3C3 3.55228 3.44772 4 4 4H16C16.5523 4 17 3.55228 17 3V3C17 2.44772 16.5523 2 16 2H13.5L12.7929 1.29289ZM16 6C16 5.44772 15.5523 5 15 5H5C4.44772 5 4 5.44772 4 6V17C4 18.1 4.9 19 6 19H14C15.1 19 16 18.1 16 17V6Z"></path></svg>'

}   

function dragHandlers() {

    let keyList = [...document.getElementById('keyList').children]
    let valueList = [...document.getElementById('valueList').children]


    keyList.forEach( (el, i) => {

        el.addEventListener('drag', (e) => {

            insertEl(e.layerY)
        })

        el.addEventListener('dragstart', (e) => {
            el.classList.add('draggable')
            valueList[i].classList.add('draggable') 
        })

        el.addEventListener('dragend', (e) => {
            el.classList.remove('draggable')
            valueList[i].classList.remove('draggable')
        })  

        el.addEventListener('dragenter', (e) => {
            if(!el.classList.contains('draggable')) {
                el.classList.add('drag-enter')
                valueList[i].classList.add('drag-enter')
            }            
        })  

        el.addEventListener('dragleave', (e) => {
            if(!el.classList.contains('draggable')) {
                el.classList.remove('drag-enter')
                valueList[i].classList.remove('drag-enter')
            }
        })
    })

    valueList.forEach( (el, i) => {

        el.addEventListener('drag', (e) => {

            insertEl(e.layerY)
        })

        el.addEventListener('dragstart', (e) => {
            el.classList.add('draggable')
            keyList[i].classList.add('draggable') 
        })

        el.addEventListener('dragend', (e) => {
            el.classList.remove('draggable')
            keyList[i].classList.remove('draggable')
        })  

        el.addEventListener('dragenter', (e) => {
            if(!el.classList.contains('draggable')) {
                el.classList.add('drag-enter')
                keyList[i].classList.add('drag-enter')
            }            
        })  

        el.addEventListener('dragleave', (e) => {
            if(!el.classList.contains('draggable')) {
                el.classList.remove('drag-enter')
                keyList[i].classList.remove('drag-enter')
            }
        })
    
    })
}

function insertEl(Y) {

    let listKeyItems = Array.from(document.getElementById('keyList').children);
    let listValueItems = Array.from(document.getElementById('valueList').children);


    let dragItem = '';
    let dragEnterItem = '';
    let dragItemIndex = '';

    let boxSize = '';
    let posElY = '';


    listKeyItems.forEach((item, i)=> {
        if(item.classList.contains('draggable')) { 
            dragItem = item 
            dragItemIndex = i
        }
    })

    listKeyItems.forEach((item, i) => {
        boxSize = item.getBoundingClientRect()
        posElY  = Y % boxSize.height
        
        if(item.classList.contains('drag-enter')) {
            
            
            if(posElY < (boxSize.height / 2)) {
                item.parentNode.insertBefore(dragItem, item)  
                listValueItems[0].parentNode.insertBefore(listValueItems[dragItemIndex], listValueItems[i])
                
            } else if(posElY > (boxSize.height / 2)) {

                item.parentNode.insertBefore(dragItem, item.nextSibling) 
                listValueItems[0].parentNode.insertBefore(listValueItems[dragItemIndex], listValueItems[i].nextSibling)
            }
        }  
    })

  
     
}
[{"name":"Name 1","year":"2010"},{"name":"Name 2","year":"1997"},{"name":"Name 3","year":"2004"},
{"name":"Name 4","year":"2010"},{"name":"Name 5","year":"1997"},{"name":"Name 6","year":"2004"},
{"name":"Name 7","year":"2010"},{"name":"Name 8","year":"1997"},{"name":"Name 9","year":"2004"}]
