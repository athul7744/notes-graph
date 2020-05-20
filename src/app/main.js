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
    renderer.renderMainHolder("editor-container", false);
});

renderer.register('all_notes', async () => {
        if(renderer.renderMainHolder("notes-table", true)){
            var notesArray = await dbInstance.getDB().notes.toArray();
            var notes = notesArray.map((obj) => {
                return obj.getFormattedData();
            });
            var conf = {
                holder: 'notes-table',
                header: 'All Notes',
                columns: [
                    {id:'title', name:'Title'}, 
                    {id:'created_time', name:'Created At'}, 
                    {id:'updated_time', name:'Updated At'}
                ],
                onclick : function(e,data){
                    renderer.goTo('editor');
                    editorInstance.setNote(data);
                },
                data: notes
            };
            global.notesTable = new SimpleTable(conf);
            global.notesTable.generateTable();
        }
    });

renderer.goTo('editor');
editorInstance.set();
