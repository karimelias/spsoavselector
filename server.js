'use strict'

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const fs = require('fs');
var updateInProgress = false;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs')

app.get('/', function (req, res) {
    res.render('indexNew');
})
app.post('/', function (req, res) {

    if ("spspoav" == req.body.password) {
        console.log('correct password')
        if (false == updateInProgress) {
            console.log('starting update')
            updateInProgress = true;
            configureSwitch(req.body);
            updateInProgress = false;
            console.log('updated')
        }
        else {
            console.log('update already in progress')
        }
        generateEJSFile();
        res.render('indexNew');
    }
    else {
        //incorrect password
        console.log('incorrect password')
        return;
    }
})
app.listen(3000, function () {
    generateEJSFile();
    console.log('Example app listening on port 3000!');
})

function generateEJSFile() {
    var jsonFile = fs.readFileSync('config.json');

    //Get ejs file Header
    var ejsFile = fs.readFileSync('./views/indexHeader.ejs', 'utf8');

    var jsonFileContents = JSON.parse(jsonFile);

    var i;
    var s;
    var o;
    var outputNum = 0;
    var audioOutputFlg = false;

    //Generate List of Inputs
    ejsFile += '            <tr>\n            <td></td>\n'

    //Create the NONE input
    ejsFile += '            <td style="text-align: center; vertical-align: middle;">NONE</td>\n';


    for (i in jsonFileContents.inputs) {
        //x += jsonFileContents.inputs[i].name;
        ejsFile += '            <td style="text-align: center; vertical-align: middle;">' + jsonFileContents.inputs[i].name + '<br>SW' + Math.floor(jsonFileContents.inputs[i].id / 1000) + '-Port:(' + jsonFileContents.inputs[i].id % 1000 + ')</td>\n';
    }
    ejsFile += '            </tr>';

    //Create the Select ALL buttons
    ejsFile += '<tr><td><td style="text-align: center; vertical-align: middle;"><button type="button" onclick="select0()">Select ALL</button></td>';
    for (i in jsonFileContents.inputs) {
        ejsFile += '<td style="text-align: center; vertical-align: middle;"><button type="button" onclick=\"select' + jsonFileContents.inputs[i].id + '()\">Select ALL</button></td>';
    }
    ejsFile += '            </tr>';


    //Generate List of Outputs
    for (s in jsonFileContents.switches) {
        for (o in jsonFileContents.switches[s].outputs) {
            audioOutputFlg = false;
            audioOutputFlg = jsonFileContents.switches[s].outputs[o].name.includes("Audio");

            ejsFile += '            <tr>\n'
            ejsFile += '            <td style="text-align: center">' + jsonFileContents.switches[s].outputs[o].name + '<br>' + jsonFileContents.switches[s].name + '-Port:(' + jsonFileContents.switches[s].outputs[o].id + ')</td>\n';
            if (true == audioOutputFlg) {
                ejsFile += '<td style="text-align:center;" bgcolor=0x99ccff>'
            }
            else if (jsonFileContents.switches[s].outputs[o].selectedInput == 0) {
                ejsFile += '<td style="text-align:center;" bgcolor="green">';
            }
            else {
                ejsFile += '<td style="text-align:center;">';
            }
            ejsFile += '<input type="radio" align="middle" style=“width: 20em; height: 20em;” name="output';
            ejsFile += jsonFileContents.switches[s].name + '_' + jsonFileContents.switches[s].outputs[o].id + '" ';
            ejsFile += 'id=\'' + jsonFileContents.switches[s].name + '_' + jsonFileContents.switches[s].outputs[o].id + '_0\'';
            ejsFile += ' value=0';
            if (jsonFileContents.switches[s].outputs[o].selectedInput == 0) {
                ejsFile += ' checked ';
            }
            ejsFile += '></td>\n';
            for (i in jsonFileContents.inputs) {
                if (true == audioOutputFlg) {
                    ejsFile += '<td style="text-align:center;" bgcolor=0x99ccff>'
                }
                else if (jsonFileContents.switches[s].outputs[o].selectedInput == jsonFileContents.inputs[i].id) {
                    ejsFile += '<td style="text-align:center;" bgcolor="green">';
                }
                else {
                    ejsFile += '<td style="text-align:center;">';
                }
                ejsFile += '<input type="radio" style=“width:100px; height:100px;” name="output';
                ejsFile += jsonFileContents.switches[s].name + '_' + jsonFileContents.switches[s].outputs[o].id + '" ';
                ejsFile += 'id=\'' + jsonFileContents.switches[s].name + '_' + jsonFileContents.switches[s].outputs[o].id + '_' + jsonFileContents.inputs[i].id + '\'';
                ejsFile += ' value=' + jsonFileContents.inputs[i].id;
                if (jsonFileContents.switches[s].outputs[o].selectedInput == jsonFileContents.inputs[i].id) {
                    ejsFile += ' checked ';
                }
                ejsFile += '></td>\n';
            }
            ejsFile += '            <tr>\n';
        }
    }
    ejsFile += '            </tr>';
    ejsFile += '</table>\n';

    //Handle the NONE select All button case
    ejsFile += '<script>\n';

    ejsFile += 'function select0() {\n';
    ejsFile += 'var btns = document.querySelectorAll(\'input[type="radio"]\')\n';
    ejsFile += 'for(var i=0;i<btns.length;i++){\n'
    ejsFile += 'if( 0 == 1 \n';

    for (s in jsonFileContents.switches) {
        for (o in jsonFileContents.switches[s].outputs) {
            ejsFile += '|| "' + jsonFileContents.switches[s].name + '_' + jsonFileContents.switches[s].outputs[o].id + '_0"';
            ejsFile += '== btns[i].id\n';
        }
    }
    ejsFile += ') {\n';
    ejsFile += 'btns[i].checked=true;\n';
    ejsFile += '}\n}\n';

    ejsFile += '}\n';

    ejsFile += '</script>\n';


    //Handle the other Select All Buttons
    for (i in jsonFileContents.inputs) {

        ejsFile += '<script>\n';

        ejsFile += 'function select' + jsonFileContents.inputs[i].id + '() {\n';

        ejsFile += 'var btns = document.querySelectorAll(\'input[type="radio"]\')\n';
        ejsFile += 'for(var i=0;i<btns.length;i++){\n'
        ejsFile += 'if( 0 == 1 \n';


        for (s in jsonFileContents.switches) {
            for (o in jsonFileContents.switches[s].outputs) {
                ejsFile += '|| "' + jsonFileContents.switches[s].name + '_' + jsonFileContents.switches[s].outputs[o].id + '_' + jsonFileContents.inputs[i].id + '"';
                ejsFile += '== btns[i].id\n';
            }
        }
        ejsFile += ') {\n';
        ejsFile += 'btns[i].checked=true;\n';
        ejsFile += '}\n}\n';

        ejsFile += '}\n';

        ejsFile += '</script>\n';

    }


    //Get ejs file Footer
    ejsFile += fs.readFileSync('./views/indexFooter.ejs', 'utf8');



    fs.writeFileSync("./views/indexNew.ejs", ejsFile);

}

