import { Request, Response } from "express";
import { createWorker } from "tesseract.js";
import { NotFoundException } from "../exceptions/not-found";
import { ErrorCodes } from "../exceptions/root";
import { OpenAI } from "openai";
import { json } from "stream/consumers";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const prompt_gpt = `
You are an experienced math tutor in the education industry in Vietnam, please help students solve math problems step by step, easy to understand, maximum 5 steps, no more. In addition, you are also tasked with predicting this <input>, it was returned with a few wrong characters, try to be 100% correct.
### Instruct ###
user:<input>
 assistant:<response>
 ###example with response###
 assistant : 
 - step 1: ..........
 - step 2:.........
 - step 3: ........
 - step \n4:........
 - step 5: ........
 ### Attention ###
  -<response> wil respond in Vietnamese, mathematical symbols, and operators
 -  Maximum 5 solution steps, minimum 3 step
 - <response> only returns json data
###This is Example of json data###
{
  "input":"<the input after predicted >",
"steps": ["step 1":".....","<"step 2":"....">",.....]
}
NO MORE OTHER RESPONSE `;

export const textRecognitionAndSolvingProblem = async (req: Request, res: Response) => {
  const worker = await createWorker(["vie", "eng"]);

  //   img url in the req.body
  const { imgUrl } = req.body;

  try {
    const {
      data: { text },
    } = await worker.recognize(imgUrl);

    await worker.terminate();

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo-0125",
      messages: [
        { role: "system", content: prompt_gpt },
        { role: "user", content: text },
      ],
      temperature: 0,
      max_tokens: 300,
    });
    console.log(text);

    const jsonString = completion.choices[0].message.content;

    console.log(completion.choices[0].message.content);
    if (jsonString) {
      const data = JSON.parse(jsonString);
      res.json(data);
    } else {
      res.json("not ok");
    }
    // res.json({ completion: completion.choices[0].message.content });
  } catch (error) {
    throw new NotFoundException("Error in text recognition", ErrorCodes.INTERNAL_ERROR);
  }
};

const prompt_gpt_for_detect_text =
  "You are an experienced math tutor in the education industry in Vietnam, your task is to predict this <input>, it returns a few wrong characters, try to be 100% correct. Then return the result as json data, no other response";
export const textRecognition = async (req: Request, res: Response) => {
  const worker = await createWorker(["vie", "eng"]);

  //   img url in the req.body
  const { imgUrl } = req.body;
  console.log(imgUrl);

  try {
    const {
      data: { text },
    } = await worker.recognize(imgUrl);
    console.log(text);
    await worker.terminate();

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo-0125",
      messages: [
        { role: "system", content: prompt_gpt_for_detect_text },
        { role: "user", content: text },
      ],
      max_tokens: 300,
    });
    const jsonString = completion.choices[0].message.content;
    if (jsonString) {
      const data = JSON.parse(jsonString);
      res.json(data);
    } else {
      res.json("not ok");
    }
  } catch (error) {
    throw new NotFoundException("Error in text recognition", ErrorCodes.INTERNAL_ERROR);
  }
};
