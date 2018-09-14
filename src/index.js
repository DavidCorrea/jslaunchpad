import Launchpad from './launchpad';

window.AudioContext = window.AudioContext || window.webkitAudioContext;
const audioContext = new AudioContext();

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
                launchpad.changeButtonColorToRed({column: 1, row: 1});
                launchpad.changeButtonColorToRed({column: 8, row: 1});
                launchpad.changeButtonColorToRed({column: 1, row: 8});
                launchpad.changeButtonColorToRed({column: 8, row: 8});
            } else if(midiDataVelocity === 0) {
                launchpad.turnOffButtonAt({column: 1, row: 1});
                launchpad.turnOffButtonAt({column: 8, row: 1});
                launchpad.turnOffButtonAt({column: 1, row: 8});
                launchpad.turnOffButtonAt({column: 8, row: 8});
            }
        };
    });
});