function configureSwitch(inoutselection) {
    //Write header
    var pythonScript = '';
    var jsonFile = fs.readFileSync('config.json');

    var jsonFileContents = JSON.parse(jsonFile);

    //Write body
    var i;
    var s;
    var o;
    var vlan;
    var temp

    pythonScript += 'import sys\n';
    pythonScript += 'import telnetlib\n';
    pythonScript += 'import time\n';


    for (s in jsonFileContents.switches) {
        pythonScript += 'Host=\'' + jsonFileContents.switches[s].ip + '\'\n';

        pythonScript += fs.readFileSync('configCiscoHeader.py', 'utf8');

        for (o in jsonFileContents.switches[s].outputs) {
            pythonScript += 'tn.write(b"interface ' + jsonFileContents.switches[s].interface + ' 1/0/' + jsonFileContents.switches[s].outputs[o].id + '\\n")\n';
            pythonScript += 'tn.write(b"switchport access vlan ';

            temp = eval('inoutselection.output' + jsonFileContents.switches[s].name + '_' + jsonFileContents.switches[s].outputs[o].id);

            if (0 == temp) {
                //handle the NONE case
                //Use VLAN 1
                pythonScript += '1';
                jsonFileContents.switches[s].outputs[o].selectedInput = 0;
            }
            else {
                for (i in jsonFileContents.inputs) {
                    if (temp == jsonFileContents.inputs[i].id) {
                        pythonScript += jsonFileContents.inputs[i].vlan;
                        jsonFileContents.switches[s].outputs[o].selectedInput = jsonFileContents.inputs[i].id;
                    }
                }
            }

            pythonScript += '\\n")\n';
        }

        //Write Footer
        pythonScript += fs.readFileSync('configCiscoFooter.py', 'utf8');
    }


    console.log(pythonScript);
    fs.writeFileSync("configCiscoSwitch.py", pythonScript);


    //Update JSON File
    fs.writeFileSync('config.json', JSON.stringify(jsonFileContents));


    //Execute the script
    const { exec } = require('child_process');
    exec('python configCiscoSwitch.py', (err, stdout, stderr) => {
        if (err) {
            //some err occurred
            console.error(err)
        } else {
            // the *entire* stdout and stderr (buffered)
            console.log(`stdout: ${stdout}`);
            console.log(`stderr: ${stderr}`);
        }
    });

}

