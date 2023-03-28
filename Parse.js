import * as cheerio from "cheerio"
import axios from "axios"
import Memory from "./Memory.js";

export async function Parse(url) {
  const lastCard = new Memory("memory.json")
  
  return await axios.get(url).then( (html, result = {}) => {
    const file = cheerio.load(html.data);
    
    // let lastItem = "";
    file(".post-column").each( function(i ) {
      if (file(this).find(".entry-title").text() !== lastCard.data.last) {
        // lastItem = file(this).find(".entry-title").text()
        result[i] = {
          img: file(this).find("img").attr("src"),
          title: file(this).find(".entry-title").text(),
          description: file(this).find(".entry-content p").text(),
          url: file(this).find(".entry-content a").attr("href"),
        };
      }
      else {
        if (result[0]) {
          lastCard.update(result[0].title)
        }
        return false
      }
    })
    return result;
  })
}
