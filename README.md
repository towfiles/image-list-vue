# Image List Vue

**Specifications:**
 - vue 2.6.10
 - vue cli 3.9.0
 - vuetify 2.0.0
 - npm 6.4.1
 - axios 0.19.0
 - lodash 4.17.15
 - material-design-icons-iconfont 5.0.1
 - sass 1.22.9

**Description:**
Image list vue is an image gallery app which loads gallery images from https://picsum.photos api. the app features the following functionality

 - display of image cards in rows and columns
 - pagination functionality 
 - filtering functionality that enables to filter images on the current page by author name
 - adjustment of number of images per page (default is 30, maximum is 100)
 - Layout responsivness 
 - clicking on an image card opens a modal which displays the linked url website to the particular image. clicking on the linked url website is disabled but a button on the modal called 'open in new tab'  can be used to open the linked url website on a new browser tab

**Technical Information**
The App uses a vuejs package called vuetifyJS. this package integrates Material design into vuejs in form of components with so many other functionality
 
 
 **Installation:**
 
 - clone or download the repo [https://github.com/towfiles/image-list-vue](https://github.com/towfiles/image-list-vue)
 - open dist/index.html file. this is the bundled and compiled production file
 - to run the app in development mode follow the below process
		 - make sure you have npm installed
		 - in the root directory run `npm install` to download and the modules in package.json file
		 - after the packages have been successfully installed then run `npm run serve` this will start the development mode and create a server after compliation. The terminal will show the localhost and network url to access the application

**Suggestions:**


We can also use **vuex** with our repository data and global variable data to make our app state managed.
Serving as a single source of truth. this will be very useful in bigger projects where there are alot of data interaction between so many components
