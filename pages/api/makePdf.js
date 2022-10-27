import puppeteer from "puppeteer";
import { makerPdf } from "../../pdfFormat/pdfMaker.js";
import { pdfFormat } from "../../pdfFormat/pdfFormat.js";
import cheerio, { load } from "cheerio";

export default async function handler(req, res) {
  // const browser = await puppeteer.launch();
  // const page = await browser.newPage();

  // const pid = req.body.questions;
  //console.log(JSON.parse(pid)[0][0]);
  //console.log("-->"+makePDF(pid)+"<--");

  //console.log(htmlContent);
  const myHtmlString = pdfFormat;
  const $ = load(myHtmlString);
  for (let i = 0; i < req.body.length; i++) {
    const element = req.body[i];
    for (let j = 0; j < element.length; j++) {
      const e = element[j];
      if (e.type == "text") {
        if (
          e.input.includes(
            "(Raw score total,typical performance,Probable difference, Definite difference seperated by spaces)"
          ) != true
        ) {
          if ($(`#${e.id}`) != null) {
            $(`#${e.id}`).html(e.val);
          }
        } else {
          if ($(`#${e.id}`) != null) {
            const tableStr =
              ` <td style="border: 1px solid black; width: 440px; height: 10px; padding: 2px 0px 2px 4px">` +
              e.input +
              `</td>
                                <td style="border: 1px solid black; width: 61px; height: 10px; padding: 2px; padding-left: 4px; padding-right: 4px; ">` +
              e.val.split(" ")[0] +
              `</td>
                                <td style="border: 1px solid black; width: 61px; height: 10px; padding: 2px; padding-left: 4px; padding-right: 4px; ">` +
              e.val.split(" ")[1] +
              `</td>
                                <td style="border: 1px solid black; width: 61px; height: 10px; padding: 2px; padding-left: 4px; padding-right: 4px; ">` +
              e.val.split(" ")[2] +
              `</td>
                                <td style="border: 1px solid black; width: 61px; height: 10px; padding: 2px; padding-left: 4px; padding-right: 4px; ">` +
              e.val.split(" ")[3] +
              `</td>`;
            $(`#${e.id}`).html(tableStr);
          }
        }
      } else if (e.type == "radio") {
        if (
          e.subheadings[0] !=
          [
            "Frequency",
            "With support",
            "Without support",
            "Priority to be targeted",
          ][0]
        ) {
          if ($(`#${e.id}`) != null) {
            $(`#${e.id}`).html(e.val);
          }
        } else {
          if ($(`#${e.id}`) != null) {
            const tableStr =
              `<td style="border: 1px solid black; width: 436px; height: 10px; padding: 2px 0px 2px 4px">` +
              e.input +
              `</td>
                                    <td style="border: 1px solid black; width: 61px; height: 10px; padding: 2px; padding: 2px,; padding-left: 4px; padding-right: 4px; ">` +
              e.val.split(" ")[0] +
              `</td>
                                    <td style="border: 1px solid black; width: 61px; height: 10px; padding: 2px; padding: 2px,; padding-left: 4px; padding-right: 4px; ">` +
              e.val.split(" ")[1] +
              `</td>
                                    <td style="border: 1px solid black; width: 61px; height: 10px; padding: 2px; padding: 2px,; padding-left: 4px; padding-right: 4px; ">` +
              e.val.split(" ")[2] +
              `</td>
                                    <td style="border: 1px solid black; width: 61px; height: 10px; padding: 2px; padding: 2px,; padding-left: 4px; padding-right: 4px; ">` +
              e.val.split(" ")[3] +
              `</td>`;
            $(`#${e.id}`).html(tableStr);
          }
        }
      } else if (e.type == "checkbox") {
        if ($(`#${e.id}`) != null) {
          $(`#${e.id}`).html(e.val.join(" "));
        }
      }
    }
  }
  const pdfBuffer = await makerPdf($.html(), "mypdfpdf.pdf");

  // await page.setContent(htmlString);
  // await page.emulateMediaType("screen");
  // const pdfBuffer = await page.pdf({
  //   format: "A4",
  //   printBackground: true,
  // });

  res.send(pdfBuffer);

  // await browser.close();
}
