import Launchpad from './launchpad';

window.AudioContext = window.AudioContext || window.webkitAudioContext;
const audioContext = new AudioContext();

let buttonsToPlayWith = [
    {column: 1, row: 1}, 
    {column: 8, row: 1}, 
    {column: 8, row: 8},
    {column: 1, row: 8}
];

let buttonsToPlayWith2 = [
    {column: 2, row: 1}, 
    {column: 8, row: 2}, 
    {column: 7, row: 8},
    {column: 1, row: 7}
];

let buttonsToPlayWith3 = [
    {column: 3, row: 1}, 
    {column: 8, row: 3}, 
    {column: 6, row: 8},
    {column: 1, row: 6}
];

navigator.requestMIDIAccess().then((midiAccess) => {
    let inputs = midiAccess.inputs;
    let outputs = midiAccess.outputs;
    let launchpad;

    Array.from(outputs.values()).forEach((midiOutput) => {
        launchpad = new Launchpad(midiOutput);
    });

    Array.from(inputs.values()).forEach((midiInput) => {
        midiInput.onmidimessage = (midiMessage) => {
            let midiData = midiMessage.data;
            let midiDataVelocity = midiData[2];

            if(midiDataVelocity === 127) {
                // buttonsToPlayWith.forEach((button) => launchpad.changeButtonColorToRed(button));

                setInterval(() => { 
                    buttonsToPlayWith.forEach((button) => launchpad.changeButtonColorToRed(button)); 

                    setTimeout(() => { 
                        buttonsToPlayWith2.forEach((button) => launchpad.changeButtonColorToGreen(button));

                        setTimeout(() => { 
                            buttonsToPlayWith2.forEach((button) => launchpad.turnOffButtonAt(button));
                        }, 250);
                    }, 250);

                    setTimeout(() => { 
                        buttonsToPlayWith3.forEach((button) => launchpad.changeButtonColorToAmber(button));

                        setTimeout(() => { 
                            buttonsToPlayWith3.forEach((button) => launchpad.turnOffButtonAt(button));
                        }, 250);
                    }, 500);

                    setTimeout(() => { 
                        buttonsToPlayWith.forEach((button) => launchpad.turnOffButtonAt(button));
                    }, 250);
                }, 750);
            } else if(midiDataVelocity === 0) {
                // buttonsToPlayWith.forEach((button) => launchpad.turnOffButtonAt(button));
            }
        };
    });
});