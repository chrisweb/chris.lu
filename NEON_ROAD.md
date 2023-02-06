# Neon Road

## inspiration

this is the first retrowave scene I found while googling for inspiration to build a 3d 80s scene using three.js: <https://github.com/Moukrea/retrowave-scene>
later I found another good example (with code) of what I wanted to achieve: <https://codepen.io/prisoner849/pen/PvdEMP>
and finally this is the blog post I took the code from to make the first version of the animation as it was the closest to what I wanted to achieve, three.js vaporware scene tutorial: <https://blog.maximeheckel.com/posts/vaporwave-3d-scene-with-threejs/>

## must read

three.js and react fiber tutorial: <https://www.smashingmagazine.com/2020/11/threejs-react-three-fiber/>

nextjs and react three fiber setup example repository: <https://github.com/pmndrs/react-three-next>

react three fiber documentation: <https://docs.pmnd.rs/react-three-fiber/api/objects>

an important page to read from the documentation is the **scaling performance** section: <https://docs.pmnd.rs/react-three-fiber/advanced/scaling-performance>
and another important documentation page is the **performance pitfalls** section: <https://docs.pmnd.rs/react-three-fiber/advanced/pitfalls>

react three fiber camera explained: <https://youtu.be/Isr-hIveUK0>
react three fiber orbit controls documentation: <https://sbcode.net/react-three-fiber/orbit-controls/>

react three fiber examples repository (each repository branch is a different example): <https://github.com/Sean-Bradley/React-Three-Fiber-Boilerplate>
another three fiber examples repository (with demo page linked in readme): <https://github.com/onion2k/r3f-by-example>

a lot of good examples of what can be done using "react three drei": <https://github.com/pmndrs/drei#index>
here is a good list of performance related tools that "react three drei" offers: <https://github.com/pmndrs/drei#performance>

nice codesandbox "space shooter" game example that uses three fiber to import 3d models as well as sprites: <https://codesandbox.io/s/b7e01?file=/src/App.js:1392-1405>

another nice codesandbox showing the usage of shadows: <https://codesandbox.io/s/elastic-cache-p325m?file=/src/App.js:631-640>

you will find a lot of outdated tutorials on the web that got written prior to version 8, to convert the info of those to modern R3F (react three fiber): <https://docs.pmnd.rs/react-three-fiber/tutorials/v8-migration-guide#react-native-support>

check out the [GLTF models chapter](#gltf-experiments) for more links to must reads about GLTF files

here is a nice tool I found (but that I didn't try out), which makes npm packages out of your GLSL files (shaders): <https://github.com/glslify/glslify>, they have a website listing all available packages (there are a lot of interesting ones that might be useful to you): <http://stack.gl/packages/>

## installed these dependencies

install three.js (<https://github.com/mrdoob/three.js/>):

`npm i three --save-exact`

install react three fiber (<https://github.com/pmndrs/react-three-fiber>):

`npm i @react-three/fiber --save-exact`

install react three drei (<https://github.com/pmndrs/drei>):

`npm i @react-three/drei --save-exact`

## colors I used

for the terrain (used in the grid image):

road lines pink: `ff00aa`
mountain lines blue: `00feff`
road surface: `0e0226`
mountain surface: `040728`

the css gradient I did to fill the sun SVG image:

background: linear-gradient(90deg, rgba(255,233,21,1) 0%, rgba(255,208,31,1) 20%, rgba(252,167,25,1) 35%, rgba(249,113,25,1) 50%, rgba(249,85,48,1) 65%, rgba(245,61,93,1) 80%, rgba(255,0,170,1) 100%);

## optimizing images

!important: when changing the colors of the grid PNG image, to optimize its size, you need to switch the color mode to **Indexed** and set the amount of colors to a minimum, in my case I set it to **4**

I used this online tool to optimize  the PNGs: <https://compresspng.com/>
To optimize  the SVG I used this tool: <https://svgoptimizer.com/>

optimize the GLTF model: <>

## gltf experiments

* creative commons licensed palm tree model: <https://sketchfab.com/3d-models/tree-palm-556752eb551d4ee7b342092c3bd3ed5e>
* gltf tutorial: <https://docs.pmnd.rs/react-three-fiber/tutorials/loading-models>
* gltf loader example: <https://sbcode.net/react-three-fiber/gltfloader/>
* mesh border tutorial: <https://blender.stackexchange.com/questions/163539/how-do-i-add-a-3d-border-on-all-edges-of-a-mesh>
* uv images and maps: <https://medium.com/@matthewmain/how-to-import-a-3d-blender-object-into-a-three-js-project-as-a-gltf-file-5a67290f65f2>
* blender gltf docs: <https://docs.blender.org/manual/en/2.82/addons/import_export/scene_gltf2.html>
* online gltf viewer to test exports: <https://gltf-viewer.donmccurdy.com/>

important! to convert a gltf model into a react component for easy usage (as mentioned in <https://docs.pmnd.rs/react-three-fiber/tutorials/loading-models#loading-gltf-models-as-jsx-components>), use this online tool: <https://gltf.pmnd.rs/>, or it can be used on the command line, the github repository is here: <https://github.com/pmndrs/gltfjsx>

another useful resource is this GLTF mesh optimizer called "gltf pack": <https://github.com/zeux/meshoptimizer/releases>

## TODOs

* loading animation?
* use next analyzer first to check build size, then probably try to tree shake three.js to optimize build size: <https://www.npmjs.com/package/@next/bundle-analyzer>
* in this article <https://www.gatsbyjs.com/blog/performance-optimization-for-three-js-web-animations/> I read about a feature called saveData, should try to use it `navigator?.connection?.saveData`
* from the same article, they recommend using react lazy and suspense, I tried this with next.js 13 but the dependencies are still in the intial build so it doesn't help, is there a way to tell next.js 13 to not bundle an import?
* have a static image while loading or for when webgl is not available?
* check if changing rendering performance setting is needed when mobile is detected
* check if the shadows settings (camera) can be tweaked for better performance
* limit camera movement to slighly left/right, no up/down, no zoom
* add the accessibility package & set it up
* check for user preference for animation(s) should be low, then set the framerate to very low value

