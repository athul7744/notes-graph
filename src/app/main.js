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

renderer.register('all_notes', async () => {
        renderer.renderMainHolder("notes-table");
        var notesArray = await dbInstance.getDB().notes.toArray();
        var notes = notesArray.map((obj) => {
            return obj.getFormattedData();
        });
        var conf = {
            holder: 'notes-table',
            columns: [
                {id:'title', name:'Title'}, 
                {id:'created_time', name:'Created At'}, 
                {id:'updated_time', name:'Updated At'}
            ],
            data: notes
        };
        var table = new SimpleTable(conf);
        table.generateTable();
    });

renderer.goTo('editor');

