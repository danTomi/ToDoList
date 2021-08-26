# To-Do-List-Testing
A set of tests created in JS. They are run using Protractor. The tested application can be found at -> [To-Do List]( http://todomvc.com/examples/angularjs/#/)


## Setup
## Node.JS
The first step is the installation of the node.js framework. Node.js also has the ability to embedded external functionality or extended functionality by making use of custom modules. These modules have to be installed separately.

Go to the site [node.js](https://nodejs.org/en/download/) and download the necessary binary files.

## Protractor
Use npm to install Protractor globally with:
***npm install -g protractor***

This will install two command line tools, protractor and webdriver-manager. Try running **protractor -version** to make sure it's working.
The webdriver-manager is a helper tool to easily get an instance of a Selenium Server running.

You will need to have [Java](https://java.com/en/download/manual.jsp) installed to run the standalone Selenium Server. Check this by running **java -version** from the command line.

Setup 

Use it to download the necessary binaries with:
***webdriver-manager update***

Now start up a server with:
***webdriver-manager start***

This will start up a Selenium Server and will output a bunch of info logs. Your Protractor test will send requests to this server to control a local browser. Leave this server running throughout the tutorial. You can see information about the status of the server at http://localhost:4444/wd/hub

Open a new command line or terminal window and change directory to your local repository folder, containig the conf.js file, for testing.
Protractor needs two files to run, a spec file and a configuration file(in our case tests.js and conf.js).

## Run tests in chrome
First of all make sure you got google chrome installed, and check the installed version. Download the matching chrome driver from the following link: [chrome driver](https://chromedriver.chromium.org/downloads).

Also make sure that the *hosts* file from the following location, *C:\Windows\System32\drivers\etc*, has a **localhost** defined at **127.0.0.1**

From a command line or terminal window, change directory to your local repository folder and run the package.json with:
***npm install***

Now run the tests with:
***protractor conf.js***