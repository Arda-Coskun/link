// Data for accessing Google API
const apiKey = "AIzaSyCSetuPyxYQDVm7ZDIov4uujZZAz8U13uE";
const url = "https://www.googleapis.com/urlshortener/v1/url";

// Page elements
const $urlBox = $("#input");
const $expandButton = $("#expand");
const $shortenButton = $("#shorten");
const $section = $("#section");

// AJAX function to expand URL
async function expandUrl() {
  const urlToExpand = `${url}?shortUrl=${$urlBox.val()}&key=${apiKey}`;

  try {
    let response = await fetch(urlToExpand);
    if (response.ok) {
      let jsonResponse = await response.json();

      // Name data
      const longUrl = jsonResponse.longUrl;

      // Insert expanded URL
      $section.append(`<p>Your expanded URL is<br>${longUrl}</p>`);
      return jsonResponse;
    }
  } catch (error) {
    console.log(error);
  }
}

async function shortenUrl() {
  const urlToShorten = $urlBox.val();
  const urlWithKey = `${url}?key=${apiKey}`;

  try {
    let response = await fetch(urlWithKey, {
      method: "POST",
      body: JSON.stringify({ longUrl: urlToShorten }),
      headers: {
        "Content-type": "application/json"
      }
    });
    if (response.ok) {
      let jsonResponse = await response.json();

      // Name data
      const shortUrl = jsonResponse.id;

      // Insert shortened URL
      $section.append(`<p>Your shortened URL is<br>${shortUrl}</p>`);
      return jsonResponse;
    }
    throw new Error("Request failed!");
  } catch (error) {
    console.log(error);
  }
}

// Clear page and call AJAX functions
function expand() {
  $section.empty();
  expandUrl();
  return false;
}

function shorten() {
  $section.empty();
  shortenUrl();
  return false;
}

$expandButton.click(expand);
$shortenButton.click(shorten);
