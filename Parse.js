import * as cheerio from "cheerio"
import axios from "axios"
import Memory from "./Memory.js";

export async function Parse(url, userID) {
  const User = new Memory(userID);
  
  return await axios.get(url)
  .then( (html, result = {}) => {
    const file = cheerio.load(html.data);
    
    file(".post-column").each( function(i) {
      if (file(this).find(".entry-title").text() !== User.data[userID]) {
        result[i] = {
          img: file(this).find("img").attr("src"),
          title: file(this).find(".entry-title").text(),
          description: file(this).find(".entry-content p").text(),
          url: file(this).find(".entry-content a").attr("href"),
        };
        if (!User.isExist() && i === 9) User.updateValue(result[0].title);
      }
      else {
        if (result[0]) User.updateValue(result[0].title);
        return false
      }
    })
    return result;
  })
}
