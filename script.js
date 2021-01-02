//create class here
//to specify the state of every controller in the game
class Controller {
    leftActive = false;
    rightActive = false;
    upActive = false;

    keyUpDown() {
        let key_state = (event.type == "keydown") ? true : false;
        // console.log(key_state)
        switch (event.key) {
            case "ArrowUp":
                if (controller.upActive != key_state)
                    controller.upActive = key_state
                break;
            case "ArrowLeft":
                if (controller.leftActive != key_state)
                    controller.leftActive = key_state;
                break;
            case "ArrowRight":
                if (controller.rightActive != key_state)
                    controller.rightActive = key_state;
                break;
        }
        // console.log("right button : " + controller.rightActive + " left button : " + controller.leftActive + " up  button :" + controller.upActive)
    }
}
//end of class creation
//create all variables here:
let display = document.getElementsByTagName("canvas")[0];
let ctx = display.getContext("2d");
let image = document.getElementsByTagName("img")[0];
ctx.drawImage(image, 0, 122, 30, 30);
let controller = new Controller;
console.log(controller)
//end of creation of variables


//create all eventlisteners here
window.addEventListener("load", (event) => {

})
window.addEventListener("keydown", controller.keyUpDown)
window.addEventListener("keyup", controller.keyUpDown)
// end of eventlisteners creation