# Sinatra-Heroku Template

#### _A template to quickly get [Sinatra](http://sinatrarb.com) apps running and served up on [Heroku](http://heroku.com)._

## Installation

First you have to install Postgres.app and Ruby on your computer. Then download this template, `cd` to it, and install the gems

	$ bundle install

To run the app locally, install Shotgun and run

	$ shotgun config.ru

Your app should then be running at `http://localhost:9393`.

## Using it with our javascript

To use it to create a page, just go to index.erb and add your html and javascript in there. You will use the same path for javascript file includes as we use in the main website. In the book it is src="../<whatever youre adding>" for any images or javascript files you need for your web application. In this and on the web it is simply src="/<whatever youre adding>". Everything should work from there.