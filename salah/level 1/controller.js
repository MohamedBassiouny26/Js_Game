


let ArrowController = {
    leftActive: false,
    rightActive: false,
    upActive: false,
    dActive: false,
    keyUpDown(event) {
        let key_state = (event.type == "keydown") ? true : false;
        switch (event.key) {
            case "ArrowUp":
                if (ArrowController.upActive != key_state)
                    ArrowController.upActive = key_state
                break;
            case "ArrowLeft":
                if (ArrowController.leftActive != key_state)
                    ArrowController.leftActive = key_state;
                break;
            case "ArrowRight":
                if (ArrowController.rightActive != key_state)
                    ArrowController.rightActive = key_state;
                break;
            case "ArrowDown":
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
        let key_state = (event.type == "keydown") ? true : false;
        switch (event.key) {
            case 'w':
                if (lettersController.upActive != key_state)
                    lettersController.upActive = key_state
                break;
            case "a":
                if (lettersController.leftActive != key_state)
                    lettersController.leftActive = key_state;
                break;
            case "d":
                if (lettersController.rightActive != key_state)
                    lettersController.rightActive = key_state;
                break;
            case "s":
                if (lettersController.dActive != key_state)
                    lettersController.dActive = key_state;
                break;
        }
    }
}