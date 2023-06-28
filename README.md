# Javascript-animated-physics

Create boilerplate for canvas
Remove all margin and padding in html, and change box-sizing to border-box
Center canvas in css
Create img tag and bring in overlay into html
Center overlay in css
Create load event listener for window and inside the function get canvas from html
Change canvas context to 2d and set its width and height to 1280 and 720 respectively(the size of the background)
Create Player and Game class, and a custom animate function
In Game class, pass in canvas reference and convert it to class property
Set width and height properties in Game to canvas' width and height
In Player, pass in game reference and convert it to class property
Set player to a new instance of Player passing itself
Since Player has game property, passing a new instance of itself in Game will automatically create Player object when Game object is created
After Player and Game classes, create game variable and assign a new instance of Game, passing it its required reference(due to canvas being a class property, it can extract the width and height which are also class properties)
console log game to see all its properties inside
Add custom draw method inside Player and pass in context
Inside draw method, draw a circle(beginPath(), arc(x,y,radius,start angle, end angle) on context)
end angle will be Math.PI multiply by 2 which represents a circle
Call fill on context to draw the circle out
Inside Game, create custom render method, passing in context
Inside render method, call draw on player property(which creates new instance of Player)
draw method requires a context reference, so pass it in the draw call
After game variable, call render on game, and pass in ctx(which will link ctx and context reference together since render method has a context reference)
You should see the circle at xy coordinate you have passed in arc
Now, add collisionX and collisionY as properties to Player to represent their collision coordinates
We will place the Player in the middle of the game, so set collisionX and Y to half the game's width and height respectively
Inside arc, you can now pass in collisionX and Y to place the circle in the middle area
With this change, you can now change the values inside collisionX and Y to move the circle, which represents the player, around
Create collisionRadius property and set it to a number
Inside arc, the 3rd parameter is radius, which you can now pass collisionRadius
Changing values of collisionRadius will affect the size of the circle
In javascript, animations run 60 times per second, which means changing styles, transforms, etc will hamper performance when placed inside functions
Use fillStyle, lineWidth and strokeStyle on ctx as global scope, setting them to white and a lineWidth of 3(setting them as global will make them run only once)
Call stroke on context in draw to create a border around the circle
globalAlpha controls the opacity and it affects the whole canvas
To make sure certain lines of code only affect the intended area, you have to wrap those lines of code within a save and restore method
For the fill call on context, wrap it with the save and restore method on context
Within this save and restore, set globalAlpha on context to 0.5 to change opacity of the fill call to 50%
If you remove the save and restore, you will notice that the whole canvas becomes opaque by 50%
Now, we want to move player around the game using mouse clicks
The code inside Game class will be executed when we create a new instance of Game class object
This feature is being used when we create a new instance of Player class inside Game class, allowing us to create Player class object whenever Game class is created
As such, we can run javascript codes inside Game class such as event listeners, and they will be available whenever Game class is created
To test this, add a section for event listeners within Game, and create a mousedown event listener and console log mousedown text
Inside your console, you should see the text whenever you trigger the mousedown event in the browser(clicking on mouse)
As usual, with clicking or keyboard events, you want to gain access to the event(e) objects inside the browser
Pass in event or e in the callback for mousedown, and console log it
You should see all properties available to the mousedown event
What we want here is the coordinates of the click and save them as properties and save them on the main game object and from there we could access from our player object as well
Create mouse property in Game, and assign it an object with x property set to the middle(half of width) and half of height for y
We also want to know when mouse click happens so add another property called pressed inside mouse object, and set it to false
Back to the mousedown event listener, you can console log the coordinates(e.x and e.y) and click around the browser to see the mouse click coordinates in your console
However, the coordinates are calculated starting from the top left edge of your browser window and not your canvas which makes the clicks inaccurate
Thus, we will use offsetX and Y properties that are available inside mousedown event
offsetX and Y represents the coordinate for the target node, which in this case is the canvas
Replace e.x with e.offsetX and do the same for e.y in the console log and you should notice that the coordinates of your mouse clicks should start at the top left edge of your canvas
Set pointer-event of overlay to none in css so it does not interfere with the clicks on canvas
With the above done and working, we want to save the click coordinates inside the mouse property in game so they can be used in other objects such as player
In mousedown event listener, set the x property of mouse object to its offset counterpart
Do the same for y
Add another set of console log for mouse x property and mouse y property
Notice that you have an error because the callback function you are using is a standalone function and it cannot reference anything outside of its scope(unable to reference this keyword)
We will instead use an arrow function(introduced in ES6), which will allow the code within it to reference from its parent using this keyword
Your clicks should now register in the console
Remove the console logs and set mouse pressed property in mousedown event listener to true
Add a mouseup event listener that mirrors mousedown event listener, with the exception that the pressed property be set to false
Add a mousemove event listener with the same code inside but without the pressed property
With the event listeners in place, we will now code to make Player object move
In Player, create custom update method, and set collisionX property to the game's mouse x property
Do the same for collisionY with y
To run update method, we will need to call it
Call it in render method in Game
To see movement/animation, you will need to keep calling the code that draws or renders over and over
To do this, move the render call on game inside custom animate method and request for animation, passing it animate method, then call animate
Now, when you move your mouse in your canvas, you should be drawing the circles
To remove previous draws, you will need to clear the old paint using clearRect method on the context from coordinates 0,0 to the full width and height of canvas(these are the arguments passed in clearRect) inside animate method
Now, only 1 circle should be drawn on your cursor, and the previous circles are erased, giving an illusion that the circle is 'following' your cursor
We will now create a new shape in Player class
In Player draw method, add a escond set of beginPath method on context, and use moveTo method on context, which defines the starting x and y coordinates of the line
Set the starting x and y coordinates to be collisionX and Y
lineto method will define the ending x and y coordinates, so use the method on context and set the ending x and y coordinates to be the game's mouse x property and mouse y proeprty respectively
Call stroke on context after the above to draw the line
Currently, since the line which represents the player has the same speed as the cursor, the line just catches up to the circle
We will now set a speed variable for the player
Inside Player, set speedX property to 0, likewise for speedY
In Player update, set speedX to 1 and increment collisionX instead by speedX
Do the same for collisionY with speedY
\*\* Technique 1 --> To make the player(line) follow the cursor, we can take the difference between the mouse and player position on horizontal axis for speedX and do the same between mouse and player position on vertical axis for speedY
You can slow the Player's movement to the cursor by dividing(or multiplying) the above differences by a value(you will need place parenthesis for the calculation of the difference first)
In Player, set distanceX(represents distance between mouse and player) property to 0, and do likewise for distanceY for vertical distance
You can now place the calculation of the difference inside distanceX and distanceY respectively in update method, so the code gets simpler to read(and no need to agonize over parenthesis)
We only want to move player in that direction when we click on the canvas
To do that, set a condition in mousemove event listener where only when mouse pressed property is true, then run the code inside mousemove event listener
Technique 1 moves the player according to the value you divided(or multiplied) by on the difference, which means whenever player moves a frame towards its destination, the value of speedX and Y gets smaller and smaller, making the player move slower and slower towards its destination
\*\* Technique 2 --> We will calculate hypotenuse between distanceX and distanceY and achieve a constant speed from player to destination
Inside Player update, add distance variable and assign built-in Math.hypot javascript method which will help us calculate the hypotenuse of distanceX and distanceY when we pass the latter as arguments inside the method
For speedX and speedY, instead of dividing(or multiplying) by a constant value, divide it by the new distance variable instead
Add an OR operator after the assignment for speedX and Y with a value of 0(to mitigate an edge case)
To allow player to move faster, we will add a speedModifier property in Player and give it a positive value
In Player update, multiply the increment in collisionX and Y by the speedModifier
Notice that when player reaches its destination, it goes back and forth because the speedModifier pushes it too far in both directions
To fix this, in Player update, only when distance is more than speedModifier, then you move the player(speedX and speedY assignments in update)
Else, set speedX and Y to 0
Now, your circle should stop 'vibrating' when it reaches its destination
Now, create a new class called Obstacle
Pass in game reference and convert it to class property
Inside Obstacle, add collisionX property and give it a random number between 0 and game's width
Do the same for collisionY but with game's height
Set collisionRadius to 60
Add draw method inside Obstacle, passing in context reference
In the draw method for Player, copy from the first beginPath method till stroke and paste it in Obstacle draw
The code will work because we have already added the necessary collisionX, Y, and radius properties in Obstacle class
Obstacle class will be a blueprint for whenever we create an obstacle in the game
Inside Game, add an obstacles array and a numberOfObstacles property set to 5 for now
Create init(short for initialize) custom method in Game, and create a for loop
The for loop will start at 0 index, with the limit being the numberOfObstacles property and incrementing
Whenever the for loop runs, push a new instance of Obstacle into obstacles array
Obstacle class requires a game reference, and since init method is inside Game class, just pass this keyword to the new instance of Obstacle
Now, call init method on game and console log game
Check your game properties and there are any undefined values, fix it in your code because there shouldn't be any
To draw all the obstacles object on canvas, in render method for Game, use forEach method on obstacles array(because all new instances of Obstacle is placed inside the array)
For each obstacle, call the draw method on it with the relevant reference required
You should now have 5 circle obstacles inside your canvas as defined by your Obstacle collisionX and Y
Each refresh will place the 5 obstacles randomly on the canvas
Currently, the code inside your init method randomly generates 5 obstacles, and will overlap
Remove the code and we will try a brute force method to try to place the obstacles(circles) in a non-overlapping fashion
Create variable attempts and set it to 0 in init
Create a while loop and increment attempts whenever the length of obstacles array is less than the numberOfObstacles AND attempts is less than 500
Inside the while loop, add a testObstacle variable and assign it a new instance of OBstacle with the reference and console log it
You should see 500 testObstacle objects in your console
Remove the console log and replace it with a forEach method on obstacles array and for each obstacle, set distanceX as the difference between testObstacle's collisionX and obstacle's collisionX, and do the same for distanceY with collisionY
This will compare the center points of the two objects testObstacle and obstacle, connecting the line between them, forming a hypotenuse using distanceX and distanceY
Next, set distance to built in hypot method for Math(or if you are big brained, calculate using pythagoras theorem manually), passing distanceY and distanceX
After that, set sumOfRadii to be the collisionRadius of testObstacle plus collisionRadius of obstacle
Create a variable called overlap and set it to false outside the forEach method
Back to the forEach method, set a condition for whenever distance is less than sumOfRadii, set overlap to true
After the forEach method but still inside the while loop, set another condition where if overlap is false, then you push testObstacle into obstacles array
This should ensure that your obstacles will never overlap/collide because those that are overlapping will be discarded by the code
