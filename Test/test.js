// init() function:
    // 1- To get reference to the enemy character image
    // 2- Two vraiables to calculate the space we have on the screen
    function init()
    {
        picture = document.getElementById('img');
        spaceW = screen.height - picture.height;
        spaceH = screen.width - picture.width;

        setInterval(moveIt,600);
        
    }

    // movetIt() function:
    // To get the random coordinates for our character 
    function moveIt()
    {
        picture.style.top = Math.round(Math.random()*spaceW) + "px"
        picture.style.left = Math.round(Math.random()*spaceH) + "px"
    }