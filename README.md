# Moveo Audio Player task - Omer Munk

link [Moveo Audio Player - Omer Munk](http://ec2-34-227-27-8.compute-1.amazonaws.com/).

## Introduction

The app I made, is a basic audio player, that plays 9 different audio layers in 9 different channels. 

## Functionality

It is possible to –

•	 play and pause

•	stop

•	general mute or specific channel mute

•	toggle on and off the loop mode

•	toggle playing speed rate

•	changing the volume of each channel

•	drag and drop the cursor to certain time-stamps


## Technologies and methods used

•	React – I used react to code the application and all it’s features, worked in a development sever, then to deploy, I ran the ‘npm run build’ command.

•	GitHub – the project is in a remote GitHub repository.

•	AWS – I used Amazon Web Services to deploy the app. I started a virtual server on the cloud, using EC2 service. I have an ‘ubuntu’ virtual machine, where I created a local git repository, cloned from GitHub. I installed nginx web server on my ubuntu machine, in order to handle the http request and html pages. Then, I configured the nginx files, to point the root directory to the local git repository of my project, and to know which files to handle. 


## React – deep dive

Methods I used:
•	Functional component – I prefer using functional component over class components, I find it more readable, and a more bright way of react-coding.

•	CSS modules – I used CSS modules in order to have a unique CSS files and classes for each component that I want. This method is used in order to make sure that CSS files will not ‘spill’ to unnecessary components.

•	Icons – react-icons and Moveo logo.

•	useState, useEffect, useRef – I  used ‘useState’ and ‘useEffect in order to control and determine when each component should render and effect the DOM. I used ‘useRef’ in order to control certain HTML elements in child components, from a parent component

•	Project file structure - attached as an appendix


## Further work needed / possible

•	Improve the local states changes of the channels, according to the global player states. 

•	Improve the cursor dragging.

•	Add tutorial modals for first use of the player

•	Code and add a JavaScript music equalizer in the background, that react to the audio frequencies  

•	Responsive Drum Pad Modal, using ‘OnKeyPress’, changing current time of the ‘DRUMS.mp3’ file and play it for a short time. 

