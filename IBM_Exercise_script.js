      // Flickr_API_Key
      var apiKey = 'a5e95177da353f58113fd60296e1d250';
      //NASA USER ID
      var userId = '24662369@N07';

      window.onload = function () {
        var imageList = document.getElementById('items'); 
        var toggle = document.getElementById('toggleBtn');
        var snackBar = document.getElementsByClassName('snackbar__text')[0];
        var itemsDesc = document.getElementsByClassName('items__description')[0];
        var sortForm = document.getElementById('listOfImages');

        
        // The first step deals with setting up the flickr API to get the NASA pictures
        var apiUrl = 'https://api.flickr.com/services/rest/?method=flickr.people.getPublicPhotos&api_key=' + apiKey + '&user_id=' + userId + '&format=json&nojsoncallback=1';

        // reusable error message function
        var errorMsg = function errorMsg(e) {
          return '<p class=\'text--center\'>ERROR: ' + e + '</p>';
        };

        var allPages = void 0;
        var photos = void 0;
        var photosArray = [];

        var currentPage = 1;
        var paused = false;
        toggle.innerHTML= 'Stop';

        // Let us grab the pictures frm flickr API and stre thenm in a json format 
        var getPhotos = function getPhotos() {
            return fetch(apiUrl).then(function (response) {
            var response = response.json();
            sortForm.value='';
            return response;
          });
        };
        var sortingBy= void 0;
        var renderImages = function renderImages(_images) {
          photos = _images.photo;

          var _fullIteration = true;
          var _didIteratorError = false;
          var _iteratorError = undefined;

          try {
            // Using [Symbol.iterator] method for defining and consuming iteratble object photos.
            // As shown below, iterator objects must have a "next" method that returns a result object
            // in the boolean format. It is to be noted that the first call to the next method
            // would return the result of the first iteration. The done property signals 
            // when the iterator has been exhausted and no more pictures are available.
            for (var _iter = photos[Symbol.iterator](), _step; !(_fullIteration = (_step = _iter.next()).done); _fullIteration = true) {
              var photo = _step.value;

              //Creating Image URL by using the values of ID, server ID, farm ID and secret
              var imageUrl = 'https://farm' + photo.farm + '.staticflickr.com/' + photo.server + '/' + photo.id + '_' + photo.secret + '.jpg';
              photo.url = imageUrl;
              photosArray.push(photo);
              
              createListItem(photo);
            }
          } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
          }
        };
        sortForm.addEventListener('change',function(event){
          listOfImages(event.target.value);
        });
        
        toggle.addEventListener('click', function (e) {
          paused = !paused;
          toggle.innerHTML = paused ? 'continue' : 'stop';
        });
        var createListItem = function createListItem(i) {
          var item = document.createElement('li');
          item.classList.add('img__container');
          item.innerHTML = '<img height= "' + 200 + '" width= "' + 200 + '" src="' + i.url + '" title="' + i.title + '"/>' + i.title + ' ' ;
          imageList.appendChild(item);
        };

        //Providing the sorting routine for the images retrieved from Flickr API.
        var perName= function perName(x,y){
          var first= String(x.title);
          var next= String(y.title);

          switch(sortingBy){
            case "Ascending":
            return first > next ? -1 : first < next ? 1 : 0;
            break;
            case "Descending":
            return next > first ? -1 : next < first ? 1 : 0;
            break;
          }
        }

        var listOfImages = function listOfImages(arg) {
          sortingBy=arg;
          photosArray.sort(perName);
          // run list item creation function to render sorted results
          window.setTimeout(function () {
            imageList.innerHTML = '';
            var _fullIteration2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
              for (var _iter2 = photosArray[Symbol.iterator](), _step2; !(_fullIteration2 = (_step2 = _iter2.next()).done); _fullIteration2 = true) {
                var p = _step2.value;
                createListItem(p);
              }
            } catch (err) {
              _didIteratorError2 = true;
              _iteratorError2 = err;
                if (!_fullIteration2 && _iter2.return) {
                } 
              }
          }, 200);
        };

        // initial call to flickr API, get photos from first page
        function getResults(page) {
          currentPage = page;
          return getPhotos(page).then(function (data) {
            allPages = data.photos.pages;
            renderImages(data.photos);
          }).catch(function (e) {
            itemsDesc.innerHTML = errorMsg(e.toString());
          });
        };
        getResults(currentPage);
      };
    