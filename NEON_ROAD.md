
# Neon Road

## inspiration

<https://github.com/Moukrea/retrowave-scene>
<https://codepen.io/prisoner849/pen/PvdEMP>

three.js and react fiber tutorial: <https://www.smashingmagazine.com/2020/11/threejs-react-three-fiber/>
three.js vaporware road tutorial: <https://blog.maximeheckel.com/posts/vaporwave-3d-scene-with-threejs/>

nextjs and react three fiber setup example repository: <https://github.com/pmndrs/react-three-next>

react three fiber documentation: <https://docs.pmnd.rs/react-three-fiber/api/objects>

react three fiber camera explained: <https://youtu.be/Isr-hIveUK0>
react three fiber orbit controls documentation: <https://sbcode.net/react-three-fiber/orbit-controls/>

react three fiber examples repository (each repository branch is a different example): <https://github.com/Sean-Bradley/React-Three-Fiber-Boilerplate>
another three fiber examples repository (with demo page linked in readme): <https://github.com/onion2k/r3f-by-example>

nice codesandbox "space shooter" game example that uses three fiber to import 3d models as well as sprites: <https://codesandbox.io/s/b7e01?file=/src/App.js:1392-1405>

another nice codesandbox showing the usage of shadows: <https://codesandbox.io/s/elastic-cache-p325m?file=/src/App.js:631-640>

## install dependencies

install three.js (<https://github.com/mrdoob/three.js/>):

`npm i three --save-exact`

install react three fiber (<https://github.com/pmndrs/react-three-fiber>):

`npm i @react-three/fiber --save-exact`

install react three drei (<https://github.com/pmndrs/drei>):

`npm i @react-three/drei --save-exact`

## colors

road lines pink: `ff00aa`
mountain lines blue: `00feff`
road surface: `0e0226`
mountain surface: `040728`

used in the grid image

sun as css gradiant:
background: rgb(255,233,21);
background: linear-gradient(90deg, rgba(255,233,21,1) 0%, rgba(255,208,31,1) 20%, rgba(252,167,25,1) 35%, rgba(249,113,25,1) 50%, rgba(249,85,48,1) 65%, rgba(245,61,93,1) 80%, rgba(255,0,170,1) 100%);

!important: when changing the colors of the grid image, to optimize its size, you need to switch the color mode to **Indexed** and set the amount of colors to **2**










## gltf experiments

cc palm tree model: <https://sketchfab.com/3d-models/tree-palm-556752eb551d4ee7b342092c3bd3ed5e>
gltf tutorial: <https://docs.pmnd.rs/react-three-fiber/tutorials/loading-models>
gltf loader example: <https://sbcode.net/react-three-fiber/gltfloader/>
mesh border tutorial: <https://blender.stackexchange.com/questions/163539/how-do-i-add-a-3d-border-on-all-edges-of-a-mesh>
uv images and maps: <https://medium.com/@matthewmain/how-to-import-a-3d-blender-object-into-a-three-js-project-as-a-gltf-file-5a67290f65f2>
blender gltf docs: <https://docs.blender.org/manual/en/2.82/addons/import_export/scene_gltf2.html>
online gltf viewer to test exports: <https://gltf-viewer.donmccurdy.com/>


important to convert a gltf model into a react component for easy usage (as mentioned in <https://docs.pmnd.rs/react-three-fiber/tutorials/loading-models#loading-gltf-models-as-jsx-components>), use this online tool: <https://gltf.pmnd.rs/>, or it can be used on the command line, the github repository is here: <https://github.com/pmndrs/gltfjsx>

current gltf palm tree model, is from here: <https://sketchfab.com/3d-models/neon-palm-tree-base-8e552601aeff4e3fa1aa3d6b70ae2638>