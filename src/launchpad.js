const changeButtonColorCode = 144;
const resetDeviceCode = 176;

const offButtonCode = 12;
const greenButtonCode = 56;
const yellowButtonCode = 58;
const amberButtonCode = 59;
const redButtonCode = 11;

class Launchpad {
    constructor(controller) {
        this.controller = controller;
        this._reset();
    };

    changeButtonColorToRed(rowAndColumn) {
        this._changeButtonColor(rowAndColumn, redButtonCode);
    };

    changeButtonColorToYellow(rowAndColumn) {
        this._changeButtonColor(rowAndColumn, yellowButtonCode);
    };

    changeButtonColorToAmber(rowAndColumn) {
        this._changeButtonColor(rowAndColumn, amberButtonCode);
    };

    changeButtonColorToGreen(rowAndColumn) {
        this._changeButtonColor(rowAndColumn, greenButtonCode);
    };

    turnOffButtonAt(rowAndColumn) {
        this._changeButtonColor(rowAndColumn, offButtonCode);
    };

    _changeButtonColor(rowAndColumn, colorCode) {
        this._sendMidiMessage(changeButtonColorCode, this._getButtonCodeFromRowAndColumn(rowAndColumn), colorCode);
    };

    _getButtonCodeFromRowAndColumn(rowAndColumn) {
        let row = rowAndColumn.row;
        let column = rowAndColumn.column;

        return (16 * (row - 1)) + (column - 1);
    };

    _reset() {
        this._sendMidiMessage(resetDeviceCode, 0, 0);
    }

    _sendMidiMessage(messageTypeCode, key, velocity) {
        this.controller.send([messageTypeCode, key, velocity]);
    };
}

export default Launchpad;