require 'rubygems'
require 'bundler'
Bundler.require
require './database.rb'

set :root, File.dirname(__FILE__)

get '/' do
  erb :index
end

get '/myWebsite' do
	erb :index
end

get '/basic_earth' do
	erb :basic_earth_10813
end

get '/splash_page_midterm' do
	erb :midterm
end