TASK:
Build a flickr web-app that fetches images from Nasa's account via the Flickr API (API details).
You are welcome to use any technology to build it and design the layout in any way that you see fit.

Important: You would need npm i.e. package manager for JavaScript runtime environment Node.js. npm is automatically included when 
Node.js is installed for your operating system.

The following web app is browser independent.

Approach:
1) The first step was to create a set up to the Flickr API.
2) Then consuming this set up to grab pictures from NASA's account.

Both the above steps were implemented by creating the API URL using the Flickr API key and NASA's USER ID 
as given in the problem statement.

3) On calling the Flickr API, the response obtained would be in JSON format.

4) Then all the pictures obtained would be stored in a list.

5) Iterating through each picture in the list and creating the Image URL using the values of ID, server ID, farm ID and secret
which would be returned in the response of the picture obtained from Flickr API.

6) Allowing the user to sort the images displayed on the screen in either Ascending order or Descending order.
