README

Purpose and goal: The point of this is to allow users that have an Amazon Echo and a Thunder Turret to link
the two so that they can give commands to Alexa and she will make the turret move, turn the light on and off,
and shoot.

How to install: The following instructions are for people who understand how to login to Putty have downloaded
Sublime, have an Echo, and have a Thunder Turret.

First, fork my folder so that you have your own in your own repository.
Next, download this folder so that you have it on your computer.
Next, drag this folder into Sublime and SFTP Upload it.
Next, do a "git pull" and write the link of your folder to pull it onto putty.
Next, cd into your folder and use node, sudo node, or supervisor (whichever your prefer) to run the program.
Finally, give Alexa a command that follows the outline of: "Turn [direction] by [number] degrees"