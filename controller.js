let ArrowController = {
    leftActive: false,
    rightActive: false,
    upActive: false,
    dActive: false,
    keyUpDown(event) {
        let key_state = (event.type == "keydown") ? true : false;
        switch (event.keyCode) {
            case 38:
                if (ArrowController.upActive != key_state)
                    ArrowController.upActive = key_state
                break;
            case 37:
                if (ArrowController.leftActive != key_state)
                    ArrowController.leftActive = key_state;
                break;
            case 39:
                if (ArrowController.rightActive != key_state)
                    ArrowController.rightActive = key_state;
                break;
            case 40:
                if (ArrowController.dActive != key_state)
                    ArrowController.dActive = key_state;
                break;
        }
    }
}
let lettersController = {
    leftActive: false,
    rightActive: false,
    upActive: false,
    dActive: false,
    keyUpDown(event) {
       // console.log(event.keyCode)
        let key_state = (event.type == "keydown") ? true : false;
        switch (event.keyCode) {
            case 87:
                if (lettersController.upActive != key_state)
                    lettersController.upActive = key_state
                break;
            case 65:
                if (lettersController.leftActive != key_state)
                    lettersController.leftActive = key_state;
                break;
            case 68:
                if (lettersController.rightActive != key_state)
                    lettersController.rightActive = key_state;
                break;
            case 83:
                if (lettersController.dActive != key_state)
                    lettersController.dActive = key_state;
                break;
        }
    }
}