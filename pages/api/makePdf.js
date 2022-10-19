import puppeteer from "puppeteer";
import { pdfFormat } from "../../pdfFormat/pdfFormat";

export default async function handler(req, res) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  //console.log(htmlContent);
  await page.setContent(pdfFormat);
  await page.emulateMediaType("screen");
  const pdfBuffer = await page.pdf({
    format: "A4",
    printBackground: true,
  });
  res.send(pdfBuffer);

  await browser.close();
}
