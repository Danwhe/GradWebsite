      // Your Client ID can be retrieved from your project in the Google
      // Developer Console, https://console.developers.google.com
      var CLIENT_ID = '824152728721-8f1m2ib7s58f5g1upce80nvur3qvjsjn.apps.googleusercontent.com';

      var SCOPES = ["https://www.googleapis.com/auth/spreadsheets.readonly"];

      /**
       * Check if current user has authorized this application.
       */
      function checkAuth() {
        gapi.auth.authorize(
          {
            'client_id': CLIENT_ID,
            'scope': SCOPES.join(' '),
            'immediate': true
          }, handleAuthResult);
      }

      /**
       * Handle response from authorization server.
       *
       * @param {Object} authResult Authorization result.
       */
      function handleAuthResult(authResult) {
        var authorizeDiv = document.getElementById('authorize-div');
        if (authResult && !authResult.error) {
          // Hide auth UI, then load client library.
          authorizeDiv.style.display = 'none';
          loadSheetsApi();
        } else {
          // Show auth UI, allowing the user to initiate authorization by
          // clicking authorize button.
          authorizeDiv.style.display = 'inline';
        }
      }

      /**
       * Initiate auth flow in response to user clicking authorize button.
       *
       * @param {Event} event Button click event.
       */
      function handleAuthClick(event) {
        gapi.auth.authorize(
          {client_id: CLIENT_ID, scope: SCOPES, immediate: false},
          handleAuthResult);
        return false;
      }

      /**
       * Load Sheets API client library.
       */
      function loadSheetsApi() {
        var discoveryUrl =
            'https://sheets.googleapis.com/$discovery/rest?version=v4';
        gapi.client.load(discoveryUrl).then(listMajors);
      }

      /**
       * Print the names and majors of students in a sample spreadsheet:
       * https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit
       *
       * TEST SHEET:  https://docs.google.com/a/travisperkins.co.uk/spreadsheets/d/e/2PACX-1vQmPEvGkFxTKPcDasIIzEhz4FG7DY9IF72VYDiKspffpKg_JoihTViPpWBGMeB6W6M-CGi6nWGQxLdh/pubhtml
       */
      function listMajors() {
        gapi.client.sheets.spreadsheets.values.get({
          spreadsheetId: '15n9SM_-3c1MKLzEkr160df7qeNR1g7-96KBJGk9akpU',
          range: 'Sheet1!A2:C',
        }).then(function(response) {
          var range = response.result;
            
          if (range.values.length > 0) {
            for (i = 0; i < range.values.length; i++) {
                    buildTable(range.values[i]);
                }
          } else {
            appendPre('No data found.');
          }
        }, function(response) {
          appendPre('Error: ' + response.result.error.message);
        });
      }

      /**
       * Append a pre element to the body containing the given message
       * as its text node.
       *
       * @param {string} message Text to be placed in pre element.
       */
      function appendPre(message) {
        var pre = document.getElementById('output');
        var textContent = document.createTextNode(message + '\n');
        pre.appendChild(textContent);
      }




function buildTable(title, content1, content2) {
    var containerDiv = document.createElement("div");
    
    containerDiv.style.width = "auto";
    containerDiv.style.height = "auto";
    containerDiv.style.borderStyle = "solid";
    containerDiv.innerHTML = title;
    
    var elementOne = document.createElement("div");
    elementOne.style.width = "auto";
    elementOne.style.height = "20px";
    elementOne.style.borderStyle = "solid";
    
    var elementTwo = document.createElement("div");
    elementTwo.style.width = "auto";
    elementTwo.style.height = "20px";
    elementTwo.style.borderStyle = "solid";
    
    document.getElementById("tableOne").appendChild(containerDiv);
    
    
    
}

/*
var row = range.values[i];
// Print columns A and E, which correspond to indices 0 and 4.
for (i = 0; i < row.length; i++) {
    appendPre(row[i]);
}*/

