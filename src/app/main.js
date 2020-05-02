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

renderer.register('editor', function () {
    renderer.renderMainHolder("editor")
    editorInstance.set();
});

renderer.register('all_notes', function () {
        renderer.renderMainHolder("notes-table");
        var notes = [];
        dbInstance.getDB().notes.toArray().then((e) => {
            notes = e;
        });
        var conf = {
            holder: 'notes-table',
            columns: ['title', 'created_time', 'updated_time'],
            data: notes
        };
        var table = new SimpleTable(conf);
        table.generateTable();
    });

renderer.goTo('editor');

