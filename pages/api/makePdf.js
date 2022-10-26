import puppeteer from "puppeteer";
import { makerPdf } from "../../pdfFormat/pdfMaker.js";
import { pdfFormat } from "../../pdfFormat/pdfFormat.js";

export default async function handler(req, res) {
  // const browser = await puppeteer.launch();
  // const page = await browser.newPage();

  // const pid = req.body.questions;
  //console.log(JSON.parse(pid)[0][0]);
  //console.log("-->"+makePDF(pid)+"<--");

  //console.log(htmlContent);
  const pdfBuffer = await makerPdf(pdfFormat, "mypdfpdf.pdf");
  
  // await page.setContent(htmlString);
  // await page.emulateMediaType("screen");
  // const pdfBuffer = await page.pdf({
  //   format: "A4",
  //   printBackground: true,
  // });
  console.log("->"+pdfBuffer+"<-");
  res.send(pdfBuffer);

  // await browser.close();
}
