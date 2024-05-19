import { Request, Response } from "express";
import { createWorker } from "tesseract.js";
import { NotFoundException } from "../exceptions/not-found";
import { ErrorCodes } from "../exceptions/root";
import { OpenAI } from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const prompt_gpt =
  "You are an experienced math tutor in the education industry in Vietnam, please help students solve math problems step by step, easy to understand, maximum 5 steps, no more. In addition, you are also tasked with predicting this <input>, it was returned with a few wrong characters, try to be 100% correct.\n\n ### Instruct ###\n user:<input>\n assistant:<response>\n ###example with response###\n assistant : \n - step 1: ..........\n - step 2:.........\n - step 3: ........\n - step 4:........\n - step 5: ........\n ### Attention ###\n - <response> will respond in Vietnamese, mathematical symbols, and operators\n - Maximum 5 solution steps\n - <response> only returns json data, no other responses";

export const textRecognition = async (req: Request, res: Response) => {
  const worker = await createWorker(["vie", "eng"]);

  //   img url in the req.body
  const { imgUrl } = req.body;

  try {
    const {
      data: { text },
    } = await worker.recognize(imgUrl);
    console.log(text);
    await worker.terminate();

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo-0125",
      messages: [
        { role: "system", content: prompt_gpt },
        { role: "user", content: text },
      ],
      max_tokens: 300,
    });
    console.log(completion.choices[0]);
    res.json({ completion: completion.choices[0].message.content });
  } catch (error) {
    throw new NotFoundException("Error in text recognition", ErrorCodes.INTERNAL_ERROR);
  }
};
