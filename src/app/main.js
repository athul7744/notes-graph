const EditorJS = require('@editorjs/editorjs');
const autosize = require('autosize'); 
const showdown = require('showdown');
const winston = require('winston');
const DailyRotateFile = require('winston-daily-rotate-file');
const Dexie = require('dexie');

var logger = new SimpleLogger();
var renderer = new RenderUtil();
var converter = new showdown.Converter();
var fieldsInstance = new FieldHandler();
var dbInstance = new DatabaseHandler();
var editorInstance = new EditorHandler();

editorInstance.create();

