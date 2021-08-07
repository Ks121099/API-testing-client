import {EditorState ,basicSetup } from "@codemirror/basic-setup";
import { EditorView, keymap } from "@codemirror/view";
import { defaultTabBinding } from "@codemirror/commands";
import { json } from "@codemirror/lang-json";

export default function setEditor(){
 const jsonRequestBody= document.querySelector('[data-json-request]')
 const jsonResponseBody=document.querySelector('[data-json-response-body]');

 const basicExtensions= [ basicSetup, //does 95% of basic setup
     keymap.of(defaultTabBinding),  //allow tab inside the editor
     json(), //language
     EditorState.tabSize.of(2) //spacing
    ]

 const reqEditor= new EditorView({
     state: EditorState.create({
         doc:"{\n\t\n}",
         extensions: basicExtensions,
     }),
     parent: jsonRequestBody,
 })

 const resEditor= new EditorView({
    state: EditorState.create({
        doc:"{}",
        extensions: [...basicExtensions,EditorView.editable.of(false)],
    }),
    parent: jsonResponseBody,
})

 function updateResponseEditor(value){
     resEditor.dispatch({
        changes:{
        from: 0,
        to: resEditor.state.doc.length,
        insert: JSON.stringify(value,null,2),
        }
     })
 }
 return { reqEditor, updateResponseEditor }
}