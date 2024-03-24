import { EditorState } from "./prosemirror/prosemirror-state/src";
import { EditorView } from "./prosemirror/prosemirror-view/src";
import { Schema, DOMParser } from "./prosemirror/prosemirror-model/src";
import { schema } from "./prosemirror/prosemirror-schema-basic/src/schema-basic.ts";
import { addListNodes } from "./prosemirror/prosemirror-schema-list/src/schema-list.ts";
import { exampleSetup } from "./prosemirror/prosemirror-example-setup/src";
import "./prosemirror/prosemirror-example-setup/style/style.css";
import "./prosemirror/prosemirror-menu/style/menu.css";
// import {Plugin} from "./prosemirror/prosemirror-state/src";
// 将 prosemirror-schema-list 和基本 schema 放在一起形成一个支持 list 的 schema
console.log(schema.spec.nodes);
// console.log(addListNodes(schema.spec.nodes, "paragraph block*", "block"));

const mySchema = new Schema({
  nodes: addListNodes(schema.spec.nodes, "paragraph block*", "block"),
  // nodes: addListNodes(schema.spec.nodes, "paragraph block*", "block"),
  marks: schema.spec.marks,
});
console.log(exampleSetup({ schema: mySchema }))
window.view = new EditorView(document.querySelector("#editor"), {
  state: EditorState.create({
    doc: DOMParser.fromSchema(mySchema).parse(
      document.querySelector("#content")!
    ),
    plugins: exampleSetup({ schema: mySchema }),
  }),
});
