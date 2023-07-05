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
Now, instead of circles, we will replacing the randomised circles with image sprites for obstacles
In html, bring in obstacles.png in as an img tag, and set its id
Inside css, set display to none for obstalces(we will draw it using canvas and javascript)
In Obstacle, add image property, assigning it by linking to the obstacles id
Set numberOfObstacles to 1 for now
Inside Obstacle draw, call drawImage on its reference with 3 parameters/arguments for now(image, collisionX, collisionY)
We will now add the dimensions of the individual sprites as properties
Set spriteWidth to 250(1000 / 4)
Set spriteHeight to 250(750 / 3)
Set width to spriteWidth and height to spriteHeight(these will be used for scaling the images if needed later)
Adding the 4th and 5th arguments to drawImage, using width and height properties for now, will squeeze the entire spritesheet into the dimensions defined by those arguments(which is 250px each)
To crop a single sprite image from the spritesheet, you will need to employ all 9 arguments in drawImage method
The remaining arguments are the source coordinates(sx, sy) and dimensions(sw, sh)which are placed after the image argument, and will decide where in the spritesheet you are cropping and the size you are cropping
To crop the first sprite, it will be at coordinate 0,0 at the top left
The dimensions will be the spriteWidth and spriteHeight which you have defined in the constructor
In your game, the circle attached to your sprite is the collision area for your sprite and we want it to be around the centerpoint of your sprite
To do this we can add a couple of helper properties in Obstacle, spriteX and spriteY
Set spriteX to be the difference between collisionX and half of width
For dx in Obstacle draw, replace it with spriteX
Visually, you should see the collision circle pushed horizontally to the middle of the sprite
Do the same for spriteY and dy
Looking at the sprite, we want the collision area to be somewhere on the ground near the base of the sprite because there will be where our player sprite is moving and colliding
To move the circle downwards, we want to tweak the values with regards to its y axis, which in this case is spriteY
Positive values move the y axis upwards, and negative values down
So, add negative values to spriteY till you are satisfied to where the collision area covers the base of the sprite
Now, increase numberOfObstacles to 10
To space your obstacles even more we can add a distanceBuffer variable to Game init method and give it a value
In sumOfRadii, you can add distanceBuffer to its original assignment and the obstacles spawned in your game will always have this increased distanceBuffer you have added
To make sure that the obstacles/sprites always appear fully on the canvas and not clipped at the edges of the canvas, you can add an AND operator in your condition after the init while loop, and check if testObstacle's spriteX is more than 0(left edge of canvas), AND if testOBstacle's spriteX is less than the total width minus testObstacle width(right edge of canvas)
You should see that your obstacles are always visible horizontally after the above
The conditions for spriteY will differ because there is the background to consider
You do not want the obstacles to appear on the background which the player will not be able to walk pass anyway
Set topMargin to 260 in Game(which is the approximate height of the background forest at the top side)
Add the conditions for spriteY(vertically) with AND, taking the new topMargin property in consideration
Between the while loop and the condition, add a margin variable, assigning two times testObstacle's collisionRadius
Add this margin to the conditions for collisionY
This will give ample space around the obstacles when they are generated so enemy NPCs and player can move about(which will be useful when we add them in)
\*\* My topMargin's value is much smaller than author's (he uses 260 i use 20) because if i use his value my sprites are generated near the bottom side and never further upwards
Currently, we are only cropping the first sprite from the spritesheet(0,0)
For sx and sy, if we multiply 0 with spriteWidth and spriteHeight respectively, changing the 0 from 0 to 3 for sx will move the cropped position from position 0(first sprite) to position 3(4th sprite) horizontally in the spritesheet
The same applies to sy but vertically
As such, we can add helper properties instead of using hardcoded 0 and what not in place of these hardcoded position values
Add frameX property and give it a random value between 0 and 4(using Math.floor on Math.random)
Do the same for frameY, giving it a random value between 0 and 3
In your drawImage method, you can now replace your hardcoded values in sx and sy, with frameX and frameY, multiplied by their appropriate x or y dimension
Now, you should get obstacles that are randomly generated defined by your spritesheet
Inside your Game class, create checkCollision custom method, passing in a and b references
The idea here is to check for collision between a and b objects and can be applied to every object that has collision
In checkCollision, set distanceX to be the difference between collisionX of a and collisionX of b(this code will only work when all class objects have the referenced property)
Set distanceY to be the difference between collisionY of a and of b
Set distance to be Math.hypot of dy and dx
Set sumOfRadii to be the addition between collisionRadius of a and b
Then, return true if distance is less than sumOfRadii
In Player update, add a collision check with obstacles section
Within the section, call forEach method on game's obstacles array
For each obstacle, console log game's checkCollision method with the required references(a will be this keyword since we want a to point to the player, b will be obstacle)
The above method will only work when the objects you are comparing have collisionX, collisionY and collisionRadius properties
Once you see true and false being logged out in the console, remove the console log and replace it with an if condition wrapping the checkCollision call, and console log a collision text message inside the condition
Now, whenever your player moves and collides with the collision area(circles) of your obstacles, the collision text should be logged
Instead of just logging a collision text message, we want the player object to be pushed back in the direction opposite of the collision area of the obstacles, creating a physics push back of sorts
Currently, checkCollision method only checks if distance between circle collisions is true or false
In javascript, a return statement can only return 1 value(in this case if distance is less than sumOfRadii is true or false)
But, if you wrap the statement(not the return keyword) as an array, you can return multiple values, not just 1
We want more values such as distanceX, distanceY etc ,so, turn the statement into an array, and add distance, sumOfRadii, distanceX, and distanceY
Since this is an array, the index order is important(index 0 will return true or false, index 1 distance value and so on)
Take that array in your return statement you just made, copy them, and paste them in your forEach method in Player update, and COMMENT them(they will be used as visual reference here since we want to know the index order)
They will be needed when you calculate the collision between player and obstacle
\*\*Destructuring assignment employed here
Still in your forEach method, to destructure the array to be read, we will assign the array you commented out to the checkCollision call on game
What this does is for each array item, javascript will assign the checkCollision call on game separately under the hood. This is called destructuring
For index 0 item(distance < sumOfRadii), you should change it to collision(collision will reference checkCollision's return statement)
Remove the if condition for checkCollision call
Add an if condition where if collision is true, set unit_x to be the division between distanceX and distance(this will always return a value smaller than 1 because distance is the hypotenuse of distanceX and distanceY)
Also, set unit_Y to be the division of distanceY and distance
Console logging unit_x and unit_y will show the collision coordinates between player and obstacle everytime they collide
Remove the console log
To 'bounce' the player out of the obstacle's circle collision, we will set the centerpoint of player's collision(collisionX) to be the obstacle's collisionX plus the sumOfRadii plus 1(these in parenthesis because you want these to be calcualted first), multiplied by unit_x
Do the same for collisionY using collisionY and unit_y
Try moving your player pass the obstacles(it should not be passable and your player object can actually circle around the collision area smoothly since they are both circles)
We will now add an 8-directional sprite sheet, attached to the player object
In html, add the img tag and link the sprite sheet with an id of bull to it
Hide the display of bull id in css
In Player, set image property to bull's id
In Player draw, call drawImage on context with the initial 3 parameters to see the entire spritesheet drawn on canvas
We will need the width and height of each individual sprite as a property
In that sprite sheet, each sprite should be 255 in width and 256 in height, and you can assign them as spriteWidth and spriteHeight respectively inside Player(remember to place them above image property because image requires them for calculation)
After the above, create width and height properties and set them to spriteWidth and spriteHeight respectively(just like Obstacle class, this will allow us to scale them if needed later)
Now, you can add the next 2 parameters to the drawImage to squeeze the spritesheet within the values defined by those 2 parameters(dw, dh) using the width and height
Obviously, we will need all 9 arguments/parameters to draw out a single sprite from the spritesheet
Add sx, sy, sw, sh to drawImage, drawing only the top left most sprite
We mentioned previously the use of spriteX and spriteY, which will represent the top left most edge of the sprite's collision area, using collisionX and Y as the base of the calculation, which is the centerpoint of the bottom area circle collision
Add spriteX and Y property to Player
Currently, the collision circle for player is located at the top left edge(as defined by 0,0 in drawImage)
To move it to the center horizontally, we will set spriteX inside Player update to be the difference between the collisionX and half of width for spriteX
Do the same for spriteY with collisionY
Then, replace dx and dy to spriteX and Y
The circle collision will appear at the top of the player's head and we want it to be near its base(probably also want it to be bigger than 30)
We can add/minus spriteY's calculation with a hardcoded value to move collision area up/down since the player's size is static(if player is scaled, then we will need a value that will match that scaling)
The same can be appllied to spriteX to move the circle left/right
Just like the drawImage in Obstacle draw, you want to be able to navigate through the large spritesheet of player sprite, which features 8 directional sprites
We will do so with the frameX property for horizontal navigation, and frameY for vertical(just like Obstacle's)
The above properties will be multiplied by the relevant spriteWidth or spriteHeight in sx and sy in drawImage for Player draw respectively
Set the aforementioned frameX and frameY property to 0 in Player
In Player update, we will now attempt to make our player sprite face the direction our mouse cursor is placed on the canvas
Add a sprite animation section in Player update, and in it set angle variable to Math.atan2()
\*\* Math.atan2 returns an angle in radians between the positive x axis and a line, projected from 0, 0 coordinates towards a specific point(in this case the mouse cursor).
The specific point mentioned will need the calculations of distanceX and distanceY in Player update, so move them above sprite animation section
Pass in distanceY and distanceX to atan2 and console log angle
You should see the values of from -3.14 to 3.14 when moving your mouse cursor around the canvas(remember/or know that a full circle is approx Math.PI multiplied by 2)
Each sprite direction in the spritesheet will take up a specific area of a full circle (-3.14 to 3.14), and since we have 8 directional sprites, the full circle will be split to 8 slices base on their angle in Math.atan2
\*\* The angle areas are calculated specifically as shown in the author's video(1:16:17)
After angle variable, add an if condition to check if angle is less than each value(more than would not work here because there will be one with infinite value), followed by several else if, till all 8 directions are covered in the code, setting frameY(the direction the sprite is facing) to the appropriate angle value
\*\*The above will be better understood watching the (1:16:17) part
For frameY 6, and 7, you will need to be more specific with the conditions due to how the Math.atan2 line is drawn (which again is better if you watch 1:16:17 to understand)
After the above, move your player around with your cursor and your sprite should be able to face all 8 directions when moving around the canvas
For frameY 6 and 7, placing them last in the else if statement makes the transition abit too fast(in javascript the order in which the if statements are placed dictates it), so place them at the front(6,7,0 to 5 ordering)
With the change, your transition from frameY 0 to 7, 6 and frameY 5 to 6, 7 should be smoother(Change your speedModifier value in Player to slow down the sprite movements so you can see the transitions better)
The circle collisions are there visually for us to adjust where the collisions should be placed, and not to be shown to players playing the game
As such, we will need a debug mode where it can hide/show the collision circles
We will do this using a keydown event listener on window in Game
In Game, set debug property to true and create the previously mentioned keydown event listener in the event listeners section
Use e for the arrow callback function and using the available key property in keydown, set a condition where if e.key of letter d is true, set debug to false(you can use !this.debug to denote false as well), then console log debug property and press d multiple times, and console should switch between true and false for each d press
Comment/Remove the console log, and in Obstacle draw, wrap the collision circle drawings(beginPath till stroke) in a condition to check if game's debug property is true, then invoke the drawings
Now, pressing d should witch the collision circles of obstacles off or on
Do the same for Player
Currently, your player can move out of the canvas, and 'float' across the forest background layer, which is not ideal and we want to create boundaries that player should not be able to cross
Add horizontal boundaries section right above collisions with obstacles section
Inside horizontal boundaries section, set a condition where if collisionX is less than collisionRadius, set collisionX to collisionRadius(left side)
Else if collisionX is more than the game's width minus the collisionRadius, set it to game's width minus collisionRadius(right side)
Add vertical boundaries section
Set a condition where if collisionY is less than game's topMargin plus collisionRadius, set collisionY to game's topMargin plus collisionRadius(top side)
Else if collisionY is more than the game's height minus collisionRadius, set collisionY to game's height minus collisionRadius
You can tweak values in collisionRadius, or margin variable in init to make sure player obstacles spawn points never obstruct the area between topMargin and obstacle for player(if you want)
We will now allow our game to normalise itself to the user's screen refresh rate, attempting to achieve similar game speeds across different computers
requestAnimationFrame will refresh itself automatically approx every 60 frames per second, and will generate a timestamp
We will make use of that timestamp to achieve a normalised game speed for all
Create variable lastTime before animate method(i used previousTimeStamp for more clarity) and set it to 0
Pass a timeStamp reference in animate method
console logging timeStamp inside animate and you should see numbers rapidly increasing, due to requestAnimationFrame, in milliseconds
Remove the console log and create deltaTime variable inside animate, which will calculate the difference between timeStamp(which is the timeStamp reference) of CURRENT animation loop and timeStamp(previousTimeStamp) of the PREVIOUS animation loop
After the calculation above, set previousTimeStamp to the current timeStamp(so the function will continuously take the current timeStamp to replace previousTimeStamp and update it when the next requestAnimationFrame runs)
If you console log deltaTime inside animate, you should see 1000 divided by 60(16) per second but if you have a slower computer, the value 60 might be lower
Notice that your first two numbers are NaN, because the initial loops do not have a number to them as the code is triggered by animate call which has no references in it
To prevent your deltaTime related codes from not running(because we will use them to normalise game speed) due to NaN, pass the number 0 in animate call so it has an initial number attached to it, allowing javascript to calculate in the console
To make use of deltaTime calculation to determine frame rate of the game, we will need helper properties in Game
In Game, set fps property to 20, timer to 0, and interval to 1000 divided by fps
Inside Game render method, set a condition where if timer is greater than interval, invoke the render on player and Obstacle(the code you had inside render)
Then, within the condition, set timer back to 0
After the condition, set timer to increments of deltaTime
What the above does is render runs, the condition will not be true until the deltaTime increments in timer property exceeds interval, then it will turn true, running the code inside and setting timer back to 0, and the increments begins again
You will need to pass deltaTime as a reference in render method
Also pass it inside the render call inside animate
You will now have flashing sprites in your canvas because we are deleting old paint(clearRect in animate) but only drawing new sprites when reaching interval
You will need to remove clearRect method in animate, and add it to the interval condition(you will need to pass the Game properties inside clearRect since you are inside Game class now)
Now, your game should run base on the fps property value in Game class(not entirely because 60 fps value is not actually 60 fps since there are some left numbers after every interval since there are decimal places --> to account for this if you wanna achieve lets say 60 fps, your value in Game's fps property should be higher, like 70)
Now, create an Egg class, passing it game reference, convert it, and set collisionX and Y to a randomised number between 0 to the game's full width or height respectively
Set collisionRadius to 40 for now
Set image to the image's id(link the egg image to a html img tag and set it to a display of none in css)
Set spriteWidth and spriteHeight to their appropriate values(check it in developer's mode, and it should be displayed on the tab if you are on linux)
Then, set width and height to spriteWidth and spriteHeight respectively for scaling purposes if needed
As usual, we will center the collision area on the image using spriteX and spriteY(for spriteY closer to the base so some adjustments need to be made later)
Create custom draw method in Egg class, pass in context reference, and use drawImage on context
We will only need 3 parameters here for drawImage because it's a single sprite image(if the image is scaled later we will need 5)
Pass in the image, and the destination X and Y(dx,dy) of the image which are spriteX and spriteY
Since we are standardizing our codes in all our classes, we can reuse certain parts, such as the debug mode condition in other classes' draw method, to new classes that require them
Bring in the debug condition into Egg draw so the collision circle will appear for Egg object as well(Since we are reusing the same code for each class, we can refactor it into a custom method on its own so each of those classes can reference said custom method instead)
Inside Game, add a new addEgg custom method which will periodically add eggs into the game
Add eggs property in game and assign it an empty array
Add maxEggs property in game and set it to 10 to prevent endlessly spawning eggs
