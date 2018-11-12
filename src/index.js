import Launchpad from './launchpad';

let buttonsToPlayWith = [
    {column: 1, row: 1}, 
    {column: 2, row: 2},
    {column: 3, row: 3},

    {column: 8, row: 1},
    {column: 7, row: 2},
    {column: 6, row: 3},

    {column: 8, row: 8},
    {column: 7, row: 7},
    {column: 6, row: 6},

    {column: 1, row: 8},
    {column: 2, row: 7},
    {column: 3, row: 6}
];

navigator.requestMIDIAccess().then((midiAccess) => {
    let inputs = midiAccess.inputs;
    let outputs = midiAccess.outputs;
    let launchpad;

    Array.from(outputs.values()).forEach((midiOutput) => {
        launchpad = new Launchpad(midiOutput);
    });

    Array.from(inputs.values()).forEach((midiInput) => {
        if(midiInput.name === 'LPK25 MIDI 1') {
            midiInput.onmidimessage = (midiMessage) => {

                let midiMessageData = midiMessage.data;
                let midiMessageEvent = midiMessageData[0];
                let midiMessageVelocity = midiMessageData[2];

                if(midiMessageEvent === 144) {
                    if(midiMessageVelocity < 50) {
                        buttonsToPlayWith.forEach((button) => launchpad.changeButtonColorToGreen(button));
                    } else if(midiMessageVelocity >= 50 && midiMessageVelocity <= 100) {
                        buttonsToPlayWith.forEach((button) => launchpad.changeButtonColorToYellow(button));
                    } else if(midiMessageVelocity > 100) {
                        buttonsToPlayWith.forEach((button) => launchpad.changeButtonColorToRed(button));
                    }
                } else if(midiMessageEvent === 128) {
                    buttonsToPlayWith.forEach((button) => launchpad.turnOffButtonAt(button));
                }
            }
        }
    });
});